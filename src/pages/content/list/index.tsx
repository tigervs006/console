/** @format */

import moment from 'moment';
import ProTable from '@ant-design/pro-table';
import React, { useRef, useState } from 'react';
import { getCate } from '@/pages/channel/service';
import { useRequest, useModel, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { channelCate } from '@/pages/channel/data';
import { fetchData, getAuthor, remove } from '../service';
import { RecordSwitch } from '@/pages/components/RecordSwitch';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { authorData, valueEnumData, tableDataItem, channelDataItem } from '../data';
import { Typography, InputNumber, Modal, Button, message, Space, Table, Tag } from 'antd';
import { EditOutlined, SearchOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';

export default () => {
    const { confirm } = Modal;
    const { Text } = Typography;
    /** 监听窗口变化 */
    const { resize } = useModel('resize', ret => ({
        resize: ret.resize,
    }));
    /** 文档作者 */
    const [authorEnum, setAuthorEnum] = useState<valueEnumData>();
    /** loading */
    const [loading, setLoading] = useState<boolean>(false);
    /** 商品分类 */
    const [articleCate, setArticleCate] = useState<channelCate[]>([]);
    /** ActionType */
    const ref: React.MutableRefObject<ActionType | undefined> = useRef<ActionType>();

    /**获 取新闻栏目 */
    const channel = async () => {
        return await getCate({ nid: 1 }).then(res => {
            setArticleCate(res?.data?.list);
            return res?.data?.list.map((item: channelDataItem) => ({
                value: item.id,
                label: item.cname,
            }));
        });
    };
    /** 获取文档作者 */
    useRequest(getAuthor, {
        onSuccess: (res: { list: authorData[] }) => {
            const newObj: Record<string, { text: string; status: string }> = {};
            res?.list.map((item: authorData) => {
                newObj.anonymous = { text: '佚名', status: 'anonymous' };
                newObj[item.name] = { text: item.cname, status: item.name };
            });
            setAuthorEnum(newObj);
        },
    });

    /**
     * 编辑文档
     * @param record
     */
    const handleEdit = (record: tableDataItem) => {
        history.push({ pathname: '/content/edit', query: { id: record.id.toString() } });
    };

    /**
     * 浏览文档
     * @param record
     */
    const handlePreview = (record: tableDataItem) => {
        let fullpath: string;
        articleCate.forEach(item => {
            if (item.id === record.cid) {
                fullpath = item.fullpath;
            }
        });
        // @ts-ignore
        window.open(`/${fullpath}${record.id}.html`, 'preview');
    };

    /**
     * 删除文档
     * @param record
     */
    const handleDelete = (record: tableDataItem | tableDataItem[]) => {
        const ids: number[] = [];
        const titles: string[] = [];
        if (record instanceof Array) {
            record.forEach(item => {
                ids.push(item.id);
                titles.push(`《${item.title}》`);
            });
        }
        confirm({
            centered: true,
            cancelText: '算了',
            title: '当真要删除?',
            icon: <QuestionCircleOutlined />,
            cancelButtonProps: { shape: 'round' },
            okButtonProps: { danger: true, shape: 'round' },
            content: record instanceof Array ? `${titles.slice(0, 3).join('，')} 等 ${titles.length} 篇文档` : `${record.title} 这篇文档`,
            async onOk() {
                await remove({ id: record instanceof Array ? ids : record.id }).then(res => {
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

    /**
     * 获取文档列表
     * @param params 参数
     * @param sort   排序
     * @param filter 筛选
     */
    const tableData = async (params: Record<string, any>, sort: any, filter: any) => {
        const paramData = { ...params, ...sort, ...filter };
        // 过滤空值参数
        for (const idx in paramData) {
            ('' === paramData[idx] || null === paramData[idx] || undefined === paramData[idx]) && delete paramData[idx];
        }
        return await fetchData(paramData).then(res => {
            setLoading(false);
            return {
                data: res?.data?.list ?? [],
                total: res?.data?.total ?? 0,
                success: res?.success ?? true,
            };
        });
    };

    const columns: ProColumns<tableDataItem>[] = [
        {
            width: 80,
            title: 'ID',
            dataIndex: 'id',
            renderFormItem: (_, { defaultRender, ...rest }) => {
                return <InputNumber {...rest} placeholder="请输入文档ID" formatter={value => value.replace(/^(0+)|\D+/g, '')} />;
            },
        },
        {
            width: 150,
            title: '作者',
            search: false,
            filters: true,
            onFilter: true,
            filterMode: 'tree',
            dataIndex: 'author',
            valueType: 'select',
            valueEnum: { ...authorEnum },
        },
        {
            width: 350,
            ellipsis: true,
            title: '文档标题',
            dataIndex: 'title',
            fieldProps: { placeholder: '请输入大致的文档标题' },
        },
        {
            width: 150,
            title: '所属栏目',
            dataIndex: 'cid',
            valueType: 'select',
            request: () => channel(),
            fieldProps: { mode: 'multiple', maxTagCount: 3 },
            render: (_, record) => record.channel.cname,
        },
        {
            width: 150,
            sorter: true,
            search: false,
            title: '浏览总量',
            dataIndex: 'click',
        },
        {
            width: 200,
            sorter: true,
            title: '发布时间',
            hideInSearch: true,
            valueType: 'dateTime',
            dataIndex: 'create_time',
        },
        {
            title: '发布时间',
            hideInTable: true,
            valueType: 'dateRange',
            dataIndex: 'create_time',
            search: {
                transform: value => {
                    return {
                        startTime: value?.[0] ?? null,
                        endTime: value?.[1] ?? null,
                    };
                },
            },
            fieldProps: {
                showNow: true,
                showTime: true,
                format: 'YYYY-MM-DD HH:mm:ss',
                placeholder: ['开始时间', '结束时间'],
                ranges: {
                    Today: [moment(), moment()],
                    Yestoday: [moment().day(moment().day() - 1), moment().day(moment().day() - 1)],
                    thisWeek: [moment().startOf('week'), moment().endOf('week')],
                    lastWeek: [
                        moment()
                            .week(moment().week() - 1)
                            .startOf('week'),
                        moment()
                            .week(moment().week() - 1)
                            .endOf('week'),
                    ],
                    thisMonth: [moment().startOf('month'), moment().endOf('month')],
                    lastMonth: [
                        moment()
                            .month(moment().month() - 1)
                            .startOf('month'),
                        moment()
                            .month(moment().month() - 1)
                            .endOf('month'),
                    ],
                },
            },
        },
        {
            width: 200,
            sorter: true,
            search: false,
            title: '更新时间',
            dataIndex: 'update_time',
        },
        {
            width: 150,
            search: false,
            filters: true,
            onFilter: true,
            title: '发布方式',
            filterMode: 'tree',
            valueType: 'select',
            dataIndex: 'is_collect',
            valueEnum: {
                1: {
                    text: '采集',
                    status: 'Collect',
                },
                0: {
                    text: '原创',
                    status: 'Origin',
                },
            },
            render: (_, record) => [
                record.is_collect ? (
                    <Tag key={record.id} color="blue">
                        采集
                    </Tag>
                ) : (
                    <Tag key={record.id} color="magenta">
                        原创
                    </Tag>
                ),
            ],
        },
        {
            width: 150,
            search: false,
            filters: true,
            onFilter: true,
            title: '文档状态',
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
            render: (_, record) => <RecordSwitch record={record} url={'/article/status'} echoChecked={'显示'} echoUnChecked={'隐藏'} />,
        },
        {
            width: 250,
            title: '操作',
            search: false,
            fixed: 'right',
            render: (_, record) => [
                <Space size={4} key="operation">
                    <Button size="small" shape="round" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        编辑
                    </Button>
                    <Button size="small" type="primary" shape="round" icon={<SearchOutlined />} onClick={() => handlePreview(record)}>
                        浏览
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
                scroll={resize.tableScroll}
                search={{
                    labelWidth: 'auto',
                    defaultCollapsed: false,
                    optionRender: searchConfig => [
                        <Button key="reset" shape="round" onClick={() => searchConfig?.form?.resetFields()}>
                            重置
                        </Button>,
                        <Button
                            key="query"
                            shape="round"
                            type="primary"
                            loading={loading}
                            onClick={() => {
                                setLoading(true);
                                searchConfig?.form?.submit();
                            }}
                        >
                            查询
                        </Button>,
                    ],
                }}
                rowSelection={{
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                }}
                pagination={{ pageSize: resize.pageSize, hideOnSinglePage: true }}
                tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
                    <Space size={24}>
                        <span>
                            已选 {selectedRowKeys.length} 项
                            <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                                取消选择
                            </a>
                        </span>
                        <span>
                            总浏览量 <Text type="danger">{selectedRows && selectedRows.reduce((pre, item) => pre + item.click, 0)}</Text> 次
                        </span>
                    </Space>
                )}
                tableAlertOptionRender={({ selectedRows }) => {
                    return (
                        <Space size={16}>
                            <a onClick={() => handleDelete(selectedRows)}>批量删除</a>
                        </Space>
                    );
                }}
            />
        </PageContainer>
    );
};
