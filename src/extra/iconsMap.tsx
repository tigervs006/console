/** @format */

import type { MenuDataItem } from '@ant-design/pro-layout';

import {
    UnorderedListOutlined,
    AlignLeftOutlined,
    DashboardOutlined,
    UserSwitchOutlined,
    SettingOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

const IconMap = {
    team: <TeamOutlined />,
    user: <UserOutlined />,
    setting: <SettingOutlined />,
    dashboard: <DashboardOutlined />,
    'align-left': <AlignLeftOutlined />,
    'user-switch': <UserSwitchOutlined />,
    'unordered-list': <UnorderedListOutlined />,
};
export const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] => {
    return menus.map(({ icon, routes, ...item }) => ({
        ...item,
        icon: icon && IconMap[icon as string],
        routes: routes && loopMenuItem(routes),
    }));
};
