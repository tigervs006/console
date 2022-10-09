/** @format */

import type { cateDataItem } from './data';
import { getData, postData } from '@/services/ant-design-pro/api';

export const info = (param: { id: number }) => getData('/attach/info', param);

export const cate = (param: { pid?: number }) => getData('/attach/cate', param);

export const remove = (data: { id: number }) => postData('/attach/delete', data);

export const save = (data: Pick<cateDataItem, 'id' | 'pid' | 'path' | 'name' | 'ename'>) => postData('/attach/save', data);
