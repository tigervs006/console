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
import { extFileFromUrl } from '@/extra/utils';
import React, { useEffect, useRef } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import { FileSelect } from '@/pages/components/FileSelect';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { FormOutlined, UndoOutlined } from '@ant-design/icons';

export const ContactSettings: React.FC<{
    list: Record<string, any>;
    handleFinish: (data: Record<string, any>) => Promise<void>;
}> = props => {
    const formRef = useRef<ProFormInstance>();
    /* 文件列表 */
    const { setUploadList } = useModel('file', ret => ({
        setUploadList: ret.setUploadList,
    }));
    useEffect(() => {
        setUploadList([
            {
                status: 'done',
                url: props.list.qrcode?.value,
                uid: Math.floor(Math.random() * 100).toString(),
                name: extFileFromUrl(props.list.qrcode?.value ?? '') ?? '',
            },
        ]);
    });
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
            /* 失焦校验数据 */
            validateTrigger={['onBlur']}
            initialValues={{ isCrop: 1 }}
            onFinish={values => props.handleFinish(values)}
        >
            {/*prettier-ignore*/}
            <ProForm.Item
				name="qrcode"
				label="二维码"
				transform={value => (value instanceof Array ? { qrcode: value.at(0) } : { qrcode: value })}
			>
                <FileSelect setFieldValue={(fileList: string[]) => formRef.current?.setFieldValue('qrcode', fileList)} />
            </ProForm.Item>
            <ProFormText
                hasFeedback
                label="QQ号码"
                name={props.list.qq?.name}
                initialValue={props.list.qq?.value}
                tooltip={props.list.qq?.description}
                getValueFromEvent={e => e.target.value.trim()}
            />
            <ProFormText
                hasFeedback
                label="微信号"
                name={props.list.wechat?.name}
                initialValue={props.list.wechat?.value}
                tooltip={props.list.wechat?.description}
                getValueFromEvent={e => e.target.value.trim()}
            />
            <ProFormText
                hasFeedback
                label="手机号"
                name={props.list.telephone?.name}
                initialValue={props.list.telephone?.value}
                tooltip={props.list.telephone?.description}
                getValueFromEvent={e => e.target.value.trim()}
            />
            <ProFormText
                hasFeedback
                label="400电话"
                name={props.list.aftermarket?.name}
                initialValue={props.list.aftermarket?.value}
                tooltip={props.list.aftermarket?.description}
                getValueFromEvent={e => e.target.value.trim()}
            />
            <ProFormText
                hasFeedback
                label="电子邮箱"
                name={props.list.email?.name}
                initialValue={props.list.email?.value}
                tooltip={props.list.email?.description}
                getValueFromEvent={e => e.target.value.trim()}
            />
            <ProFormText
                hasFeedback
                label="联络地址"
                name={props.list.address?.name}
                initialValue={props.list.address?.value}
                tooltip={props.list.address?.description}
                getValueFromEvent={e => e.target.value.trim()}
            />
        </ProForm>
    );
};
