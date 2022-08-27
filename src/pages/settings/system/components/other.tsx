/** @format */

import React from 'react';
import { Divider, Space } from 'antd';
import type { SliderMarks } from 'antd/lib/slider';
import { FormOutlined, UndoOutlined } from '@ant-design/icons';
import ProForm, { ProFormSlider, ProFormSwitch, ProFormText } from '@ant-design/pro-form';

export const OtherSettings: React.FC<{
    list: Record<string, any>;
    handleFinish: (data: Record<string, any>) => Promise<void>;
}> = props => {
    const marks: SliderMarks = {
        1: '1小时',
        12: '12小时',
        24: '24小时',
        48: {
            style: {
                color: '#f50',
            },
            label: <b>48小时</b>,
        },
    };
    return (
        <ProForm
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
                fieldProps={{
                    readOnly: true,
                    onFocus: e => e.target.removeAttribute('readonly'),
                    onBlur: e => e.target.setAttribute('readonly', 'true'),
                }}
                name={props.list.keydata_password?.name}
                getValueFromEvent={e => e.target.value.trim()}
                initialValue={props.list.keydata_password?.value}
                tooltip={props.list.keydata_password?.description}
            />
            <ProFormText.Password
                hasFeedback
                label="加密因子"
                fieldProps={{
                    readOnly: true,
                    onFocus: e => e.target.removeAttribute('readonly'),
                    onBlur: e => e.target.setAttribute('readonly', 'true'),
                }}
                name={props.list.keydata_encryption?.name}
                getValueFromEvent={e => e.target.value.trim()}
                initialValue={props.list.keydata_encryption?.value}
                tooltip={props.list.keydata_encryption?.description}
            />
            <ProForm.Item>
                <Divider orientation="left">系统安全</Divider>
            </ProForm.Item>
            <ProFormSwitch
                label="DEBUG"
                name={props.list.app_debug?.name}
                tooltip={props.list.app_debug?.description}
                transform={value => ({ app_debug: value ? 1 : 0 })}
                initialValue={!!Number(props.list.app_debug?.value)}
                fieldProps={{ checkedChildren: '启用', unCheckedChildren: '禁用' }}
            />
            <ProFormSwitch
                label="Token认证"
                name={props.list.access_token_check?.name}
                tooltip={props.list.access_token_check?.description}
                transform={value => ({ access_token_check: value ? 1 : 0 })}
                initialValue={!!Number(props.list.access_token_check?.value)}
                fieldProps={{ checkedChildren: '启用', unCheckedChildren: '禁用' }}
            />
            <ProFormText.Password
                hasFeedback
                label="安全密码"
                name={props.list.secret_code?.name}
                initialValue={props.list.secret_code?.value}
                tooltip={props.list.secret_code?.description}
                getValueFromEvent={e => e.target.value.trim()}
                fieldProps={{
                    readOnly: true,
                    onFocus: e => e.target.removeAttribute('readonly'),
                    onBlur: e => e.target.setAttribute('readonly', 'true'),
                }}
            />
            <ProFormSlider
                min={1}
                max={48}
                marks={marks}
                label="Token时效"
                name={props.list.token_expire_time?.name}
                initialValue={props.list.token_expire_time?.value}
                tooltip={props.list.token_expire_time?.description}
                fieldProps={{
                    tooltipVisible: true,
                    tipFormatter: value => `${value} 小时`,
                }}
                convertValue={value => {
                    if ('string' === typeof value) {
                        return value.match(/\d+/);
                    }
                    return value;
                }}
                transform={value => {
                    if ('number' === typeof value) {
                        return { token_expire_time: `+${value} hour` };
                    }
                    return { token_expire_time: value };
                }}
            />
        </ProForm>
    );
};
