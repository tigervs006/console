/** @format */

import { request } from 'umi';
import type { NoticeType, ActivitiesType, AnalysisData } from './data';

export const fakeChartData = (): Promise<{ data: AnalysisData }> => request('/dashboard/workplace');

export const queryProjectNotice = (): Promise<{ data: NoticeType[] }> => request('/dashboard/notice');

export const queryActivities = (): Promise<{ data: ActivitiesType[] }> => request('/dashboard/activities');
