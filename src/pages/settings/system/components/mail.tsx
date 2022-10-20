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

import { Space } from 'antd';
import React, { useRef } from 'react';
import type { ProFormInstance } from '@ant-design/pro-form';
import { InputTagList } from '@/pages/components/InputTagList';
import { FormOutlined, UndoOutlined } from '@ant-design/icons';
import ProForm, { ProFormDependency, ProFormDigit, ProFormSwitch, ProFormText } from '@ant-design/pro-form';

export const MailSettings: React.FC<{
    list: Record<string, any>;
    handleFinish: (data: Record<string, any>) => Promise<void>;
}> = props => {
    const formRef = useRef<ProFormInstance>();
    return (
        <ProForm
            formRef={formRef}
            layout="vertical"
            wrapperCol={{
                md: { span: 16 },
                lg: { span: 16 },
                xl: { span: 8 },
            }}
            submitter={{
                render: (_, doms) => {
                    return (
                        <Space size="middle" key="spaceGroup">
                            {doms}
                        </Space>
                    );
                },
                resetButtonProps: { shape: 'round', icon: <UndoOutlined /> },
                submitButtonProps: { type: 'primary', shape: 'round', icon: <FormOutlined /> },
            }}
            // 失焦校验数据
            validateTrigger={['onBlur']}
            onFinish={values => props.handleFinish(values)}
        >
            <ProFormSwitch
                label="邮件服务"
                name={props.list.mail_service?.name}
                tooltip={props.list.mail_service?.description}
                transform={value => ({ mail_service: value ? 1 : 0 })}
                initialValue={Number(props.list.mail_service?.value)}
                fieldProps={{ checkedChildren: '启用', unCheckedChildren: '禁用' }}
            />
            <ProFormDependency name={[props.list.mail_service?.name]}>
                {({ mail_service }) => {
                    if (mail_service) {
                        return (
                            <>
                                <ProForm.Item
                                    hasFeedback
                                    label="收件人组"
                                    name={props.list.mail_send_receiver?.name}
                                    initialValue={props.list.mail_send_receiver?.value}
                                    tooltip={props.list.mail_send_receiver?.description}
                                    rules={[{ required: true, message: '请至少填写一个收件人' }]}
                                >
                                    <InputTagList
                                        addition={'收件人'}
                                        handleChange={value =>
                                            formRef.current?.setFieldsValue({
                                                mail_send_receiver: value.join(','),
                                            })
                                        }
                                        tagsList={props.list.mail_send_receiver?.value.split(',')}
                                    />
                                </ProForm.Item>
                                <ProFormDigit
                                    hasFeedback
                                    label="发件端口"
                                    name={props.list.mail_send_port?.name}
                                    initialValue={props.list.mail_send_port?.value}
                                    tooltip={props.list.mail_send_port?.description}
                                    rules={[
                                        { required: true, message: '发件端口不得为空' },
                                        { pattern: /^\d+$/, message: '发件商品只能是正整数' },
                                    ]}
                                />
                                <ProFormText
                                    hasFeedback
                                    label="发件用户"
                                    name={props.list.mail_user_name?.name}
                                    getValueFromEvent={e => e.target.value.trim()}
                                    initialValue={props.list.mail_user_name?.value}
                                    tooltip={props.list.mail_user_name?.description}
                                    rules={[
                                        { required: true, message: '发件用户必须填写' },
                                        { type: 'email', message: '邮件格式错误，请重新输入' },
                                    ]}
                                />
                                <ProFormText.Password
                                    hasFeedback
                                    label="用户密码"
                                    name={props.list.mail_user_password?.name}
                                    getValueFromEvent={e => e.target.value.trim()}
                                    initialValue={props.list.mail_user_password?.value}
                                    tooltip={props.list.mail_user_password?.description}
                                    fieldProps={{
                                        readOnly: true,
                                        onFocus: e => e.target.removeAttribute('readonly'),
                                        onBlur: e => e.target.setAttribute('readonly', 'true'),
                                    }}
                                    rules={[{ required: true, message: '用户密码不得为空，请重新输入' }]}
                                />
                                <ProFormText
                                    hasFeedback
                                    label="发件地址"
                                    name={props.list.mail_send_from?.name}
                                    getValueFromEvent={e => e.target.value.trim()}
                                    initialValue={props.list.mail_send_from?.value}
                                    tooltip={props.list.mail_send_from?.description}
                                    rules={[
                                        { required: true, message: '发件地址必须填写' },
                                        { type: 'email', message: '邮件格式错误，请重新输入' },
                                    ]}
                                />
                                <ProFormText
                                    hasFeedback
                                    label="SMTP地址"
                                    name={props.list.mail_smtp_host?.name}
                                    getValueFromEvent={e => e.target.value.trim()}
                                    initialValue={props.list.mail_smtp_host?.value}
                                    tooltip={props.list.mail_smtp_host?.description}
                                    rules={[{ required: true, message: 'SMTP地址不得为空，请重新输入' }]}
                                />
                                <ProFormText
                                    hasFeedback
                                    label="邮件主题"
                                    name={props.list.mail_send_subject?.name}
                                    getValueFromEvent={e => e.target.value.trim()}
                                    initialValue={props.list.mail_send_subject?.value}
                                    tooltip={props.list.mail_send_subject?.description}
                                    rules={[{ required: true, message: '邮件主题不得为空，请重新输入' }]}
                                />
                            </>
                        );
                    } else {
                        return null;
                    }
                }}
            </ProFormDependency>
        </ProForm>
    );
};
