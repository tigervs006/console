/** @format */

import { IconMap } from '@/extra/iconsMap';
import { TreeSelector } from '../components';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { EditableProTable } from '@ant-design/pro-table';
import type { groupDataItem, menuDataItem } from '../data';
import { RecordSwitch } from '@/pages/components/RecordSwitch';
import { randomString, sortDesc, waitTime } from '@/extra/utils';
import { Button, message, Modal, Space, Table, Tag } from 'antd';
import { useRequest, useAccess, useModel, useIntl, Access } from 'umi';
import { fetchGroupData, fetchMenuData, removeGroup, saveGroup } from '../service';
import type { ActionType, ProColumns, EditableFormInstance } from '@ant-design/pro-table';
import {
    QuestionCircleOutlined,
    AppstoreAddOutlined,
    MenuUnfoldOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    ApiOutlined,
} from '@ant-design/icons';

export default () => {
    const intl = useIntl();
    const access = useAccess();
    /* 预设数据 */
    const createRecord = {
        status: 1,
        name: '用户组名',
        menu: '1,2,3,4',
        id: randomString(6),
    };
    /* confirm */
    const { confirm } = Modal;
    /* 菜单类型 */
    const menuType = {
        1: <MenuUnfoldOutlined />,
        2: <AppstoreAddOutlined />,
        3: <ApiOutlined />,
    };
    /* formRef */
    const formRef = useRef<EditableFormInstance>();
    /* 监听窗口变化 */
    const { resize } = useModel('resize', ret => ({
        resize: ret.resize,
    }));
    /* menuDataItem */
    const [menuItem, setMenuItem] = useState<menuDataItem[] | any>([]);
    /* editableKeys */
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    /* ActionType */
    const ref: React.MutableRefObject<ActionType | undefined> = useRef<ActionType>();

    /* nameToLocale */
    const nameToLocale = (data: menuDataItem[]) => {
        return data.map((item: menuDataItem) => {
            item.name = intl.formatMessage({ id: item.locale });
            item.icon = item?.icon ? IconMap[item.icon as string] : menuType[item.type as number];
            item.children && item.children.sort(sortDesc('type'));
            item.children && nameToLocale(item.children);
            return item;
        });
    };

    /* 获取所有权限列表 */
    useRequest(fetchMenuData, {
        onSuccess: (res: { list: menuDataItem[] }) => setMenuItem(() => nameToLocale(res?.list)),
    });

    /* 根据id获取到locale */
    const localeMenu = (data: menuDataItem[], menuStr: string | number[], record: Record<string, any>[] = []) => {
        const menuArr = menuStr instanceof Array ? menuStr : menuStr.split(',').map(Number);
        data?.forEach((item: menuDataItem) => {
            menuArr.forEach((id: number) => {
                if (id === item.id) {
                    record.push({
                        type: item.type as number,
                        name: item.locale as string,
                        icon: item.icon as JSX.Element,
                    });
                }
            });
            item.children && localeMenu(item.children, menuArr, record);
        });
        return record;
    };

    /* 处理单行编辑保存 */
    const handleOnSave = async (data: groupDataItem) => {
        await saveGroup(data).then(res => {
            res?.success && message.success(res.msg);
            waitTime(1500).then(() => ref.current?.reload());
        });
    };

    /* 处理单个/批量删除 */
    const handleDelete = (e: React.MouseEvent<HTMLElement>, record: groupDataItem | groupDataItem[]) => {
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
            content: record instanceof Array ? `${titles.slice(0, 3).join('，')} 等 ${titles.length} 个用户组` : `${record.name} 这个用户组`,
            async onOk() {
                await removeGroup({ id: ids }).then(res => {
                    ref.current?.reload();
                    res?.msg && message.success(res?.msg);
                    record instanceof Array && ref.current?.clearSelected!();
                });
            },
            onCancel() {
                record instanceof Array && ref.current?.clearSelected!();
            },
        });
    };

    /**
     * 获取用户组列表
     * @param params 参数
     * @param sort   排序
     * @param filter 筛选
     */
    const tableData = async (params: any, sort: any, filter: any) => {
        const paramData = { ...params, ...sort, ...filter };
        // 过滤空值参数
        for (const idx in paramData) {
            ('' === paramData[idx] || null === paramData[idx] || undefined === paramData[idx]) && delete paramData[idx];
        }
        return await fetchGroupData(paramData).then(res => {
            const resList = res?.data?.list;
            return {
                data: resList || [],
                total: res?.data?.total ?? 0,
                success: res?.success ?? true,
            };
        });
    };

    const columns: ProColumns<groupDataItem>[] = [
        {
            width: 30,
            editable: false,
        },
        {
            width: 150,
            title: '用户组名',
            dataIndex: 'name',
        },
        {
            width: 150,
            filters: true,
            onFilter: true,
            title: '用户组状态',
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
                return <RecordSwitch record={record} url={'/group/status'} echoChecked={'启用'} echoUnChecked={'禁用'} />;
            },
        },
        {
            ellipsis: true,
            title: '用户组菜单',
            dataIndex: 'menu',
            formItemProps: () => ({
                rules: [{ require: true, message: '请为当前用户组设置菜单' }],
            }),
            renderFormItem: () => <TreeSelector treeData={menuItem} />,
            render: (_, record) => {
                const nameArr = localeMenu(menuItem, record.menu as string);
                return nameArr.map(item => (
                    <Tag color="blue" icon={item.icon} key={randomString(6)}>
                        {intl.formatMessage({ id: item.name })}
                    </Tag>
                ));
            },
        },
        {
            width: 200,
            editable: false,
            title: '更新时间',
            dataIndex: 'update_time',
        },
        {
            width: 200,
            title: '操作',
            valueType: 'option',
            render: (text, record, _, action) => [
                <Space size={4} key="operation">
                    <Button
                        size="small"
                        shape="round"
                        icon={<EditOutlined />}
                        onClick={e => {
                            e?.stopPropagation();
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
            <EditableProTable<groupDataItem>
                rowKey="id"
                search={false}
                actionRef={ref}
                columns={columns}
                request={tableData}
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
                rowSelection={{
                    checkStrictly: false,
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
                }}
                toolbar={{
                    actions: [
                        // @ts-ignore
                        <Access key="group_create_btn" accessible={access.btnFilter('group_create_btn')}>
                            <Button
                                shape="round"
                                type="primary"
                                key="createGroup"
                                icon={<PlusOutlined />}
                                onClick={() => ref.current?.addEditRecord?.(createRecord)}
                            >
                                新建用户组
                            </Button>
                        </Access>,
                    ],
                }}
                tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
                    <span>
                        已选 {selectedRowKeys.length} 个用户组
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
                pagination={{ pageSize: resize.pageSize, hideOnSinglePage: true, position: ['bottomRight' as API.TablePaginationPosition] }}
            />
        </PageContainer>
    );
};
