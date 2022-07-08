/** @format */

import { getData, postData } from '@/services/ant-design-pro/api';
import type { groupDataItem, menuDataItem, tableDataItem } from './data';

/* 新增/编辑用户 */
export const saveUser = (data: tableDataItem) => postData('/user/save', data);

/* 获取用户列表 */
export const fetchData = (params: API.PageParams) => getData('/user/list', params);

/* 单个/批量删除 */
export const remove = (data: Record<'id', number | number[]>) => postData('/auth/del', data);

/* 新增/编辑菜单 */
export const saveMenu = (data: menuDataItem) => postData('/auth/save', data);

/* 获取菜单列表 */
export const fetchMenuData = (params: Record<string, any>) => getData('/auth/list', params);

/* 新增/编辑菜单 */
export const saveGroup = (data: groupDataItem) => postData('/group/save', data);

/* 获取用户组列表 */
export const fetchGroupData = (params: Record<string, any>) => getData('/group/list', params);

/* 单个/批量删除用户组 */
export const removeGroup = (data: Record<'id', number | number[]>) => postData('/group/del', data);
