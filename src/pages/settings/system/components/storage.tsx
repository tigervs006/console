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

import { Divider, Space } from 'antd';
import React, { useRef } from 'react';
import type { ProFormInstance } from '@ant-design/pro-form';
import { FormOutlined, UndoOutlined } from '@ant-design/icons';
import ProForm, { ProFormDependency, ProFormRadio, ProFormText } from '@ant-design/pro-form';

export const StorageSettings: React.FC<{
    list: Record<string, any>;
    handleFinish: (data: Record<string, any>) => Promise<void>;
}> = props => {
    /** 上传类型 */
    const uploadOptions = [
        { label: '本地', value: '1' },
        { label: 'OSS', value: '2' },
        { label: 'COS', value: '3' },
    ];
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
            <ProFormRadio.Group
                label="存储类型"
                options={uploadOptions}
                name={props.list.upload_type?.name}
                tooltip="请根据实际情况选择文件上传类型"
                initialValue={props.list.upload_type?.value}
            />
            <ProFormDependency name={[props.list.upload_type?.name]}>
                {({ upload_type }) => {
                    switch (upload_type) {
                        case '2':
                            return (
                                <>
                                    <ProForm.Item>
                                        <Divider orientation="left">阿里云OSS</Divider>
                                    </ProForm.Item>
                                    <ProFormText
                                        hasFeedback
                                        label="存储桶名"
                                        name={props.list.alioss_bucket?.name}
                                        initialValue={props.list.alioss_bucket?.value}
                                        tooltip={props.list.alioss_bucket?.description}
                                        getValueFromEvent={e => e.target.value.trim()}
                                    />
                                    <ProFormText
                                        hasFeedback
                                        label="节点地域"
                                        name={props.list.alioss_endpoint?.name}
                                        initialValue={props.list.alioss_endpoint?.value}
                                        tooltip={props.list.alioss_endpoint?.description}
                                        getValueFromEvent={e => e.target.value.trim()}
                                    />
                                    <ProFormText
                                        hasFeedback
                                        label="accessKeyId"
                                        name={props.list.alioss_accessKey_id?.name}
                                        initialValue={props.list.alioss_accessKey_id?.value}
                                        tooltip={props.list.alioss_accessKey_id?.description}
                                        getValueFromEvent={e => e.target.value.trim()}
                                    />
                                    <ProFormText
                                        hasFeedback
                                        label="AccessKeySecret"
                                        name={props.list.alioss_accessKey_secret?.name}
                                        initialValue={props.list.alioss_accessKey_secret?.value}
                                        tooltip={props.list.alioss_accessKey_secret?.description}
                                        getValueFromEvent={e => e.target.value.trim()}
                                    />
                                </>
                            );
                        case '3':
                            return (
                                <>
                                    <ProForm.Item>
                                        <Divider orientation="left">腾讯云COS</Divider>
                                    </ProForm.Item>
                                    <ProFormText
                                        hasFeedback
                                        label="存储桶名"
                                        name={props.list.txcos_bucket?.name}
                                        initialValue={props.list.txcos_bucket?.value}
                                        tooltip={props.list.txcos_bucket?.description}
                                        getValueFromEvent={e => e.target.value.trim()}
                                    />
                                    <ProFormText
                                        hasFeedback
                                        label="节点地域"
                                        name={props.list.txcos_region?.name}
                                        initialValue={props.list.txcos_region?.value}
                                        tooltip={props.list.txcos_region?.description}
                                        getValueFromEvent={e => e.target.value.trim()}
                                    />
                                    <ProFormText
                                        hasFeedback
                                        label="accessKeyId"
                                        name={props.list.txcos_secret_id?.name}
                                        initialValue={props.list.txcos_secret_id?.value}
                                        tooltip={props.list.txcos_secret_id?.description}
                                        getValueFromEvent={e => e.target.value.trim()}
                                    />
                                    <ProFormText
                                        hasFeedback
                                        label="AccessKeySecret"
                                        name={props.list.txcos_secret_key?.name}
                                        initialValue={props.list.txcos_secret_key?.value}
                                        tooltip={props.list.txcos_secret_key?.description}
                                        getValueFromEvent={e => e.target.value.trim()}
                                    />
                                </>
                            );
                        default:
                            return null;
                    }
                }}
            </ProFormDependency>
            <ProForm.Item>
                <Divider orientation="left">CDN配置</Divider>
            </ProForm.Item>
            <ProFormText
                hasFeedback
                label="CDN地址"
                name={props.list.uploadUrl?.name}
                initialValue={props.list.uploadUrl?.value}
                tooltip={props.list.uploadUrl?.description}
                getValueFromEvent={e => e.target.value.trim()}
            />
        </ProForm>
    );
};
