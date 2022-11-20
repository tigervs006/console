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
import React, { useRef, useState } from 'react';
import type { configCateDataItem } from '../data';
import { PageContainer } from '@ant-design/pro-layout';
import { EditableProTable } from '@ant-design/pro-table';
import { Button, message, Modal, Space, Table } from 'antd';
import { RecordSwitch } from '@/pages/components/RecordSwitch';
import { randomString, zh2Pinyin, waitTime } from '@/extra/utils';
import { configCateDelete, configCateList, configCateSave } from '../services';
import type { EditableFormInstance, ActionType, ProColumns } from '@ant-design/pro-table';
import { QuestionCircleOutlined, UnorderedListOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { moduleDataItem } from '@/pages/channel/data';

export default () => {
    /* 预设数据 */
    const createRecord = {
        status: 1,
        name: 'routine_',
        cname: '基本配置',
        id: randomString(4),
    };
    /* formRef */
    const formRef = useRef<EditableFormInstance>();
    /* 监听窗口变化 */
    const { resize } = useModel('resize', ret => ({
        resize: ret.resize,
    }));
    /* editableKeys */
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    /* ActionType */
    const ref: React.MutableRefObject<ActionType | undefined> = useRef<ActionType>();

    /* 处理单行编辑保存 */
    const handleOnSave = async (data: configCateDataItem) => {
        await configCateSave(data).then(res => {
            res?.success && message.success(res.msg);
            res?.success && waitTime(2000).then(() => ref.current?.reload());
        });
    };

    /* 跳转分类详情列表 */
    const handlePreview = (id: number) => {
        history.push({ pathname: '/develop/config/list', query: { id: id.toString() } });
    };

    /* 处理单个/批量删除 */
    const handleDelete = (e: React.MouseEvent<HTMLElement>, record: configCateDataItem | configCateDataItem[]) => {
        e.stopPropagation();
        const ids: number[] = [];
        const titles: string[] = [];
        if (record instanceof Array) {
            record.forEach(item => {
                ids.push(item.id as number);
                titles.push(item?.cname ?? '');
            });
        }
        Modal.confirm({
            centered: true,
            cancelText: '算了',
            title: '当真要删除?',
            icon: <QuestionCircleOutlined />,
            cancelButtonProps: { shape: 'round' },
            okButtonProps: { danger: true, shape: 'round' },
            content: record instanceof Array ? `${titles.slice(0, 3).join('，')} 等 ${titles.length} 个配置分类` : `${record.name} 这个配置分类`,
            async onOk() {
                await configCateDelete({ id: record instanceof Array ? ids : record.id }).then(res => {
                    res?.success && message.success(res.msg);
                    record instanceof Array && ref.current?.clearSelected!();
                    res?.success && waitTime(2000).then(() => ref.current?.reload());
                });
            },
            onCancel() {
                /* 只在多选的情况下清除已选择的项 */
                record instanceof Array && ref.current?.clearSelected!();
            },
        });
    };

    /**
     * 获取地区列表
     * @param params 参数
     * @param sort   排序
     * @param filter 筛选
     */
    const tableData = async (params: Record<string, any>, sort: Record<string, any>, filter: Record<string, any>) => {
        const paramData = { ...params, ...sort, ...filter };
        /* 过滤空值参数 */
        for (const idx in paramData) {
            ('' === paramData[idx] || null === paramData[idx] || undefined === paramData[idx]) && delete paramData[idx];
        }
        return await configCateList(paramData).then(res => ({
            data: res?.data?.list ?? [],
            total: res?.data?.total ?? 0,
            success: res?.success ?? true,
        }));
    };

    const columns: ProColumns<configCateDataItem>[] = [
        {
            title: '序号',
            readonly: true,
            dataIndex: 'id',
        },
        {
            title: '分类名称',
            dataIndex: 'cname',
            hideInSearch: true,
            formItemProps: () => ({
                rules: [{ required: true, message: '分类名称为必填项' }],
            }),
            fieldProps: {
                /* 失焦后自动翻译为拼音字母 */
                onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
                    const rowData: moduleDataItem = formRef.current?.getRowData!(editableKeys.toString());
                    const pinyin: string = zh2Pinyin(e.target.value).replace(/\s+/g, '');
                    // prettier-ignore
                    'string' === typeof rowData.id
                        && formRef.current?.setRowData!(editableKeys.toString(), {
                            name: `routine_${pinyin}`,
                        });
                },
            },
        },
        {
            title: '分类名称',
            hideInTable: true,
            dataIndex: 'cname',
        },
        {
            title: '分类别名',
            dataIndex: 'name',
            hideInSearch: true,
            formItemProps: () => ({
                rules: [{ required: true, message: '分类别名为必填项' }],
            }),
        },
        {
            sorter: true,
            readonly: true,
            title: '创建时间',
            hideInSearch: true,
            dataIndex: 'create_time',
        },
        {
            title: '创建时间',
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
            title: '分类状态',
            filterMode: 'tree',
            hideInSearch: true,
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: {
                0: {
                    text: '禁用',
                    status: 'disenabled',
                },
                1: {
                    text: '启用',
                    status: 'enabled',
                },
            },
            fieldProps: {
                allowClear: false,
                options: [
                    { label: '禁用', value: 0 },
                    { label: '启用', value: 1 },
                ],
            },
            render: (_, record) => {
                return <RecordSwitch echoChecked={'启用'} echoUnChecked={'禁用'} record={record} url={'/develop/config/status'} />;
            },
        },
        {
            title: '操作',
            valueType: 'option',
            render: (text, record, _, action) => [
                <Space size={4} key="operation">
                    <Button size="small" shape="round" icon={<EditOutlined />} onClick={() => action?.startEditable?.(record.id as number)}>
                        编辑
                    </Button>
                    <Button size="small" shape="round" icon={<UnorderedListOutlined />} onClick={() => handlePreview(record.id as number)}>
                        详情
                    </Button>
                    <Button danger size="small" shape="round" type="primary" icon={<DeleteOutlined />} onClick={e => handleDelete(e, record)}>
                        删除
                    </Button>
                </Space>,
            ],
        },
    ];

    return (
        <PageContainer>
            <EditableProTable<configCateDataItem>
                rowKey="id"
                actionRef={ref}
                columns={columns}
                request={tableData}
                search={{
                    filterType: 'light',
                }}
                editableFormRef={formRef}
                recordCreatorProps={false}
                scroll={resize.tableScroll}
                editable={{
                    editableKeys,
                    type: 'multiple',
                    onChange: setEditableRowKeys,
                    onSave: (_, data) => handleOnSave(data),
                    actionRender: (row, config, dom) => [dom.save, dom.cancel],
                }}
                pagination={{ pageSize: resize.pageSize, hideOnSinglePage: true }}
                rowSelection={{
                    checkStrictly: false,
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
                }}
                headerTitle={
                    <Button
                        shape="round"
                        type="primary"
                        key="createLink"
                        icon={<PlusOutlined />}
                        onClick={() => ref.current?.addEditRecord?.(createRecord)}
                    >
                        新增分类
                    </Button>
                }
                tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
                    <span>
                        已选 {selectedRowKeys.length} 个分类
                        <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                            取消选择
                        </a>
                    </span>
                )}
                tableAlertOptionRender={({ selectedRows }) => {
                    return (
                        <Space size={16}>
                            <a onClick={e => handleDelete(e, selectedRows)}>批量删除</a>
                        </Space>
                    );
                }}
            />
        </PageContainer>
    );
};
