/** @format */

import lodash from 'lodash';
import { useRequest, useIntl } from 'umi';
import { IconMap } from '@/extra/iconsMap';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { EditableProTable } from '@ant-design/pro-table';
import type { groupDataItem, menuDataItem } from '../data';
import { RecordSwitch } from '@/pages/components/RecordSwitch';
import { Button, Cascader, message, Modal, Space, Table, Tag } from 'antd';
import { fetchMenuData, saveMenu, remove, fetchGroupData } from '../service';
import { queryChildId, randomString, recursiveQuery, waitTime } from '@/extra/utils';
import type { EditableFormInstance, ActionType, ProColumns } from '@ant-design/pro-table';
import { QuestionCircleOutlined, MinusCircleOutlined, PlusCircleOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

export default () => {
    const intl = useIntl();
    const { confirm } = Modal;
    // 预设数据
    const createRecord = {
        pid: 0,
        sort: 50,
        status: 1,
        paths: [0],
        hideInMenu: 0,
        locale: 'menu.',
        authority: ['0'],
        hideChildrenInMenu: 0,
        id: randomString(6),
    };
    // 菜单路径
    const [pid, setPid] = useState<number[]>();
    // formRef
    const formRef = useRef<EditableFormInstance>();
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

    /* 获取用户组列表 */
    const { data: groupData } = useRequest(fetchGroupData, { defaultParams: [{ status: 1 }] });

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
            // @ts-ignore
            paths: pid?.join('-') ?? data.paths!.join('-'),
        };
        await saveMenu(post).then(res => {
            setExpandByClick(true);
            res?.msg && message.success(res.msg);
            // prettier-ignore
            res?.status && waitTime(2000).then(() => ref.current?.reload());
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
            width: 50,
            fixed: 'left',
            editable: false,
        },
        {
            width: 150,
            fixed: 'left',
            title: '菜单名称',
            dataIndex: 'name',
            tooltip: '显示在后台的菜单名称',
            render: (_, record) => intl.formatMessage({ id: record.locale }),
            formItemProps: () => ({
                rules: [
                    { required: true, message: '菜单名称不得为空' },
                    { type: 'string', pattern: /^\w{2,12}$/, message: '菜单名称只能是2~12个数字、字母与下划线的组合' },
                ],
            }),
        },
        {
            width: 150,
            title: '菜单图标',
            dataIndex: 'icon',
            fieldProps: { allowClear: false },
            tooltip: 'Ant Design 不支持子菜单图标',
            editable: (_, record) => !record.pid,
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
                    { type: 'string', pattern: /^[\w?:\-]+$/, message: '图标格式只能是英文字母、数字及下线线和破折号的组合' },
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
                    onChange={(value: any) => setPid(value)}
                    fieldNames={{ label: 'name', value: 'id' }}
                    displayRender={(labels: string[]) => labels.at(-1)}
                />
            ),
            formItemProps: () => ({ rules: [{ required: true, message: '上级菜单为必选项' }] }),
            render: (_, record) => intl.formatMessage({ id: record?.plocale ?? record?.locale }),
        },
        {
            width: 300,
            ellipsis: true,
            title: '菜单权限',
            valueType: 'select',
            dataIndex: 'authority',
            tooltip: '设置只对指定用户组访问',
            fieldProps: {
                mode: 'multiple',
                defaultValue: ['0'],
                options: [{ label: '公共菜单', value: '0' }].concat(
                    groupData?.list?.map((item: groupDataItem) => ({
                        label: item.name,
                        value: item.id!.toString(),
                    })),
                ),
            },
            render: (_, record) => {
                const authorityItem: string[] = [];
                if (record?.authority instanceof Array) {
                    groupData?.list?.forEach((item: groupDataItem) => {
                        record?.authority!.forEach(gid => {
                            if (item.id == gid) {
                                authorityItem.push(item.name as string);
                            }
                        });
                    });
                }
                return authorityItem.length ? (
                    authorityItem.map(item => (
                        <Tag key={randomString(4)} color="blue">
                            {item}
                        </Tag>
                    ))
                ) : (
                    <Tag key={randomString(4)} color="blue">
                        公共菜单
                    </Tag>
                );
            },
            formItemProps: () => ({ rules: [{ required: true, message: '菜单权限为必选项' }] }),
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
            width: 150,
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
                scroll={{ x: 1300, y: 600 }}
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
                    creatorButtonText: '新增菜单',
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
