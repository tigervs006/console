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
import ProTable from '@ant-design/pro-table';
import { StepForm } from '../modules/stepForm';
import { valueOptions } from '@/extra/options';
import React, { useState, useRef } from 'react';
import type { configListDataItem } from '../../data';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { configList, configDelete } from '../../services';
import { message, Button, Modal, Space, Table } from 'antd';
import { RecordSwitch } from '@/pages/components/RecordSwitch';
import { QuestionCircleOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

export default () => {
    const id = history.location.query?.id;
    /* createRef */
    const createRef: React.ForwardedRef<any> = useRef();
    /* 监听窗口变化 */
    const { resize } = useModel('resize', ret => ({
        resize: ret.resize,
    }));
    /* ModalForm 值 */
    const [records, setRecords] = useState<configListDataItem>();
    /* ModalForm标题 */
    const [isCreate, setIsCreate] = useState<boolean>(false);
    /* ref ActionType */
    const ref: React.MutableRefObject<ActionType | undefined> = useRef<ActionType>();

    /* 处理编辑配置信息 */
    const handleEdit = (record: configListDataItem) => {
        setRecords(record);
        setIsCreate(false);
        createRef.current?.setDrawer(true);
    };
    /* 处理新增配置事件 */
    const handleCreate = () => {
        setIsCreate(true);
        setRecords(undefined);
        createRef.current?.setDrawer(true);
    };
    /* 处理单个/批量删除事件 */
    const handleDelete = (record: configListDataItem | configListDataItem[]) => {
        const ids: number[] = [];
        const titles: string[] = [];
        if (record instanceof Array) {
            record.forEach(item => {
                ids.push(item.id as number);
                titles.push(item.name as string);
            });
        }
        Modal.confirm({
            centered: true,
            cancelText: '算了',
            title: '当真要删除?',
            icon: <QuestionCircleOutlined />,
            cancelButtonProps: { shape: 'round' },
            okButtonProps: { danger: true, shape: 'round' },
            content: record instanceof Array ? `${titles.slice(0, 3).join('，')} 等 ${titles.length} 个配置` : `${record.name} 这个配置`,
            async onOk() {
                await configDelete({ id: record instanceof Array ? ids : record.id }).then(res => {
                    ref.current?.reload();
                    res?.success && message.success(res.msg);
                    record instanceof Array && ref.current?.clearSelected!();
                });
            },
            onCancel() {
                record instanceof Array && ref.current?.clearSelected!();
            },
        });
    };

    const tableData = async (params: Record<string, any>, sort: Record<string, any>, filter: Record<string, any>) => {
        const paramData = { ...params, ...sort, ...filter };
        /* 过滤空值参数 */
        for (const idx in paramData) {
            ('' === paramData[idx] || null === paramData[idx] || undefined === paramData[idx]) && delete paramData[idx];
        }
        return await configList(paramData).then(res => {
            return {
                data: res?.data?.list,
                success: res?.success,
                total: res?.data?.total,
            };
        });
    };

    const columns: ProColumns<configListDataItem>[] = [
        {
            width: 80,
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '配置名称',
            dataIndex: 'name',
        },
        {
            title: '字段名称',
            dataIndex: 'fname',
            hideInSearch: true,
        },
        {
            title: '字段类型',
            hideInSearch: true,
            render: (_, record) => {
                let valueType: React.ReactNode = record.formProps.valueType;
                valueOptions.forEach(item => {
                    if (item.value === record.formProps.valueType) {
                        valueType = item.label;
                    }
                });
                return valueType;
            },
        },
        {
            ellipsis: true,
            title: '配置值',
            dataIndex: 'value',
            hideInSearch: true,
            valueType: record => {
                let valueType = record?.formProps.valueType;
                if (0 <= valueType?.indexOf('upload')) {
                    valueType = 'image';
                }
                return valueType;
            },
            renderText: (text, record) => {
                let value = text;
                const valueType = record?.formProps.valueType;
                if ('switch' === valueType) {
                    value = !!Number(text);
                } else if (0 <= valueType?.indexOf('upload')) {
                    value = text.split(',').at(0);
                }
                return value;
            },
        },
        {
            sorter: true,
            title: '创建时间',
            hideInSearch: true,
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
        {
            filters: true,
            onFilter: true,
            title: '是否显示',
            filterMode: 'tree',
            hideInSearch: true,
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: {
                0: {
                    text: '隐藏',
                    status: 'disenabled',
                },
                1: {
                    text: '显示',
                    status: 'enabled',
                },
            },
            fieldProps: {
                allowClear: false,
                options: [
                    { label: '隐藏', value: 0 },
                    { label: '显示', value: 1 },
                ],
            },
            render: (_, record) => {
                return <RecordSwitch record={record} url={'/develop/config_data/status'} />;
            },
        },
        {
            title: '操作',
            search: false,
            render: (_, record) => [
                <Space size={4} key="operation">
                    <Button size="small" shape="round" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        编辑
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
            <ProTable<configListDataItem>
                rowKey="id"
                actionRef={ref}
                columns={columns}
                request={tableData}
                params={{ cid: id }}
                search={{
                    filterType: 'light',
                }}
                scroll={resize.tableScroll}
                rowSelection={{
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                }}
                pagination={{ pageSize: resize.pageSize, hideOnSinglePage: true }}
                headerTitle={
                    <Button shape="round" type="primary" key="clientCreate" icon={<PlusOutlined />} onClick={handleCreate}>
                        新增配置
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
                            <a onClick={() => handleDelete(selectedRows)}>批量删除</a>
                        </Space>
                    );
                }}
            />
            <StepForm ref={createRef} record={records} isCreate={isCreate} id={id as unknown as number} reloadTable={() => ref.current?.reload()} />
        </PageContainer>
    );
};
