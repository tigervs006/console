/** @format */

import type { tableDataItem } from './data';
import { getData, postData } from '@/services/ant-design-pro/api';

// 新增/编辑用户
export const saveClient = (data: tableDataItem) => postData('/client/save', data);

// 获取用户列表
export const fetchData = (params: API.PageParams) => getData('/client/list', params);

// 单个/批量删除
export const remove = (data: Record<'id', number | number[]>) => postData('/client/del', data);
