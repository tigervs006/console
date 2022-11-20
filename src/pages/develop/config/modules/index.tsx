/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import type { ForwardedRef } from 'react';
import ProCard from '@ant-design/pro-card';
import { configSave } from '../../services';
import { Typography, message, Row } from 'antd';
import { objToString, waitTime } from '@/extra/utils';
import { CloseCircleOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import type { configListDataItem } from '@/pages/develop/data';
import type { ProFormColumnsType } from '@ant-design/pro-form';
import { valueOptions, colOptions, patterns } from '@/extra/options';
import React, { useImperativeHandle, forwardRef, useState, useRef } from 'react';
import {
    ProFormDependency,
    ProFormTextArea,
    BetaSchemaForm,
    ProFormSelect,
    ProFormRadio,
    ProFormText,
    ProFormList,
    DrawerForm,
} from '@ant-design/pro-form';

export const CreateConfig: React.FC<{
    isCreate: boolean;
    ref: ForwardedRef<any>;
    reloadTable: () => void;
    record?: configListDataItem;
}> = forwardRef((props, ref) => {
    const { Text } = Typography;
    /* formRef */
    const formRef = useRef<ProFormInstance>();
    /* modal标题 */
    const modalTitle = props.isCreate ? '新增配置' : '编辑配置';
    /* required */
    const [required, setRequired] = useState<boolean>(false);
    /* openModal */
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    /* imperative */
    useImperativeHandle(ref, () => ({ setDrawer: setOpenDrawer }));
    /* defColumns */
    const [columns, setColumns] = useState<ProFormColumnsType<configListDataItem>[]>([
        {
            title: '配置值',
            valueType: 'text',
            dataIndex: 'value',
            formItemProps: {
                rules: [{ required: true, message: '配置默认值为必填字段' }],
            },
        },
    ]);

    /* handleFinsh */
    const handleFinsh = (data: configListDataItem) => {
        return new Promise<boolean>((resolve, reject) => {
            // prettier-ignore
            configSave({ ...data, id: props?.record?.id }).then(res => {
                    res?.success && message.success(res.msg);
                    waitTime(2000).then(() => props.reloadTable());
                    resolve(true);
                }).catch(() => reject(false)).finally(() => setOpenDrawer(false));
        });
    };

    return (
        <DrawerForm<configListDataItem>
            grid
            width={500}
            open={openDrawer}
            formRef={formRef}
            title={modalTitle}
            rowProps={{
                gutter: [8, 0],
            }}
            onFinish={handleFinsh}
            validateTrigger={['onBlur']}
            onOpenChange={setOpenDrawer}
            drawerProps={{
                maskClosable: false,
                destroyOnClose: true,
                className: 'group-drawer',
            }}
            submitter={{
                submitButtonProps: {
                    shape: 'round',
                },
                searchConfig: {
                    resetText: '重置',
                },
                resetButtonProps: {
                    shape: 'round',
                    type: 'default',
                    onClick: () => formRef.current?.resetFields(),
                },
            }}
        >
            <ProFormRadio.Group
                name="status"
                label="是否显示"
                initialValue={1}
                options={[
                    { label: '是', value: 1 },
                    { label: '否', value: 0 },
                ]}
                rules={[{ required: true, message: '请选择是否显示配置' }]}
            />
            <ProFormSelect
                name="type"
                label="字段类型"
                colProps={{ span: 12 }}
                options={valueOptions}
                placeholder="请选择字段类型"
                rules={[{ required: true, message: '请选择合适的字段类型' }]}
                fieldProps={{
                    showSearch: true,
                    defaultValue: 'text',
                    onChange: value => {
                        setColumns([
                            {
                                title: '配置值',
                                dataIndex: 'value',
                                valueType: value as any,
                                formItemProps: {
                                    rules: [{ required: true, message: '配置值为必填字段' }],
                                },
                            },
                        ]);
                    },
                }}
            />
            <ProFormText name="name" label="配置名称" rules={[{ required: true, message: '配置名称是必填字段' }]} />
            <ProFormText name="fname" label="字段名称" rules={[{ required: true, message: '字段名称是必填字段' }]} />
            <BetaSchemaForm<configListDataItem> columns={columns} layoutType="Embed" />
            <ProFormList
                name="formProps"
                alwaysShowItemLabel
                copyIconProps={false}
                deleteIconProps={false}
                creatorButtonProps={false}
                label={<Text strong>表单属性</Text>}
                itemRender={({ listDom }) => (
                    <ProCard bordered style={{ marginBlockEnd: 8 }} bodyStyle={{ paddingBlockEnd: 0 }}>
                        {listDom}
                    </ProCard>
                )}
                initialValue={[{ type: 'text', required: 0 }]}
            >
                {(meta, index, action) => {
                    return (
                        <Row gutter={8}>
                            <ProFormRadio.Group
                                name="required"
                                label="是否必填"
                                options={[
                                    { label: '是', value: 1 },
                                    { label: '否', value: 0 },
                                ]}
                                rules={[{ required: true, message: '请选择是否必填配置' }]}
                            />
                            <ProFormList
                                name="rules"
                                alwaysShowItemLabel
                                deleteIconProps={{
                                    tooltipText: '删除此行',
                                    Icon: CloseCircleOutlined,
                                }}
                                creatorButtonProps={{
                                    creatorButtonText: '新增规则',
                                }}
                                label={<Text strong>表单验证</Text>}
                            >
                                <Row gutter={8}>
                                    <ProFormSelect
                                        name="pattern"
                                        label="验证规则"
                                        options={patterns}
                                        colProps={{ span: 12 }}
                                        tooltip="选择或自定义正则"
                                        validateTrigger={['onChange']}
                                        fieldProps={{
                                            mode: 'tags',
                                            allowClear: true,
                                            showSearch: true,
                                            autoClearSearchValue: true,
                                            onChange: value => (value?.length ? setRequired(true) : setRequired(false)),
                                        }}
                                        rules={[
                                            () => ({
                                                validator(_, value: string[]) {
                                                    if (!value) return Promise.resolve();
                                                    // prettier-ignore
                                                    return 1 >= value.length
														? Promise.resolve() : Promise.reject(new Error('只选择一个验证规则就行了'));
                                                },
                                            }),
                                        ]}
                                    />
                                    <ProFormText
                                        name="message"
                                        label="错误提示"
                                        colProps={{ span: 12 }}
                                        rules={[{ required: required, message: '请完善错误提示信息' }]}
                                    />
                                </Row>
                            </ProFormList>
                            <ProFormText name="tooltip" label="表单提示" placeholder="表单提示信息" />
                            <ProFormSelect
                                label="栅格布局"
                                name="colProps"
                                options={colOptions}
                                colProps={{ span: 12 }}
                                tooltip="表单默认使用Grid布局"
                                validateTrigger={['onChange']}
                                fieldProps={{
                                    mode: 'tags',
                                    allowClear: true,
                                    showSearch: true,
                                    autoClearSearchValue: true,
                                }}
                                rules={[
                                    () => ({
                                        validator(_, value: string[]) {
                                            if (!value) return Promise.resolve();
                                            // prettier-ignore
                                            return 1 >= value.length
												? Promise.resolve() : Promise.reject(new Error('只选择一个栅格布局就行了'));
                                        },
                                    }),
                                ]}
                            />
                            <ProFormSelect
                                name="type"
                                label="显示类型"
                                options={valueOptions}
                                colProps={{ span: 12 }}
                                placeholder="请选择字段类型"
                                rules={[{ required: true, message: '请选择合适的字段类型' }]}
                                fieldProps={{
                                    showSearch: true,
                                    onChange: select => {
                                        valueOptions.forEach(item => {
                                            if (select === item.value) {
                                                !item.mode && action.setCurrentRowData({ valueEnum: undefined });
                                            }
                                        });
                                    },
                                }}
                            />
                            <ProFormDependency key="typeEnum" name={['type']}>
                                {({ type }) => {
                                    let mode: boolean = false;
                                    valueOptions.forEach(item => {
                                        if (type === item.value) {
                                            mode = !!item.mode;
                                        }
                                    });
                                    return mode ? (
                                        <ProFormTextArea
                                            hasFeedback
                                            label="值的参数"
                                            name="valueEnum"
                                            tooltip="多个参数请换行"
                                            placeholder={'0=>启用\n1=>禁用'}
                                            rules={[{ required: true, message: '请完善字段参数' }]}
                                            fieldProps={{
                                                allowClear: true,
                                                autoSize: { minRows: 3, maxRows: 5 },
                                            }}
                                            convertValue={value => ('string' === typeof value ? value : objToString(value))}
                                        />
                                    ) : undefined;
                                }}
                            </ProFormDependency>
                            <ProFormTextArea
                                hasFeedback
                                label="前置转化"
                                name="convertValue"
                                placeholder={'(value) => void'}
                                tooltip="在组件获得数据之前格式化值"
                                fieldProps={{
                                    allowClear: true,
                                    autoSize: { minRows: 3, maxRows: 5 },
                                }}
                            />
                            <ProFormTextArea
                                hasFeedback
                                label="提交转化"
                                name="transform"
                                placeholder={'(value) => void'}
                                tooltip="提交时将值转化为提交的数据"
                                fieldProps={{
                                    allowClear: true,
                                    autoSize: { minRows: 3, maxRows: 5 },
                                }}
                            />
                        </Row>
                    );
                }}
            </ProFormList>
        </DrawerForm>
    );
});
