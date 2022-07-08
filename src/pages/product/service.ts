/** @format */

import { productDataItem } from '@/pages/product/data';
import { getData, postData } from '@/services/ant-design-pro/api';

/* 获取商品分类 */
export async function getCate() {
    return getData('/product/cate');
}
/* 获取商品信息 */
export async function getInfo(params: { id?: string }) {
    return getData('/product/list', { ...params });
}

/* 新增/编辑商品 */
export async function saveProduct(data: productDataItem) {
    return postData('/product/save', { ...data });
}

/* 单个/批量删除 */
export async function remove(data: { id: number | number[] }) {
    return postData('/product/del', { ...data });
}
