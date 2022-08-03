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
            render: () => _int2ip(props.record.ipaddress as number),
        },
        {
            title: '来源网址',
            copyable: true,
            dataIndex: 'page',
        },
        {
            title: '公司名称',
            copyable: true,
            dataIndex: 'company',
        },
        {
            span: 3,
            title: '需求描述',
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
