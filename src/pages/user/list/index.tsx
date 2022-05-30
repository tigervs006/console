import moment from 'moment';
import { _int2ip } from '@/utils/tools';
import ProTable from '@ant-design/pro-table';
import React, { useRef, useState } from 'react';
import type { tableDataItem } from '@/pages/user/data';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Button, message, Modal, Space, Switch, Table } from 'antd';
import { fetchData, setStatus, remove } from '@/pages/user/service';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

const RecordSwitch: React.FC<{
  record: tableDataItem;
}> = (props) => {
  const [loadings, setLoadings] = useState<boolean>(false);
  /**
   * 设置用户状态
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
      checkedChildren="启用"
      unCheckedChildren="禁用"
      defaultChecked={!!props.record.status}
      onChange={(checked) => handleChange(checked, props.record)}
    />
  );
};

const CreateUser: React.FC<{
  modalVisit: boolean;
  isCreateUser: boolean;
  handleSetModalVisit: (status: boolean) => void;
}> = (props) => {
  const formRef = useRef<ProFormInstance>();
  const modalTitle = props.isCreateUser ? '新增用户' : '编辑用户';
  return (
    <ModalForm<tableDataItem>
      modalProps={{
        centered: true,
        maskClosable: false,
        destroyOnClose: true,
        onCancel: () => console.log('onCancel'),
      }}
      submitter={{
        searchConfig: {
          resetText: '重置',
        },
        submitButtonProps: {
          shape: 'round',
        },
        resetButtonProps: {
          shape: 'round',
          type: 'default',
          onClick: () => formRef.current?.resetFields(),
        },
      }}
      width={500}
      formRef={formRef}
      autoFocusFirstInput
      title={modalTitle}
      submitTimeout={2000}
      visible={props.modalVisit}
      onVisibleChange={props.handleSetModalVisit}
      onFinish={async (values) => {
        console.log('modalForm', values);
        return true;
      }}
    >
      <ProFormText
        hasFeedback
        name="name"
        label="用户名"
        tooltip="你的登录账号"
        placeholder="请输入用户名"
        fieldProps={{ maxLength: 20, showCount: true }}
        rules={[
          { required: true, message: '请输入用户名' },
          { type: 'string', pattern: /^\w+$/, message: '用户名只能是英文或数字加下横线组合' },
        ]}
      />
      <ProFormText
        hasFeedback
        name="cname"
        label="用户姓名"
        tooltip="你的真实姓名"
        placeholder="请输入用户姓名"
        fieldProps={{ maxLength: 8, showCount: true }}
        rules={[
          { required: true, message: '请输入用户姓名' },
          {
            type: 'string',
            pattern: /^[\u4e00-\u9fa5A-Za-z]+$/,
            message: '用户姓名只能是中文或英文字母组合',
          },
        ]}
      />
      <ProFormText
        hasFeedback
        name="email"
        label="用户邮箱"
        tooltip="你的邮箱"
        placeholder="请输入邮箱地址"
        fieldProps={{ maxLength: 32, showCount: true }}
        rules={[
          { required: true, message: '请输入用户邮箱地址' },
          { type: 'email', message: '请输入正确的邮箱地址' },
        ]}
      />
      <ProFormText.Password
        hasFeedback
        name="password"
        label="用户密码"
        fieldProps={{ minLength: 6, maxLength: 18, showCount: true }}
        rules={[
          { required: true, message: '请为用户设置密码' },
          {
            type: 'string',
            pattern: /^[^\u4e00-\u9fa5\s]{6,18}$/,
            message: '密码应为6~18位英文、数字及特殊符号组成且不含制表符',
          },
        ]}
      />
      <ProFormText.Password
        hasFeedback
        label="确认密码"
        name="confirmPassword"
        dependencies={['password']}
        fieldProps={{ minLength: 6, maxLength: 18, showCount: true }}
        rules={[
          { required: true, message: '请再次输入以确认用户密码' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('验证错误，两次输入的密码不一致'));
            },
          }),
        ]}
      />
    </ModalForm>
  );
};

export default () => {
  const { confirm } = Modal;
  // 表格重载
  const ref: any = useRef<ActionType>();
  // ModalForm 状态
  const [modalVisit, setModalVisit] = useState<boolean>(false);
  // ModalForm 标题
  const [isCreateUser, setIsCreateUser] = useState<boolean>(false);

  /**
   * 获取文档列表
   * @param params 参数
   * @param sort   排序
   * @param filter 筛选
   */
  const tableData = async (params: API.PageParams, sort: any, filter: any) => {
    const paramData = Object.assign({ ...params }, sort, filter);
    // 过滤参数以避免后台接收到空值参数
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

  const handleCreate = () => {
    setModalVisit(true);
    setIsCreateUser(true);
  };

  const handleEdit = (record: tableDataItem) => {
    setModalVisit(true);
    setIsCreateUser(false);
    console.log(`编辑用户：${record.cname}`);
  };

  const handleDelete = (record: tableDataItem | tableDataItem[]) => {
    const ids: number[] = [];
    const titles: string[] = [];
    if (record instanceof Array) {
      record.forEach((item) => {
        ids.push(item.id);
        titles.push(item.cname);
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
        (record.name && `用户：${record.cname}`) ||
        (3 < titles.length
          ? // @ts-ignore
            `${titles.slice(0, 3)}...等【${titles.length}】个用户`
          : // @ts-ignore
            `${titles} 这【${titles.length}】个用户`),
      async onOk() {
        const lcoalStorageId = Number(localStorage.getItem('uid'));
        // @ts-ignore
        if (record.id === lcoalStorageId || ids.includes(lcoalStorageId))
          return message.error('亲，请不要自残');
        // @ts-ignore
        await remove({ id: record.id || ids }).then((res) => {
          ref.current.reload();
          message.success(res.msg);
        });
      },
      onCancel() {
        console.log('取消删除用户');
      },
    });
  };

  const columns: ProColumns<tableDataItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'name',
    },
    {
      title: '中文名',
      dataIndex: 'cname',
    },
    {
      title: '用户组',
      dataIndex: 'gid',
    },
    {
      filters: true,
      onFilter: true,
      title: '用户状态',
      filterMode: 'tree',
      valueType: 'select',
      dataIndex: 'status',
      valueEnum: {
        1: {
          text: '启用',
          status: 'Show',
        },
        0: {
          text: '禁用',
          status: 'Hide',
        },
      },
      render: (_, record) => <RecordSwitch key={record.id} record={record} />,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'ip地址',
      dataIndex: 'ipaddress',
      render: (_, record) => _int2ip(record.ipaddress),
    },
    {
      sorter: true,
      title: '上次登录',
      dataIndex: 'last_login',
      render: (_, record) =>
        moment(parseInt(record.last_login) * 1000).format('YYYY-MM-DD hh:mm:ss'),
    },
    {
      sorter: true,
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
        search={false}
        actionRef={ref}
        columns={columns}
        request={tableData}
        rowSelection={{
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
          </Space>
        )}
        toolBarRender={() => [
          <Button
            shape="round"
            type="primary"
            key="createUser"
            icon={<PlusOutlined />}
            onClick={handleCreate}
          >
            新建用户
          </Button>,
        ]}
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
      <CreateUser
        modalVisit={modalVisit}
        isCreateUser={isCreateUser}
        handleSetModalVisit={(status: boolean) => setModalVisit(status)}
      />
    </PageContainer>
  );
};
