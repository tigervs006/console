import type { tableDataItem } from './data';
import { getData, postData } from '@/services/ant-design-pro/api';

// 栏目列表
export async function fetchData(params: API.PageParams) {
  return getData('/channel/list', { ...params });
}

// 新增/编辑
export async function saveChannel(data: tableDataItem) {
  return postData('/channel/save', { ...data });
}

// 单个/批量删除
export async function remove(data: Record<'id', number | number[]>) {
  return postData('/channel/del', { ...data });
}
