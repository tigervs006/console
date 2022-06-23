/** @format */

import { useRequest } from 'umi';
import { message, Tabs } from 'antd';
import { list, saveConfig } from './service';
import { ApiSettings } from './components/cloud';
import { SiteSettings } from './components/site';
import { useLayoutEffect, useState } from 'react';
import { BaiduSettings } from './components/baidu';
import { OtherSettings } from './components/other';
import { ContactSettings } from './components/contact';
import { PageContainer } from '@ant-design/pro-layout';
import { MailSettings } from '@/pages/settings/components/mail';

export default () => {
    const { TabPane } = Tabs;
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
        { key: '1', pane: '网站配置' },
        { key: '2', pane: '百度配置' },
        { key: '3', pane: '接口配置' },
        { key: '4', pane: '联络方式' },
        { key: '5', pane: '邮件配置' },
        { key: '6', pane: '其它配置' },
    ];

    /** 设置tab模式 */
    const setTabMode = (resize: number) => {
        requestAnimationFrame(() => {
            // eslint-disable-next-line
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
        await saveConfig(post).then(res => message.success(res?.msg));
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
                return <OtherSettings list={settings} handleFinish={data => handleFinish(data)} />;
            default:
                return null;
        }
    };

    return (
        <PageContainer>
            <Tabs tabPosition={position} onTabClick={key => run({ type: key })}>
                {tabItem.map(item => (
                    <TabPane key={item.key} tab={item.pane}>
                        {renderView(item.key)}
                    </TabPane>
                ))}
            </Tabs>
        </PageContainer>
    );
};
