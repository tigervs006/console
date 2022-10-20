/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

/** @format */

import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
    pwa?: boolean;
    logo?: string;
} = {
    pwa: false,
    layout: 'mix',
    headerHeight: 48,
    navTheme: 'light',
    fixSiderbar: true,
    fixedHeader: false,
    contentWidth: 'Fluid',
    primaryColor: '#1890ff',
    menuHeaderRender: undefined,
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
};

export default Settings;
