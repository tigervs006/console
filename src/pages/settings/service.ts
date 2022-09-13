/** @format */
import type { regionDataItem } from './data';
import { getData, postData } from '@/services/ant-design-pro/api';

/** 获取配置列表 */
export const list = (param: { type: string }) => getData('/system/list', param);

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
