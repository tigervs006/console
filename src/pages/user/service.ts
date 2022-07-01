/** @format */

import type { menuDataItem, tableDataItem } from '@/pages/user/data';
import { getData, postData } from '@/services/ant-design-pro/api';

// 获取用户列表
export async function fetchData(params: API.PageParams) {
    return getData('/user/list', { ...params });
}

// 新增/编辑用户
export async function saveUser(data: tableDataItem) {
    return postData('/user/save', { ...data });
}

// 单个/批量删除
export async function remove(data: Record<'id', number | number[]>) {
    return postData('/auth/del', { ...data });
}

/* 新增/编辑菜单 */
export async function saveMenu(data: menuDataItem) {
    return postData('/auth/save', { ...data });
}

/* 获取菜单列表 */
export async function fetchMenuData(params: Record<string, any>) {
    return getData('/auth/list', { ...params });
}
