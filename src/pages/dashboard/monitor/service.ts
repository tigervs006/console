/** @format */

import { request } from 'umi';
import type { TagType } from './data';

export const queryTags = (): Promise<{ data: { list: TagType[] } }> => request('/dashboard/monitor');
