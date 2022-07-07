/** @format */

import { notification } from 'antd';
import { history, Link } from 'umi';
import Footer from '@/components/Footer';
import { sortDesc } from '@/extra/utils';
import { loopMenuItem } from './extra/iconsMap';
import RightContent from '@/components/RightContent';
import type { RequestOptionsInit } from 'umi-request';
import defaultSettings from '../config/defaultSettings';
import type { MenuDataItem } from '@ant-design/pro-layout';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import { PageLoading, SettingDrawer } from '@ant-design/pro-layout';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { currentUser as queryCurrentUser, currentUserMenu as queryUserMenu } from './services/ant-design-pro/api';

const loginPath: string = '/login';
const isDev = process.env.NODE_ENV === 'development';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
    loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
    loading?: boolean;
    isLoginPage?: boolean;
    useMenuItem?: MenuDataItem[];
    currentUser?: API.CurrentUser;
    settings?: Partial<LayoutSettings>;
}> {
    /* 判断是否为登录页 */
    const isLogin: boolean = loginPath === history.location.pathname;
    /* 获取当前用户信息 */
    const fetchUserInfo = async (params: { id: string }) => await queryCurrentUser(params).then(res => res.data?.info);
    /* 获取当前用户菜单 */
    const fetchUserMenu = async (params: { id: string; status: number }) =>
        await queryUserMenu(params).then(res => {
			return res?.data?.list.sort(sortDesc('sort'));
		});
	return {
		isLoginPage: isLogin,
		settings: defaultSettings,
		currentUser: isLogin ? undefined : await fetchUserInfo({id: localStorage.getItem('uid') || '0'}),
		useMenuItem: isLogin ? [] : await fetchUserMenu({id: localStorage.getItem('uid') || '0', status: 1}),
	};
}

/* 监听路由变化 */
export function onRouteChange({location}: { location: Record<string, any> }) {
	switch (location.pathname) {
		case '/':
			history.push('/dashboard/analysis')
			break;
		case '/dashboard':
			history.push('/dashboard/analysis')
			break;
		case '/content':
			history.push('/content/list')
			break;
		case '/user':
			history.push('/user/list')
			break;
		default:
	}
}

/* 设置全局layout */
export const layout: RunTimeLayoutConfig = ({initialState, setInitialState}) => {
	if (initialState?.isLoginPage) {
		return {
			menuRender: false,
			headerRender: false,
		};
	}
	return {
		rightContentRender: () => <RightContent/>,
		disableContentMargin: false,
        waterMarkProps: {
            content: initialState?.currentUser?.name,
        },
        footerRender: () => <Footer />,
        onPageChange: () => {
            const { location } = history;
            /* 如果没有登录，重定向到 login */
            if (!initialState?.currentUser && loginPath !== location.pathname) {
                setInitialState(s => ({
                    ...s,
                    isLoginPage: true,
                })).then(() => {
                    history.push(loginPath);
                });
            }
        },
        menuDataRender: () => loopMenuItem(initialState?.useMenuItem ?? []),
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
        /* 自定义 403 页面 */
        unAccessible: <div>unAccessible</div>,
        /* 增加一个 loading 的状态 */
        childrenRender: (children, props) => {
            return (
                <>
                    {children}
                    {!props.location?.pathname?.includes('/login') && (
                        <SettingDrawer
                            disableUrlParams
                            enableDarkTheme
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
        ...initialState?.settings,
    };
};

/* 请求前拦截器 */
const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
    const accessToken = localStorage.getItem('Authorization');
    const customHeader = { 'Content-Type': 'application/json; charset=utf-8' };
    if (null !== accessToken) Object.assign(customHeader, { Authorization: accessToken });
    return {
        url: '/console' + url,
        options: { ...options, interceptors: true, headers: customHeader },
    };
};

/* 响应后拦截器 */
const ResponseInterceptors = async (response: Response) => {
    const result = await response.clone().json();
	/* Token验证失败跳转登录 */
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
