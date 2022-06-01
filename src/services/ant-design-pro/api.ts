import { request } from 'umi';
import { stringify } from 'qs';

/** 获取当前的用户 GET /user */
export async function currentUser(params: { id: string }, options?: Record<string, any>) {
  return request<{
    data: API.CurrentUser;
  }>('/user', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

/** 退出登录接口 POST /public/logout */
export async function outLogin(data: { name: string }, options?: Record<string, any>) {
  return request<Record<string, any>>('/public/logout', {
    method: 'POST',
    data: { ...data },
    ...(options || {}),
  });
}

/** 登录接口 POST /public/login */
export async function login(body: API.LoginParams, options?: Record<string, any>) {
  return request<API.LoginResult>('/public/login', {
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

/** 文件删除 POST /public/remove */
export async function removeFile(data: { filePath: string }) {
  return postData('/public/remove', { ...data });
}

/**
 * GET 方法提交/获取数据
 * @param path 路径
 * @param params 参数
 * @param options options
 */
export async function getData(
  path: string,
  params?: Record<string, any>,
  options?: Record<string, any>,
) {
  return request<Record<string, any>>(path, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
    paramsSerializer: () => stringify(params, { arrayFormat: 'indices' }),
  });
}

/**
 * POST方法提交/获取数据
 * @param path 路径
 * @param data 数据
 * @param options options
 */
export async function postData(
  path: string,
  data: Record<string, any>,
  options?: Record<string, any>,
) {
  return request<Record<string, any>>(path, {
    method: 'POST',
    data: { ...data },
    ...(options || {}),
  });
}
