import type { statusData } from './data';
import { getData, postData } from "@/services/ant-design-pro/api";

export async function getAuthor() {
  return getData('/article/author')
}

export async function getChannel() {
  return getData('/article/channel')
}

export async function fetchData(params: API.PageParams) {
  return getData('/article/list', { ...params })
}

export async function setStatus(data: statusData) {
  return postData('/article/status', { ...data })
}

export async function remove(data: { id: (string | number)[] }) {
  return postData('/article/del', { ...data })
}
