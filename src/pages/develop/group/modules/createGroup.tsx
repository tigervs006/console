/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import { Typography } from 'antd';
import { message, Row } from 'antd';
import { saveGroup } from '../../services';
import ProCard from '@ant-design/pro-card';
import React, { useState, useRef } from 'react';
import type { groupDataItem } from '../../data';
import type { ProFormInstance } from '@ant-design/pro-form';
import { objToString, strToObject, waitTime } from '@/extra/utils';
import { valueOptions, colOptions, patterns } from '@/extra/options';
import { InsertRowAboveOutlined, CloseCircleOutlined, FormOutlined } from '@ant-design/icons';
import {
    ProFormDependency,
    ProFormTextArea,
    ProFormCheckbox,
    ProFormSelect,
    ProFormRadio,
    ProFormDigit,
    ProFormList,
    ProFormText,
    DrawerForm,
} from '@ant-design/pro-form';

export const CreateGroup: React.FC<{
    isCreate: boolean;
    openDrawer: boolean;
    record?: groupDataItem;
    reloadTable: () => void;
    handleSetOpenDrawer: (status: boolean) => void;
}> = props => {
    const { Text } = Typography;
    /* formRef */
    const formRef = useRef<ProFormInstance>();
    /* modal标题 */
    const drawerTitle = props.isCreate ? '新增数据组' : '编辑数据组';
    /* required */
    const [required, setRequired] = useState<boolean>(false);

    /* onFinish */
    const handleFinish = async (data: groupDataItem) => {
        /* 转换options的值 */
        data.fields_type.map(item => {
            item.formProps[0].title = item.name;
            item.tableProps[0].title = item.name;
            item.formProps[0].dataIndex = item.cname;
            item.tableProps[0].dataIndex = item.cname;
            if (item.formProps[0]?.valueEnum) {
                const options = item.formProps[0].valueEnum;
                // prettier-ignore
                item.formProps[0].valueEnum = 'object' === typeof options
					? options : strToObject(options) as Record<string, any>[]
            }
            if (item.tableProps[0]?.valueEnum) {
                const options = item.tableProps[0].valueEnum;
                // prettier-ignore
                item.tableProps[0].valueEnum = 'object' === typeof options
					? options : strToObject(options) as Record<string, any>[]
            }
        });
        await saveGroup({ ...data, id: props?.record?.id }).then(res => {
            res?.success && message.success(res.msg);
            /* 重载表格数据 */
            res?.success && waitTime(2000).then(() => props.reloadTable());
        });
    };

    return (
        <DrawerForm<groupDataItem>
            grid
            width={500}
            formRef={formRef}
            title={drawerTitle}
            open={props.openDrawer}
            validateTrigger={['onBlur']}
            initialValues={props?.record}
            onOpenChange={props.handleSetOpenDrawer}
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
            onFinish={values => handleFinish(values).then(() => true)}
            drawerProps={{
                maskClosable: false,
                destroyOnClose: true,
                className: 'group-drawer',
            }}
        >
            <ProFormText
                hasFeedback
                name="name"
                label="数组名称"
                placeholder="请输入数组名称"
                fieldProps={{
                    maxLength: 38,
                    showCount: true,
                }}
                rules={[
                    { required: true, message: '请输入数组名称' },
                    { type: 'string', pattern: /^[\u4e00-\u9fa5\w]+$/, message: '数组名称不得包含其它特殊字符' },
                ]}
            />
            <ProFormText
                hasFeedback
                name="cname"
                label="数组别名"
                placeholder="请输入数组别名"
                fieldProps={{
                    maxLength: 64,
                    showCount: true,
                }}
                rules={[
                    { required: true, message: '请输入数组别名' },
                    { type: 'string', pattern: /^[a-zA-Z_]+$/, message: '数组别名只能是英文字母和下划线的组合' },
                ]}
            />
            <ProFormText
                hasFeedback
                label="数组简述"
                name="summary"
                placeholder="请输入数组简述"
                fieldProps={{
                    maxLength: 128,
                    showCount: true,
                }}
                rules={[{ required: true, message: '请输入数组简述' }]}
            />
            <ProFormList
                name="fields_type"
                alwaysShowItemLabel
                deleteIconProps={{
                    tooltipText: '删除此行',
                    Icon: CloseCircleOutlined,
                }}
                creatorButtonProps={{
                    creatorButtonText: '新增字段',
                }}
                actionGuard={{
                    beforeRemoveRow: async index => {
                        return new Promise<boolean>(resolve => {
                            if (!index) {
                                message.error('这行不能删');
                                resolve(false);
                                return;
                            }
                            resolve(true);
                        });
                    },
                }}
                itemRender={({ listDom, action }, { index }) =>
                    // prettier-ignore
                    <ProCard
						bordered
						extra={action}
						title={`字段 #${index + 1}`}
						style={{ marginBlockEnd: 8 }}
						bodyStyle={{ paddingBlockEnd: 0 }}
					>
                        {listDom}
                    </ProCard>
                }
                creatorRecord={{ name: '姓名', cname: 'name', formOptions: 0, tableOptions: 0 }}
            >
                <Row gutter={8}>
                    <ProFormText
                        hasFeedback
                        name="name"
                        label="字段名称"
                        placeholder="字段名称"
                        tooltip="字段名称：姓名"
                        colProps={{ span: 12 }}
                        rules={[
                            { required: true, message: '请输入字段名称' },
                            { type: 'string', pattern: /^[\u4e00-\u9fa5\w]+$/, message: '字段名称不得包含特殊符号' },
                        ]}
                    />
                    <ProFormText
                        hasFeedback
                        name="cname"
                        label="字段别名"
                        placeholder="字段别名"
                        tooltip="字段别名：name"
                        colProps={{ span: 12 }}
                        rules={[
                            { required: true, message: '请输入字段别名' },
                            { type: 'string', pattern: /^[a-zA-Z_]+$/, message: '字段别名不得包含其它特殊符号' },
                        ]}
                    />
                    <ProFormRadio.Group
                        label="表格配置"
                        name="tableOptions"
                        colProps={{ span: 12 }}
                        options={[
                            { label: '默认', value: 0 },
                            { label: '自定义', value: 1 },
                        ]}
                    />
                    <ProFormRadio.Group
                        label="表单配置"
                        name="formOptions"
                        colProps={{ span: 12 }}
                        options={[
                            { label: '默认', value: 0 },
                            { label: '自定义', value: 1 },
                        ]}
                    />
                </Row>
                <ProFormDependency name={['tableOptions']}>
                    {({ tableOptions }) => {
                        return tableOptions ? (
                            <ProFormList
                                name="tableProps"
                                alwaysShowItemLabel
                                copyIconProps={false}
                                deleteIconProps={false}
                                creatorButtonProps={false}
                                label={
                                    <>
                                        <InsertRowAboveOutlined style={{ marginRight: '.5rem' }} />
                                        <Text strong>表格属性</Text>
                                    </>
                                }
                                initialValue={[{ valueType: 'text' }]}
                            >
                                {(meta, index, action) => {
                                    return (
                                        <Row gutter={8}>
                                            <Row justify="space-between">
                                                <ProFormCheckbox name="filters" colProps={{ flex: 'auto' }}>
                                                    筛选
                                                </ProFormCheckbox>
                                                <ProFormCheckbox name="ellipsis" colProps={{ flex: 'auto' }}>
                                                    自动省略
                                                </ProFormCheckbox>
                                                <ProFormCheckbox name="hideInTable" colProps={{ flex: 'auto' }}>
                                                    隐藏列表
                                                </ProFormCheckbox>
                                                <ProFormCheckbox name="hideInForm" colProps={{ flex: 'auto' }}>
                                                    隐藏表单
                                                </ProFormCheckbox>
                                                <ProFormCheckbox name="hideInSearch" colProps={{ flex: 'auto' }}>
                                                    隐藏搜索
                                                </ProFormCheckbox>
                                            </Row>
                                            <ProFormText name="tooltip" label="表头提示" placeholder="表头提示信息" />
                                            <ProFormDigit name="width" label="表格列宽" colProps={{ span: 12 }} fieldProps={{ precision: 0 }} />
                                            <ProFormSelect
                                                label="显示类型"
                                                name="valueType"
                                                options={valueOptions}
                                                colProps={{ span: 12 }}
                                                rules={[{ required: true, message: '请设置显示类型' }]}
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
                                            <ProFormDependency name={['valueType']}>
                                                {({ valueType }) => {
                                                    let mode: boolean = false;
                                                    valueOptions.forEach(item => {
                                                        if (valueType === item.value) {
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
                                        </Row>
                                    );
                                }}
                            </ProFormList>
                        ) : undefined;
                    }}
                </ProFormDependency>
                <ProFormDependency name={['formOptions']}>
                    {({ formOptions }) => {
                        return formOptions ? (
                            <ProFormList
                                name="formProps"
                                alwaysShowItemLabel
                                copyIconProps={false}
                                deleteIconProps={false}
                                creatorButtonProps={false}
                                initialValue={[{ valueType: 'text' }]}
                                label={
                                    <>
                                        <FormOutlined style={{ marginRight: '.5rem' }} />
                                        <Text strong>表单属性</Text>
                                    </>
                                }
                            >
                                {(meta, index, action) => {
                                    return (
                                        <Row gutter={8}>
                                            <ProFormRadio.Group
                                                name="required"
                                                label="是否必填"
                                                initialValue={false}
                                                options={[
                                                    { label: '是', value: true },
                                                    { label: '否', value: false },
                                                ]}
                                            />
                                            <ProFormText name="tooltip" label="表单提示" placeholder="表单提示信息" />
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
                                                label="显示类型"
                                                name="valueType"
                                                tooltip="表单显示类型"
                                                options={valueOptions}
                                                colProps={{ span: 12 }}
                                                rules={[{ required: true, message: '请设置显示类型' }]}
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
                                            <ProFormDependency name={['valueType']}>
                                                {({ valueType }) => {
                                                    let mode: boolean = false;
                                                    valueOptions.forEach(item => {
                                                        if (valueType === item.value) {
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
                        ) : undefined;
                    }}
                </ProFormDependency>
            </ProFormList>
        </DrawerForm>
    );
};
