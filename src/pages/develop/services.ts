/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import { postData, getData } from '@/services/ant-design-pro/api';
import type { configCateDataItem, configListDataItem, groupDataItem } from './data';

/** 保存组合数据列表 */
export const saveGroup = (data: groupDataItem) => postData('/develop/group/save', data);

/** 组合数据列表信息 */
export const groupInfo = (params: { id?: string }) => getData('/develop/group/info', params);

/** 处理删除组合数据 */
export const groupDelete = (data: { id: number | number[] }) => postData('/develop/group/delete', data);

/** 获取组合数据列表 */
export const groupList = (params: undefined | Record<string, any>) => getData('/develop/group/list', params);

/** 处理删除数据记录 */
export const groupDataDelete = (data: { id: number | number[] }) => postData('/develop/group_data/delete', data);

/** 保存组合数据列表 */
export const saveGroupData = (data: { id?: number; gid?: number }) => postData('/develop/group_data/save', data);

/** 获取组合数据详情 */
export const groupDataList = (params: { id: number } | Record<string, any>) => getData('/develop/group_data/list', params);

/** 保存配置分类列表 */
export const configCateSave = (data: configCateDataItem) => postData('/develop/config/save', data);

/** 获取配置分类列表 */
export const configCateList = (params: Record<string, any>) => getData('/develop/config/list', params);

/** 删除配置分类列表 */
export const configCateDelete = (data: { id: number | number[] }) => postData('/develop/config/delete', data);

/** 保存配置 */
export const configSave = (data: configListDataItem) => postData('/develop/config_data/save', data);

/** 获取配置列表 */
export const configList = (params: Record<string, any>) => getData('/develop/config_data/list', params);

/** 删除配置分类 */
export const configDelete = (data: { id?: number | number[] }) => postData('/develop/config_data/delete', data);
