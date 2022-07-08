/** @format */

import type { tableDataItem } from './data';
import { getData, postData } from '@/services/ant-design-pro/api';

// 新增/编辑
export const saveChannel = (data: tableDataItem) => postData('/channel/save', data);

// 栏目列表
export const fetchData = (params: API.PageParams) => getData('/channel/list', params);

// 单个/批量删除
export const remove = (data: Record<'id', number | number[]>) => postData('/channel/del', data);
