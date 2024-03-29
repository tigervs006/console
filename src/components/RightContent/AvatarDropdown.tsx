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

import styles from './index.less';
import { history, useModel } from 'umi';
import { stringify } from 'querystring';
import { Avatar, Menu, Spin } from 'antd';
import React, { useCallback } from 'react';
import HeaderDropdown from '../HeaderDropdown';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { outLogin } from '@/services/ant-design-pro/api';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';

export type GlobalHeaderRightProps = {
    menu?: boolean;
};

// 菜单项
const menuItems = [
    { label: '个人设置', key: 'settings', icon: <SettingOutlined /> },
    { label: '退出登录', key: 'logout', icon: <LogoutOutlined /> },
];

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
    const { initialState, setInitialState } = useModel('@@initialState');

    /**
     * 退出登录，并且将当前的 url 保存
     */
    const loginOut = async () => {
        await outLogin(initialState?.currentUser).then(() => localStorage.clear());
        const { query = {}, search, pathname } = history.location;
        const { redirect } = query;
        // Note: There may be security issues, please note
        if (window.location.pathname !== '/login' && !redirect) {
            history.replace({
                pathname: '/login',
                search: stringify({
                    redirect: pathname + search,
                }),
            });
        }
    };

    const onMenuClick = useCallback(
        (event: MenuInfo) => {
            const { key } = event;
            if ('logout' === key) {
                setInitialState!(s => ({ ...s, currentUser: undefined }));
                loginOut!();
            } else {
                history.push('/account');
            }
        },
        [setInitialState],
    );

    const loading = (
        <span className={`${styles.action} ${styles.account}`}>
            <Spin
                size="small"
                style={{
                    marginLeft: 8,
                    marginRight: 8,
                }}
            />
        </span>
    );

    if (!initialState) {
        return loading;
    }

    const { currentUser } = initialState;

    if (!currentUser || !currentUser.name) {
        return loading;
    }

    const menuHeaderDropdown = <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick} items={menuItems} />;
    return (
        <HeaderDropdown overlay={menuHeaderDropdown}>
            <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
                <span className={`${styles.name} anticon`}>{currentUser.name}</span>
            </span>
        </HeaderDropdown>
    );
};

export default AvatarDropdown;
