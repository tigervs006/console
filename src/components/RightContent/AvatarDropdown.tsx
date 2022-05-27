import styles from './index.less';
import { history, useModel } from 'umi';
import { stringify } from 'querystring';
import { Avatar, Menu, Spin } from 'antd';
import React, { useCallback } from 'react';
import HeaderDropdown from '../HeaderDropdown';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { outLogin } from '@/services/ant-design-pro/api';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

// 菜单项
const menuItems = [
  { label: '个人中心', key: 'center', icon: <UserOutlined /> },
  { label: '个人设置', key: 'settings', icon: <SettingOutlined /> },
  { label: '退出登录', key: 'logout', icon: <LogoutOutlined /> },
];

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await outLogin({ name: localStorage.getItem('user') || 'anonymous' });
  const { query = {}, search, pathname } = history.location;
  const { redirect } = query;
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      switch (key) {
        case 'logout':
          setInitialState((s) => ({ ...s, currentUser: undefined }));
          loginOut().then(() => localStorage.clear());
          history.push(`/account/${key}`);
          break;
        case 'center':
          console.log('进入个人中心');
          // history.push(`/account/${key}`);
          break;
        case 'settings':
          console.log('进入个人设置');
          // history.push(`/account/${key}`);
          break;
        default:
          return;
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

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick} items={menuItems} />
  );
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
