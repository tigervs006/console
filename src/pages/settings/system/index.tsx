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

import { message, Tabs } from 'antd';
import { list, saveConfig } from '../service';
import { SiteSettings } from './components/site';
import { CoreSettings } from './components/core';
import { useLayoutEffect, useState } from 'react';
import { BaiduSettings } from './components/baidu';
import { useAccess, useRequest, useIntl } from 'umi';
import { StorageSettings } from './components/storage';
import { ContactSettings } from './components/contact';
import { PageContainer } from '@ant-design/pro-layout';
import { MailSettings } from '@/pages/settings/system/components/mail';

export default () => {
    const intl = useIntl();
    const access = useAccess();
    /* Tab布局 */
    type TabPosition = 'top' | 'left';
    /* 设置布局方式 */
    const [position, setPosition] = useState<TabPosition>(() => {
        return 768 > innerWidth ? 'top' : 'left';
    });
    /* 设置系统配置项 */
    const [settings, setSettings] = useState<Record<string, any>[]>([]);

    /* 更新配置项 */
    const handleFinish = async (data: Record<string, any>) => {
        const post = [];
        // eslint-disable-next-line
        for (const idx in settings) {
            for (const i in data) {
                if (i === idx) {
                    post.push({ id: settings[idx].id, value: data[i] });
                }
            }
        }
        await saveConfig(post).then(res => {
            res?.success && message.success(res.msg);
        });
    };

    /* tab菜单列表 */
    const tabItem = [
        {
            key: '1',
            mark: 'settings_website_btn',
            label: intl.formatMessage({ id: 'pages.settings.website' }),
            children: <SiteSettings list={settings} handleFinish={data => handleFinish(data)} />,
        },
        {
            key: '2',
            mark: 'settings_baidu_btn',
            label: intl.formatMessage({ id: 'pages.settings.baidu' }),
            children: <BaiduSettings list={settings} handleFinish={data => handleFinish(data)} />,
        },
        {
            key: '3',
            mark: 'settings_storage_btn',
            label: intl.formatMessage({ id: 'pages.settings.storage' }),
            children: <StorageSettings list={settings} handleFinish={data => handleFinish(data)} />,
        },
        {
            key: '4',
            mark: 'settings_contact_btn',
            label: intl.formatMessage({ id: 'pages.settings.contact' }),
            children: <ContactSettings list={settings} handleFinish={data => handleFinish(data)} />,
        },
        {
            key: '5',
            mark: 'settings_email_btn',
            label: intl.formatMessage({ id: 'pages.settings.email' }),
            children: <MailSettings list={settings} handleFinish={data => handleFinish(data)} />,
        },
        {
            key: '6',
            mark: 'settings_core_btn',
            label: intl.formatMessage({ id: 'pages.settings.core' }),
            children: <CoreSettings list={settings} handleFinish={data => handleFinish(data)} />,
        },
    ];

    /* 设置tab模式 */
    const setTabMode = (resize: number) => {
        requestAnimationFrame(() => {
            768 > resize ? setPosition('top') : setPosition('left');
        });
    };

    /* 监听窗口变化 */
    useLayoutEffect(() => {
        window.addEventListener('resize', () => setTabMode(window.innerWidth));
        return () => window.removeEventListener('resize', () => setTabMode(window.innerWidth));
    });

    /* 获取系统配置项 */
    const { run } = useRequest(list, { defaultParams: [{ type: '1' }], onSuccess: res => setSettings(res?.list) });

    return (
        <PageContainer>
            <Tabs tabPosition={position} onTabClick={key => run({ type: key })} items={tabItem.filter(item => access.btnFilter(item.mark))} />
        </PageContainer>
    );
};
