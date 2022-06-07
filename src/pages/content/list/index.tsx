import moment from 'moment';
import { useRequest, history } from 'umi';
import ProTable from '@ant-design/pro-table';
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { fetchData, getAuthor, getChannel, remove, setStatus } from '../service';
import type {
  authorData,
  valueEnumData,
  tableDataItem,
  channelOptions,
  channelDataItem,
} from '../data';
import {
  Typography,
  InputNumber,
  Input,
  Modal,
  Button,
  message,
  Switch,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';
import {
  EditOutlined,
  SearchOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

const SelectChannel: React.FC<Record<string, any>> = (props) => {
  const [channelOptions, setChannelOptions] = useState<channelOptions[]>();
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
      {...props}
      mode="multiple"
      maxTagCount={3}
      options={channelOptions}
      placeholder="请选择栏目..."
    />
  );
};

const RecordSwitch: React.FC<{ record: tableDataItem }> = (props) => {
  const [loadings, setLoadings] = useState<boolean>(false);
  /**
   * 设置文档状态
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

const InputSearch: React.FC<Record<string, any>> = (props) => {
  return (
    <Input
      showCount
      allowClear
      {...props}
      maxLength={30}
      placeholder="请输入文档标题"
      // 失焦时清除字符串首尾的空格
      onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
        props.onChange(e.target.value.trim());
      }}
    />
  );
};

export default () => {
  const { confirm } = Modal;
  const { Text } = Typography;

  // 重载表格
  const ref: any = useRef<ActionType>();

  // 文档作者
  const [authorEnum, setAuthorEnum] = useState<valueEnumData>();

  // 获取文档作者
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
    // TODO: 正式部署时需要动态获取Domain
    window.open(`https://demo.brandsz.cn/industry/${record.channel.name}/${record.id}.html`);
  };

  /**
   * 删除文档
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
      icon: <QuestionCircleOutlined />,
      cancelButtonProps: { shape: 'round' },
      okButtonProps: { danger: true, shape: 'round' },
      content:
        // @ts-ignore
        (record.title && `《${record.title}》`) ||
        (3 < titles.length
          ? // @ts-ignore
            `${titles.slice(0, 3)}...等【${titles.length}】篇文档`
          : // @ts-ignore
            `${titles} 这【${titles.length}】篇文档`),
      async onOk() {
        // @ts-ignore
        await remove({ id: record.id || ids }).then((res) => {
          ref.current.reload();
          message.success(res.msg);
        });
      },
      onCancel() {
        console.log('取消删除文档');
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
      search: false,
      dataIndex: 'id',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      hideInTable: true,
      renderFormItem: (_, { defaultRender, ...rest }) => {
        return (
          <InputNumber
            {...rest}
            placeholder="请输入文档ID"
            formatter={(value) => value.replace(/^(0+)|\D+/g, '')}
          />
        );
      },
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
      search: false,
      copyable: true,
      title: '文档标题',
      dataIndex: 'title',
    },
    {
      title: '文档标题',
      dataIndex: 'title',
      hideInTable: true,
      renderFormItem: (_, { defaultRender, ...rest }) => {
        return <InputSearch {...rest} />;
      },
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
      renderFormItem: (_, { defaultRender, ...rest }) => {
        return <SelectChannel {...rest} />;
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
      title: '发布时间',
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
      title: '更新时间',
      dataIndex: 'update_time',
    },
    {
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
      search: false,
      filters: true,
      onFilter: true,
      title: '文档状态',
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
      title: '操作',
      search: false,
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
