/** @format */

import type { tableDataItem } from './data';
import { getData, postData } from '@/services/ant-design-pro/api';

// 获取用户列表
export async function fetchData(params: API.PageParams) {
    return getData('/client/list', { ...params });
}

// 新增/编辑用户
export async function saveClient(data: tableDataItem) {
    return postData('/client/save', { ...data });
}

// 单个/批量删除
export async function remove(data: Record<'id', number | number[]>) {
    return postData('/client/del', { ...data });
}
