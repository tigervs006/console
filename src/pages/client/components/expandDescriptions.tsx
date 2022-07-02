/** @format */

import React from 'react';
import { _int2ip } from '@/extra/utils';
import type { tableDataItem } from '../data';
import { ProDescriptions } from '@ant-design/pro-descriptions';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';

export const ExpandDescriptions: React.FC<{
    record: tableDataItem;
}> = props => {
    const columns: ProDescriptionsItemProps<tableDataItem>[] = [
        {
            title: 'IP地址',
            ellipsis: true,
            render: () => _int2ip(props.record.ipaddress as number),
        },
        {
            title: '来源网址',
            ellipsis: true,
            copyable: true,
            dataIndex: 'page',
        },
        {
            title: '公司名称',
            ellipsis: true,
            dataIndex: 'company',
            render: () => props.record?.company ?? '待完善',
        },
        {
            title: '需求描述',
            ellipsis: true,
            copyable: true,
            dataIndex: 'message',
        },
    ];
    return (
        <ProDescriptions
            title="客户详情"
            layout="vertical"
            columns={columns}
            dataSource={props.record}
            labelStyle={{ fontWeight: 'bold' }}
            column={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        />
    );
};
