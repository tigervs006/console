// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
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
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/**
 * 获取列表
 * @method GET
 * @param path
 * @param params
 * @param options
 */
export async function list(path: string, params?: API.PageParams, options?: Record<string, any>) {
  return request<API.RuleList>(path, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**
 * 更新内容
 * @method POST
 * @param path
 * @param data
 * @param options
 */
export async function update(path: string, data: API.RuleListItem, options?: Record<string, any>) {
  return request<API.RuleListItem>(path, {
    method: 'POST',
    data: { ...data },
    ...(options || {}),
  });
}

/**
 * 新增/编辑
 * @method POST
 * @param path
 * @param data
 * @param options
 */
export async function saveData(
  path: string,
  data: API.RuleListItem,
  options?: Record<string, any>,
) {
  return request<API.RuleListItem>(path, {
    method: 'POST',
    data: { ...data },
    ...(options || {}),
  });
}

/**
 * @method POST
 * @param path
 * @param data
 * @param options
 */
export async function deleteData(
  path: string,
  data: API.RuleListItem,
  options?: Record<string, any>,
) {
  return request<Record<string, any>>(path, {
    method: 'POST',
    data: { ...data },
    ...(options || {}),
  });
}
