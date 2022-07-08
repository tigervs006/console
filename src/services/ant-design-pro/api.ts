/** @format */

import { request } from 'umi';
import { stringify } from 'qs';

/** 获取当前用户菜单 GET /auth/list */
export const currentUserMenu = (params: Record<string, any>, options?: Record<string, any>) => {
    return request<Record<string, any>>('/auth/list', {
        method: 'GET',
        params: { ...params },
        ...(options || {}),
    });
};

/** 获取当前的用户 GET /user */
export const currentUser = (params: { id: string }, options?: Record<string, any>) => {
    return request<{ data: API.CurrentUser }>('/user', {
        method: 'GET',
        params: { ...params },
        ...(options || {}),
    });
};

/** 退出登录接口 POST /public/logout */
export const outLogin = (data: { name: string }, options?: Record<string, any>) => {
    return request<Record<string, any>>('/public/logout', {
        method: 'POST',
        data: { ...data },
        ...(options || {}),
    });
};

/** 登录接口 POST /public/login */
export const login = (body: API.LoginParams, options?: Record<string, any>) => {
    return request<API.LoginResult>('/public/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
};

/** 此处后端没有提供注释 GET /api/notices */
export const getNotices = (options?: Record<string, any>) => {
    return request<API.NoticeIconList>('/api/notices', {
        method: 'GET',
        ...(options || {}),
    });
};

/**
 * GET 方法提交/获取数据
 * @param path 路径
 * @param params 参数
 * @param options options
 */
export const getData = (path: string, params?: Record<string, any>, options?: Record<string, any>) => {
    return request<Record<string, any>>(path, {
        method: 'GET',
        params: { ...params },
        ...(options || {}),
        paramsSerializer: () => stringify(params, { arrayFormat: 'indices' }),
    });
};

/**
 * POST方法提交/获取数据
 * @param path 路径
 * @param data 数据
 * @param options options
 */
export const postData = (path: string, data: Record<string, any>, options?: Record<string, any>) => {
    return request<Record<string, any>>(path, {
        method: 'POST',
        data: { ...data },
        ...(options || {}),
    });
};

/** 文件删除 POST /public/remove */
export const removeFile = async (file: { filePath: string }) => await postData('/public/remove', file);
