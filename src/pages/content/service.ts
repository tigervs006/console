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

import type { articleData } from './data';
import { getData, postData } from '@/services/ant-design-pro/api';

// 获取文档作者
export const getAuthor = () => getData('/article/author');

// 新增/编辑内容
export const saveContent = (data: articleData) => postData('/article/save', data);

// 获取文档列表
export const fetchData = (params: API.PageParams) => getData('/article/list', params);

// 获取文章内容
export const getContent = (params: Record<string, any>) => getData('/article', params);

// 单个/批量删除
export const remove = (data: { id: number | number[] }) => postData('/article/del', data);
