/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import { useModel, history } from 'umi';
import type { groupDataItem } from '../data';
import React, { useState, useRef } from 'react';
import { ProTable } from '@ant-design/pro-table';
import { CreateGroup } from './modules/createGroup';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, message, Modal, Space, Table } from 'antd';
import { groupList as fetchData, groupDelete } from '../services';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { QuestionCircleOutlined, UnorderedListOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

export default () => {
    /* 监听窗口变化 */
    const { resize } = useModel('resize', ret => ({
        resize: ret.resize,
    }));
    /* Modal的数据 */
    const [data, setData] = useState<groupDataItem>();
    /* 是否创建数组 */
    const [isCreate, setIsCreate] = useState<boolean>(false);
    /* 设置Modal状态 */
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    /* ref ActionType */
    const ref: React.MutableRefObject<ActionType | undefined> = useRef<ActionType>();

    /* 处理创建数组 */
    const handleCreate = () => {
        setIsCreate(true);
        setOpenDrawer(true);
        setData(undefined);
    };

    /* 处理编辑数组 */
    const handleEdit = (record: groupDataItem) => {
        setData(record);
        setIsCreate(false);
        setOpenDrawer(true);
    };

    /* 处理列表预览 */
    const handlePreview = (id: number) => {
        history.push({ pathname: '/develop/group/list', query: { id: id.toString() } });
    };

    /* 处理删除数组 */
    const handleDelete = (record: groupDataItem | groupDataItem[]) => {
        const ids: number[] = [];
        const titles: string[] = [];
        if (record instanceof Array) {
            record.forEach(item => {
                ids.push(item.id as number);
                titles.push(item?.name ?? '');
            });
        }
        Modal.confirm({
            centered: true,
            cancelText: '算了',
            title: '当真要删除?',
            icon: <QuestionCircleOutlined />,
            cancelButtonProps: { shape: 'round' },
            okButtonProps: { danger: true, shape: 'round' },
            content: record instanceof Array ? `${titles.slice(0, 3).join('，')} 等 ${titles.length} 个组合数据` : `${record.name} 这个组合数据`,
            async onOk() {
                // @ts-ignore
                await groupDelete({ id: record.id || ids }).then(res => {
                    ref.current?.reload();
                    res?.success && message.success(res.msg);
                    /* 只在多选的情况下清除已选择的项 */
                    record instanceof Array && ref.current?.clearSelected!();
                });
            },
            onCancel() {
                /* 只在多选的情况下清除已选择的项 */
                record instanceof Array && ref.current?.clearSelected!();
            },
        });
    };

    const tableData = async (params: Record<string, any>, sort: Record<string, any>, filter: Record<string, any>) => {
        const paramData = { ...params, ...sort, ...filter };
        /* 避免后台接收到空值参数 */
        for (const idx in paramData) {
            ('' === paramData[idx] || null === paramData[idx] || undefined === paramData[idx]) && delete paramData[idx];
        }
        return await fetchData(paramData).then(res => ({
            data: res?.data?.list ?? [],
            total: res?.data?.total ?? 0,
            success: res?.success ?? true,
        }));
    };

    const columns: ProColumns<groupDataItem>[] = [
        {
            width: 80,
            title: '序号',
            sorter: true,
            dataIndex: 'id',
            hideInSearch: true,
        },
        {
            title: '数组名称',
            dataIndex: 'name',
        },
        {
            title: '数组字段',
            dataIndex: 'cname',
        },
        {
            title: '数组简述',
            hideInSearch: true,
            dataIndex: 'summary',
        },
        {
            sorter: true,
            title: '创建时间',
            hideInSearch: true,
            dataIndex: 'create_time',
        },
        {
            title: '操作',
            hideInSearch: true,
            render: (_, record) => [
                <Space size={4} key="operation">
                    <Button size="small" shape="round" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        编辑
                    </Button>
                    <Button size="small" shape="round" icon={<UnorderedListOutlined />} onClick={() => handlePreview(record.id!)}>
                        数据
                    </Button>
                    <Button danger size="small" type="primary" shape="round" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
                        删除
                    </Button>
                </Space>,
            ],
        },
    ];

    return (
        <PageContainer>
            <ProTable<groupDataItem>
                actionRef={ref}
                columns={columns}
                request={tableData}
                search={{
                    filterType: 'light',
                }}
                scroll={resize.tableScroll}
                rowKey={record => record.id as number}
                rowSelection={{
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                }}
                pagination={{ pageSize: resize.pageSize, hideOnSinglePage: true }}
                headerTitle={
                    <Button shape="round" type="primary" key="clientCreate" icon={<PlusOutlined />} onClick={() => handleCreate()}>
                        新增数组
                    </Button>
                }
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
                            <a onClick={() => handleDelete(selectedRows as groupDataItem[])}>批量删除</a>
                        </Space>
                    );
                }}
            />
            <CreateGroup
                record={data}
                isCreate={isCreate}
                openDrawer={openDrawer}
                reloadTable={() => ref.current?.reload()}
                handleSetOpenDrawer={status => setOpenDrawer(status)}
            />
        </PageContainer>
    );
};
