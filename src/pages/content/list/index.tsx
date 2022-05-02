import '../index.less';
import {useRequest} from 'umi';
import {useRef, useState} from 'react';
import type {ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {PageContainer} from '@ant-design/pro-layout';
import type {DataItem, valueEnumData} from "../data";
import {Button, message, Switch, Space, Table} from 'antd';
import {fetchData, getAuthor, remove, setStatus} from "../service";
import {DeleteOutlined, EditOutlined, SearchOutlined} from '@ant-design/icons';

interface ActionType {
  reload: (resetPageIndex?: boolean) => void;
  reloadAndRest: () => void;
  reset: () => void;
  clearSelected?: () => void;
  startEditable: (rowKey: number) => boolean;
  cancelEditable: (rowKey: number) => boolean;
}

export default () => {
  // 重载表格
  const ref: any = useRef<ActionType>();

  // 文章作者
  const [valueEnum , setValueEnum] = useState<valueEnumData>()
  useRequest(getAuthor, {onSuccess: (res: { list: Record<string, any> }) => {
    const newObj: Record<string, any> = {}
    res.list.map((item: Record<string, any>) => {
      newObj.anonymous = {text: '佚名', status: 'anonymous'}
      newObj[item.name] = {text: item.cname, status: item.name}
    })
    setValueEnum(newObj)
  }})

  const columns: ProColumns[] = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '作者',
      search: false,
      filters: true,
      onFilter: true,
      filterMode: 'tree',
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
        // FIXME: 不能单独控制每个switch的loading状态
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        <Switch key="id" loading={record.loading} checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked={!!record.status} onChange={(checked) => handleChange(checked, record)} />
      ]
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
   * @param id id
   */
  const handleDelete = async (id: (string | number)[]) => {
    const res = await remove({ id: id })
    if (res.success) {
      ref.current.reload()
    }
    message.success(res.msg)
  }

  /**
   * 设置文章状态
   * @param checked 状态
   * @param record 单条数据
   */
  const handleChange = async (checked: boolean, record: Record<string, any>) => {
    const res = await setStatus({ id: record.id, status: checked ? 1 : 0 })
    message.success(res.msg)
  }

  /**
   * 编辑文章
   * @param id 文章id
   */
  const handleEdit = (id: number) => {
    console.log(`当前要编辑的文章ID为：`, id)
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
   * @param sort   排序
   * @param filter 筛选
   */
  const tableData = async (params: API.PageParams, sort: any, filter: any) => {
    const paramData = Object.assign({ ...params }, sort, filter)
    // 过滤空值对象，比后台做判断更方便
    for (const idx in paramData) {
      if ('' === paramData[idx] ||　null === paramData[idx] || undefined === paramData[idx]) delete paramData[idx]
    }
    const res = await fetchData({ ...paramData })
    return {
      data: res.data.list,
      success: res.success,
      total: res.data.total
    }
  }

  /**
   * 处理request
   * @param data data
   */
  const postDatas = (data: Record<string, any>) => {
    // 添加loading元素到每条数据
    // 以单独控制每个switch按钮的loading状态
    return data.map((item: DataItem[]) => ({
      ...item,
      'loading': false
    }))
  }

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        actionRef={ref}
        columns={columns}
        request={tableData}
        postData={postDatas}
        rowSelection={{
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT]
        }}
        tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
          <Space size={24}>
          <span>已选 {selectedRowKeys.length} 项<a style={{ marginLeft: 8 }} onClick={onCleanSelected}>取消选择</a></span>
          <span>浏览量 {selectedRows && selectedRows.reduce((pre, item) => pre + item.click, 0)} 次</span>
          </Space>
        )}
        tableAlertOptionRender={({ selectedRowKeys }) => {
          return (
            <Space size={16}>
              <a onClick={() => handleDelete(selectedRowKeys)}>批量删除</a>
            </Space>
          )
        }}
      />
    </PageContainer>
  )
}
