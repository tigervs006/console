/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import type { regionDataItem } from './data';
import { getData, postData } from '@/services/ant-design-pro/api';

/** 读取数据列表 */
export const table = () => getData('/system/database/list');

/** 获取数据表备份 */
export const record = () => getData('/system/database/record');

/** 获取配置列表 */
export const list = (param: { type: string }) => getData('/system/list', param);

/** 读取表结构 */
export const info = (param: { tablename: string }) => getData('/system/database/info', param);

/** 删除数据表备份 */
export const deletes = (data: { filename: number }) => postData('/system/database/remove', data);

/** 备份选中数据表 */
export const backup = (data: { tables: string | string[] }) => postData('/system/database/backup', data);

/** 修复选中数据表 */
export const repair = (data: { tables: string | string[] }) => postData('/system/database/repair', data);

/** 优化选中数据表 */
export const optimize = (data: { tables: string | string[] }) => postData('/system/database/optimize', data);

/** 下载选中数据备份 */
export const download = (data: { time: number; part?: number }) => postData('/system/database/download', data);

/** 新增/编辑地区 */
export const saveRegion = (data: regionDataItem) => postData('/region/save', data);

/** 更新系统配置 */
export const saveConfig = (data: Record<string, any>) => postData('/system/save', data);

/** 单个/批量删除 */
export const remove = (data: Record<'id', number | number[]>) => postData('/region/del', data);

/** 获取操作日志列表 */
export const fetchSystemLogs = (params: Record<string, any>) => getData('/system/record', params);

/** 获取地区列表 */
export const fetchRegionData = (params: Record<string, any>) => getData('/region/list', params, { useCache: true, ttl: 0 });

/** 恢复选中数据表 */
export const revert = (data: { gz?: number; part: number; time?: number; start?: number }) => postData('/system/database/revert', data);
