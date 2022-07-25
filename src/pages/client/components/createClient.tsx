/** @format */

import { message } from 'antd';
import React, { useRef } from 'react';
import { saveClient } from '../service';
import { waitTime } from '@/extra/utils';
import type { tableDataItem } from '../data';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormTextArea, ProFormText, ModalForm } from '@ant-design/pro-form';

export const CreateClient: React.FC<{
    record: tableDataItem;
    modalVisit: boolean;
    isCreateClient: boolean;
    reloadTable: () => void;
    handleSetModalVisit: (status: boolean) => void;
}> = props => {
    const formRef = useRef<ProFormInstance>();
    /** modal标题 */
    const modalTitle = props.isCreateClient ? '新增客户' : '编辑客户';

    /** 处理onFinish事件 */
    const handleFinish = async (data: tableDataItem) => {
        await saveClient({ ...data, id: props?.record?.id ?? null }).then(res => {
            res?.msg && message.success(res.msg);
            // 延时重载列表数据
            res?.status && waitTime(2000).then(() => props.reloadTable());
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
            visible={props.modalVisit}
            initialValues={props.record}
            validateTrigger={['onBlur']}
            onVisibleChange={props.handleSetModalVisit}
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
            <ProFormText
                hasFeedback
                label="所在地区"
                name="address"
                tooltip="客户所在地区"
                placeholder="请输入客户所在地区"
                fieldProps={{
                    maxLength: 50,
                    showCount: true,
                }}
                rules={[{ required: true, message: '请输入客户客户所在地区' }]}
            />
            <ProFormTextArea
                hasFeedback
                label="客户需求"
                name="message"
                tooltip="客户的简要需求"
                placeholder="请输入客户的简要需求"
                fieldProps={{
                    maxLength: 256,
                    showCount: true,
                    allowClear: true,
                    autoSize: { minRows: 5, maxRows: 8 },
                }}
                rules={[{ required: true, message: '请输入客户的简要需求' }]}
            />
        </ModalForm>
    );
};
