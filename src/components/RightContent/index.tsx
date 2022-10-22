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

import React from 'react';
import { Space } from 'antd';
import styles from './index.less';
import Avatar from './AvatarDropdown';
import { useModel, SelectLang } from 'umi';
import { HomeOutlined } from '@ant-design/icons';

const GlobalHeaderRight: React.FC = () => {
    const { initialState } = useModel('@@initialState');

    if (!initialState || !initialState.settings) {
        return null;
    }

    const { navTheme, layout } = initialState.settings;
    let className = styles.right;

    if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
        className = `${styles.right}  ${styles.dark}`;
    }
    return (
        <Space className={className}>
            <a
                title="网站首页"
                className={styles.action}
                onClick={() => {
                    window.open('https://www.brandsz.cn', '_blank');
                }}
            >
                <HomeOutlined />
            </a>
            <Avatar />
            <SelectLang reload={false} className={styles.action} />
        </Space>
    );
};
export default GlobalHeaderRight;
