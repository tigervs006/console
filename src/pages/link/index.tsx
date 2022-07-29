/** @format */

import type { linkDataItem } from './data';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { EditableProTable } from '@ant-design/pro-table';
import { Button, message, Modal, Space, Table } from 'antd';
import { RecordSwitch } from '@/pages/components/RecordSwitch';
import { queryChildId, randomString, waitTime } from '@/extra/utils';
import { fetchLink, removeLink, saveLink } from '@/pages/link/service';
import type { EditableFormInstance, ActionType, ProColumns } from '@ant-design/pro-table';
import { QuestionCircleOutlined, DeleteOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons';

export default () => {
    const { confirm } = Modal;
    /* 预设数据 */
    const createRecord = {
        sort: 0,
        status: 1,
        name: '友链名称',
        contact: 18000000000,
        url: 'https://xxx.com',
        id: randomString(4),
        description: '权重5，行业相关性大',
    };
    /* formRef */
    const formRef = useRef<EditableFormInstance>();
    /* editableKeys */
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    /* ActionType */
    const ref: React.MutableRefObject<ActionType | undefined> = useRef<ActionType>();

    /* 处理单行编辑保存 */
    const handleOnSave = async (data: linkDataItem) => {
        await saveLink(data).then(res => {
            res?.msg && message.success(res.msg);
            res?.status && waitTime(2000).then(() => ref.current?.reload());
        });
    };
    /* 处理单个/批量删除 */
    const handleDelete = (e: React.MouseEvent<HTMLElement>, record: linkDataItem | linkDataItem[]) => {
        e.stopPropagation();
        let ids: number[] = [];
        const titles: string[] = [];
        if (record instanceof Array) {
            record.forEach(item => {
                ids.push(item.id as number);
                titles.push(item?.name ?? '');
            });
        } else {
            ids = queryChildId([record]);
        }
        confirm({
            centered: true,
            cancelText: '算了',
            title: '当真要删除?',
            icon: <QuestionCircleOutlined />,
            cancelButtonProps: { shape: 'round' },
            okButtonProps: { danger: true, shape: 'round' },
            content: record instanceof Array ? `${titles.slice(0, 3).join('，')} 等 ${titles.length} 个友链` : `${record.name} 这个友链`,
            async onOk() {
                await removeLink({ id: ids }).then(res => {
                    res?.msg && message.success(res.msg);
                    record instanceof Array && ref.current?.clearSelected!();
                    res?.status && waitTime(2000).then(() => ref.current?.reload());
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
    const tableData = async (params: any, sort: any, filter: any) => {
        const paramData = Object.assign(params, sort, filter);
        /* 过滤空值参数 */
        for (const idx in paramData) {
            ('' === paramData[idx] || null === paramData[idx] || undefined === paramData[idx]) && delete paramData[idx];
        }
        return await fetchLink(paramData).then(res => {
            const resList = res?.data?.list;
            return {
                data: resList || [],
                total: res?.data?.total ?? 0,
                success: res?.success ?? true,
            };
        });
    };
    const columns: ProColumns<linkDataItem>[] = [
        {
            width: 50,
            title: 'ID',
            sorter: true,
            fixed: 'left',
            editable: false,
            dataIndex: 'id',
        },
        {
            width: 100,
            fixed: 'left',
            title: '友链名称',
            dataIndex: 'name',
            formItemProps: () => ({
                rules: [
                    { required: true, message: '友链名称为必填项' },
                    { max: 15, message: '友链名称请控制在15个字符以内' },
                ],
            }),
        },
        {
            width: 150,
            title: '友链地址',
            dataIndex: 'url',
            formItemProps: () => ({
                rules: [
                    { required: true, message: '友链地址为必填项' },
                    { type: 'url', message: '不是有效的url地址' },
                ],
            }),
        },
        {
            width: 150,
            title: '联络方式',
            dataIndex: 'contact',
            tooltip: 'QQ/微信/电话',
            formItemProps: () => ({
                rules: [
                    { required: true, message: '联络方式为必填项' },
                    { max: 20, message: '联络方式请控制在20个字符以内' },
                ],
            }),
        },
        {
            width: 200,
            ellipsis: true,
            title: '其它备注',
            dataIndex: 'description',
            formItemProps: () => ({
                rules: [{ max: 50, message: '备注信息请控制在50个字符以内' }],
            }),
        },
        {
            width: 100,
            sorter: true,
            title: '友链排序',
            dataIndex: 'sort',
            tooltip: '数值越大越靠前',
            formItemProps: () => ({
                rules: [
                    { required: true, message: '友链排序为必填项' },
                    { pattern: /^([1-9]|[1-9]\d{1,2})$/, message: '只能是1~999的正整数' },
                ],
            }),
        },
        {
            width: 150,
            sorter: true,
            editable: false,
            title: '创建时间',
            dataIndex: 'create_time',
        },
        {
            width: 100,
            filters: true,
            onFilter: true,
            title: '友链状态',
            filterMode: 'tree',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: {
                1: {
                    text: '显示',
                    status: 'Show',
                },
                0: {
                    text: '隐藏',
                    status: 'Hide',
                },
            },
            fieldProps: {
                allowClear: false,
                options: [
                    { label: '隐藏', value: 0 },
                    { label: '显示', value: 1 },
                ],
            },
            render: (_, record) => <RecordSwitch record={record} url={'/link/status'} />,
        },
        {
            title: '操作',
            fixed: 'right',
            valueType: 'option',
            render: (text, record, _, action) => [
                <Space size={4} key="operation">
                    <Button size="small" shape="round" icon={<EditOutlined />} onClick={() => action?.startEditable?.(record.id as number)}>
                        编辑
                    </Button>
                    <Button size="small" shape="round" type="primary" icon={<SearchOutlined />} onClick={() => window.open(record.url)}>
                        浏览
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
            <EditableProTable<linkDataItem>
                rowKey="id"
                actionRef={ref}
                columns={columns}
                request={tableData}
                headerTitle="友链管理"
                editableFormRef={formRef}
                scroll={{ x: 1300, y: 600 }}
                pagination={{ pageSize: 15 }}
                editable={{
                    editableKeys,
                    type: 'multiple',
                    onChange: setEditableRowKeys,
                    onSave: (_, data) => handleOnSave(data),
                    actionRender: (row, config, dom) => [dom.save, dom.cancel],
                }}
                recordCreatorProps={{
                    position: 'bottom',
                    record: createRecord,
                    creatorButtonText: '新增友链',
                }}
                rowSelection={{
                    checkStrictly: false,
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
                }}
                tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
                    <span>
                        已选 {selectedRowKeys.length} 个友链
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