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
import { FormOutlined, UndoOutlined } from '@ant-design/icons';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';

export const SiteSettings: React.FC<{
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
            <ProFormText
                hasFeedback
                name={props.list.sitename?.name}
                label={props.list.sitename?.description}
                initialValue={props.list.sitename?.value}
                tooltip={props.list.sitename?.description}
                getValueFromEvent={e => e.target.value.trim()}
                fieldProps={{ maxLength: 20, showCount: true, allowClear: true }}
                rules={[{ type: 'string', required: true, message: '请输入网站简称' }]}
            />
            <ProFormText
                hasFeedback
                name={props.list.title?.name}
                label={props.list.title?.description}
                initialValue={props.list.title?.value}
                tooltip={props.list.title?.description}
                getValueFromEvent={e => e.target.value.trim()}
                fieldProps={{ maxLength: 36, showCount: true, allowClear: true }}
                rules={[
                    { required: true, message: '请输入网站首页标题' },
                    { type: 'string', pattern: /^\S{1,35}$/, message: '网站标题超过35个字符搜索引擎会自动隐藏' },
                ]}
            />
            <ProFormText
                hasFeedback
                tooltip="请使用英文逗号分隔关键词"
                name={props.list.keywords?.name}
                label={props.list.keywords?.description}
                initialValue={props.list.keywords?.value}
                fieldProps={{ maxLength: 50, showCount: true, allowClear: true }}
                rules={[
                    { required: true, message: '请输入网站的关键词' },
                    {
                        type: 'string',
                        pattern: /^[^\u2018-\u2027\uff01-\uff0f\uff1a-\uff20\u3002\s]+$/,
                        message: '网站关键词不得使用中文符号或空格分隔',
                    },
                ]}
            />
            <ProFormTextArea
                hasFeedback
                name={props.list.description?.name}
                label={props.list.description?.description}
                initialValue={props.list.description?.value}
                tooltip={props.list.description?.description}
                getValueFromEvent={e => e.target.value.trim()}
                fieldProps={{
                    maxLength: 256,
                    showCount: true,
                    allowClear: true,
                    autoSize: { minRows: 5, maxRows: 8 },
                }}
                rules={[{ type: 'string', required: true, message: '请输入网站的描述' }]}
            />
            <ProFormText
                hasFeedback
                name={props.list.beian?.name}
                label={props.list.beian?.description}
                initialValue={props.list.beian?.value}
                tooltip={props.list.beian?.description}
                fieldProps={{ maxLength: 50, showCount: true, allowClear: true }}
            />
            <ProFormText
                hasFeedback
                name={props.list.copyright?.name}
                label={props.list.copyright?.description}
                initialValue={props.list.copyright?.value}
                tooltip={props.list.copyright?.description}
                fieldProps={{ maxLength: 100, showCount: true, allowClear: true }}
            />
            <ProFormTextArea
                hasFeedback
                name={props.list.notice?.name}
                label={props.list.notice?.description}
                initialValue={props.list.notice?.value}
                tooltip={props.list.notice?.description}
                fieldProps={{
                    maxLength: 500,
                    showCount: true,
                    allowClear: true,
                    autoSize: { minRows: 5, maxRows: 8 },
                }}
            />
            <ProFormTextArea
                hasFeedback
                name={props.list.analytical?.name}
                label={props.list.analytical?.description}
                initialValue={props.list.analytical?.value}
                tooltip={props.list.analytical?.description}
                getValueFromEvent={e => e.target.value.trim()}
                fieldProps={{
                    showCount: true,
                    allowClear: true,
                    autoSize: { minRows: 5, maxRows: 8 },
                }}
            />
        </ProForm>
    );
};
