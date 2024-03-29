/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import {
    DeploymentUnitOutlined,
    UnorderedListOutlined,
    UserSwitchOutlined,
    AlignLeftOutlined,
    DashboardOutlined,
    AppstoreOutlined,
    SettingOutlined,
    TeamOutlined,
    UserOutlined,
    LinkOutlined,
} from '@ant-design/icons';
import type { MenuDataItem } from '@ant-design/pro-layout';

export const IconMap = {
    team: <TeamOutlined />,
    link: <LinkOutlined />,
    user: <UserOutlined />,
    setting: <SettingOutlined />,
    product: <AppstoreOutlined />,
    dashboard: <DashboardOutlined />,
    develop: <DeploymentUnitOutlined />,
    'align-left': <AlignLeftOutlined />,
    'user-switch': <UserSwitchOutlined />,
    'unordered-list': <UnorderedListOutlined />,
};

/* 通过举枚方式渲染菜单icon */
export const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] => {
    return menus.map(({ icon, routes, ...item }) => ({
        ...item,
        icon: icon && IconMap[icon as string],
    }));
};
