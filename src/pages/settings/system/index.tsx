/** @format */

import { message, Tabs } from 'antd';
import { list, saveConfig } from '../service';
import { ApiSettings } from './components/cloud';
import { SiteSettings } from './components/site';
import { CoreSettings } from './components/core';
import { useLayoutEffect, useState } from 'react';
import { BaiduSettings } from './components/baidu';
import { useAccess, useRequest, useIntl } from 'umi';
import { ContactSettings } from './components/contact';
import { PageContainer } from '@ant-design/pro-layout';
import { MailSettings } from '@/pages/settings/system/components/mail';

export default () => {
    const intl = useIntl();
    const { TabPane } = Tabs;
    const access = useAccess();
    // Tab布局
    type TabPosition = 'top' | 'left';
    // 设置布局方式
    const [position, setPosition] = useState<TabPosition>(() => {
        return 768 > innerWidth ? 'top' : 'left';
    });
    // 设置系统配置项
    const [settings, setSettings] = useState<Record<string, any>[]>([]);

    /** tab菜单列表 */
    const tabItem: Record<string, string>[] = [
        { key: '1', mark: 'settings_website_btn', pane: intl.formatMessage({ id: 'pages.settings.website' }) },
        { key: '2', mark: 'settings_baidu_btn', pane: intl.formatMessage({ id: 'pages.settings.baidu' }) },
        { key: '3', mark: 'settings_storage_btn', pane: intl.formatMessage({ id: 'pages.settings.storage' }) },
        { key: '4', mark: 'settings_contact_btn', pane: intl.formatMessage({ id: 'pages.settings.contact' }) },
        { key: '5', mark: 'settings_email_btn', pane: intl.formatMessage({ id: 'pages.settings.email' }) },
        { key: '6', mark: 'settings_other_btn', pane: intl.formatMessage({ id: 'pages.settings.other' }) },
    ];

    /** 设置tab模式 */
    const setTabMode = (resize: number) => {
        requestAnimationFrame(() => {
            768 > resize ? setPosition('top') : setPosition('left');
        });
    };

    /** 更新配置项 */
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
            res?.msg && message.success(res.msg);
        });
    };

    /** 监听窗口变化 */
    useLayoutEffect(() => {
        window.addEventListener('resize', () => setTabMode(window.innerWidth));
        return () => window.removeEventListener('resize', () => setTabMode(window.innerWidth));
    });

    /** 获取系统配置项 */
    const { run } = useRequest(list, { defaultParams: [{ type: '1' }], onSuccess: res => setSettings(res?.list) });

    /** 根据key渲染表单 */
    const renderView = (key: string) => {
        switch (key) {
            case '1':
                return <SiteSettings list={settings} handleFinish={data => handleFinish(data)} />;
            case '2':
                return <BaiduSettings list={settings} handleFinish={data => handleFinish(data)} />;
            case '3':
                return <ApiSettings list={settings} handleFinish={data => handleFinish(data)} />;
            case '4':
                return <ContactSettings list={settings} handleFinish={data => handleFinish(data)} />;
            case '5':
                return <MailSettings list={settings} handleFinish={data => handleFinish(data)} />;
            case '6':
                return <CoreSettings list={settings} handleFinish={data => handleFinish(data)} />;
            default:
                return null;
        }
    };

    return (
        <PageContainer>
            <Tabs tabPosition={position} onTabClick={key => run({ type: key })}>
                {tabItem.map(
                    item =>
                        access.btnFilter(item.mark) && (
                            <TabPane key={item.key} tab={item.pane}>
                                {renderView(item.key)}
                            </TabPane>
                        ),
                )}
            </Tabs>
        </PageContainer>
    );
};
