/** @format */

import { useModel, request } from 'umi';
import { ProTable } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState, useRef } from 'react';
import { Typography, message, Space, Table, Modal } from 'antd';
import { TableSchema } from '@/pages/settings/backup/components';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { backupRecordDataItem, databaseDataItem } from '../data';
import { download, optimize, deletes, backup, revert, repair } from '../service';

export default () => {
    const { confirm } = Modal;
    const { Text, Link } = Typography;
    /* 监听窗口变化 */
    const { resize } = useModel('resize', ret => ({
        resize: ret.resize,
    }));
    /* ModalForm状态 */
    const [modalVisit, setModalVisit] = useState<boolean>(false);
    /* Protable Tab */
    const [activeKey, setActiveKey] = useState<React.Key>('backup');
    /* ModalForm参数 */
    const [modalData, setModalData] = useState<{ name: string; comment: string }>();
    /* ref ActionType */
    const ref: React.MutableRefObject<ActionType | undefined> = useRef<ActionType>();
    /* ProtableTab配置 */
    const tabEnum: Record<string, { selection: any; pagination: false | Record<string, any>; url: string }> = {
        backup: {
            selection: false,
            url: '/system/database/record',
            pagination: { pageSize: resize.pageSize, hideOnSinglePage: true },
        },
        database: {
            pagination: false,
            url: '/system/database/list',
            selection: { selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE] },
        },
    };
    /* 恢复备份文件参数 */
    const [revertParam, setRevertParam] = useState<{ gz?: number; part: number; time?: number; start?: number }>();

    /* 恢复备份数据 */
    useEffect(() => {
        // prettier-ignore
        revertParam?.part
            && revert({ ...revertParam }).then(res => {
                res?.success && message.success(res.msg);
                res?.data && setRevertParam({ gz: res.data?.gz, part: res.data.part, start: res.data.start });
            });
    }, [revertParam]);

    /* 获取数据列表 */
    const tableData = async () => {
        return await request(tabEnum[activeKey].url as string, { method: 'get' }).then(res => ({
            data: res?.data?.list,
            success: res?.success,
            total: res?.data?.total,
        }));
    };

    /* 处理文件下载 */
    const handleDownload = async (record: backupRecordDataItem) => {
        await download({ time: record.time }).then(res => {
            window.open(`/console/public/download?key=${res.data.key}`, '_blank');
        });
    };

    /* 处理数据备份 */
    const handleBackup = async (record: databaseDataItem | databaseDataItem[]) => {
        const tableName = record instanceof Array ? record.map(item => item.name) : record.name;
        await backup({ tables: tableName }).then(res => {
            res?.success && message.success(res.msg);
        });
    };

    /* 处理数据修复 */
    const handleRepair = async (record: databaseDataItem | databaseDataItem[]) => {
        const tableName = record instanceof Array ? record.map(item => item.name) : record.name;
        await repair({ tables: tableName }).then(res => {
            res?.success && message.success(res.msg);
        });
    };

    /* 处理数据优化 */
    const handleOptimize = async (record: databaseDataItem | databaseDataItem[]) => {
        const tableName = record instanceof Array ? record.map(item => item.name) : record.name;
        await optimize({ tables: tableName }).then(res => {
            res?.success && message.success(res.msg);
        });
    };

    /* 查看表架构 */
    const getSchemaInfo = async (record: databaseDataItem) => {
        setModalVisit(true);
        setModalData({ name: record.name, comment: record.comment });
    };

    /* 处理文件删除 */
    const handleDelete = (e: React.MouseEvent<HTMLElement>, record: backupRecordDataItem) => {
        /* 阻止事件冒泡 */
        e.stopPropagation();
        confirm({
            centered: true,
            cancelText: '算了',
            title: '当真要删除?',
            icon: <QuestionCircleOutlined />,
            cancelButtonProps: { shape: 'round' },
            content: `${record.filename} 这个备份文件`,
            okButtonProps: { danger: true, shape: 'round' },
            async onOk() {
                await deletes({ filename: record.time }).then(res => {
                    ref.current?.reload();
                    res?.success && message.success(res.msg);
                });
            },
        });
    };

    const tabColumns: Record<string, ProColumns<backupRecordDataItem | databaseDataItem>[]> = {
        backup: [
            {
                copyable: true,
                title: '备份文件',
                dataIndex: 'filename',
            },
            {
                copyable: true,
                title: '文件标识',
                dataIndex: 'time',
            },
            {
                title: '文件大小',
                dataIndex: 'size',
            },
            {
                title: '分卷数量',
                dataIndex: 'part',
            },
            {
                title: '文件压缩',
                dataIndex: 'compress',
            },
            {
                title: '备份时间',
                dataIndex: 'backtime',
            },
            {
                title: '操作',
                fixed: 'right',
                render: (_, record) => [
                    <Space size={'middle'} key="operation">
                        <Link key="link_download" onClick={() => handleDownload(record as backupRecordDataItem)}>
                            下载
                        </Link>
                        {/* @ts-ignore */}
                        <Link key="link_revert" type="warning" onClick={() => setRevertParam({ part: record.part, time: record.time })}>
                            恢复
                        </Link>
                        <Link key="link_delete" type="danger" onClick={e => handleDelete(e, record as backupRecordDataItem)}>
                            删除
                        </Link>
                    </Space>,
                ],
            },
        ],
        database: [
            {
                copyable: true,
                title: '数据表',
                dataIndex: 'name',
            },
            {
                title: '表备注',
                dataIndex: 'comment',
            },
            {
                title: '表引擎',
                dataIndex: 'engine',
            },
            {
                title: '字符集',
                dataIndex: 'collation',
            },
            {
                title: '表大小',
                dataIndex: 'size',
            },
            {
                title: '表行数',
                dataIndex: 'rows',
            },
            {
                title: '最近更新',
                dataIndex: 'update_time',
            },
            {
                title: '操作',
                fixed: 'right',
                render: (_, record) => [
                    <Space size={'middle'} key="operations">
                        <Link key="link_backup" onClick={() => handleBackup(record as databaseDataItem)}>
                            备份
                        </Link>
                        <Link key="link_repair" onClick={() => handleRepair(record as databaseDataItem)}>
                            修复
                        </Link>
                        <Link key="link_optimize" onClick={() => handleOptimize(record as databaseDataItem)}>
                            优化
                        </Link>
                        <Link key="link_detail" onClick={() => getSchemaInfo(record as databaseDataItem)}>
                            架构
                        </Link>
                    </Space>,
                ],
            },
        ],
    };

    return (
        <PageContainer>
            <ProTable
                rowKey="id"
                search={false}
                actionRef={ref}
                request={tableData}
                scroll={resize.tableScroll}
                columns={tabColumns[activeKey]}
                pagination={tabEnum[activeKey].pagination}
                rowSelection={tabEnum[activeKey].selection}
                toolbar={{
                    menu: {
                        type: 'tab',
                        activeKey: activeKey,
                        onChange: key => {
                            ref.current?.clearSelected!();
                            setActiveKey(key as string);
                            ref.current?.reload();
                        },
                        items: [
                            {
                                key: 'backup',
                                label: '备份记录',
                            },
                            {
                                key: 'database',
                                label: '数据列表',
                            },
                        ],
                    },
                }}
                tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
                    <Space size="large">
                        <Text>已选择 {selectedRowKeys.length} 项</Text>
                        <Link onClick={onCleanSelected}>取消选择</Link>
                    </Space>
                )}
                tableAlertOptionRender={({ selectedRows }) => (
                    <Space key="batchAction" size="large">
                        <Link key="backup" onClick={() => handleBackup(selectedRows as databaseDataItem[])}>
                            备份表
                        </Link>
                        <Link key="repair" onClick={() => handleRepair(selectedRows as databaseDataItem[])}>
                            修复表
                        </Link>
                        <Link key="optimize" onClick={() => handleOptimize(selectedRows as databaseDataItem[])}>
                            优化表
                        </Link>
                    </Space>
                )}
            />
            <TableSchema record={modalData} modalVisit={modalVisit} setModalVisit={(status: boolean) => setModalVisit(status)} />
        </PageContainer>
    );
};
