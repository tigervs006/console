/** @format */

import { _int2ip } from '@/extra/utils';
import { useRequest, useModel } from 'umi';
import ProTable from '@ant-design/pro-table';
import { fetchSystemLogs } from '../service';
import type { recordDataItem } from '../data';
import React, { useState, useRef } from 'react';
import { fetchGroupData } from '@/pages/user/service';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { getAuthor as queryUser } from '@/pages/content/service';

interface userDataItem {
    id: number;
    cname: string;
}

interface groupDataItem {
    id: number;
    name: string;
}

export default () => {
    const levelLog = {
        1: 'system',
        2: 'account',
        3: 'general',
    };
    /* 监听窗口变化 */
    const { resize } = useModel('resize', ret => ({
        resize: ret.resize,
    }));

    /* 文档作者 */
    const [user, setUser] = useState<Record<number, string>>({});
    /* 用户组 */
    const [group, setGroup] = useState<Record<number, string>>({});
    /* ref ActionType */
    const ref: React.MutableRefObject<ActionType | undefined> = useRef<ActionType>();

    /* 获取系统用户 */
    useRequest(queryUser, {
        onSuccess: (res: { list: userDataItem[] }) => {
            const newObj: Record<number, string> = {};
            res?.list.forEach((item: userDataItem) => {
                newObj[item.id] = item.cname;
            });
            setUser(newObj);
        },
    });

    /* 获取用户组列表 */
    useRequest(fetchGroupData, {
        onSuccess: (res: { list: groupDataItem[] }) => {
            const newObj: Record<number, string> = {};
            res?.list.forEach((item: groupDataItem) => {
                newObj[item.id] = item.name;
            });
            setGroup(newObj);
        },
    });

    /* 获取操作日志列表 */
    const tableData = async (params: Record<string, any>, sort: any, filter: any) => {
        const paramData = { ...params, ...sort, ...filter };
        // 过滤参数避免后台接收到空值参数
        for (const idx in paramData) {
            ('' === paramData[idx] || null === paramData[idx] || undefined === paramData[idx]) && delete paramData[idx];
        }
        return await fetchSystemLogs(paramData).then(res => ({
            data: res?.data?.list ?? [],
            total: res?.data?.total ?? 0,
            success: res?.success ?? true,
        }));
    };

    const columns: ProColumns<recordDataItem>[] = [
        {
            title: 'ID',
            search: false,
            dataIndex: 'id',
        },
        {
            title: '用户',
            dataIndex: 'uid',
            valueType: 'select',
            valueEnum: { ...user },
            fieldProps: { allowClear: true, mode: 'multiple' },
            render: (_, record) => user?.[record.uid],
        },
        {
            title: '用户组',
            dataIndex: 'gid',
            valueType: 'select',
            valueEnum: { ...group },
            fieldProps: { allowClear: true, mode: 'multiple' },
            render: (_, record) => group?.[record.gid],
        },
        {
            title: '日志级别',
            dataIndex: 'level',
            valueType: 'select',
            valueEnum: { ...levelLog },
            fieldProps: { allowClear: true, mode: 'multiple' },
            render: (_, record) => levelLog?.[record.level],
        },
        {
            search: false,
            title: '操作路径',
            dataIndex: 'path',
        },
        {
            search: false,
            title: '操作描述',
            dataIndex: 'action',
        },
        {
            search: false,
            title: 'IP地址',
            render: (_, record) => _int2ip(record.ipaddress),
        },
        {
            search: false,
            title: '创建时间',
            dataIndex: 'create_time',
        },
        {
            title: '日期范围',
            hideInTable: true,
            dataIndex: 'dateRange',
            valueType: 'dateRange',
            fieldProps: {
                showNow: true,
                showTime: true,
                format: 'YYYY-MM-DD HH:mm:ss',
            },
        },
    ];

    return (
        <PageContainer>
            <ProTable<recordDataItem>
                rowKey="id"
                actionRef={ref}
                columns={columns}
                request={tableData}
                scroll={resize.tableScroll}
                search={{ filterType: 'light' }}
                pagination={{ pageSize: resize.pageSize, hideOnSinglePage: true }}
            />
        </PageContainer>
    );
};
