/** @format */

import { getData, postData } from '@/services/ant-design-pro/api';

/** 获取配置列表 */
export const list = (param: { type: string }) => getData('/system/list', param);

/** 更新系统配置 */
export const saveConfig = (data: Record<string, any>) => postData('/system/save', data);
