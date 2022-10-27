/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import lodash from 'lodash';
import { message } from 'antd';
import { save } from '../../services';
import type { ForwardedRef } from 'react';
import { zh2Pinyin } from '@/extra/utils';
import { useRequest, useModel } from 'umi';
import type { cateDataItem } from '../../data';
import type { ProFormInstance } from '@ant-design/pro-form';
import {
    ProFormDependency,
    ProFormDigitRange,
    ProFormCascader,
    ProFormCheckbox,
    ProFormSelect,
    ProFormGroup,
    ProFormRadio,
    ProFormDigit,
    ProFormText,
    DrawerForm,
} from '@ant-design/pro-form';
import React, { useImperativeHandle, forwardRef, useState, useRef } from 'react';

export const CreateDirectory: React.FC<{
    path?: number[];
    drawerOpen: boolean;
    ref: ForwardedRef<any>;
    handleSetDrawerOpen: (status: boolean) => void;
}> = forwardRef((props, ref) => {
    /* formRef */
    const formRef = useRef<ProFormInstance>();
    /* parent */
    const [parent, setParent] = useState<number>();
    /* defaultConfig */
    const { data: datas } = useRequest('/attach/default');

    /* caetInfo */
    const { refresh, cateInfo, cateData } = useModel('attach', ret => ({
        refresh: ret.refresh,
        cateInfo: ret.cateInfo,
        cateData: lodash.cloneDeep(ret.cateData),
    }));

    /* useImperative */
    useImperativeHandle(ref, () => ({ setPid: (pid: number) => setParent(pid) }));

    /* 处理新增/编辑事件 */
    const handleOnFinsh = async (values: cateDataItem) => {
        // prettier-ignore
        const data = props?.path
			? { ...values, pid: parent ?? 0 }
			: { ...values, id: cateInfo?.id ?? 0, pid: parent ?? cateInfo?.pid ?? 0 }
        // prettier-ignore
        await save(data).then(res => {
                res?.success && message.success(res.msg);
            }).finally(() => refresh());
    };

    /* requires */
    const [requires, setRequires] = useState<{
        cropRequire: boolean;
        limitRequire: boolean;
        fileExtRequire: boolean;
        astrictRequire: boolean;
        fileMimeRequire: boolean;
    }>({ cropRequire: false, limitRequire: false, astrictRequire: false, fileExtRequire: false, fileMimeRequire: false });

    return (
        <DrawerForm<cateDataItem>
            drawerProps={{
                width: 520,
                maskClosable: false,
                destroyOnClose: true,
                className: 'create-drawer',
            }}
            title={cateInfo?.id ? '编辑目录' : '新增目录'}
            submitter={{
                searchConfig: {
                    resetText: '重置',
                },
                submitButtonProps: {
                    shape: 'round',
                },
                resetButtonProps: {
                    shape: 'round',
                    type: 'default',
                    onClick: () => formRef.current?.resetFields(),
                },
            }}
            formRef={formRef}
            autoFocusFirstInput
            open={props.drawerOpen}
            validateTrigger={['onBlur']}
            onOpenChange={props.handleSetDrawerOpen}
            onFinish={values => handleOnFinsh(values).then(() => true)}
            initialValues={props?.path ? { path: props.path, option: 0 } : cateInfo}
        >
            <ProFormCascader
                name="path"
                hasFeedback
                label="上级目录"
                placeholder="请选择上级目录"
                rules={[{ required: true, message: '请选择上级附件目录' }]}
                fieldProps={{
                    showSearch: true,
                    changeOnSelect: true,
                    options: cateData.map(item => {
                        if (!item.id) {
                            item.disabled = false;
                        }
                        return item;
                    }),
                    onChange: (value: any) => setParent(value.at(-1)),
                    fieldNames: { label: 'name', value: 'id', children: 'children' },
                }}
                transform={(value: string | number[]) => (value instanceof Array ? { path: value.join('-') } : { path: value })}
                convertValue={(value: string | number[]) => (value instanceof Array ? value : value?.split('-').map(Number) ?? [0])}
            />
            <ProFormText
                hasFeedback
                name="name"
                label="目录名称"
                placeholder="请输入目录名称"
                fieldProps={{
                    maxLength: 64,
                    showCount: true,
                    onBlur: e => {
                        // prettier-ignore
                        props?.path && formRef.current?.setFieldValue(
							'ename',
							zh2Pinyin(e.target.value).replace(/\s+/g, '')
						);
                    },
                }}
                rules={[
                    { required: true, message: '请输入目录名称' },
                    { type: 'string', pattern: /^[\u4e00-\u9fa5\w]+$/, message: '目录名称不得包含特殊符号' },
                ]}
            />
            <ProFormText
                hasFeedback
                name="ename"
                label="目录别名"
                tooltip="系统自动生成"
                placeholder="请输入目录别名"
                fieldProps={{
                    maxLength: 64,
                    showCount: true,
                }}
                rules={[
                    { required: true, message: '请输入目录别名' },
                    { type: 'string', pattern: /^\w+$/, message: '目录别名只能是字母、数字和下划线的组合' },
                ]}
            />
            <ProFormRadio.Group
                name="option"
                label="上传配置"
                options={[
                    { label: '默认配置', value: 0 },
                    { label: '自定义配置', value: 1 },
                ]}
            />
            <ProFormDependency name={['option']}>
                {({ option }) => {
                    if (option) {
                        return [
                            <ProFormGroup size={3} key="options" label="配置选项">
                                <ProFormCheckbox
                                    name="limit"
                                    fieldProps={{
                                        onChange: e => {
                                            setRequires(prev => ({ ...prev, limitRequire: e.target.checked }));
                                            !e.target.checked && formRef.current?.setFieldValue('size', undefined);
                                        },
                                    }}
                                >
                                    文件大小
                                </ProFormCheckbox>
                                <ProFormCheckbox
                                    name="astrict"
                                    fieldProps={{
                                        onChange: e => {
                                            setRequires(prev => ({ ...prev, astrictRequire: e.target.checked }));
                                            !e.target.checked && formRef.current?.setFieldValue('astricts', undefined);
                                        },
                                    }}
                                >
                                    限制宽高
                                </ProFormCheckbox>
                                <ProFormCheckbox
                                    name="crop"
                                    fieldProps={{
                                        onChange: e => {
                                            setRequires(prev => ({ ...prev, cropRequire: e.target.checked }));
                                            !e.target.checked && formRef.current?.setFieldValue('aspects', undefined);
                                        },
                                    }}
                                >
                                    启用裁剪
                                </ProFormCheckbox>
                                <ProFormCheckbox
                                    name="suff"
                                    fieldProps={{
                                        onChange: e => {
                                            setRequires(prev => ({ ...prev, fileExtRequire: e.target.checked }));
                                            !e.target.checked && formRef.current?.setFieldValue('fileExt', undefined);
                                        },
                                    }}
                                >
                                    文件后缀
                                </ProFormCheckbox>
                                <ProFormCheckbox
                                    name="mime"
                                    fieldProps={{
                                        onChange: e => {
                                            setRequires(prev => ({ ...prev, fileMimeRequire: e.target.checked }));
                                            !e.target.checked && formRef.current?.setFieldValue('fileMime', undefined);
                                        },
                                    }}
                                >
                                    文件类型
                                </ProFormCheckbox>
                            </ProFormGroup>,
                            <ProFormDependency key="limit" name={['limit']}>
                                {({ limit }) => {
                                    if (limit) {
                                        return (
                                            <ProFormDigit
                                                max={512}
                                                key="size"
                                                width={150}
                                                name="size"
                                                label="文件大小"
                                                tooltip="上传文件的大小"
                                                fieldProps={{
                                                    precision: 0,
                                                    addonAfter: 'MB',
                                                }}
                                                rules={[{ required: requires.limitRequire, message: '请设置文件大小值' }]}
                                            />
                                        );
                                    } else {
                                        return undefined;
                                    }
                                }}
                            </ProFormDependency>,
                            <ProFormDependency key="astrict" name={['astrict']}>
                                {({ astrict }) => {
                                    if (astrict) {
                                        return [
                                            <ProFormDigitRange
                                                key="astricts"
                                                name="astricts"
                                                label="限制宽高"
                                                tooltip="限制图像最小宽高"
                                                fieldProps={{
                                                    precision: 0,
                                                    addonAfter: 'PX',
                                                    onBlur: e => e.stopPropagation(),
                                                }}
                                                rules={[
                                                    () => ({
                                                        validator(_, value) {
                                                            // prettier-ignore
                                                            return value instanceof Array && 2 == value.filter(item => typeof item === 'number').length
															? Promise.resolve()
															: Promise.reject('请完善图像宽高参数')
                                                        },
                                                    }),
                                                ]}
                                            />,
                                        ];
                                    } else {
                                        return undefined;
                                    }
                                }}
                            </ProFormDependency>,
                            <ProFormDependency key="crop" name={['crop']}>
                                {({ crop }) => {
                                    if (crop) {
                                        return [
                                            <ProFormDigitRange
                                                key="aspects"
                                                name="aspects"
                                                label="裁剪比例"
                                                tooltip="需为正整数"
                                                fieldProps={{
                                                    precision: 0,
                                                    onBlur: e => e.stopPropagation(),
                                                }}
                                                rules={[
                                                    () => ({
                                                        validator(_, value) {
                                                            // prettier-ignore
                                                            return value instanceof Array && 2 == value.filter(item => typeof item === 'number').length
															? Promise.resolve()
															: Promise.reject('请完善裁剪比例参数')
                                                        },
                                                    }),
                                                ]}
                                            />,
                                        ];
                                    } else {
                                        return undefined;
                                    }
                                }}
                            </ProFormDependency>,
                            <ProFormDependency key="suff" name={['suff']}>
                                {({ suff }) => {
                                    if (suff) {
                                        return [
                                            <ProFormSelect
                                                key="fileExt"
                                                name="fileExt"
                                                label="文件后缀"
                                                tooltip="限制上传的文件后缀"
                                                fieldProps={{
                                                    mode: 'tags',
                                                    maxTagCount: 13,
                                                    options: datas?.list.fileExt?.map((item: Record<string, any>) => ({
                                                        label: item,
                                                        value: item,
                                                    })),
                                                }}
                                                rules={[{ required: requires.fileExtRequire, message: '请设置文件后缀' }]}
                                            />,
                                        ];
                                    } else {
                                        return undefined;
                                    }
                                }}
                            </ProFormDependency>,
                            <ProFormDependency key="mime" name={['mime']}>
                                {({ mime }) => {
                                    if (mime) {
                                        return [
                                            <ProFormSelect
                                                key="fileMime"
                                                name="fileMime"
                                                label="文件类型"
                                                tooltip="限制上传的文件类型"
                                                fieldProps={{
                                                    mode: 'tags',
                                                    maxTagCount: 10,
                                                    options: datas?.list.fileMime?.map((item: Record<string, any>) => ({
                                                        label: item,
                                                        value: item,
                                                    })),
                                                }}
                                                rules={[{ required: requires.fileMimeRequire, message: '请设置文件类型' }]}
                                            />,
                                        ];
                                    } else {
                                        return undefined;
                                    }
                                }}
                            </ProFormDependency>,
                        ];
                    } else {
                        return undefined;
                    }
                }}
            </ProFormDependency>
        </DrawerForm>
    );
});
