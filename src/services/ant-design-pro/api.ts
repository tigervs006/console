import { request } from 'umi';
import { stringify } from 'qs';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: Record<string, any>) {
  return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: Record<string, any>) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: Record<string, any>) {
  return request<API.LoginResult>('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: Record<string, any>) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/**
 * POST方法提交/获取数据
 * @param path 路径
 * @param data 数据
 * @param options options
 */
export async function postData(path: string, data: Record<string, any>, options?: Record<string, any>) {
  return request<Record<string, any>>(path, {
    method: 'POST',
    data: { ...data },
    ...(options || {})
  })
}

/**
 * GET 方法提交/获取数据
 * @param path 路径
 * @param params 参数
 * @param options options
 */
export async function getData(path: string, params?: Record<string, any>, options?: Record<string, any>) {
  return request<Record<string, any>>(path, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
    // eslint-disable-next-line @typescript-eslint/no-shadow
    paramsSerializer: (params) => stringify(params, { arrayFormat: 'indices' })
  })
}
