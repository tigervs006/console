/** @format */

import { useIntl } from 'umi';
import { useModel } from 'umi';
import { IconMap } from '@/extra/iconsMap';
import { TreeSelector } from '../components';
import { PageContainer } from '@ant-design/pro-layout';
import { EditableProTable } from '@ant-design/pro-table';
import type { groupDataItem, menuDataItem } from '../data';
import React, { useEffect, useState, useRef } from 'react';
import { RecordSwitch } from '@/pages/components/RecordSwitch';
import { Button, message, Modal, Space, Table, Tag } from 'antd';
import { queryChildId, randomString, waitTime } from '@/extra/utils';
import { fetchGroupData, removeGroup, saveGroup } from '@/pages/user/service';
import type { ActionType, ProColumns, EditableFormInstance } from '@ant-design/pro-table';
import { QuestionCircleOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

export default () => {
    const intl = useIntl();
    /* 预设数据 */
    const createRecord = {
        status: 1,
        name: '用户组名',
        menu: '1,2,3,4',
        id: randomString(6),
    };
    /* confirm */
    const { confirm } = Modal;
    /* formRef */
    const formRef = useRef<EditableFormInstance>();
    /* initialState */
    const { initialState } = useModel('@@initialState');
    /* menuDataItem */
    const [menuItem, setMenuItem] = useState<menuDataItem[] | any>([]);
    /* editableKeys */
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    /* ActionType */
    const ref: React.MutableRefObject<ActionType | undefined> = useRef<ActionType>();

    useEffect(() => {
        setMenuItem(() => initialState?.userMenuItem);
    }, [initialState]);

    /* 根据id获取到locale */
    const localeMenu = (data: menuDataItem[], menuStr: string | number[], record: Record<string, string>[] = []) => {
        const menuArr = menuStr instanceof Array ? menuStr : menuStr.split(',').map(Number);
        data?.forEach((item: menuDataItem) => {
            menuArr.forEach((id: number) => {
                if (id === item.id) {
                    record.push({ icon: item.icon as string, name: item.locale as string });
                }
            });
            item.children && localeMenu(item.children, menuArr, record);
        });
        return record;
    };

    /* 处理单行编辑保存 */
    const handleOnSave = async (data: groupDataItem) => {
        await saveGroup(data).then(res => {
            res?.msg && message.success(res.msg);
            waitTime(1500).then(() => ref.current?.reload());
        });
    };

    /* 处理单个/批量删除 */
    const handleDelete = (e: React.MouseEvent<HTMLElement>, record: groupDataItem | groupDataItem[]) => {
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
            content: record instanceof Array ? `${titles.slice(0, 3).join('，')} 等 ${titles.length} 个用户组` : `${record.name} 这个用户组`,
            async onOk() {
                await removeGroup({ id: ids }).then(res => {
                    ref.current?.reload();
                    message.success(res?.msg);
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
        const paramData = Object.assign(params, sort, filter);
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
            title: '用户组权限',
            dataIndex: 'menu',
            formItemProps: () => ({
                rules: [{ require: true, message: '请为当前用户组设置合适的权限菜单' }],
            }),
            renderFormItem: () => <TreeSelector treeData={menuItem} />,
            render: (_, record) => {
                const nameArr = localeMenu(menuItem, record.menu as string);
                return nameArr.map(item => (
                    <Tag color="blue" icon={IconMap[item.icon as string]} key={randomString(4)}>
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
                pagination={false}
                request={tableData}
                editableFormRef={formRef}
                scroll={{ x: 1300, y: 600 }}
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
                    creatorButtonText: '新增用户组',
                }}
                rowSelection={{
                    checkStrictly: false,
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
                }}
                toolbar={{
                    actions: [
                        <Button
                            shape="round"
                            type="primary"
                            key="createMenu"
                            icon={<PlusOutlined />}
                            onClick={() => ref.current?.addEditRecord?.(createRecord)}
                        >
                            新建用户组
                        </Button>,
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
            />
        </PageContainer>
    );
};
