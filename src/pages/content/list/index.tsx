import '../index.less';
import { useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { Switch, Button, message } from 'antd';
import {PageContainer} from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import { list, update } from '@/services/ant-design-pro/api';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

type valueEnum = {
  [key: string]: {
    text: string
    status: string
  }
}

type TableListItem = {
  id: number
  cid: number
  click: number
  title: number
  author: string
  status: number
  channel: string
  is_head: number
  is_recom: number
  is_collect: number
  create_time: string
  update_time: string
};

export default () => {

  const valueEnums = {
    kevin: {
      text: '甘文锋',
      status: 'kevin'
    },
    tyler: {
      text: '曹攀峰',
      status: 'tyler'
    },
    anonymous: {
      text: '匿名者',
      status: 'anonymous'
    }
  };

  /**
   * switch loading...
   */
  const [switchLoading, setSwitchLoading] = useState<boolean>(false)

  const [valueEnum, setValueEnum] = useState<valueEnum>(valueEnums)

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '作者',
      search: false,
      filters: true,
      onFilter: true,
      dataIndex: 'author',
      valueType: 'select',
      valueEnum: {...valueEnum}
    },
    {
      copyable: true,
      title: '文章标题',
      dataIndex: 'title'
    },
    {
      title: '所属栏目',
      dataIndex: ['channel', 'cname']
    },
    {
      sorter: true,
      search: false,
      title: '浏览总量',
      dataIndex: 'click'
    },
    {
      sorter: true,
      title: '发布时间',
      dataIndex: 'create_time'
    },
    {
      sorter: true,
      search: false,
      title: '更新时间',
      dataIndex: 'update_time'
    },
    {
      title: '状态',
      search: false,
      dataIndex: 'status',
      render: (text, record) => [
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        <Switch key="id" loading={switchLoading} checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked={!!record.status} onChange={(checked) => handleChange(checked, record.id)} />
      ],
    },
    {
      title: '操作',
      search: false,
      render: (text, record) => [
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        <Button key={record.id + 1} size="small" shape="round" icon={<EditOutlined />} onClick={() => handleEdit(record.id)}>编辑</Button>,
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        <Button key={record.id + 2} size="small" type="primary" shape="round" icon={<SearchOutlined />} onClick={() => handlePreview(record.id)}>浏览</Button>,
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        <Button key={record.id + 3} danger size="small" type="primary" shape="round" icon={<DeleteOutlined />} onClick={() =>　handleDelete(record.id)}>删除</Button>
      ]
    }
  ];

  /**
   * 删除文章
   * @param id 文章id
   */
  const handleDelete = (id: number) => {
    console.log(`当前要删除的文章ID为${id}`)
  }

  /**
   * 设置文章状态
   * @param id 文章id
   * @param checked 状态
   */
  const handleChange = async (checked: boolean, id: number) => {
    setSwitchLoading(true)
    const res = await update('/article/status', { id: id, status: checked ? 1 : 0 })
    setSwitchLoading(false)
    if (res !== undefined || true) message.success(res.msg)
  }

  /**
   * 编辑文章
   * @param id 文章id
   */
  const handleEdit = (id: number) => {
    console.log(`当前要编辑的文章ID为：${id}`)
  }

  /**
   * 浏览文章
   * @param id 文章id
   */
  const handlePreview = (id: number) => {
    console.log(`当前要预览的文章ID为：${id}`)
  }

  /**
   * 获取文章列表
   * @param params 参数
   * @param sort 排序
   * @param filter 筛选
   */
  const fetchData = async (params: API.PageParams, sort: any, filter: any) => {
    const paramData = Object.assign({ ...params }, sort, filter)
    // 过滤空值对象，比后台做判断更方便
    for (const idx in paramData) {
      if (paramData[idx] === '' ||　paramData[idx] === null || paramData[idx] === undefined) delete paramData[idx]
    }
    const res = await list('/article/list', paramData);
    return {
      success: res.success,
      data: res.result.data,
      total: res.result.total
    }
  }

  return (
    <PageContainer>
      <ProTable<TableListItem>
        rowKey="id"
        columns={columns}
        request={fetchData}
      />
    </PageContainer>
  )
}
