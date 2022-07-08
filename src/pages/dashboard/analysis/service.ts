/** @format */

import { request } from 'umi';
import type { AnalysisData } from './data';

export const fakeChartData = (): Promise<{ data: AnalysisData }> => request('/dashboard/analysis');
