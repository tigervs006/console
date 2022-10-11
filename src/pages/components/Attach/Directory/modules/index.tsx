/** @format */

import lodash from 'lodash';
import { message } from 'antd';
import { useModel } from 'umi';
import { save } from '../../services';
import type { ForwardedRef } from 'react';
import { zh2Pinyin } from '@/extra/utils';
import type { cateDataItem } from '../../data';
import type { ProFormInstance } from '@ant-design/pro-form';
import {
    ProFormDependency,
    ProFormDigitRange,
    ProFormCascader,
    ProFormCheckbox,
    ProFormGroup,
    ProFormDigit,
    ProFormText,
    ModalForm,
} from '@ant-design/pro-form';
import React, { useImperativeHandle, forwardRef, useState, useRef } from 'react';

export const CreateDirectory: React.FC<{
    path?: number[];
    modalVisit: boolean;
    ref: ForwardedRef<any>;
    handleSetModalVisit: (status: boolean) => void;
}> = forwardRef((props, ref) => {
    /* formRef */
    const formRef = useRef<ProFormInstance>();
    /* parent */
    const [parent, setParent] = useState<number>();
    /* caetInfo */
    const { refresh, cateInfo, cateData } = useModel('attach', ret => ({
        refresh: ret.refresh,
        cateInfo: ret.cateInfo,
        cateData: lodash.cloneDeep(ret.cateData),
    }));
    /* requires */
    const [requires, setRequires] = useState<{
        cropRequire: boolean;
        limitRequire: boolean;
        astrictRequire: boolean;
    }>({ cropRequire: false, limitRequire: false, astrictRequire: false });
    /* useImperative */
    useImperativeHandle(ref, () => ({ setPid: (pid: number) => setParent(pid) }));

    /* 处理新增/编辑事件 */
    const handleOnFinsh = async (values: cateDataItem) => {
        // prettier-ignore
        const data = !cateInfo?.id
			? { ...values, pid: parent ?? 0 }
			: { ...values, id: cateInfo.id, pid: parent ?? cateInfo.pid }
        // prettier-ignore
        await save(data).then(res => {
                res?.success && message.success(res.msg);
            }).finally(() => refresh());
    };

    return (
        <ModalForm<cateDataItem>
            modalProps={{
                centered: true,
                maskClosable: false,
                destroyOnClose: true,
            }}
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
            width={400}
            formRef={formRef}
            autoFocusFirstInput
            visible={props.modalVisit}
            validateTrigger={['onBlur']}
            onVisibleChange={props.handleSetModalVisit}
            title={cateInfo?.id ? '编辑目录' : '新增目录'}
            initialValues={cateInfo ?? { path: props?.path ?? [0] }}
            onFinish={values => handleOnFinsh(values).then(() => true)}
        >
            <ProFormCascader
                name="path"
                hasFeedback
                label="上级目录"
                placeholder="请选择上级目录"
                rules={[{ required: true, message: '请选择上级附件目录' }]}
                fieldProps={{
                    showSearch: true,
                    options: cateData.map(item => {
                        if (!item.id) {
                            item.disabled = false;
                        }
                        return item;
                    }),
                    changeOnSelect: true,
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
                        !cateInfo?.id && formRef.current?.setFieldValue(
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
            <ProFormGroup size={3} label="上传配置">
                <ProFormCheckbox
                    name="limit"
                    fieldProps={{
                        onChange: e => {
                            setRequires(prev => ({ ...prev, limitRequire: e.target.checked }));
                            !e.target.checked && formRef.current?.setFieldValue('size', undefined);
                        },
                    }}
                >
                    限制大小
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
            </ProFormGroup>
            <ProFormDependency name={['limit']}>
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
                        return null;
                    }
                }}
            </ProFormDependency>
            <ProFormDependency name={['astrict']}>
                {({ astrict }) => {
                    if (astrict) {
                        return [
                            <ProFormDigitRange
                                key="astricts"
                                name="astricts"
                                label="限制宽高"
                                tooltip="默认单位为px"
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
                        return null;
                    }
                }}
            </ProFormDependency>
            <ProFormDependency name={['crop']}>
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
                        return null;
                    }
                }}
            </ProFormDependency>
        </ModalForm>
    );
});
