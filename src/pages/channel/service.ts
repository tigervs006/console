/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

/** @format */

import type { moduleDataItem, tableDataItem } from './data';
import { getData, postData } from '@/services/ant-design-pro/api';

// 新增/编辑栏目
export const saveChannel = (data: tableDataItem) => postData('/channel/save', data);

// 获取栏目列表
export const fetchData = (params: API.PageParams) => getData('/channel/list', params);

//获取指定分类的栏目
export const getCate = (params: { nid: number }) => getData('/channel/cate', params);

// 单个/批量删除栏目
export const remove = (data: Record<'id', number | number[]>) => postData('/channel/del', data);

// 新增/编辑栏目
export const saveModule = (data: moduleDataItem) => postData('/module/save', data);

// 获取栏目列表
export const fetchModule = (params: API.PageParams) => getData('/module/list', params);

// 单个/批量删除栏目
export const removeModule = (data: Record<'id', number | number[]>) => postData('/module/del', data);
