/**
 * @format
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 */
import { history } from 'umi';
import type { MenuDataItem } from '@ant-design/pro-layout';

/**
 * 检查权限
 * @param key key
 * @param extra 参数
 * @param menuData 用户菜单
 */
const checkPermission = (extra: string, key: string, menuData?: MenuDataItem[]) => {
    /* 扁平化菜单 */
    const filterData = (menuDatas: MenuDataItem[], init: string[] = []) => {
        menuDatas?.filter(item => {
            init.push(item[key]);
            item?.children && filterData(item.children, init);
        });
        return init;
    };
    return filterData(menuData!).includes(extra);
};

export default function (initialState: { currentUser?: API.CurrentUser; userMenuItem?: MenuDataItem[] }) {
    const { userMenuItem } = initialState ?? {};
    return {
        /* 按钮权限 */
        actionFilter: (value: string) => {
            console.log('actionFilter', value);
            return false;
        },
        /* 路由权限 */
        authFilter: () => checkPermission(history.location.pathname, 'path', userMenuItem),
    };
}
