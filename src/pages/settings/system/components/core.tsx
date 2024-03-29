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

import React from 'react';
import { Divider, Space, Row, Col } from 'antd';
import type { SliderMarks } from 'antd/lib/slider';
import { FormOutlined, UndoOutlined } from '@ant-design/icons';
import ProForm, { ProFormSlider, ProFormSwitch, ProFormText } from '@ant-design/pro-form';

export const CoreSettings: React.FC<{
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
    const markDays: SliderMarks = {
        1: '1天',
        3: '3天',
        7: '一周',
        15: '半个月',
        30: {
            style: {
                color: '#f50',
            },
            label: <b>一个月</b>,
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
                <Divider orientation="left">系统安全</Divider>
            </ProForm.Item>
            <Row>
                <Col xs={12} sm={12} lg={6}>
                    <ProFormSwitch
                        label="DEBUG"
                        name={props.list.app_debug?.name}
                        tooltip={props.list.app_debug?.description}
                        transform={value => ({ app_debug: value ? 1 : 0 })}
                        initialValue={Number(props.list.app_debug?.value)}
                        fieldProps={{ checkedChildren: '启用', unCheckedChildren: '禁用' }}
                    />
                </Col>
                <Col xs={12} sm={12} lg={6}>
                    <ProFormSwitch
                        label="错误日志"
                        name={props.list.record_action_log?.name}
                        tooltip={props.list.record_action_log?.description}
                        transform={value => ({ record_action_log: value ? 1 : 0 })}
                        initialValue={Number(props.list.record_action_log?.value)}
                        fieldProps={{ checkedChildren: '启用', unCheckedChildren: '禁用' }}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={12} lg={6}>
                    <ProFormSwitch
                        label="权限认证"
                        name={props.list.user_auth_check?.name}
                        tooltip={props.list.user_auth_check?.description}
                        transform={value => ({ user_auth_check: value ? 1 : 0 })}
                        initialValue={Number(props.list.user_auth_check?.value)}
                        fieldProps={{ checkedChildren: '启用', unCheckedChildren: '禁用' }}
                    />
                </Col>
                <Col xs={12} sm={12} lg={6}>
                    <ProFormSwitch
                        label="令牌认证"
                        name={props.list.access_token_check?.name}
                        tooltip={props.list.access_token_check?.description}
                        transform={value => ({ access_token_check: value ? 1 : 0 })}
                        initialValue={Number(props.list.access_token_check?.value)}
                        fieldProps={{ checkedChildren: '启用', unCheckedChildren: '禁用' }}
                    />
                </Col>
            </Row>
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
                label="Access_token时效"
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
            <ProFormSlider
                min={1}
                max={30}
                marks={markDays}
                label="Refresh_token时效"
                name={props.list.refresh_token_expire_time?.name}
                initialValue={props.list.refresh_token_expire_time?.value}
                tooltip={props.list.refresh_token_expire_time?.description}
                fieldProps={{
                    tooltipVisible: true,
                    tipFormatter: value => `${value} 天`,
                }}
                convertValue={value => {
                    if ('string' === typeof value) {
                        return value.match(/\d+/);
                    }
                    return value;
                }}
                transform={value => {
                    if ('number' === typeof value) {
                        return { refresh_token_expire_time: `+${value} day` };
                    }
                    return { refresh_token_expire_time: value };
                }}
            />
        </ProForm>
    );
};
