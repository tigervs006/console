/** @format */

import { getData, postData } from '@/services/ant-design-pro/api';
/** 新增/编辑友链 */
export const saveLink = (data: Record<string, any>) => postData('/link/save', data);

/** 获取友链列表 */
export const fetchLink = (params: Record<string, any>) => getData('/link/list', params);

/** 单个/批量删除 */
export const removeLink = (data: Record<'id', number | number[]>) => postData('/link/del', data);
