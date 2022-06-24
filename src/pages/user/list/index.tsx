/** @format */

import moment from 'moment';
import { useModel } from 'umi';
import { _int2ip } from '@/extra/utils';
import { CreateUser } from './components';
import ProTable from '@ant-design/pro-table';
import React, { useState, useRef } from 'react';
import type { tableDataItem } from '@/pages/user/data';
import { PageContainer } from '@ant-design/pro-layout';
import { fetchData, remove } from '@/pages/user/service';
import { message, Button, Modal, Space, Table } from 'antd';
import { RecordSwitch } from '@/pages/components/RecordSwitch';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { EditOutlined, PlusOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';

export default () => {
    const { confirm } = Modal;
    // childRef
    const childRef: React.ForwardedRef<any> = useRef();
    // ModalForm 状态
    const [modalVisit, setModalVisit] = useState<boolean>(false);
    // ModalForm 默认值
    const [userValues, setUserValues] = useState<tableDataItem>({});
    // ModalForm 标题
    const [isCreateUser, setIsCreateUser] = useState<boolean>(false);
    // 文件列表
    const { setFileLists } = useModel('file', ret => ({
        setFileLists: ret.setFileList,
    }));
    // ActionType
    const ref: React.MutableRefObject<ActionType | undefined> = useRef<ActionType>();
    /**
     * 获取用户列表
     * @param params 参数
     * @param sort   排序
     * @param filter 筛选
     */
    const tableData = async (params: Record<string, any>, sort: any, filter: any) => {
        const paramData = Object.assign(params, sort, filter);
        // 过滤参数以避免后台接收到空值参数
        for (const idx in paramData) {
            if ('' === paramData[idx] || null === paramData[idx] || undefined === paramData[idx]) delete paramData[idx];
        }
        return await fetchData(paramData).then(res => ({
            data: res?.data?.list ?? [],
            total: res?.data?.total ?? 0,
            success: res?.success ?? true,
        }));
    };

    const handleCreate = () => {
        setFileLists([]);
        setUserValues({});
        setModalVisit(true);
        setIsCreateUser(true);
    };

    const handleEdit = (record: tableDataItem) => {
        setUserValues(record);
        setModalVisit(true);
        setIsCreateUser(false);
        childRef.current?.setUser(record.name as string);
        setFileLists([
            {
                status: 'done',
                url: record.avatar,
                uid: Math.floor(Math.random() * 100).toString(),
                name: record?.avatar?.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)?.[1] ?? '',
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
                    message.success(res.msg);
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
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '用户名',
            dataIndex: 'name',
        },
        {
            title: '中文名',
            dataIndex: 'cname',
        },
        {
            title: '用户组',
            dataIndex: 'gid',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'ip地址',
            dataIndex: 'ipaddress',
            render: (_, record) => _int2ip(record.ipaddress as number),
        },
        {
            sorter: true,
            title: '最近登录',
            dataIndex: 'last_login',
            render: (_, record) =>
                null === record.last_login ? '未曾登录' : moment(parseInt(record?.last_login ?? '1654092601') * 1000).format('YYYY-MM-DD hh:mm:ss'),
        },
        {
            sorter: true,
            title: '创建时间',
            dataIndex: 'create_time',
        },
        {
            filters: true,
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
            title: '操作',
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
                search={false}
                actionRef={ref}
                columns={columns}
                request={tableData}
                rowSelection={{
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                }}
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
                toolBarRender={() => [
                    <Button shape="round" type="primary" key="createUser" icon={<PlusOutlined />} onClick={handleCreate}>
                        新建用户
                    </Button>,
                ]}
                tableAlertOptionRender={({ selectedRows }) => {
                    return (
                        <Space size={16}>
                            <a onClick={() => handleDelete(selectedRows)}>批量删除</a>
                        </Space>
                    );
                }}
                form={{
                    syncToUrl: values => {
                        return {
                            ...values,
                        };
                    },
                }}
            />
            <CreateUser
                ref={childRef}
                record={userValues}
                modalVisit={modalVisit}
                isCreateUser={isCreateUser}
                reloadTable={() => ref.current?.reload()}
                handleSetModalVisit={(status: boolean) => setModalVisit(status)}
            />
        </PageContainer>
    );
};
