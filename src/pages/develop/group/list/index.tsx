/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import React, { useState, useRef } from 'react';
import { ProTable } from '@ant-design/pro-table';
import { CreateData } from '../modules/createData';
import { useRequest, useModel, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { groupDataItem, formProps } from '../../data';
import { message, Button, Modal, Space, Table } from 'antd';
import { RecordSwitch } from '@/pages/components/RecordSwitch';
import type { ProFormColumnsType } from '@ant-design/pro-form';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { groupDataList as fetchData, groupDataDelete, groupInfo } from '../../services';
import { QuestionCircleOutlined, DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';

export default () => {
    const id = history.location.query?.id;
    /* createRef */
    const createRef: React.ForwardedRef<any> = useRef();
    /* resize */
    const { resize } = useModel('resize', ret => ({
        resize: ret.resize,
    }));
    /* record */
    const [records, setRecords] = useState<groupDataItem>();
    /* create */
    const [create, setCreate] = useState<boolean>(false);
    /* tableColumns */
    const [tableColumns, setTableColumns] = useState<ProColumns<groupDataItem>[]>();
    /* ref ActionType */
    const ref: React.MutableRefObject<ActionType | undefined> = useRef<ActionType>();
    /* setFormColumns */
    const [formColumns, setFormColumns] = useState<ProFormColumnsType<formProps>[]>([]);

    /* handleCreate */
    const handleCreate = () => {
        setCreate(true);
        setRecords(undefined);
        createRef.current?.setModal(true);
    };

    /* 处理编辑数组 */
    const handleEdit = (record: groupDataItem) => {
        setRecords(record);
        setCreate(false);
        createRef.current?.setModal(true);
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
            // prettier-ignore
            content: record instanceof Array
				? `${titles.slice(0, 3).join('，')} 等 ${titles.length} 个数据记录` : `${record.name} 这个数据记录`,
            async onOk() {
                await groupDataDelete({ id: record instanceof Array ? ids : record.id! })
                    .then(res => {
                        res?.success && message.success(res.msg);
                        record instanceof Array && ref.current?.clearSelected!();
                    })
                    .finally(() => ref.current?.reload());
            },
            onCancel() {
                record instanceof Array && ref.current?.clearSelected!();
            },
        });
    };

    const defaultColumns: ProColumns<groupDataItem>[] = [
        {
            width: 80,
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '状态',
            filters: true,
            hideInSearch: true,
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: {
                0: { text: '禁用' },
                1: { text: '启用' },
            },
            // prettier-ignore
            render: (_, record) => (
				<RecordSwitch record={record} url={'/develop/group_data/status'} echoChecked={'启用'} echoUnChecked={'禁用'} />
			),
        },
        {
            sorter: true,
            title: '创建时间',
            hideInForm: true,
            hideInSearch: true,
            dataIndex: 'create_time',
        },
        {
            title: '创建时间',
            hideInTable: true,
            dataIndex: 'create_time',
            valueType: 'dateTimeRange',
        },
        {
            sorter: true,
            title: '更新时间',
            hideInForm: true,
            hideInSearch: true,
            dataIndex: 'update_time',
        },
        {
            title: '更新时间',
            hideInTable: true,
            dataIndex: 'update_time',
            valueType: 'dateTimeRange',
        },
        {
            title: '操作',
            hideInSearch: true,
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

    /* 设置Columns */
    useRequest(groupInfo, {
        defaultParams: [{ id: id as string }],
        onSuccess: res => {
            const formProps = res?.info?.formProps ?? [];
            const tableProps = res?.info?.tableProps ?? [];
            formProps?.map((item: formProps) => {
                if (item?.colProps?.at(0)) {
                    item.colProps = JSON.parse(item.colProps.at(0));
                } else {
                    delete item?.colProps;
                }
                if (item?.transform) {
                    item.transform = eval(item.transform as string);
                }
                if (item?.convertValue) {
                    item.convertValue = eval(item.convertValue as string);
                }
                if (item?.required) {
                    item.formItemProps = { rules: [{ required: true, message: `${item.title}不得为空` }] };
                }
                if (item?.rules && item?.formItemProps?.rules) {
                    item.formItemProps.rules.push(
                        ...item.rules.map(rule => {
                            return { pattern: new RegExp(rule.pattern.at(0) as string), message: rule.message };
                        }),
                    );
                }
                if (item?.rules && !item?.formItemProps?.rules) {
                    item.formItemProps = {
                        rules: item.rules.map(rule => {
                            return { pattern: new RegExp(rule.pattern.at(0) as string), message: rule.message };
                        }),
                    };
                }
                /* 删除冗余属性 */
                delete item?.rules;
                delete item?.required;
                delete item?.transform;
                delete item?.convertValue;
            });
            setFormColumns(formProps);
            setTableColumns(() => {
                defaultColumns.splice(1, 0, ...tableProps);
                return defaultColumns;
            });
        },
    });

    const tableData = async (params: Record<string, any>, sort: Record<string, any>, filter: Record<string, any>) => {
        const paramData = { ...params, ...sort, ...filter };
        // prettier-ignore
        for (const idx in paramData) {
            (
				'' === paramData[idx]
				|| null === paramData[idx]
				|| undefined === paramData[idx]) && delete paramData[idx];
        }
        return await fetchData(paramData).then(res => ({
            success: res?.success,
            data: res?.data?.list,
            total: res?.data?.total,
        }));
    };

    return (
        <PageContainer>
            <ProTable<groupDataItem>
                actionRef={ref}
                request={tableData}
                params={{ gid: id }}
                columns={tableColumns}
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
                        新增记录
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
            <CreateData
                ref={createRef}
                record={records}
                isCreate={create}
                formColumns={formColumns}
                gid={id as number | undefined}
                reloadTable={() => ref.current?.reload()}
            />
        </PageContainer>
    );
};
