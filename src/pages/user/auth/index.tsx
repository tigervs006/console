/** @format */

import { useIntl } from 'umi';
import { fetchMenuData, saveMenu } from '../service';
import { randomString, recursiveQuery, waitTime } from '@/extra/utils';
import React, { useRef, useState } from 'react';
import type { menuDataItem } from '../data';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, EditableFormInstance } from '@ant-design/pro-table';
import { RecordSwitch } from '@/pages/components/RecordSwitch';
import { Button, message, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined, MinusCircleOutlined, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { EditableProTable } from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';

export default () => {
    const intl = useIntl();
    // 菜单路径
    const [pid, setPid] = useState<number[]>();
    // formRef
    const formRef = useRef<EditableFormInstance>();
    // selectOption
    const defaultOption = [{ id: 0, pid: 0, cname: '顶级栏目' }];
    // 存放子项的id
    const [expandedIds, setexpandedIds] = useState<number[]>([]);
    // ModalForm 状态
    const [modalVisit, setModalVisit] = useState<boolean>(false);
    // ModalForm 栏目
    const [channelData, setChannelData] = useState<menuDataItem[]>([]);
    // ModalForm 标题
    const [isCreate, setIsCreateMenu] = useState<boolean>(true);
    // 控制点击展开行
    const [expandByClick, setExpandByClick] = useState<boolean>(true);
    // ModalForm 默认值
    const [modalValues, setModallValues] = useState<menuDataItem>({});
    // 当前展开的行
    const [expandedRowKey, setExpandedRowKey] = useState<number[]>([]);
    // ActionType
    const ref: React.MutableRefObject<ActionType | undefined> = useRef<ActionType>();
    // editableKeys
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

    const handleDelete = (e: React.MouseEvent<HTMLElement>, record: menuDataItem | menuDataItem[]) => {
        e.stopPropagation();
        console.log('record', record);
    };
    // 处理单行编辑保存
    const handleOnSave = async (data: menuDataItem) => {
        const post = {
            ...data,
            single: true,
            pid: pid?.at(-1) ?? data.pid,
            // @ts-ignore
            path: pid?.join('-') ?? data.path!.join('-'),
        };
        await saveMenu(post).then(res => {
            message.success(res.msg);
            setExpandByClick(true);
            waitTime(1000).then(() => ref.current?.reload());
        });
    };
    // 处理展开/收缩状态的state
    const handleExpand = (expanded: boolean, record: menuDataItem) => {
        setExpandedRowKey(rowKey => {
            // 如果是展开状态且有子菜单，合并后返回
            if (expanded && record.children) {
                return rowKey.concat(record.id as number);
                // 如果是展开状态且没有子菜单，则返回原始rowKey
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
     * 获取菜单列表
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
        return await fetchMenuData(paramData).then(res => {
            const resList = res?.data?.list;
            // 存储栏目在选择栏目时用
            setChannelData(defaultOption.concat(resList));
            // 存储存在子项的栏目id
            setexpandedIds(recursiveQuery(resList));
            return {
                data: resList || [],
                total: res?.data?.total ?? 0,
                success: res?.success ?? true,
            };
        });
    };
    const columns: ProColumns<menuDataItem>[] = [
        {
            width: 50,
            editable: false,
        },
        {
            width: 150,
            title: '菜单名称',
            dataIndex: 'name',
            tooltip: '显示在后台的菜单名称',
            render: (_, record) => intl.formatMessage({ id: record.locale }),
        },
		{
			width: 150,
			title: '上级菜单',
			dataIndex: 'pname',
			render: (_, record) => intl.formatMessage({ id: record?.plocale }),
		},
        {
            width: 200,
            title: '菜单路径',
            dataIndex: 'path',
        },
        {
            width: 150,
            title: '多语言包',
            dataIndex: 'locale',
        },
        {
            width: 150,
            filters: true,
            onFilter: true,
            title: '菜单状态',
            filterMode: 'tree',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: {
                1: {
                    text: '启用',
                    status: 'Enabled',
                },
                0: {
                    text: '禁用',
                    status: 'Disabled',
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
                return <RecordSwitch record={record} url={'/auth/status'} echoChecked={'启用'} echoUnChecked={'禁用'} />;
            },
        },
        {
            width: 150,
            filters: true,
            onFilter: true,
            title: '严格匹配',
            filterMode: 'tree',
            dataIndex: 'exact',
            valueType: 'select',
            valueEnum: {
                1: {
                    text: '是',
                    status: 'true',
                },
                0: {
                    text: '否',
                    status: 'false',
                },
            },
            fieldProps: {
                allowClear: false,
                options: [
                    { label: '否', value: 0 },
                    { label: '是', value: 1 },
                ],
            },
            render: (_, record) => {
                return (
                    <RecordSwitch
                        record={record}
                        echoChecked={'是'}
                        fieldKey={'exact'}
                        echoUnChecked={'否'}
                        url={'/auth/status'}
                        statusField={record.exact}
                    />
                );
            },
        },
        {
            width: 150,
            filters: true,
            onFilter: true,
            title: '显示菜单',
            filterMode: 'tree',
            dataIndex: 'hideInMenu',
            valueType: 'select',
            valueEnum: {
                0: {
                    text: '显示',
                    status: 'Show',
                },
                1: {
                    text: '隐藏',
                    status: 'Hide',
                },
            },
            fieldProps: {
                allowClear: false,
                options: [
                    { label: '显示', value: 0 },
                    { label: '隐藏', value: 1 },
                ],
            },
            render: (_, record) => {
                return (
                    <RecordSwitch
                        record={record}
                        echoChecked={'显示'}
                        url={'/auth/status'}
                        echoUnChecked={'隐藏'}
                        fieldKey={'hideInMenu'}
                        statusField={!record.hideInMenu}
                    />
                );
            },
        },
        {
            width: 150,
            filters: true,
            onFilter: true,
            title: '显示子菜单',
            filterMode: 'tree',
            dataIndex: 'hideChildrenInMenu',
            valueType: 'select',
            valueEnum: {
                0: {
                    text: '显示',
                    status: 'Show',
                },
                1: {
                    text: '隐藏',
                    status: 'Hide',
                },
            },
            fieldProps: {
                allowClear: false,
                options: [
                    { label: '显示', value: 0 },
                    { label: '隐藏', value: 1 },
                ],
            },
            render: (_, record) => {
                return (
                    <RecordSwitch
                        record={record}
                        echoChecked={'显示'}
                        url={'/auth/status'}
                        echoUnChecked={'隐藏'}
                        fieldKey={'hideChildrenInMenu'}
                        statusField={!record.hideChildrenInMenu}
                    />
                );
            },
        },
        {
            title: '操作',
            render: (text, record) => [
                <Space size={4} key="operation">
                    <Button size="small" shape="round" icon={<EditOutlined />} onClick={e => e.stopPropagation()}>
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
            <EditableProTable<menuDataItem>
                rowKey="id"
                search={false}
                actionRef={ref}
                columns={columns}
                pagination={false}
                request={tableData}
                editableFormRef={formRef}
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
                    creatorButtonText: '新增菜单',
                    record: {
                        pid: 0,
                        status: 1,
                        name: 'ename',
                        id: randomString(6),
                    },
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
                        onClick={() => {
                            setModalVisit(true);
                            setModallValues({});
                            setIsCreateMenu(true);
                        }}
                    >
                        新建菜单
                    </Button>,
                ]}
                tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
                    <span>
                        已选 {selectedRowKeys.length} 个菜单
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
