/** @format */

import type { productDataItem } from './data';
import { getData, postData } from '@/services/ant-design-pro/api';

/* 获取商品分类 */
export const getCate = () => getData('/product/cate');

/* 获取商品信息 */
export const getInfo = (params: { id?: string }) => getData('/product', params);

/* 新增/编辑商品 */
export const saveProduct = (data: productDataItem) => postData('/product/save', data);

/* 单个/批量删除 */
export const remove = (data: { id: string | string[] }) => postData('/product/del', data);

/* 获取商品列表 */
export const fetchData = (params: Record<string, any>) => getData('/product/list', params);
