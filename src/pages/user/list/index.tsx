/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

/** @format */

import moment from 'moment';
import { CreateUser } from './components';
import ProTable from '@ant-design/pro-table';
import type { groupDataItem } from '../data';
import type { tableDataItem } from '../data';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { extFileFromUrl, _int2ip } from '@/extra/utils';
import { message, Button, Modal, Space, Table } from 'antd';
import { useRequest, useAccess, useModel, Access } from 'umi';
import { RecordSwitch } from '@/pages/components/RecordSwitch';
import { fetchGroupData, fetchData, remove } from '../service';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { EditOutlined, PlusOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';

export default () => {
    const { confirm } = Modal;
    const access = useAccess();
    const [userGroup, setUserGroup] = useState<
        {
            label: string;
            value: number;
        }[]
    >([]);
    /* 监听窗口变化 */
    const { resize } = useModel('resize', ret => ({
        resize: ret.resize,
    }));
    // ModalForm 状态
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    // ModalForm 默认值
    const [userValues, setUserValues] = useState<tableDataItem>({});
    // ModalForm 标题
    const [isCreateUser, setIsCreateUser] = useState<boolean>(false);
    // 文件列表
    const { setUploadList } = useModel('file', ret => ({
        setUploadList: ret.setUploadList,
    }));
    // ActionType
    const ref: React.MutableRefObject<ActionType | undefined> = useRef<ActionType>();

    /* 获取用户组列表 */
    useRequest(fetchGroupData, {
        defaultParams: [{ status: 1 }],
        onSuccess: (res: { list: groupDataItem[] }) => {
            setUserGroup(() => {
                return res?.list.map((item: groupDataItem) => ({
                    label: item.name!,
                    value: Number(item.id),
                }));
            });
        },
    });

    /**
     * 获取用户列表
     * @param params 参数
     * @param sort   排序
     * @param filter 筛选
     */
    const tableData = async (params: Record<string, any>, sort: any, filter: any) => {
        const paramData = { ...params, ...sort, ...filter };
        // 过滤参数以避免后台接收到空值参数
        for (const idx in paramData) {
            ('' === paramData[idx] || null === paramData[idx] || undefined === paramData[idx]) && delete paramData[idx];
        }
        return await fetchData(paramData).then(res => ({
            data: res?.data?.list ?? [],
            total: res?.data?.total ?? 0,
            success: res?.success ?? true,
        }));
    };

    const handleCreate = () => {
        setUploadList([]);
        setUserValues({});
        setModalOpen(true);
        setIsCreateUser(true);
    };

    const handleEdit = (record: tableDataItem) => {
        setUserValues(record);
        setModalOpen(true);
        setIsCreateUser(false);
        setUploadList([
            {
                status: 'done',
                url: record.avatar,
                uid: Math.floor(Math.random() * 100).toString(),
                name: extFileFromUrl(record?.avatar ?? '') ?? '',
            },
        ]);
    };

    const handleDelete = (record: tableDataItem | tableDataItem[]) => {
        const ids: number[] = [];
        const titles: string[] = [];
        if (record instanceof Array) {
            record.forEach(item => {
                ids.push(item.id as number);
                titles.push(item?.cname ?? '');
            });
        }
        confirm({
            centered: true,
            cancelText: '算了',
            title: '当真要删除?',
            icon: <QuestionCircleOutlined />,
            cancelButtonProps: { shape: 'round' },
            okButtonProps: { danger: true, shape: 'round' },
            content: record instanceof Array ? `${titles.slice(0, 3).join('，')} 等 ${titles.length} 个用户` : `${record.cname} 这个用户`,
            async onOk() {
                const lcoalStorageId = Number(localStorage.getItem('uid'));
                // @ts-ignore
                if (record?.id === lcoalStorageId || ids.includes(lcoalStorageId)) {
                    return message.error('亲，请不要自残');
                }
                await remove({ id: record instanceof Array ? ids : record.id! }).then(res => {
                    ref.current?.reload();
                    res?.success && message.success(res.msg);
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

    const columns: ProColumns<tableDataItem>[] = [
        {
            width: 80,
            title: 'ID',
            search: false,
            dataIndex: 'id',
        },
        {
            width: 150,
            title: '用户名',
            dataIndex: 'name',
        },
        {
            width: 150,
            search: false,
            title: '中文名',
            dataIndex: 'cname',
        },
        {
            width: 150,
            search: false,
            title: '用户组',
            dataIndex: ['group', 'name'],
        },
        {
            title: '用户组',
            dataIndex: 'gid',
            hideInTable: true,
            valueType: 'select',
            fieldProps: {
                mode: 'multiple',
                options: userGroup,
            },
        },
        {
            width: 150,
            title: '手机号',
            dataIndex: 'mobile',
        },
        {
            width: 150,
            search: false,
            title: 'Email',
            dataIndex: 'email',
        },
        {
            width: 150,
            search: false,
            title: 'ip地址',
            dataIndex: 'ipaddress',
            render: (_, record) => _int2ip(record.ipaddress as number),
        },
        {
            width: 200,
            sorter: true,
            search: false,
            title: '最近登录',
            dataIndex: 'last_login',
            render: (_, record) =>
                null === record.last_login ? '未曾登录' : moment(parseInt(record?.last_login ?? '1654092601') * 1000).format('YYYY-MM-DD hh:mm:ss'),
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
            width: 150,
            filters: true,
            search: false,
            onFilter: true,
            title: '用户状态',
            filterMode: 'tree',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: {
                1: {
                    text: '启用',
                    status: 'Show',
                },
                0: {
                    text: '禁用',
                    status: 'Hide',
                },
            },
            render: (_, record) => <RecordSwitch record={record} url={'/user/status'} echoChecked={'启用'} echoUnChecked={'禁用'} />,
        },
        {
            width: 200,
            title: '操作',
            search: false,
            fixed: 'right',
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

    return (
        <PageContainer>
            <ProTable<tableDataItem>
                rowKey="id"
                actionRef={ref}
                columns={columns}
                request={tableData}
                search={{
                    filterType: 'light',
                }}
                scroll={resize.tableScroll}
                rowSelection={{
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                }}
                pagination={{ pageSize: resize.pageSize, hideOnSinglePage: true }}
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
                headerTitle={
                    // @ts-ignore
                    <Access key="user_create_btn" accessible={access.btnFilter('user_create_btn')}>
                        <Button shape="round" type="primary" key="createUser" icon={<PlusOutlined />} onClick={handleCreate}>
                            新增用户
                        </Button>
                    </Access>
                }
                tableAlertOptionRender={({ selectedRows }) => {
                    return (
                        <Space size={16}>
                            <a onClick={() => handleDelete(selectedRows)}>批量删除</a>
                        </Space>
                    );
                }}
            />
            <CreateUser
                record={userValues}
                modalOpen={modalOpen}
                userGroupItem={userGroup}
                isCreateUser={isCreateUser}
                reloadTable={() => ref.current?.reload()}
                handleSetModalOpen={(status: boolean) => setModalOpen(status)}
            />
        </PageContainer>
    );
};
