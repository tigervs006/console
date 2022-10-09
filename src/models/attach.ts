/** @format */

import { useState } from 'react';
import { useRequest } from 'umi';
import type { cateDataItem } from '@/pages/components/Attach/data';
import { cate as fetchCate } from '@/pages/components/Attach/services';

const defaultCateOptions = [
    {
        id: 0,
        pid: 0,
        path: '0',
        name: '根目录',
        ename: 'root',
        disabled: true,
        create_time: '2022-10-10',
    },
];

export default () => {
    const [currentKey, setCurrentKey] = useState<number>(0);
    const [cateData, setCateData] = useState<cateDataItem[]>(defaultCateOptions);
    useRequest(fetchCate, {
        defaultParams: [{ pid: 0 }],
        onSuccess: (res: Record<string, any>) => setCateData(prev => prev.concat(res?.list)),
    });
    return {
        cateData,
        currentKey,
        setCateData,
        setCurrentKey,
    };
};
