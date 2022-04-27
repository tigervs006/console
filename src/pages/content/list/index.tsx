import '../index.less';
import ProTable from '@ant-design/pro-table';
import { Switch, Button, message } from 'antd';
import {PageContainer} from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import { list, update } from '@/services/ant-design-pro/api';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

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

const columns: ProColumns[] = [
  {
    width: 80,
    title: 'ID',
    dataIndex: 'id'
  },
  {
    width: 150,
    title: '文章标题',
    dataIndex: 'title'
  },
  {
    width: 80,
    title: '所属栏目',
    dataIndex: ['channel', 'cname']
  },
  {
    width: 80,
    title: '浏览总量',
    dataIndex: 'click'
  },
  {
    width: 120,
    title: '发布时间',
    dataIndex: 'create_time',
    // @ts-ignore
    sorter: (a, b) => a.create_time - b.create_time,
  },
  {
    width: 120,
    title: '更新时间',
    dataIndex: 'update_time',
    // @ts-ignore
    sorter: (a, b) => a.create_time - b.create_time,
  },
  {
    width: 80,
    title: '状态',
    dataIndex: 'status',
    render: (text, record) => [
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      <Switch key="id" loading={false} checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked={!!record.status} onChange={(checked) => handleChange(checked, record.id)} />
    ],
  },
  {
    width: 250,
    title: '操作',
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
 * 删除文章
 * @param id 文章id
 */
const handleDelete = (id: number) => {
  console.log(`当前要删除的文章ID为${id}`)
}

/**
 * 文章状态
 * @param id 文章id
 * @param checked 状态
 */
const handleChange = async (checked: boolean, id: number) => {
  const res = await update('/article/status', { id: id, status: checked ? 1 : 0 })
  if (res !== undefined)  message.success(res.msg)
}

/**
 * 获取文章列表
 * @param params 参数
 * @param sort 排序
 * @param filter 筛选
 */
const fetchData = async (params: API.PageParams, sort: any, filter: any) => {
  const res = await list('/article/list', Object.assign(params, sort, filter));
  return {
    success: res.success,
    data: res.result.data,
    total: res.result.total
  }
}


export default () => {
  return (
    <PageContainer>
      <ProTable<TableListItem>
        rowKey="id"
        columns={columns}
        request={fetchData}
      />;
    </PageContainer>
  )
}
