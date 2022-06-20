/** @format */

import { getData, postData } from '@/services/ant-design-pro/api';

/** 获取配置列表 */
export async function list(param: { type: string }) {
    return getData('/system/list', param);
}

/** 更新系统配置 */
export async function saveConfig(data: Record<string, any>) {
    return postData('/system/save', data);
}
