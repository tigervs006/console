import type { status } from './data';
import { getData, postData } from "@/services/ant-design-pro/api";

export async function getAuthor() {
  return getData('/article/author')
}

export async function remove(data: Record<string, any>) {
  return postData('/article/del', { ...data })
}

export async function fetchData(params: API.PageParams) {
  return getData('/article/list', { ...params })
}

export async function setStatus(data: status) {
  return postData('/article/status', { ...data })
}
