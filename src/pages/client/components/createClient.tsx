/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

/** @format */

import './index.less';
import { message } from 'antd';
import React, { useRef } from 'react';
import { waitTime } from '@/extra/utils';
import type { tableDataItem } from '../data';
import { fetchRegion, saveClient } from '../service';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormDependency, ProFormTextArea, ProFormSelect, ProFormGroup, ProFormText, ModalForm } from '@ant-design/pro-form';

export const CreateClient: React.FC<{
    record: tableDataItem;
    modalOpen: boolean;
    isCreateClient: boolean;
    reloadTable: () => void;
    handleSetModalOpen: (status: boolean) => void;
}> = props => {
    const formRef = useRef<ProFormInstance>();
    /** modal标题 */
    const modalTitle = props.isCreateClient ? '新增客户' : '编辑客户';

    /** 获取行政区域列表 */
    const queryRegion = async (params: { pid?: number }) => {
        return await fetchRegion(params).then(res => res?.data?.list);
    };

    /** 处理onFinish事件 */
    const handleFinish = async (data: tableDataItem) => {
        await saveClient({ ...data, id: props?.record?.id ?? null }).then(res => {
            res?.success && message.success(res.msg);
            // 延时重载列表数据
            res?.success && waitTime(2000).then(() => props.reloadTable());
        });
    };
    return (
        <ModalForm<tableDataItem>
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
            width={500}
            formRef={formRef}
            title={modalTitle}
            autoFocusFirstInput
            open={props.modalOpen}
            initialValues={props.record}
            validateTrigger={['onBlur']}
            onOpenChange={props.handleSetModalOpen}
            onFinish={values => handleFinish(values).then(() => true)}
        >
            <ProFormText
                hasFeedback
                label="客户姓名"
                name="username"
                tooltip="客户的姓名"
                placeholder="请输入客户的姓名"
                fieldProps={{
                    maxLength: 20,
                    showCount: true,
                }}
                rules={[
                    { required: true, message: '请输入客户的姓名' },
                    { type: 'string', pattern: /^[\u4e00-\u9fa5\w]+$/, message: '客户姓名不得包含特殊符号' },
                ]}
            />
            <ProFormText
                hasFeedback
                label="客户手机"
                name="mobile"
                tooltip="客户的手机号"
                placeholder="请输入客户的手机号"
                fieldProps={{
                    maxLength: 11,
                    showCount: true,
                }}
                rules={[
                    { required: true, message: '请输入客户的手机号' },
                    { type: 'string', pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码' },
                ]}
            />
            <ProFormText
                hasFeedback
                label="客户邮箱"
                name="email"
                tooltip="客户的邮箱"
                placeholder="请输入客户的邮箱"
                fieldProps={{
                    maxLength: 30,
                    showCount: true,
                }}
                rules={[
                    { required: true, message: '请输入客户的邮箱' },
                    { type: 'email', message: '请输入正确的邮箱地址' },
                ]}
            />
            <ProFormText
                hasFeedback
                label="公司名称"
                name="company"
                tooltip="客户的公司名"
                placeholder="请输入客户的公司名"
                fieldProps={{
                    maxLength: 50,
                    showCount: true,
                }}
                rules={[{ required: true, message: '请输入客户的公司名' }]}
            />
            <ProFormGroup size={2} label="所在地区">
                <ProFormSelect
                    name="province"
                    params={{ pid: 0 }}
                    request={params => queryRegion(params)}
                    fieldProps={{
                        fieldNames: { label: 'name', value: 'cid' },
                        onChange: () => {
                            formRef.current?.setFieldsValue({ city: undefined, district: undefined });
                        },
                    }}
                    rules={[{ required: true, message: '请选择您所在的省份' }]}
                />
                <ProFormDependency name={['province']}>
                    {({ province }) => {
                        return (
                            <ProFormSelect
                                name="city"
                                disabled={!province}
                                params={{ pid: province }}
                                request={params => queryRegion(params)}
                                fieldProps={{
                                    fieldNames: { label: 'name', value: 'cid' },
                                }}
                                rules={[{ required: true, message: '请选择您所在的城市' }]}
                            />
                        );
                    }}
                </ProFormDependency>
                <ProFormDependency name={['city']}>
                    {({ city }) => {
                        return (
                            <ProFormSelect
                                name="district"
                                disabled={!city}
                                params={{ pid: city }}
                                request={params => queryRegion(params)}
                                fieldProps={{
                                    fieldNames: { label: 'name', value: 'cid' },
                                }}
                                rules={[{ required: true, message: '请选择您所在的区域' }]}
                            />
                        );
                    }}
                </ProFormDependency>
            </ProFormGroup>
            <ProFormTextArea
                hasFeedback
                label="客户需求"
                name="message"
                tooltip="客户的简要需求"
                placeholder="请输入客户的简要需求"
                fieldProps={{
                    maxLength: 100,
                    showCount: true,
                    allowClear: true,
                    autoSize: { minRows: 5, maxRows: 8 },
                }}
                rules={[{ required: true, message: '请输入客户的简要需求' }]}
            />
        </ModalForm>
    );
};
