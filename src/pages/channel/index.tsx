/** @format */

import { queryChildId, queryParentPath, randomString, recursiveQuery, waitTime, zh2Pinyin } from '@/extra/utils';
import { fetchData, remove, saveChannel } from '@/pages/channel/service';
import { RecordSwitch } from '@/pages/components/RecordSwitch';
import {
    DeleteOutlined,
    EditOutlined,
    MinusCircleOutlined,
    PlusCircleOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { Button, Cascader, message, Modal, Popconfirm, Space, Table } from 'antd';
import React, { useRef, useState } from 'react';
import { useModel } from 'umi';
import { CreateModalForm } from './components';
import type { tableDataItem } from './data';

export default () => {
    const { confirm } = Modal;
    // selectOption
    const defaultOption = [{ id: 0, pid: 0, cname: '顶级栏目' }];
    // setFileList
    const { setFileList } = useModel('file', ret => ({
        setFileList: ret.setFileList,
    }));
    // 栏目路径
    const [pid, setPid] = useState<number[]>();
    // formRef
    const formRef = useRef<EditableFormInstance>();
    // ModalForm 状态
    const [modalVisit, setModalVisit] = useState<boolean>(false);
    // 存放子项的id
    const [expandedIds, setexpandedIds] = useState<number[]>([]);
    // ModalForm 标题
    const [isCreate, setIsCreateChannel] = useState<boolean>(true);
    // 控制点击展开行
    const [expandByClick, setExpandByClick] = useState<boolean>(true);
    // ModalForm 默认值
    const [modalValues, setModallValues] = useState<tableDataItem>({});
    // 当前展开的行
    const [expandedRowKey, setExpandedRowKey] = useState<number[]>([]);
    // ModalForm 栏目
    const [channelData, setChannelData] = useState<tableDataItem[]>([]);
    // editableKeys
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    // ActionType
    const ref: React.MutableRefObject<ActionType | undefined> = useRef<ActionType>();

    // handleEdit
    const handleEdit = (record: tableDataItem, e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
        setPid([]);
        e!.stopPropagation();
        setModallValues(record);
        setModalVisit(true);
        setExpandByClick(false);
        setIsCreateChannel(false);
        setFileList(() => {
            if (record?.banner) {
                return [
                    {
                        status: 'done',
                        url: record.banner,
                        uid: Math.floor(Math.random() * 100).toString(),
                        name: record.banner.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)?.[1] ?? '',
                    },
                ];
            }
            return [];
        });
    };

    // pathToArray
    const pathToArray = (data: tableDataItem[]) => {
        data.forEach((item: Record<string, any>) => {
            // 拆分为数组后再转换成数字数组
            item.path = item.path.split('-').map(Number);
            if (item.children) pathToArray(item.children);
        });
    };

    // handlePreview
    const handlePreview = (e: React.MouseEvent<HTMLElement>, record: tableDataItem) => {
        e.stopPropagation();
        const path = queryParentPath(channelData, record.name as string);
        if (path.length) window.open(`/${path.join('/')}`, 'preview');
    };
    // 处理单个/批量删除栏目
    const handleDelete = (e: React.MouseEvent<HTMLElement>, record: tableDataItem | tableDataItem[]) => {
        e.stopPropagation();
        let ids: number[] = [];
        const titles: string[] = [];
        if (record instanceof Array) {
            record.forEach(item => {
                ids.push(item.id as number);
                titles.push(item?.cname ?? '');
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
            content: record instanceof Array ? `${titles.slice(0, 3).join('，')} 等 ${titles.length} 个栏目` : `${record.cname} 这个栏目`,
            async onOk() {
                await remove({ id: ids }).then(res => {
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

    // 处理单行编辑保存
    const handleOnSave = async (data: tableDataItem) => {
        const post = {
            ...data,
            single: true,
            pid: pid?.at(-1) ?? data.pid,
            // @ts-ignore
            path: pid?.join('-') ?? data.path!.join('-'),
        };
        await saveChannel(post).then(res => {
            message.success(res.msg);
            setExpandByClick(true);
            waitTime(1000).then(() => ref.current?.reload());
        });
    };

    // 处理展开/收缩状态的state
    const handleExpand = (expanded: boolean, record: tableDataItem) => {
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
     * 获取栏目列表
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
        return await fetchData(paramData).then(res => {
            const resList = res?.data?.list;
            // 将对象中的path转换数组
            if (resList) pathToArray(resList);
            // 存储栏目在选择栏目时用
            setChannelData(defaultOption.concat(resList));
            // 把存在子项的栏目id存储起来
            setexpandedIds(recursiveQuery(resList));
            return {
                data: resList || [],
                total: res?.data?.total ?? 0,
                success: res?.success ?? true,
            };
        });
    };
    const columns: ProColumns<tableDataItem>[] = [
        {
            width: 50,
            editable: false,
        },
        {
            width: 150,
            title: '栏目名称',
            dataIndex: 'cname',
            tooltip: '作为网站导航栏显示',
            fieldProps: () => ({
                onBlur: (e: React.FocusEvent<HTMLInputElement>) =>
                    formRef.current?.setRowData!(editableKeys.toString(), {
                        name: zh2Pinyin(e.target.value).replace(/\s+/g, ''),
                    }),
            }),
            formItemProps: () => ({
                rules: [
                    { required: true, message: '栏目名称为必填项' },
                    {
                        type: 'string',
                        pattern: /^[\u4e00-\u9fa5]{2,12}$/,
                        message: '栏目名称只能是2~12个汉字组成',
                    },
                ],
            }),
        },
        {
            width: 150,
            title: '上级栏目',
            dataIndex: 'path',
            formItemProps: () => ({
                rules: [{ required: true, message: '上级栏目为必填项' }],
            }),
            render: (_, record) => record.pname,
            renderFormItem: () => (
                <Cascader
                    showSearch
                    changeOnSelect
                    allowClear={false}
                    options={channelData}
                    onChange={(value: any) => setPid(value)}
                    fieldNames={{ value: 'id', label: 'cname' }}
                    // 始终只显示最后一个父级栏目名
                    displayRender={(labels: string[]) => labels.at(-1)}
                />
            ),
        },
        {
            width: 150,
            title: '栏目英文',
            dataIndex: 'name',
            tooltip: '作为网站伪静态URL',
            formItemProps: () => ({
                rules: [
                    { required: true, message: '栏目英文为必填项' },
                    {
                        type: 'string',
                        pattern: /^[a-zA-Z]{4,12}$/,
                        message: '栏目英文只能是4~12个英文字母组成',
                    },
                ],
            }),
        },
        {
            width: 150,
            key: 'sort',
            title: '栏目排序',
            dataIndex: 'sort',
            tooltip: '数值越大越靠前',
            formItemProps: () => ({
                rules: [
                    { required: true, message: '栏目排序为必填项' },
                    { pattern: /^([1-9]|[1-9]\d{1,2})$/, message: '只能是1~999的正整数' },
                ],
            }),
        },
        {
            readonly: true,
            title: '创建时间',
            dataIndex: 'create_time',
        },
        {
            readonly: true,
            title: '更新时间',
            dataIndex: 'update_time',
        },
        {
            width: 150,
            filters: true,
            onFilter: true,
            title: '栏目状态',
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
            fieldProps: {
                allowClear: false,
                options: [
                    { label: '隐藏', value: 0 },
                    { label: '显示', value: 1 },
                ],
            },
            render: (_, record) => <RecordSwitch record={record} url={'/channel/status'} />,
        },
        {
            title: '操作',
            valueType: 'option',
            render: (text, record, _, action) => [
                <Space size={4} key="operation">
                    <Popconfirm
                        okText="确定"
                        cancelText="取消"
                        title="取消为编辑当前行，点击确定编辑详情"
                        okButtonProps={{ shape: 'round' }}
                        cancelButtonProps={{ shape: 'round' }}
                        onCancel={e => {
                            e?.stopPropagation();
                            setExpandByClick(false);
                            action?.startEditable?.(record.id as number);
                        }}
                        onConfirm={event => handleEdit(record, event)}
                    >
                        <Button size="small" shape="round" icon={<EditOutlined />} onClick={e => e.stopPropagation()}>
                            编辑
                        </Button>
                    </Popconfirm>
                    <Button size="small" shape="round" type="primary" icon={<SearchOutlined />} onClick={e => handlePreview(e, record)}>
                        浏览
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
            <EditableProTable<tableDataItem>
                search={false}
                actionRef={ref}
                columns={columns}
                pagination={false}
                request={tableData}
                editableFormRef={formRef}
                rowKey={record => record.id as number}
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
                    creatorButtonText: '新增栏目',
                    record: {
                        pid: 0,
                        sort: 50,
                        path: [0],
                        status: 1,
                        name: 'ename',
                        cname: '栏目名称',
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
                        key="createChannel"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setFileList([]);
                            setModalVisit(true);
                            setModallValues({});
                            setIsCreateChannel(true);
                        }}
                    >
                        新建栏目
                    </Button>,
                ]}
                tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
                    <span>
                        已选 {selectedRowKeys.length} 个栏目
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
            <CreateModalForm
                record={modalValues}
                modalVisit={modalVisit}
                isCreateChannel={isCreate}
                reloadTable={() => ref.current?.reload()}
                setExpandByClick={(value: boolean) => setExpandByClick(value)}
                handleSetModalVisit={(value: boolean) => setModalVisit(value)}
            />
        </PageContainer>
    );
};
