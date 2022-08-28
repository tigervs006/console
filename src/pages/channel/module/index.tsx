/** @format */
import type { moduleDataItem } from '../data';
import React, { useRef, useState } from 'react';
import { useAccess, useModel, Access } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { EditableProTable } from '@ant-design/pro-table';
import { Button, message, Modal, Space, Table } from 'antd';
import { RecordSwitch } from '@/pages/components/RecordSwitch';
import { randomString, zh2Pinyin, waitTime } from '@/extra/utils';
import { removeModule, fetchModule, saveModule } from '../service';
import type { EditableFormInstance, ActionType, ProColumns } from '@ant-design/pro-table';
import { QuestionCircleOutlined, DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';

export default () => {
    const { confirm } = Modal;
    const access = useAccess();
    /* 预设数据 */
    const createRecord = {
        status: 1,
        name: '模型名称',
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
    const handleOnSave = async (data: moduleDataItem) => {
        await saveModule(data).then(res => {
            res?.success && message.success(res.msg);
            res?.success && waitTime(2000).then(() => ref.current?.reload());
        });
    };
    /* 处理单个/批量删除 */
    const handleDelete = (e: React.MouseEvent<HTMLElement>, record: moduleDataItem | moduleDataItem[]) => {
        e.stopPropagation();
        const ids: number[] = [];
        const titles: string[] = [];
        if (record instanceof Array) {
            record.forEach(item => {
                ids.push(item.id as number);
                titles.push(item?.name ?? '');
            });
        }
        confirm({
            centered: true,
            cancelText: '算了',
            title: '当真要删除?',
            icon: <QuestionCircleOutlined />,
            cancelButtonProps: { shape: 'round' },
            okButtonProps: { danger: true, shape: 'round' },
            content: record instanceof Array ? `${titles.slice(0, 3).join('，')} 等 ${titles.length} 个模型` : `${record.name} 这个模型`,
            async onOk() {
                await removeModule({ id: ids }).then(res => {
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
    const tableData = async (params: any, sort: any, filter: any) => {
        const paramData = { ...params, ...sort, ...filter };
        /* 过滤空值参数 */
        for (const idx in paramData) {
            ('' === paramData[idx] || null === paramData[idx] || undefined === paramData[idx]) && delete paramData[idx];
        }
        return await fetchModule(paramData).then(res => {
            const resList = res?.data?.list;
            return {
                data: resList || [],
                total: res?.data?.total ?? 0,
                success: res?.success ?? true,
            };
        });
    };
    const columns: ProColumns<moduleDataItem>[] = [
        {
            title: 'ID',
            sorter: true,
            search: false,
            readonly: true,
            dataIndex: 'id',
        },
        {
            search: false,
            title: '模型名称',
            dataIndex: 'name',
            formItemProps: () => ({
                rules: [
                    { required: true, message: '模型名称为必填项' },
                    { max: 30, message: '模型名称请控制在30个字符以内' },
                ],
            }),
            fieldProps: {
                onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
                    // prettier-ignore
                    const pinyin: string = zh2Pinyin(e.target.value)
						.replace(/\s+/g, '')
                    // prettier-ignore
                    const rowData: moduleDataItem
						= formRef.current?.getRowData!(editableKeys.toString())
                    /* 只有rowData的id为字符串时自动设置nid、ctl_name的值 */
                    // prettier-ignore
                    'string' === typeof rowData.id
                        && formRef.current?.setRowData!(editableKeys.toString(), {
                            nid: pinyin,
                            ctl_name: pinyin.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase()),
                        });
                },
            },
        },
        {
            title: '模型名称',
            dataIndex: 'name',
            hideInTable: true,
        },
        {
            search: false,
            title: '模型标识',
            dataIndex: 'nid',
            formItemProps: () => ({
                rules: [
                    { required: true, message: '模型标识为必填项' },
                    { max: 30, message: '模型标识请控制在30个字符以内' },
                    { type: 'string', pattern: /^\w+$/, message: '模型标识只能是英文、数字和下划线的组合' },
                ],
            }),
        },
        {
            title: '模型标识',
            dataIndex: 'nid',
            hideInTable: true,
        },
        {
            search: false,
            title: '控制器名',
            dataIndex: 'ctl_name',
            formItemProps: () => ({
                rules: [
                    { required: true, message: '控制器名为必填项' },
                    { max: 30, message: '控制器名请控制在30个字符以内' },
                    { type: 'string', pattern: /^[A-Z]\w+$/, message: '控制名首字母须为大写' },
                ],
            }),
        },
        {
            sorter: true,
            search: false,
            editable: false,
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
        {
            search: false,
            filters: true,
            onFilter: true,
            title: '模型状态',
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
            render: (_, record) => <RecordSwitch record={record} url={'/module/status'} />,
        },
        {
            title: '操作',
            valueType: 'option',
            render: (text, record, _, action) => [
                <Space size={4} key="operation">
                    <Button size="small" shape="round" icon={<EditOutlined />} onClick={() => action?.startEditable?.(record.id as number)}>
                        编辑
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
            <EditableProTable<moduleDataItem>
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
                    // @ts-ignore
                    <Access key="module_create_btn" accessible={access.btnFilter('modue_create_btn')}>
                        <Button
                            shape="round"
                            type="primary"
                            key="createModule"
                            icon={<PlusOutlined />}
                            onClick={() => ref.current?.addEditRecord?.(createRecord)}
                        >
                            新增模型
                        </Button>
                    </Access>
                }
                tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
                    <span>
                        已选 {selectedRowKeys.length} 个模型
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
