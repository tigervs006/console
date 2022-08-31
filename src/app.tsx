/** @format */

import { history } from 'umi';
import Footer from '@/components/Footer';
import { sortDesc } from '@/extra/utils';
import { message, Button, Result } from 'antd';
import { loopMenuItem } from './extra/iconsMap';
import RightContent from '@/components/RightContent';
import type { RequestOptionsInit } from 'umi-request';
import defaultSettings from '../config/defaultSettings';
import type { MenuDataItem } from '@ant-design/pro-layout';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { PageLoading, SettingDrawer } from '@ant-design/pro-layout';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { currentUser as queryCurrentUser, currentUserMenu as queryUserMenu } from './services/ant-design-pro/api';

const loginPath: string = '/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
    loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
    userMenuItem?: MenuDataItem[];
    currentUser?: API.CurrentUser;
    settings?: Partial<LayoutSettings>;
}> {
    /* 判断登录状态 */
    const isLogin: boolean = !!localStorage?.getItem('uid');
    /* 获取当前UID */
    const uid: string = localStorage?.getItem('uid') ?? '0';
    /* 获取当前用户信息 */
    const fetchUserInfo = async (params: { id: string }) => await queryCurrentUser(params).then(res => res?.data?.info);
    /* 获取当前用户菜单 */
    const fetchUserMenu = async () => await queryUserMenu().then(res => res?.data?.list.sort(sortDesc('sort')));
    return {
        settings: defaultSettings,
        userMenuItem: isLogin ? await fetchUserMenu() : undefined,
        currentUser: isLogin ? await fetchUserInfo({ id: uid }) : undefined,
    };
}

/* 设置全局layout */
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
    return {
        ...initialState?.settings,
        footerRender: () => <Footer />,
        rightContentRender: () => <RightContent />,
        waterMarkProps: {
            content: initialState?.currentUser?.name,
        },
        onPageChange: () => {
            const { location } = history;
            /* 如果没有登录，重定向到 login */
            if (!initialState?.currentUser && loginPath !== location.pathname) {
                history.push(loginPath);
            }
        },
        menuDataRender: () => loopMenuItem(initialState?.userMenuItem ?? []),
        /* 自定义 403 页面 */
        unAccessible: (
            <Result
                status="403"
                title="Access Denied"
                subTitle="You are not authorized to access this page"
                extra={
                    <Button shape="round" type="primary" onClick={() => history.push('/dashboard/analysis')} danger>
                        Back Home
                    </Button>
                }
            />
        ),
        /* 增加一个 loading 的状态 */
        childrenRender: (children, props) => {
            return (
                <>
                    {children}
                    {!props.location?.pathname?.includes('/login') && (
                        <SettingDrawer
                            enableDarkTheme
                            disableUrlParams
                            settings={initialState?.settings}
                            onSettingChange={settings => {
                                setInitialState!(preInitialState => ({
                                    ...preInitialState,
                                    settings,
                                }));
                            }}
                        />
                    )}
                </>
            );
        },
    };
};

/* 请求前拦截器 */
const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
    return {
        url: url,
        options: {
            ...options,
            interceptors: true,
            headers: {
                Authorization: localStorage.getItem?.('Authorization') ?? '',
            },
        },
    };
};

/* 响应后拦截器 */
const ResponseInterceptors = async (response: Response) => {
    const result = await response.clone().json();
    if (401 === result.status) {
        localStorage.clear();
        history.push(loginPath);
    }
    return response;
};

export const request: RequestConfig = {
    prefix: '/console',
    errorHandler: (error: Record<string, any>) => {
        // prettier-ignore
        message.error!(error.response?.msg
			?? 'Server Error, Please check the server configuration');
    },
    requestInterceptors: [authHeaderInterceptor],
    responseInterceptors: [ResponseInterceptors],
};
