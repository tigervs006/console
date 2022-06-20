/** @format */

import React, { useRef } from 'react';
import { Divider, Button, Space } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-form';
import { FormOutlined, UndoOutlined } from '@ant-design/icons';
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';

export const BaiduSettings: React.FC<{
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
            <ProFormCheckbox.Group
                label="地图类型"
                options={['xml']}
                name={props.list.sitemapType?.name}
                tooltip="网站地图类型，有助于搜索引擎收录"
                initialValue={props.list.sitemapType?.value}
                fieldProps={{
                    value: ['xml'],
                    disabled: true,
                }}
            />
            <ProForm.Item label="网站地图" tooltip="一键生成全站地图">
                <Button type="primary" shape="round" onClick={() => alert('点击了生成网站地图')}>
                    生成地图
                </Button>
            </ProForm.Item>
            <ProFormText
                hasFeedback
                label="百度推送"
                name={props.list.baiduToken?.name}
                initialValue={props.list.baiduToken?.value}
                tooltip={props.list.baiduToken?.description}
                getValueFromEvent={e => e.target.value.trim()}
            />
            <ProForm.Item>
                <Divider orientation="left">百家号</Divider>
            </ProForm.Item>
            <ProFormText
                hasFeedback
                label="百家号ID"
                name={props.list.baijiahao_app_id?.name}
                initialValue={props.list.baijiahao_app_id?.value}
                tooltip={props.list.baijiahao_app_id?.description}
                getValueFromEvent={e => e.target.value.trim()}
            />
            <ProFormText
                hasFeedback
                label="百家号Token"
                name={props.list.baijiahao_app_token?.name}
                initialValue={props.list.baijiahao_app_token?.value}
                tooltip={props.list.baijiahao_app_token?.description}
                getValueFromEvent={e => e.target.value.trim()}
            />
            <ProForm.Item>
                <Divider orientation="left">百家统计</Divider>
            </ProForm.Item>
            <ProFormText
                hasFeedback
                label="网站ID"
                name={props.list.baidutongji_site_id?.name}
                initialValue={props.list.baidutongji_site_id?.value}
                tooltip={props.list.baidutongji_site_id?.description}
                getValueFromEvent={e => e.target.value.trim()}
            />
            <ProFormText
                hasFeedback
                label="用户名"
                name={props.list.baidutongji_username?.name}
                initialValue={props.list.baidutongji_username?.value}
                tooltip={props.list.baidutongji_username?.description}
                getValueFromEvent={e => e.target.value.trim()}
            />
            <ProFormText
                hasFeedback
                label="用户密码"
                name={props.list.baidutongji_password?.name}
                initialValue={props.list.baidutongji_password?.value}
                tooltip={props.list.baidutongji_password?.description}
                getValueFromEvent={e => e.target.value.trim()}
            />
            <ProFormText
                hasFeedback
                label="接口Token"
                name={props.list.baidutongji_token?.name}
                initialValue={props.list.baidutongji_token?.value}
                tooltip={props.list.baidutongji_token?.description}
                getValueFromEvent={e => e.target.value.trim()}
            />
            <ProForm.Item>
                <Divider orientation="left">百度小程序</Divider>
            </ProForm.Item>
            <ProFormText
                hasFeedback
                label="小程序Appid"
                name={props.list.baidusmartprogram_app_id?.name}
                initialValue={props.list.baidusmartprogram_app_id?.value}
                tooltip={props.list.baidusmartprogram_app_id?.description}
                getValueFromEvent={e => e.target.value.trim()}
            />
            <ProFormText
                hasFeedback
                label="小程序Token"
                name={props.list.baidusmartprogram_token?.name}
                initialValue={props.list.baidusmartprogram_token?.value}
                tooltip={props.list.baidusmartprogram_token?.description}
                getValueFromEvent={e => e.target.value.trim()}
            />
            <ProFormText
                hasFeedback
                label="信息流类型"
                name={props.list.baidusmartprogram_mapp_type?.name}
                initialValue={props.list.baidusmartprogram_mapp_type?.value}
                tooltip={props.list.baidusmartprogram_mapp_type?.description}
                getValueFromEvent={e => e.target.value.trim()}
            />
            <ProFormText
                hasFeedback
                label="信息流子类型"
                name={props.list.baidusmartprogram_mapp_sub_type?.name}
                initialValue={props.list.baidusmartprogram_mapp_sub_type?.value}
                tooltip={props.list.baidusmartprogram_mapp_sub_type?.description}
                getValueFromEvent={e => e.target.value.trim()}
            />
            <ProFormText
                hasFeedback
                label="Feed一级分类"
                name={props.list.baidusmartprogram_feed_type?.name}
                initialValue={props.list.baidusmartprogram_feed_type?.value}
                tooltip={props.list.baidusmartprogram_feed_type?.description}
                getValueFromEvent={e => e.target.value.trim()}
            />
            <ProFormText
                hasFeedback
                label="Feed二级分类"
                name={props.list.baidusmartprogram_feed_sub_type?.name}
                initialValue={props.list.baidusmartprogram_feed_sub_type?.value}
                tooltip={props.list.baidusmartprogram_feed_sub_type?.description}
                getValueFromEvent={e => e.target.value.trim()}
            />
        </ProForm>
    );
};
