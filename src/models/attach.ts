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

import type React from 'react';
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
    /* setLimit */
    const [limit, setLimit] = useState<number>(-1);
    /* 目录详情 */
    const [cateInfo, setCateInfo] = useState<cateDataItem>();
    /* setOpen */
    const [open, setOpen] = useState<boolean>(false);
    /* 当前目录 */
    const [cateId, setCateId] = useState<number[]>([0]);
    /* 是否模态 */
    const [isModal, setIsModal] = useState<boolean>(false);
    /* multiple*/
    const [multiple, setMultiple] = useState<boolean>(false);
    /* 默认展开 */
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    /* 目录列表 */
    const [cateData, setCateData] = useState<cateDataItem[]>(defaultCateOptions);
    // prettier-ignore
    const [pagination, setPagination] = useState<{
		current: number; pageSize: number }>({ current: 1, pageSize: 32 });
    /* 自动获取目录列表 */
    const { run, refresh, loading } = useRequest(fetchCate, {
        manual: true,
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
        run,
        open,
        limit,
        cateId,
        isModal,
        getInfo,
        refresh,
        setOpen,
        loading,
        setLimit,
        multiple,
        cateInfo,
        cateData,
        setCateId,
        pagination,
        setIsModal,
        setCateData,
        setCateInfo,
        setMultiple,
        expandedKeys,
        setPagination,
        setExpandedKeys,
    };
};
