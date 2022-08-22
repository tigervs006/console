/** @format */

import lodash from 'lodash';
import { IconMap } from '@/extra/iconsMap';
import React, { useRef, useState } from 'react';
import { useAccess, Access, useIntl } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { EditableProTable } from '@ant-design/pro-table';
import type { menuDataItem, routesDataItem } from '../data';
import { RecordSwitch } from '@/pages/components/RecordSwitch';
import { fetchMenuData, saveMenu, remove, fetchRules } from '../service';
import { Button, Cascader, message, Modal, Space, Table, Tag } from 'antd';
import { queryChildId, randomString, recursiveQuery, waitTime } from '@/extra/utils';
import type { EditableFormInstance, ActionType, ProColumns } from '@ant-design/pro-table';
import {
    QuestionCircleOutlined,
    MinusCircleOutlined,
    AppstoreAddOutlined,
    PlusCircleOutlined,
    MenuUnfoldOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    ApiOutlined,
} from '@ant-design/icons';

export default () => {
    const intl = useIntl();
    const { confirm } = Modal;
    const access = useAccess();
    // 预设数据
    const createRecord = {
        pid: 0,
        type: 1,
        sort: 50,
        status: 1,
        paths: [0],
        hideInMenu: 0,
        method: 'GET',
        locale: 'menu.',
        hideChildrenInMenu: 0,
        id: randomString(6),
    };
    /* 菜单类型 */
    const menuType = {
        1: { name: '菜单', icon: <MenuUnfoldOutlined />, color: 'blue' },
        2: { name: '按钮', icon: <AppstoreAddOutlined />, color: 'magenta' },
        3: { name: '接口', icon: <ApiOutlined />, color: 'volcano' },
    };
    // 菜单路径
    const [pid, setPid] = useState<number[]>();
    // formRef
    const formRef = useRef<EditableFormInstance>();
    // 菜单类型
    const [displayType, setDisplayType] = useState<number>(1);
    // 存放子项的id
    const [expandedIds, setexpandedIds] = useState<number[]>([]);
    // ModalForm 菜单
    const [menuData, setMenuData] = useState<menuDataItem[]>([]);
    // 控制点击展开行
    const [expandByClick, setExpandByClick] = useState<boolean>(true);
    // 当前展开的行
    const [expandedRowKey, setExpandedRowKey] = useState<number[]>([]);
    // defalutOption
    const defaultOption = [{ id: 0, pid: 0, name: '顶级菜单', locale: 'menu.top' }];
    // editableKeys
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    // ActionType
    const ref: React.MutableRefObject<ActionType | undefined> = useRef<ActionType>();

    /* 处理单个/批量删除 */
    const handleDelete = (e: React.MouseEvent<HTMLElement>, record: menuDataItem | menuDataItem[]) => {
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
            content: record instanceof Array ? `${titles.slice(0, 3).join('，')} 等 ${titles.length} 个菜单` : `${record.name} 这个菜单`,
            async onOk() {
                await remove({ id: ids }).then(res => {
                    ref.current?.reload();
                    res?.msg && message.success(res?.msg);
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
    // 处理单行编辑保存
    const handleOnSave = async (data: menuDataItem) => {
        const post = {
            ...data,
            pid: pid?.at(-1) ?? data.pid,
            paths: data?.paths instanceof Array ? data?.paths.join('-') : data?.paths,
        };
        await saveMenu(post).then(res => {
            setExpandByClick(true);
            res?.msg && message.success(res.msg);
            // prettier-ignore
            res?.status && waitTime(2000).then(() => ref.current?.reload());
        });
    };
    /* 展开/收缩状态 */
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
    /* pathToArray */
    const pathToArray = (data: menuDataItem[]) => {
        data.forEach((item: menuDataItem) => {
            // 拆分为数组后再转换成数字数组
            item.paths = 'string' === typeof item?.paths ? item?.paths!.split('-').map(Number) : item?.paths;
            item.children && pathToArray(item.children);
        });
    };
    /* nameToLocale */
    const nameToLocale = (data: menuDataItem[]) => {
        return data.map((item: menuDataItem) => {
            item.name = intl.formatMessage({ id: item.locale });
            item.children && nameToLocale(item.children);
            return item;
        });
    };
    /* 获取后台路由规则 */
    const getRules = async () => {
        return await fetchRules().then(res =>
            res.data.list.map((item: routesDataItem) => ({
                label: `[${item.method}] ${item.rule}`,
                value: item.rule,
            })),
        );
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
            // 将对象中的path转换数组
            resList && pathToArray(resList);
            // 存储菜单在选择菜单时用
            setMenuData(() => {
                /* 拷贝一份数据以实现改变对象值时而不影响原数据 */
                return nameToLocale(lodash.cloneDeep(defaultOption.concat(resList)));
            });
            // 存储存在子项的菜单id
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
            fixed: 'left',
            title: '菜单名称',
            dataIndex: 'name',
            tooltip: '显示在后台的菜单名称',
            render: (_, record) => intl.formatMessage({ id: record.locale }),
            formItemProps: () => ({
                rules: [
                    { required: true, message: '菜单名称不得为空' },
                    { type: 'string', pattern: /^\w{2,35}$/, message: '菜单名称只能是2~35个数字、字母与下划线的组合' },
                ],
            }),
        },
        {
            width: 150,
            title: '显示类型',
            dataIndex: 'type',
            valueType: 'select',
            fieldProps: {
                allowClear: false,
                options: [
                    { label: '菜单', value: 1 },
                    { label: '按钮', value: 2 },
                    { label: '接口', value: 3 },
                ],
                onChange: (value: number) => {
                    setDisplayType(value);
                    formRef.current?.setRowData!(editableKeys.toString(), { hideInMenu: 1 < value ? 1 : 0, hideChildrenInMenu: 1 < value ? 1 : 0 });
                },
            },
            render: (_, record) => {
                return (
                    <Tag icon={menuType[record.type!].icon} color={menuType[record.type!].color}>
                        {menuType[record.type!].name}
                    </Tag>
                );
            },
        },
        {
            width: 150,
            title: '菜单图标',
            dataIndex: 'icon',
            tooltip: '仅支持配置顶级菜单图标',
            fieldProps: { allowClear: false },
            /* 仅顶级菜单可以配置图标 */
            editable: () => 1 == displayType && 0 == pid?.at(-1),
            render: (_, record) => IconMap[record.icon as string],
            formItemProps: () => ({
                rules: [
                    () => ({
                        validator(_, value) {
                            const rowData = formRef.current?.getRowData!(editableKeys.toString());
                            if (!value && '0' === rowData.paths.at(-1).toString()) {
                                return Promise.reject(new Error('顶级菜单必须设置图标'));
                            }
                            return Promise.resolve();
                        },
                    }),
                    { type: 'string', pattern: /^[a-zA-Z0-9\-]+$/, message: '图标格式只能是英文字母、数字及下线线和破折号的组合' },
                ],
            }),
        },
        {
            width: 150,
            title: '菜单排序',
            dataIndex: 'sort',
            tooltip: '仅支持顶级菜单排序',
            editable: (_, record) => !record.pid,
            formItemProps: () => ({
                rules: [
                    { required: true, message: '菜单排序为必填项' },
                    { pattern: /^([1-9]|[1-9]\d{1,2})$/, message: '只能是1~999的正整数' },
                ],
            }),
        },
        {
            width: 150,
            title: '上级菜单',
            dataIndex: 'paths',
            renderFormItem: () => (
                <Cascader
                    showSearch
                    changeOnSelect
                    allowClear={false}
                    options={menuData}
                    fieldNames={{ label: 'name', value: 'id' }}
                    onChange={value => setPid(value as number[])}
                    displayRender={(labels: string[]) => labels.at(-1)}
                />
            ),
            formItemProps: () => ({ rules: [{ required: true, message: '上级菜单为必选项' }] }),
            render: (_, record) => intl.formatMessage({ id: record?.plocale ?? record?.locale }),
        },
        {
            width: 200,
            ellipsis: true,
            editable: false,
            title: '菜单路径',
            dataIndex: 'path',
            tooltip: '菜单路径由系统自动生成',
            formItemProps: () => ({ rules: [{ required: true, message: '菜单路径为必填项' }] }),
        },
        {
            width: 200,
            ellipsis: true,
            title: '路由规则',
            dataIndex: 'routes',
            valueType: 'select',
            tooltip: '后台路由规则',
            request: () => getRules(),
            editable: () => 3 == displayType,
            fieldProps: {
                showSearch: true,
                allowClear: false,
            },
            formItemProps: () => ({
                rules: [
                    () => ({
                        validator(_, value) {
                            const rowData = formRef.current?.getRowData!(editableKeys.toString());
                            if (!value && 1 < rowData.type) {
                                return Promise.reject(new Error('接口/按钮必须设置后台接口路径'));
                            }
                            return Promise.resolve();
                        },
                    }),
                ],
            }),
        },
        {
            width: 200,
            ellipsis: true,
            title: '多语言包',
            dataIndex: 'locale',
            formItemProps: () => ({ rules: [{ required: true, message: '多语言包为必填项' }] }),
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
                disabled: 1 < displayType,
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
                        disabled={1 < record.type!}
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
                disabled: 1 < displayType,
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
                        disabled={1 < record.type!}
                        fieldKey={'hideChildrenInMenu'}
                        statusField={!record.hideChildrenInMenu}
                    />
                );
            },
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
                            setPid(record.paths as number[]);
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
            <EditableProTable<menuDataItem>
                rowKey="id"
                search={false}
                actionRef={ref}
                columns={columns}
                pagination={false}
                request={tableData}
                editableFormRef={formRef}
                recordCreatorProps={false}
                scroll={{ x: 1300, y: 600 }}
                editable={{
                    editableKeys,
                    type: 'single',
                    onChange: (currentKeys, editableRows) => {
                        setEditableRowKeys(currentKeys);
                        setDisplayType(editableRows?.[0]?.type ?? 1);
                    },
                    onSave: (_, data) => handleOnSave(data),
                    onCancel: async () => setExpandByClick(true),
                    actionRender: (row, config, dom) => [dom.save, dom.cancel],
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
                    // @ts-ignore
                    <Access key="create_menu" accessible={access.btnFilter('create_menu')}>
                        <Button
                            shape="round"
                            type="primary"
                            key="createMenu"
                            icon={<PlusOutlined />}
                            onClick={() => ref.current?.addEditRecord?.(createRecord)}
                        >
                            新增菜单
                        </Button>
                    </Access>,
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
