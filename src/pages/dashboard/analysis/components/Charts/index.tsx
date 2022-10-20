/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import numeral from 'numeral';
import ChartCard from './ChartCard';
import Field from './Field';

const yuan = (val: number | string) => `¥ ${numeral(val).format('0,0')}`;

const Charts = {
  yuan,
  ChartCard,
  Field,
};

export { Charts as default, yuan, ChartCard, Field };
