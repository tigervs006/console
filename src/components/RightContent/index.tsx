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
import HeaderSearch from '../HeaderSearch';
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
            <HeaderSearch
                className={`${styles.action} ${styles.search}`}
                placeholder="站内搜索"
                defaultValue="umi ui"
                options={[
                    { label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>, value: 'umi ui' },
                    {
                        label: <a href="next.ant.design">Ant Design</a>,
                        value: 'Ant Design',
                    },
                    {
                        label: <a href="https://protable.ant.design/">Pro Table</a>,
                        value: 'Pro Table',
                    },
                    {
                        label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
                        value: 'Pro Layout',
                    },
                ]}
            />
            <a
                title="网站首页"
                className={styles.action}
                onClick={() => {
                    window.open('https://www.brandsz.cn');
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
