/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import Footer from '@/components/Footer';
import { sortDesc } from '@/extra/utils';
import { message, Button, Result } from 'antd';
import { loopMenuItem } from './extra/iconsMap';
import RightContent from '@/components/RightContent';
import type { RequestOptionsInit } from 'umi-request';
import defaultSettings from '../config/defaultSettings';
import { request as umiRequest, history, Link } from 'umi';
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
        breadcrumbProps: {
            itemRender: route => {
                const current = history.location.pathname;
                // prettier-ignore
                return current === route.path
					? route.breadcrumbName
					: <Link to={route.path}>{route.breadcrumbName}</Link>
            },
        },
        breadcrumbRender: routers => {
            return [{ breadcrumbName: '首页', path: '/' }].concat(routers ?? []);
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

/* 是否正在请求 */
let isPending = false;
/* 正在等待的请求 */
const _cacheRequest: (() => void)[] = [];
const authHeaderInterceptor: any = (url: string, options: RequestOptionsInit) => {
    /* 如果是登录，不做处理 */
    if (url === '/console/public/login') {
        return {
            url: url,
            options: options,
        };
    }
    /* 如果是刷新，不做处理且跳过默认的异常处理 */
    if (url === '/console/public/refresh_token') {
        return {
            url: url,
            options: { ...options, skipErrorHandler: true },
        };
    }
    const accessToken = localStorage?.getItem('access_token') ?? '';
    const refreshToken = localStorage?.getItem('refresh_token') ?? '';
    const expiresAt: number = Number(localStorage?.getItem('expiresAt') ?? 0);
    if (accessToken && refreshToken) {
        const nowTime: number = new Date().getTime();
        const authHeader = { Authorization: accessToken };
        /* access_token过期 */
        if (nowTime >= expiresAt) {
            if (!isPending) {
                isPending = true;
                if (refreshToken) {
                    /* 调用refresh_token */
                    umiRequest('/public/refresh_token', { method: 'post', headers: authHeader, data: { refresh_token: refreshToken } })
                        .then(res => {
                            const { success, data } = res;
                            if (success && data) {
                                const localItem = [
                                    { uid: data?.info?.uid },
                                    { gid: data?.info?.gid },
                                    { user: data?.info?.name },
                                    { refresh_token: refreshToken },
                                    { expiresAt: data?.info?.expiresAt },
                                    { access_token: data?.info?.access_token },
                                ];
                                /* 写入localStorage */
                                localItem.forEach(item => {
                                    for (const idx in item) {
                                        localStorage.setItem(idx, item[idx]);
                                    }
                                });
                            }
                        })
                        .finally(() => {
                            /* 正在请求的队列 */
                            isPending = false;
                            _cacheRequest.map(req => req());
                        });
                }
            }
            /* 刷新token返回结果后再resolve */
            return new Promise(resolve => {
                _cacheRequest.push(() => {
                    /* 添加请求头 */
                    resolve({
                        url: `${url}`,
                        options: {
                            ...options,
                            interceptors: true,
                            headers: { Authorization: localStorage?.getItem('access_token') ?? '' },
                        },
                    });
                });
            });
        }
    }
    return {
        url: url,
        options: { ...options, interceptors: true, headers: { Authorization: accessToken } },
    };
};

/* 响应后拦截器 */
const ResponseInterceptors = async (response: Response) => {
    const result = await response.clone().json();
    if (401 == result.status) {
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
