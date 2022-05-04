import '../index.less';
import { useRequest } from 'umi';
import ProTable from '@ant-design/pro-table';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { fetchData, getAuthor, getChannel, remove, setStatus } from '../service';
import type { valueEnumData, authorData, tableDataItem, channelDataItem } from '../data';
import { Typography, Modal, Button, message, Switch, Select, Space, Table, Tag } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const ChannelSelect: React.FC<{ value?: string; onChange?: (value: string) => void }> = (props) => {
  const [channelOptions, setChannelOptions] = useState<{ label: string; value: number }[]>();
  // 获取新闻栏目
  useRequest(getChannel, {
    onSuccess: (res: { list: channelDataItem[] }) => {
      const channel = res?.list.map((item: channelDataItem) => ({
        label: item.cname,
        value: item.id,
      }));
      setChannelOptions(channel);
    },
  });
  return (
    <Select
      showArrow
      allowClear
      mode="multiple"
      placeholder="请选择栏目..."
      maxTagCount={3}
      options={channelOptions}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

const ArticleSwitch: React.FC<{ record: tableDataItem }> = (props) => {
  const [loadings, setLoadings] = useState<boolean>(false);
  /**
   * 设置文章状态
   * @param checked 状态
   * @param record 当前记录
   */
  const handleChange = async (checked: boolean, record: tableDataItem) => {
    setLoadings(true);
    await setStatus({ id: record.id, status: checked ? 1 : 0 }).then((res) => {
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
      onChange={(checked) => handleChange(checked, props.record)}
    />
  );
};

export default () => {
  const { confirm } = Modal;
  const { Text } = Typography;

  // 重载表格
  const ref: any = useRef<ActionType>();

  // 文章作者
  const [authorEnum, setAuthorEnum] = useState<valueEnumData>();

  // 获取文章作者
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
   * 编辑文章
   * @param record
   */
  const handleEdit = (record: tableDataItem) => {
    console.log(`当前要编辑的文章：${record}`);
  };

  /**
   * 浏览文章
   * @param record
   */
  const handlePreview = (record: tableDataItem) => {
    // TODO: 正式部署时需要动态获取Domain
    window.open(`https://demo.brandsz.cn/industry/${record.channel.name}/${record.id}.html`);
  };

  /**
   * 删除文章
   * @param record
   */
  const handleDelete = (record: tableDataItem | tableDataItem[]) => {
    const ids: number[] = [];
    const titles: string[] = [];
    if (record instanceof Array) {
      record.forEach((item) => {
        ids.push(item.id);
        titles.push(`《${item.title}》`);
      });
    }
    confirm({
      centered: true,
      cancelText: '算了',
      title: '当真要删除?',
      icon: <ExclamationCircleOutlined />,
      cancelButtonProps: { shape: 'round' },
      okButtonProps: { danger: true, shape: 'round' },
      content:
        // @ts-ignore
        (record.title && `《${record.title}》`) ||
        (3 < titles.length
          ? // @ts-ignore
            `${titles.slice(0, 3)}...等【${titles.length}】篇文章`
          : // @ts-ignore
            `${titles}这【${titles.length}】篇文章`),
      async onOk() {
        // @ts-ignore
        const res = await remove({ id: record.id || ids });
        ref.current.reload();
        message.success(res.msg);
      },
      onCancel() {},
    });
  };

  /**
   * 获取文章列表
   * @param params 参数
   * @param sort   排序
   * @param filter 筛选
   */
  const tableData = async (params: API.PageParams, sort: any, filter: any) => {
    const paramData = Object.assign({ ...params }, sort, filter);
    // 过滤空值对象，比后台做判断更方便
    for (const idx in paramData) {
      if ('' === paramData[idx] || null === paramData[idx] || undefined === paramData[idx])
        delete paramData[idx];
    }
    const res = await fetchData({ ...paramData });
    return {
      data: res?.data?.list ?? [],
      total: res?.data?.total ?? 0,
      success: res?.success ?? true,
    };
  };

  const columns: ProColumns<tableDataItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
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
      copyable: true,
      title: '文章标题',
      dataIndex: 'title',
    },
    {
      search: false,
      title: '所属栏目',
      dataIndex: ['channel', 'cname'],
    },
    {
      title: '所属栏目',
      dataIndex: 'cid',
      hideInTable: true,
      renderFormItem: ({ ...rest }) => {
        return <ChannelSelect {...rest} />;
      },
    },
    {
      sorter: true,
      search: false,
      title: '浏览总量',
      dataIndex: 'click',
    },
    {
      sorter: true,
      title: '发布时间',
      hideInSearch: true,
      valueType: 'dateTime',
      dataIndex: 'create_time',
    },
    {
      title: '创建时间',
      hideInTable: true,
      valueType: 'dateRange',
      dataIndex: 'create_time',
      search: {
        transform: (value) => {
          return {
            startTime: value?.[0] ?? null,
            endTime: value?.[1] ?? null,
          };
        },
      },
    },
    {
      sorter: true,
      search: false,
      title: '更新时间',
      dataIndex: 'update_time',
    },
    {
      search: false,
      filters: true,
      onFilter: true,
      title: '文章状态',
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
      render: (_, record) => [<ArticleSwitch key={record.id} record={record} />],
    },
    {
      search: false,
      filters: true,
      onFilter: true,
      title: '发布方式',
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
      title: '操作',
      search: false,
      render: (_, record) => [
        <Button
          key={record.id + 1}
          size="small"
          shape="round"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          编辑
        </Button>,
        <Button
          key={record.id + 2}
          size="small"
          type="primary"
          shape="round"
          icon={<SearchOutlined />}
          onClick={() => handlePreview(record)}
        >
          浏览
        </Button>,
        <Button
          key={record.id + 3}
          danger
          size="small"
          type="primary"
          shape="round"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record)}
        >
          删除
        </Button>,
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
          labelWidth: 'auto',
          defaultCollapsed: false,
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
              总浏览量{' '}
              <Text type="danger">
                {selectedRows && selectedRows.reduce((pre, item) => pre + item.click, 0)}
              </Text>{' '}
              次
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
