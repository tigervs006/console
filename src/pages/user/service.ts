import { getData, postData } from '@/services/ant-design-pro/api';
import type { statusData } from '@/pages/content/data';
import type { tableDataItem } from '@/pages/user/data';

// 获取用户列表
export async function fetchData(params: API.PageParams) {
  return getData('/user/list', { ...params });
}

// 新增/编辑用户
export async function saveUser(data: tableDataItem) {
  return postData('/user/save', { ...data });
}

// 设置用户状态
export async function setStatus(data: statusData) {
  return postData('/user/status', { ...data });
}

// 单个/批量删除
export async function remove(data: Record<'id', number | number[]>) {
  return postData('/user/del', { ...data });
}
