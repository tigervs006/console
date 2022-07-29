/** @format */

import { useIntl } from 'umi';
import { TreeSelect } from 'antd';
import React, { useState } from 'react';
import type { menuDataItem } from '@/pages/user/data';

export const TreeSelector: React.FC<{
    treeData: menuDataItem[];
    value?: string | number[];
    onChange?: (newValue: string) => void;
}> = ({ value, onChange, treeData }) => {
    const intl = useIntl();
    const { SHOW_ALL } = TreeSelect;
    const fieldNames = { label: 'name', value: 'id' };
    const [values, setValues] = useState<number[]>(() => {
        return value instanceof Array ? value : value!.split(',').map(Number);
    });
    /* nameToLocale */
    const nameToLocale = (data: menuDataItem[]) => {
        return data.map((item: menuDataItem) => {
            item.name = intl.formatMessage({ id: item.locale });
            item.children && nameToLocale(item.children);
            return item;
        });
    };
    /* handleChange */
    const handleChange = (newValue: number[]) => {
        setValues(newValue);
        onChange?.(newValue.join(','));
    };

    return (
        <TreeSelect
            value={values}
            showArrow={true}
            allowClear={true}
            treeCheckable={true}
            placeholder="请选择..."
            fieldNames={fieldNames}
            style={{ width: '100%' }}
            showCheckedStrategy={SHOW_ALL}
            treeData={nameToLocale(treeData)}
            onChange={newValue => handleChange(newValue)}
        />
    );
};
