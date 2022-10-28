/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import { history } from 'umi';
import type { MenuDataItem } from '@ant-design/pro-layout';

/**
 * 检查权限
 * @param route 当前路由
 * @param menuData 用户菜单
 */
const checkPermission = (route: string, menuData?: MenuDataItem[]) => {
    /* 扁平化菜单 */
    const filterData = (menuDatas: MenuDataItem[], init: string[] = []) => {
        menuDatas?.forEach(item => {
            init.push(item.path as string);
            item?.children && filterData(item.children, init);
        });
        return init;
    };
    return filterData(menuData!).includes(route);
};

export default function (initialState: { currentUser?: API.CurrentUser; userMenuItem?: MenuDataItem[] }) {
    const { currentUser, userMenuItem } = initialState ?? {};
    return {
        /* 路由权限 */
        authFilter: () => checkPermission(history.location.pathname, userMenuItem),
        /* 按钮权限 */
        btnFilter: (value: string) => currentUser?.btnRules.includes(value) ?? false,
    };
}
