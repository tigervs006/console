/** @format */

import type { tableDataItem } from './data';
import ProTable from '@ant-design/pro-table';
import { fetchData, remove } from './service';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { CreateClient } from './components/createClient';
import { message, Button, Modal, Space, Table, Tag } from 'antd';
import { ExpandDescriptions } from './components/expandDescriptions';
import { QuestionCircleOutlined, CommentOutlined, DeleteOutlined, IdcardOutlined, EditOutlined, PlusOutlined, MailOutlined } from '@ant-design/icons';

export default () => {
    const { confirm } = Modal;
    /** ModalForm状态 */
    const [modalVisit, setModalVisit] = useState<boolean>(false);
    /** 设置当前展开行 */
    const [expandedRowKey, setExpandedRowKey] = useState<number[]>([]);
    /** ModalForm 默认值 */
    const [clientValues, setClientValues] = useState<tableDataItem>({});
    /** ModalForm 标题 */
    const [isCreateClient, setIsCreateClient] = useState<boolean>(false);
    /** ref ActionType */
    const ref: React.MutableRefObject<ActionType | undefined> = useRef<ActionType>();

    /** 处理展开/收缩状态 */
    const handleExpand = (expanded: boolean, record: tableDataItem) => {
        setExpandedRowKey(() => (expanded ? [record.id as number] : []));
    };
    /** 处理编辑客户信息事件 */
    const handleEdit = (e: React.MouseEvent<HTMLElement>, record: tableDataItem) => {
        // 防止点击事件穿透
        e.stopPropagation();
        setClientValues(record);
        setModalVisit(true);
        setIsCreateClient(false);
    };
    /** 处理新增客户事件 */
    const handleCreate = () => {
        setClientValues({});
        setModalVisit(true);
        setIsCreateClient(true);
    };
    /** 处理单个/批量删除事件 */
    const handleDelete = (e: React.MouseEvent<HTMLElement>, record: tableDataItem | tableDataItem[]) => {
        // 防止点击事件穿透
        e.stopPropagation();
        const ids: number[] = [];
        const titles: string[] = [];
        if (record instanceof Array) {
            record.forEach(item => {
                ids.push(item.id as number);
                titles.push(item?.username ?? '');
            });
        }
        confirm({
            centered: true,
            cancelText: '算了',
            title: '当真要删除?',
            icon: <QuestionCircleOutlined />,
            cancelButtonProps: { shape: 'round' },
            okButtonProps: { danger: true, shape: 'round' },
            content: record instanceof Array ? `${titles.slice(0, 3).join('，')} 等 ${titles.length} 个客户` : `${record.username} 这个客户`,
            async onOk() {
                // @ts-ignore
                await remove({ id: record.id || ids }).then(res => {
                    ref.current?.reload();
                    message.success(res.msg);
                    // 只在多选的情况下清除已选择的项
                    record instanceof Array && ref.current?.clearSelected!();
                });
            },
            onCancel() {
                // 只在多选的情况下清除已选择的项
                record instanceof Array && ref.current?.clearSelected!();
            },
        });
    };

    const tableData = async (params: Record<string, any>, sort: any, filter: any) => {
        const paramData = Object.assign(params, sort, filter);
        // 过滤参数以避免后台接收到空值参数
        for (const idx in paramData) {
            ('' === paramData[idx] || null === paramData[idx] || undefined === paramData[idx]) && delete paramData[idx];
        }
        return await fetchData(paramData).then(res => ({
            data: res?.data?.list ?? [],
            total: res?.data?.total ?? 0,
            success: res?.success ?? true,
        }));
    };

    const columns: ProColumns<tableDataItem>[] = [
        {
            search: false,
            dataIndex: 'id',
        },
        {
            title: '姓名',
            dataIndex: 'username',
        },
        {
            title: '电话',
            copyable: true,
            dataIndex: 'mobile',
        },
        {
            title: '邮箱',
            search: false,
            copyable: true,
            dataIndex: 'email',
        },
        {
            title: '地区',
            search: false,
            dataIndex: 'address',
            render: (_, record) => record?.address ?? '未知',
        },
        {
            title: '来源',
            search: false,
            filters: true,
            onFilter: true,
            filterMode: 'tree',
            valueType: 'select',
            dataIndex: 'source',
            valueEnum: {
                0: {
                    text: '手动录入',
                    status: 'Manual',
                },
                1: {
                    text: '表单留言',
                    status: 'Form',
                },
                2: {
                    text: '百度商桥',
                    status: 'shangqiao',
                },
            },
            render: (_, record) => {
                switch (record.source) {
                    case 1:
                        return (
                            <Tag key={record.id} color="magenta" icon={<MailOutlined />}>
                                表单留言
                            </Tag>
                        );
                    case 2:
                        return (
                            <Tag key={record.id} color="blue" icon={<CommentOutlined />}>
                                百度商桥
                            </Tag>
                        );
                    default:
                        return (
                            <Tag key={record.id} color="green" icon={<IdcardOutlined />}>
                                手动录入
                            </Tag>
                        );
                }
            },
        },
        {
            sorter: true,
            search: false,
            title: '创建时间',
            dataIndex: 'create_time',
        },
        {
            title: '日期范围',
            hideInTable: true,
            dataIndex: 'dateRange',
            valueType: 'dateRange',
        },
        {
            title: '操作',
            search: false,
            render: (_, record) => [
                <Space size={4} key="operation">
                    <Button size="small" shape="round" icon={<EditOutlined />} onClick={e => handleEdit(e, record)}>
                        编辑
                    </Button>
                    <Button danger size="small" type="primary" shape="round" icon={<DeleteOutlined />} onClick={e => handleDelete(e, record)}>
                        删除
                    </Button>
                </Space>,
            ],
        },
    ];

    return (
        <PageContainer>
            <ProTable<tableDataItem>
                actionRef={ref}
                columns={columns}
                request={tableData}
                search={{
                    filterType: 'light',
                }}
                rowKey={record => record.id as number}
                rowSelection={{
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                }}
                headerTitle={
                    <Button shape="round" type="primary" key="createClient" icon={<PlusOutlined />} onClick={handleCreate}>
                        新增客户
                    </Button>
                }
                expandable={{
                    expandRowByClick: true,
                    rowExpandable: () => true,
                    expandedRowKeys: expandedRowKey,
                    expandedRowRender: record => <ExpandDescriptions record={record} />,
                    onExpand: (expanded, record) => handleExpand(expanded, record),
                }}
                tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
                    <Space size={24}>
                        <span>
                            已选 {selectedRowKeys.length} 项
                            <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                                取消选择
                            </a>
                        </span>
                    </Space>
                )}
                tableAlertOptionRender={({ selectedRows }) => {
                    return (
                        <Space size={16}>
                            <a onClick={e => handleDelete(e, selectedRows)}>批量删除</a>
                        </Space>
                    );
                }}
            />
            <CreateClient
                record={clientValues}
                modalVisit={modalVisit}
                isCreateClient={isCreateClient}
                reloadTable={() => ref.current?.reload()}
                handleSetModalVisit={(status: boolean) => setModalVisit(status)}
            />
        </PageContainer>
    );
};
