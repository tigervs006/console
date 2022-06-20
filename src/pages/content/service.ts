/** @format */

import type { articleData } from './data';
import { getData, postData } from '@/services/ant-design-pro/api';

// 获取文档作者
export async function getAuthor() {
    return getData('/article/author');
}

// 获取新闻栏目
export async function getChannel() {
    return getData('/article/channel');
}

// 新增/编辑内容
export async function saveContent(data: articleData) {
    return postData('/article/save', { ...data });
}

// 获取文档列表
export async function fetchData(params: API.PageParams) {
    return getData('/article/list', { ...params });
}

// 文件删除接口
export async function removeFile(data: { filePath: string }) {
    return postData('/public/remove', { ...data });
}

// 获取文章内容
export async function getContent(params: Record<string, any>) {
    return getData('/article', { ...params });
}

// 单个/批量删除
export async function remove(data: { id: (string | number)[] }) {
    return postData('/article/del', { ...data });
}
