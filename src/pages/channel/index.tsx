import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { fetchData, setStatus } from '@/pages/channel/service';
import React, { useRef, useState } from 'react';
import type { tableDataItem } from './data';
import { Button, message, Space, Switch, Table } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';

const RecordSwitch: React.FC<{ record: tableDataItem }> = (props) => {
  const [loadings, setLoadings] = useState<boolean>(false);
  /**
   * 设置栏目状态
   * @param e 事件
   * @param checked 状态
   * @param record 当前记录
   */
  const handleChange = async (checked: boolean, e: MouseEvent, record: tableDataItem) => {
    // 阻止事件冒泡
    e.stopPropagation();
    setLoadings(true);
    await setStatus({ id: Number(record.id), status: checked ? 1 : 0 }).then((res) => {
      setLoadings(false);
      message.success(res.msg);
    });
  };
  return (
    <Switch
      key="id"
      loading={loadings}
      checkedChildren="显示"
      unCheckedChildren="隐藏"
      defaultChecked={!!props.record.status}
      onChange={(checked, event) => handleChange(checked, event, props.record)}
    />
  );
};
export default () => {
  // 重载表格
  const ref: any = useRef<ActionType>();
  // 当前展开的行
  const [expandedRowKey, setExpandedRowKey] = useState<number[]>([]);

  const handleEdit = (record: tableDataItem) => {
    console.log('编辑栏目', record.cname);
  };

  const handlePreview = (record: tableDataItem) => {
    console.log('预览栏目', record.cname);
  };
  // 处理单个/批量删除栏目
  const handleDelete = (record: tableDataItem | tableDataItem[]) => {
    const ids: number[] = [];
    const titles: string[] = [];
    if (record instanceof Array) {
      record.forEach((item) => {
        ids.push(Number(item.id));
        titles.push(item.cname);
      });
    }
  };
  // 处理展开/收缩状态的state
  const handleExpand = (expanded: boolean, record: tableDataItem) => {
    // 顶级栏目pid是0，需要Filter
    const ids: number[] = [record.pid].concat(Number(record.id)).filter(Boolean);
    setExpandedRowKey((state) => {
      // 如果是展开状态且有子菜单，则直接返回
      if (expanded && record.children) {
        return ids;
        // 如果是展开状态且没有子菜单，则返回原始state
      } else if (expanded && !record.children) {
        return state;
        // 如果是收缩状态，则找出当前id的索引，删除后返回原始state
      } else {
        state.splice(
          state.findIndex((item) => item === record.id),
          1,
        );
        return state;
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
    return await fetchData(paramData).then((res) => ({
      data: res?.data?.list ?? [],
      total: res?.data?.total ?? 0,
      success: res?.success ?? true,
    }));
  };
  const columns: ProColumns<tableDataItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '上级栏目',
      dataIndex: 'pid',
    },
    {
      title: '栏目英文',
      dataIndex: 'name',
    },
    {
      title: '栏目中文',
      dataIndex: 'cname',
    },
    {
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
      render: (_, record) => <RecordSwitch key={record.id} record={record} />,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
    },
    {
      title: '操作',
      render: (_, record) => [
        <Space size={4} key="operation">
          <Button
            size="small"
            shape="round"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            size="small"
            type="primary"
            shape="round"
            icon={<SearchOutlined />}
            onClick={() => handlePreview(record)}
          >
            浏览
          </Button>
          <Button
            danger
            size="small"
            type="primary"
            shape="round"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            删除
          </Button>
        </Space>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<tableDataItem>
        search={false}
        actionRef={ref}
        columns={columns}
        pagination={false}
        request={tableData}
        expandable={{
          expandRowByClick: true,
          defaultExpandAllRows: true,
          expandedRowKeys: expandedRowKey,
          onExpand: (expanded, record) => handleExpand(expanded, record),
        }}
        rowSelection={{
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        rowKey={(record) => Number(record.id)}
        toolbar={{
          actions: [
            <Button
              shape="round"
              type="default"
              key="expandedAll"
              icon={<PlusCircleOutlined />}
              onClick={() => message.info('展开所有栏目')}
            >
              展开所有
            </Button>,
            <Button
              shape="round"
              type="primary"
              key="createChannel"
              icon={<PlusOutlined />}
              onClick={() => message.info('你点击了新建栏目')}
            >
              新建栏目
            </Button>,
          ],
        }}
        tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
          <span>
            已选 {selectedRowKeys.length} 项
            <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
              取消选择
            </a>
          </span>
        )}
        tableAlertOptionRender={({ selectedRows }) => {
          return (
            <Space size={16}>
              <a onClick={() => handleDelete(selectedRows)}>批量删除</a>
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
    </PageContainer>
  );
};
