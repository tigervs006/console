/** @format */

import moment from 'moment';
import { history } from 'umi';
import ProTable from '@ant-design/pro-table';
import { randomString } from '@/extra/utils';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { fetchData, getCate, remove } from '../service';
import { RecordSwitch } from '@/pages/components/RecordSwitch';
import type { channelDataItem, productDataItem } from '../data';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { Typography, message, Button, Space, Table, Image, Modal, Tag } from 'antd';
import { QuestionCircleOutlined, CheckCircleOutlined, DeleteOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons';

const ImagePreview: React.FC<{ album: string[] }> = props => {
    const [visible, setVisible] = useState(false);
    const renderGroup = () => {
        return props.album.map(item => <Image src={item} key={randomString(4)} />);
    };
    return (
        <>
            <Image width={50} src={props?.album[0]} fallback="/manage/logo.svg" preview={{ visible: false }} onClick={() => setVisible(true)} />
            <div style={{ display: 'none' }}>
                <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>{renderGroup()}</Image.PreviewGroup>
            </div>
        </>
    );
};

export default () => {
    const { confirm } = Modal;
    const { Text } = Typography;
    /** loading */
    const [loading, setLoading] = useState<boolean>(false);
    /** ActionType */
    const ref: React.MutableRefObject<ActionType | undefined> = useRef<ActionType>();

    /* 商品分类 */
    const category = async () => {
        return await getCate().then(res =>
            res?.data?.list.map((item: channelDataItem) => ({
                value: item.id,
                label: item.cname,
            })),
        );
    };

    /**
     * 编辑商品
     * @param record
     */
    const handleEdit = (record: productDataItem) => {
        history.push({ pathname: '/product/edit', query: { id: record.id as string } });
    };

    /**
     * 浏览商品
     * @param record
     */
    const handlePreview = (record: productDataItem) => {
        window.open(`/product/${record.id}.html`, 'preview');
    };

    /**
     * 删除商品
     * @param record
     */
    const handleDelete = (record: productDataItem | productDataItem[]) => {
        const ids: string[] = [];
        const titles: string[] = [];
        if (record instanceof Array) {
            record.forEach(item => {
                ids.push(item.id as string);
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
            content: record instanceof Array ? `${titles.slice(0, 3).join('，')} 等 ${titles.length} 个商品` : `${record.title} 这个商品`,
            async onOk() {
                await remove({ id: record instanceof Array ? ids : (record.id as string) }).then(res => {
                    ref.current?.reload();
                    message.success(res.msg);
                    /* 只在多选的情况下清除已选择的项 */
                    record instanceof Array && ref.current?.clearSelected!();
                });
            },
            onCancel() {
                /* 只在多选的情况下清除已选择的项 */
                record instanceof Array && ref.current?.clearSelected!();
            },
        });
    };
    const columns: ProColumns<productDataItem>[] = [
        {
            title: 'ID',
            search: false,
            dataIndex: 'id',
        },
        {
            search: false,
            title: '商品图片',
            render: (_, record) => <ImagePreview album={record.album as string[]} />,
        },
        {
            title: '商品名称',
            dataIndex: 'title',
        },
        {
            title: '商品分类',
            dataIndex: ['pid'],
            valueType: 'select',
            request: () => category(),
            fieldProps: { mode: 'multiple', maxTagCount: 3 },
            render: (_, record) => record.channel.cname,
        },
        {
            search: false,
            title: '商品卖点',
            dataIndex: 'special',
            render: (_, record) =>
                record.special.map(item => (
                    <Tag color="red" key={randomString(4)} icon={<CheckCircleOutlined />}>
                        {item}
                    </Tag>
                )),
        },
        {
            title: '上架时间',
            hideInTable: true,
            valueType: 'dateRange',
            dataIndex: 'dateRange',
            fieldProps: {
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
            sorter: true,
            search: false,
            title: '总浏览量',
            dataIndex: 'click',
        },
        {
            sorter: true,
            search: false,
            title: '商品价格',
            dataIndex: 'price',
            render: (_, record) => `￥ ${record.price}`,
        },
        {
            sorter: true,
            search: false,
            title: '商品销量',
            dataIndex: 'sales',
        },
        {
            sorter: true,
            search: false,
            title: '商品询盘',
            dataIndex: 'inquiries',
        },
        {
            sorter: true,
            search: false,
            title: '商品库存',
            dataIndex: 'stock',
        },
        {
            search: false,
            filters: true,
            onFilter: true,
            title: '商品状态',
            filterMode: 'tree',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: {
                1: {
                    text: '上架',
                    status: 'Enabled',
                },
                0: {
                    text: '下架',
                    status: 'Disabled',
                },
            },
            render: (_, record) => {
                // @ts-ignore
                return <RecordSwitch record={record} url={'/product/status'} echoChecked={'上架'} echoUnChecked={'下架'} />;
            },
        },
        {
            title: '操作',
            search: false,
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
    /**
     * 获取商品列表
     * @param params 参数
     * @param sort   排序
     * @param filter 筛选
     */
    const tableData = async (params: Record<string, any>, sort: any, filter: any) => {
        const paramData = Object.assign(params, sort, filter);
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
    return (
        <PageContainer>
            <ProTable<productDataItem>
                rowKey="id"
                actionRef={ref}
                columns={columns}
                request={tableData}
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
