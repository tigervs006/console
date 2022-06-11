import { useModel } from 'umi';
import type { tableDataItem } from './data';
import React, { useRef, useState } from 'react';
import { fetchData } from '@/pages/channel/service';
import { PageContainer } from '@ant-design/pro-layout';
import { Popconfirm, Button, Space, Table } from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import { CreateModalForm } from './components/CreateModalForm';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { randomString, recursiveQuery, waitTime } from '@/utils/tools';
import { RecordSwitch } from '@/pages/components/RecordSwitch/RecordSwitch';
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons';

export default () => {
  // selectOption
  const defaultOption = [{ id: 0, cname: '顶级栏目' }];
  // setFileList
  const { setFileList } = useModel('file', (ret) => ({
    setFileList: ret.setFileList,
  }));
  // ModalForm 状态
  const [modalVisit, setModalVisit] = useState<boolean>(false);
  // ModalForm 标题
  const [isCreate, setIsCreateChannel] = useState<boolean>(true);
  // ModalForm 栏目
  const [channelData, setChannelData] = useState<tableDataItem[]>([]);
  // ModalForm 默认值
  const [modalValues, setModallValues] = useState<tableDataItem>({});
  // 存放子项的id
  const [expandedIds, setexpandedIds] = useState<number[]>([]);
  // 控制点击展开行
  const [expandByClick, setExpandByClick] = useState<boolean>(true);
  // 当前展开的行
  const [expandedRowKey, setExpandedRowKey] = useState<number[]>([]);
  // editableKeys
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  // ActionType
  const ref: React.MutableRefObject<ActionType | undefined> = useRef<ActionType>();

  const handleEdit = (
    record: tableDataItem,
    e: React.MouseEvent<HTMLElement, MouseEvent> | undefined,
  ) => {
    e!.stopPropagation();
    setModallValues(record);
    setModalVisit(true);
    setExpandByClick(false);
    setIsCreateChannel(false);
    setFileList([
      {
        status: 'done',
        url: record?.banner,
        uid: Math.floor(Math.random() * 100).toString(),
        name: record?.banner?.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)?.[1] ?? '',
      },
    ]);
  };

  const handlePreview = (e: React.MouseEvent<HTMLElement>, record: tableDataItem) => {
    e.stopPropagation();
    console.log('预览栏目', record.cname);
  };
  // 处理单个/批量删除栏目
  const handleDelete = (
    e: React.MouseEvent<HTMLElement>,
    record: tableDataItem | tableDataItem[],
  ) => {
    e.stopPropagation();
    const ids: number[] = [];
    const titles: string[] = [];
    if (record instanceof Array) {
      record.forEach((item) => {
        ids.push(Number(item.id));
        titles.push(item?.cname ?? '');
      });
    }
  };
  // 处理展开/收缩状态的state
  const handleExpand = (expanded: boolean, record: tableDataItem) => {
    // 顶级栏目pid是0，需要Filter
    const ids: number[] = [record?.pid ?? 0].concat((record?.id as number) ?? null).filter(Boolean);
    setExpandedRowKey((rowKey) => {
      // 如果是展开状态且有子菜单，则直接返回
      if (expanded && record.children) {
        return ids;
        // 如果是展开状态且没有子菜单，则返回原始rowKey
      } else if (expanded && !record.children) {
        return rowKey;
        // 如果是收起状态，则找出当前id的索引，删除后返回rowKey
      } else {
        rowKey.splice(
          rowKey.findIndex((item) => item === record.id),
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
      if ('' === paramData[idx] || null === paramData[idx] || undefined === paramData[idx])
        delete paramData[idx];
    }
    return await fetchData(paramData).then((res) => {
      const resList = res?.data?.list;
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
      dataIndex: 'pid',
      fieldProps: {
        options: channelData,
        fieldNames: {
          value: 'id',
          label: 'cname',
        },
      },
      valueType: 'treeSelect',
      formItemProps: () => ({
        rules: [{ required: true, message: '上级栏目为必填项' }],
      }),
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
      valueType: 'select',
      dataIndex: 'status',
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
            title="确定编辑详情，取消编辑当前行"
            onCancel={(e) => {
              e?.stopPropagation();
              setExpandByClick(false);
              action?.startEditable?.(record.id as number);
            }}
            onConfirm={(event) => handleEdit(record, event)}
          >
            <Button
              size="small"
              shape="round"
              icon={<EditOutlined />}
              onClick={(e) => e.stopPropagation()}
            >
              编辑
            </Button>
          </Popconfirm>
          <Button
            size="small"
            shape="round"
            type="primary"
            icon={<SearchOutlined />}
            onClick={(e) => handlePreview(e, record)}
          >
            浏览
          </Button>
          <Button
            danger
            size="small"
            shape="round"
            type="primary"
            icon={<DeleteOutlined />}
            onClick={(e) => handleDelete(e, record)}
          >
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
        rowKey={(record) => record.id as number}
        editable={{
          editableKeys,
          type: 'multiple',
          onChange: setEditableRowKeys,
          actionRender: (row, config, dom) => [dom.save, dom.cancel],
          onSave: async (rowKey, data, pre) => {
            console.log('rowKey', rowKey);
            console.log('data', data);
            console.log('pre', pre);
            await waitTime(2000).then(() => setExpandByClick(true));
          },
          onCancel: async () => await waitTime(1000).then(() => setExpandByClick(true)),
          onDelete: async () => await waitTime(1000).then(() => setExpandByClick(true)),
        }}
        recordCreatorProps={{
          position: 'bottom',
          creatorButtonText: '新增栏目',
          record: {
            pid: 0,
            sort: 50,
            status: '1',
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
              <a onClick={(e) => handleDelete(e, selectedRows)}>批量删除</a>
            </Space>
          );
        }}
        form={{
          syncToUrl: (values) => {
            return {
              ...values,
            };
          },
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
