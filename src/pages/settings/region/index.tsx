/** @format */

import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { EditableProTable } from '@ant-design/pro-table';
import { Button, message, Modal, Space, Table } from 'antd';
import type { regionDataItem } from '@/pages/settings/data';
import { fetchRegionData, remove, saveRegion } from '../service';
import { queryChildId, randomString, recursiveQuery, waitTime } from '@/extra/utils';
import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-table';
import { QuestionCircleOutlined, MinusCircleOutlined, PlusCircleOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

export default () => {
    const { confirm } = Modal;
    // 预设数据
    const createRecord = {
        pid: 0,
        code: 0,
        status: 1,
        name: '中国',
        id: randomString(6),
    };
    // 地区路径
    const [pid, setPid] = useState<number[]>();
    // formRef
    const formRef = useRef<EditableFormInstance>();
    // 存放子项的id
    const [expandedIds, setexpandedIds] = useState<number[]>([]);
    // 控制点击展开行
    const [expandByClick, setExpandByClick] = useState<boolean>(true);
    // 存放表单数据
    const [dataSource, setDataSource] = useState<regionDataItem[]>([]);
    // 当前展开的行
    const [expandedRowKey, setExpandedRowKey] = useState<number[]>([]);
    // editableKeys
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    // ActionType
    const ref: React.MutableRefObject<ActionType | undefined> = useRef<ActionType>();
    // 懒加载子节点
    const [childProps, setChildProps] = useState<{ id?: number; cid?: number }>({});

    // 处理单行编辑保存
    const handleOnSave = async (data: regionDataItem) => {
        const post = {
            ...data,
            pid: pid?.at(-1) ?? data.pid,
            // @ts-ignore
            paths: pid?.join('-') ?? data.paths!.join('-'),
        };
        await saveRegion(post).then(res => {
            setExpandByClick(true);
            res?.msg && message.success(res.msg);
            waitTime(1500).then(() => {
                setPid([0]);
                ref.current?.reload();
            });
        });
    };

    const handleDelete = (e: React.MouseEvent<HTMLElement>, record: regionDataItem | regionDataItem[]) => {
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
            content: record instanceof Array ? `${titles.slice(0, 3).join('，')} 等 ${titles.length} 个地区` : `${record.name} 这个地区`,
            async onOk() {
                await remove({ id: ids }).then(res => {
                    ref.current?.reload();
                    message.success(res?.msg);
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

    // 处理展开/收缩状态的state
    const handleExpand = (expanded: boolean, record: regionDataItem) => {
        setExpandedRowKey(rowKey => {
            // 如果是展开状态且有下级地区，合并返回
            if (expanded && record.children) {
                setChildProps({
                    id: Number(record?.id),
                    cid: record?.cid,
                });
                return rowKey.concat(record.id as number);
                // 如果是展开状态且没有子地区，则返回原始rowKey
            } else if (expanded && !record.children) {
                return rowKey;
                // 如果是收起状态，则找出当前id的索引，删除后返回rowKey
            } else {
                rowKey.splice(
                    rowKey.findIndex(item => item === record.id),
                    1,
                );
                return rowKey.length ? rowKey : [];
            }
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
        // 过滤空值参数
        for (const idx in paramData) {
            ('' === paramData[idx] || null === paramData[idx] || undefined === paramData[idx]) && delete paramData[idx];
        }
        return await fetchRegionData(paramData).then(res => {
            let resList;
            if (childProps.cid) {
                const queryParentId = (data: regionDataItem[]) => {
                    data.forEach(item => {
                        if (item.id === childProps.id) {
                            item.children = res?.data?.list;
                        }
                        item.children?.length && queryParentId(item.children);
                    });
                    return data;
                };
                resList = queryParentId(dataSource);
            } else {
                resList = res?.data?.list;
                setDataSource(resList);
            }
            setexpandedIds(recursiveQuery(resList));
            // 存储存在子项的地区id
            return {
                data: resList,
                total: res?.data?.total ?? 0,
                success: res?.success ?? true,
            };
        });
    };
    const columns: ProColumns<regionDataItem>[] = [
        {
            width: 80,
            title: '编号',
            dataIndex: 'id',
            editable: false,
        },
        {
            title: '地区名称',
            dataIndex: 'name',
        },
        {
            title: '所属地区',
            dataIndex: 'pname',
        },
        {
            title: '地区编码',
            dataIndex: 'code',
        },
        {
            editable: false,
            title: '创建时间',
            dataIndex: 'create_time',
        },
        {
            title: '操作',
            fixed: 'right',
            valueType: 'option',
            render: (text, record, _, action) => [
                <Space size={4} key="operation">
                    <Button
                        size="small"
                        shape="round"
                        icon={<EditOutlined />}
                        onClick={e => {
                            e?.stopPropagation();
                            setExpandByClick(false);
                            action?.startEditable?.(record.id as number);
                        }}
                    >
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
            <EditableProTable<regionDataItem>
                rowKey="id"
                search={false}
                actionRef={ref}
                columns={columns}
                pagination={false}
                request={tableData}
                editableFormRef={formRef}
                scroll={{ x: 1300, y: 600 }}
                params={{ pid: childProps.cid }}
                editable={{
                    editableKeys,
                    type: 'multiple',
                    onChange: setEditableRowKeys,
                    onSave: (_, data) => handleOnSave(data),
                    onCancel: async () => setExpandByClick(true),
                    actionRender: (row, config, dom) => [dom.save, dom.cancel],
                }}
                recordCreatorProps={{
                    position: 'bottom',
                    record: createRecord,
                    creatorButtonText: '新增地区',
                }}
                expandable={{
                    expandRowByClick: expandByClick,
                    expandedRowKeys: expandedRowKey,
                    onExpand: (expanded, record) => handleExpand(expanded, record),
                }}
                rowSelection={{
                    checkStrictly: false,
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
                }}
                toolBarRender={() => [
                    <Button
                        shape="round"
                        type="default"
                        key="expandedAll"
                        icon={expandedRowKey?.length ? <MinusCircleOutlined /> : <PlusCircleOutlined />}
                        onClick={() => setExpandedRowKey(expandedRowKey?.length ? [] : expandedIds)}
                    >
                        {expandedRowKey?.length ? '收起所有' : '展开所有'}
                    </Button>,
                    <Button
                        shape="round"
                        type="primary"
                        key="createMenu"
                        icon={<PlusOutlined />}
                        onClick={() => ref.current?.addEditRecord?.(createRecord)}
                    >
                        新增地区
                    </Button>,
                ]}
                tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
                    <span>
                        已选 {selectedRowKeys.length} 个地区
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
