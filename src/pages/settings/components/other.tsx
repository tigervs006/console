/** @format */

import md5 from 'md5';
import { Divider, Space } from 'antd';
import React, { useRef } from 'react';
import type { SliderMarks } from 'antd/lib/slider';
import type { ProFormInstance } from '@ant-design/pro-form';
import { FormOutlined, UndoOutlined } from '@ant-design/icons';
import ProForm, { ProFormSlider, ProFormSwitch, ProFormText } from '@ant-design/pro-form';

export const OtherSettings: React.FC<{
    list: Record<string, any>;
    handleFinish: (data: Record<string, any>) => Promise<void>;
}> = props => {
    const formRef = useRef<ProFormInstance>();
    const marks: SliderMarks = {
        1: '1小时',
        12: '12小时',
        24: '24小时',
        48: {
            style: {
                color: '#f50',
            },
            label: <strong>48小时</strong>,
        },
    };
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
            <ProForm.Item>
                <Divider orientation="left">简数采集</Divider>
            </ProForm.Item>
            <ProFormText.Password
                hasFeedback
                label="采集密码"
                fieldProps={{ readOnly: true }}
                name={props.list.keydata_password?.name}
                getValueFromEvent={e => e.target.value.trim()}
                initialValue={props.list.keydata_password?.value}
                tooltip={props.list.keydata_password?.description}
                transform={value => ({ keydata_password: md5(value) })}
            />
            <ProFormText.Password
                hasFeedback
                label="加密因子"
                fieldProps={{ readOnly: true }}
                name={props.list.keydata_encryption?.name}
                getValueFromEvent={e => e.target.value.trim()}
                initialValue={props.list.keydata_encryption?.value}
                tooltip={props.list.keydata_encryption?.description}
            />
            <ProForm.Item>
                <Divider orientation="left">系统安全</Divider>
            </ProForm.Item>
            <ProFormSwitch
                label="Token认证"
                name={props.list.accessTokenCheck?.name}
                tooltip={props.list.accessTokenCheck?.description}
                initialValue={!!Number(props.list.accessTokenCheck?.value)}
                fieldProps={{
                    checkedChildren: '启用',
                    unCheckedChildren: '禁用',
                }}
            />
            <ProFormText.Password
                hasFeedback
                label="安全密码"
                name={props.list.delcode?.name}
                initialValue={props.list.delcode?.value}
                tooltip={props.list.delcode?.description}
                transform={value => ({ delcode: md5(value) })}
                getValueFromEvent={e => e.target.value.trim()}
            />
            <ProFormSlider
                label="Token时效"
                name={props.list.tokenExpireTime?.name}
                initialValue={props.list.tokenExpireTime?.value}
                tooltip={props.list.tokenExpireTime?.description}
                fieldProps={{
                    min: 1,
                    max: 48,
                    marks: marks,
                    tooltipVisible: true,
                    tipFormatter: value => `${value} 小时`,
                }}
                convertValue={value => {
                    if ('string' === typeof value) {
                        return value.match(/\d+/);
                    }
                    return value;
                }}
                transform={value => ({ tokenExpireTime: `+${value} hour` })}
            />
        </ProForm>
    );
};
