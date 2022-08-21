/** @format */

import { TreeSelect } from 'antd';
import React, { useState } from 'react';
import { IconMap } from '@/extra/iconsMap';
import type { menuDataItem } from '@/pages/user/data';
import { AppstoreAddOutlined, MenuUnfoldOutlined, ApiOutlined } from '@ant-design/icons';

export const TreeSelector: React.FC<{
    value?: string;
    treeData: menuDataItem[];
    onChange?: (newValue: string) => void;
}> = ({ value, onChange, treeData }) => {
    const { SHOW_ALL } = TreeSelect;
    /* 菜单类型 */
    const menuType = {
        1: <MenuUnfoldOutlined />,
        2: <AppstoreAddOutlined />,
        3: <ApiOutlined />,
    };
    const fieldNames = { label: 'name', value: 'id' };
    const [values, setValues] = useState<{ label: string; value: number }[]>(() => {
        const ids = value?.split(',');
        const menuData = (data: menuDataItem[], options: { label: string; value: number }[] = []) => {
            data.forEach(item => {
                ids?.forEach(id => {
                    if (id == item.id) {
                        options.push({ label: item.name as string, value: item.id as number });
                        item.children && menuData(item.children, options);
                    }
                });
            });
            return options;
        };
        return menuData(treeData);
    });

    /* 自定义图标icon */
    const iconMenu = (menuData: menuDataItem[]) =>
        menuData.map((item: menuDataItem) => {
            item.icon = item?.icon ? IconMap[item.icon as string] : menuType[item.type as number];
            item.children && iconMenu(item.children);
            return item;
        });

    /* handleChange */
    const handleChange = (newValue: { label: string; value: number }[]) => {
        setValues(newValue);
        onChange?.(newValue.map(item => item.value).join(','));
    };

    return (
        <TreeSelect
            treeIcon
            showArrow
            allowClear
            treeCheckable
            value={values}
            treeCheckStrictly
            placeholder="请选择..."
            fieldNames={fieldNames}
            treeNodeFilterProp="name"
            style={{ width: '100%' }}
            treeData={iconMenu(treeData)}
            showCheckedStrategy={SHOW_ALL}
            onChange={newValue => handleChange(newValue)}
            treeDefaultExpandedKeys={values.map(item => item.value)}
        />
    );
};
