/** @format */

import { TreeSelect } from 'antd';
import React, { useState } from 'react';
import type { menuDataItem } from '@/pages/user/data';

export const TreeSelector: React.FC<{
    value?: string;
    treeData: menuDataItem[];
    onChange?: (newValue: string) => void;
}> = ({ value, onChange, treeData }) => {
    const { SHOW_ALL } = TreeSelect;
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

    /* handleChange */
    const handleChange = (newValue: { label: string; value: number }[]) => {
        setValues(newValue);
        onChange?.(newValue.map(item => item.value).join(','));
    };

    return (
        <TreeSelect
            treeIcon
            allowClear
            treeCheckable
            value={values}
            treeCheckStrictly
            treeData={treeData}
            placeholder="请选择..."
            fieldNames={fieldNames}
            treeNodeFilterProp="name"
            style={{ width: '100%' }}
            showCheckedStrategy={SHOW_ALL}
            onChange={newValue => handleChange(newValue)}
            treeDefaultExpandedKeys={values.map(item => item.value)}
        />
    );
};
