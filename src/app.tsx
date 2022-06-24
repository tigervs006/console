/** @format */

import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading, SettingDrawer } from '@ant-design/pro-layout';
import { notification } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import type { RequestOptionsInit } from 'umi-request';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
    loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
    settings?: Partial<LayoutSettings>;
    currentUser?: API.CurrentUser;
    loading?: boolean;
    fetchUserInfo?: (params: { id: string }) => Promise<API.CurrentUser | undefined>;
}> {
    const fetchUserInfo = async (params: { id: string }) => {
        try {
            return await queryCurrentUser(params).then(res => res.data?.info);
        } catch (error) {
            history.push(loginPath);
        }
        return undefined;
    };
    // 如果不是登录页面，执行
    if (history.location.pathname !== loginPath) {
        const currentUser = await fetchUserInfo({ id: localStorage.getItem('uid') || '0' });
        return {
            fetchUserInfo,
            currentUser,
            settings: defaultSettings,
        };
    }
    return {
        fetchUserInfo,
        settings: defaultSettings,
    };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
    return {
        rightContentRender: () => <RightContent />,
        disableContentMargin: false,
        waterMarkProps: {
            content: initialState?.currentUser?.name,
        },
        footerRender: () => <Footer />,
        onPageChange: () => {
            const { location } = history;
            // 如果没有登录，重定向到 login
            if (!initialState?.currentUser && location.pathname !== loginPath) {
                history.push(loginPath);
            }
        },
        links: isDev
            ? [
                  <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
                      <LinkOutlined />
                      <span>OpenAPI 文档</span>
                  </Link>,
                  <Link to="/~docs" key="docs">
                      <BookOutlined />
                      <span>业务组件文档</span>
                  </Link>,
              ]
            : [],
        menuHeaderRender: undefined,
        // 自定义 403 页面
        // unAccessible: <div>unAccessible</div>,
        // 增加一个 loading 的状态
        childrenRender: (children, props) => {
            // if (initialState?.loading) return <PageLoading />;
            return (
                <>
                    {children}
                    {!props.location?.pathname?.includes('/login') && (
                        <SettingDrawer
                            disableUrlParams
                            enableDarkTheme
                            settings={initialState?.settings}
                            onSettingChange={settings => {
                                setInitialState(preInitialState => ({
                                    ...preInitialState,
                                    settings,
                                }));
                            }}
                        />
                    )}
                </>
            );
        },
        ...initialState?.settings,
    };
};

// 请求前拦截器
const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
    const accessToken = localStorage.getItem('Authorization');
    const customHeader = { 'Content-Type': 'application/json; charset=utf-8' };
    if (null !== accessToken) Object.assign(customHeader, { Authorization: accessToken });
    return {
        url: '/console' + url,
        options: { ...options, interceptors: true, headers: customHeader },
    };
};

// 响应后拦截器
const ResponseInterceptors = async (response: Response) => {
    const result = await response.clone().json();
    // 如果是Token验证失败则退出
    if (401 === result.status) {
        localStorage.clear();
        history.push(loginPath);
    }
    return response;
};

export const request: RequestConfig = {
    errorHandler: (error: Record<string, any>) => {
        notification.error({
            message: 'Request Error',
            description: error.response?.msg ?? 'Unknow Error, Please check your internet configuration',
        });
    },
    requestInterceptors: [authHeaderInterceptor],
    responseInterceptors: [ResponseInterceptors],
};
