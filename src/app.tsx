import { notification } from 'antd';
import { history, Link } from 'umi';
import Footer from '@/components/Footer';
import { PageLoading } from '@ant-design/pro-layout';
import RightContent from '@/components/RightContent';
import type { RequestOptionsInit } from 'umi-request';
import { SettingDrawer } from '@ant-design/pro-layout';
import defaultSettings from '../config/defaultSettings';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const prefix = '/console';

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
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
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
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
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
  const token = localStorage.getItem('token');
  const customHeader = { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' };
  if (null !== token) Object.assign(customHeader, { Authorization: `Bearer ${token}` });
  return {
    url: prefix + url,
    options: { ...options, interceptors: true, headers: customHeader, requestType: 'form' },
  };
};

// 响应后拦截器
const ResponseInterceptors = async (response: Response) => {
  const result = await response.clone().json();
  // 登录失败返回登录页
  if (403 == result.status) history.push(loginPath);
  return response;
};

export const request: RequestConfig = {
  errorHandler: (error: Record<string, any>) => {
    if (error.response) {
      notification.error({
        message: error.response.msg,
        description: error.response.data.message || error.response.msg
      })
    } else {
      console.log('error', error.message);
    }
  },
  // @ts-ignore
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [ResponseInterceptors]
};
