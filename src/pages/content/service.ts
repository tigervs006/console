import type { status } from './data';
import { list, update } from "@/services/ant-design-pro/api";

export async function getAuthor() {
  return list('/article/author')
}

export async function fetchData(params: API.PageParams) {
  return list('/article/list', { ...params })
}

export async function setStatus(data: status) {
  return update('/article/status', { ...data })
}
