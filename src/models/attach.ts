/** @format */

import { useState } from 'react';
import { useRequest } from 'umi';
import type { cateDataItem } from '@/pages/components/Attach/data';
import { cate as fetchCate, info as fetchInfo } from '@/pages/components/Attach/services';

const defaultCateOptions: cateDataItem[] & { disabled: boolean }[] = [
    {
        id: 0,
        pid: 0,
        path: '0',
        name: '根目录',
        ename: 'root',
        disabled: true,
        dirname: 'attach',
        create_time: '2022-10-10',
    },
];

export default () => {
    /* 目录详情 */
    const [cateInfo, setCateInfo] = useState<cateDataItem>();
    /* 当前目录 */
    const [cateId, setCateId] = useState<number>(0);
    /* 目录列表 */
    const [cateData, setCateData] = useState<cateDataItem[]>(defaultCateOptions);
    /* 默认分页 */
    const [pagination, setPagination] = useState<{ current: number; pageSize: number }>({ current: 1, pageSize: 24 });
    /* 自动获取目录列表 */
    const { refresh, loading } = useRequest(fetchCate, {
        defaultParams: [{ pid: 0 }],
        onSuccess: res => setCateData(defaultCateOptions.concat(res?.list)),
    });
    /* 手动获取目录详情 */
    const { run: getInfo } = useRequest(fetchInfo, {
        manual: true,
        defaultParams: [{ id: 0 }],
        onSuccess: res => setCateInfo({ ...res?.info, ...res?.info?.config }),
    });
    return {
        cateId,
        getInfo,
        refresh,
        loading,
        cateInfo,
        cateData,
        setCateId,
        pagination,
        setCateData,
        setCateInfo,
        setPagination,
    };
};
