import md5 from 'md5';
import styles from '../index.less';
import moment from 'moment';
import type { ForwardedRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { _int2ip, waitTime } from '@/utils/tools';
import type { tableDataItem } from '@/pages/user/data';
import { PageContainer } from '@ant-design/pro-layout';
import type { UploadFile } from 'antd/es/upload/interface';
import { removeFile } from '@/services/ant-design-pro/api';
import type { ProFormInstance } from '@ant-design/pro-form';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { UploadChangeParam, UploadProps, RcFile } from 'antd/es/upload';
import { fetchData, setStatus, remove, saveUser } from '@/pages/user/service';
import React, { useImperativeHandle, forwardRef, useState, useRef } from 'react';
import { ModalForm, ProFormText, ProFormUploadButton } from '@ant-design/pro-form';
import { notification, Button, message, Modal, Space, Switch, Table, Upload } from 'antd';
import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  CloudUploadOutlined,
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
    await setStatus({ id: record.id as number, status: checked ? 1 : 0 }).then((res) => {
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
  record: tableDataItem;
  ref: ForwardedRef<any>;
  reloadTable: () => void;
  handleSetModalVisit: (status: boolean) => void;
}> = forwardRef((props, ref) => {
  const { confirm } = Modal;
  const formRef = useRef<ProFormInstance>();
  const modalTitle = props.isCreateUser ? '新增用户' : '编辑用户';
  const uploadTitle = props.isCreateUser ? '上传头像' : '更换头像';
  const [avatarList, setAvatarList] = useState<UploadFile[]>([]);
  useImperativeHandle(ref, () => ({
    setAvatarLists: (fileList: UploadFile[]) => setAvatarList(fileList),
  }));
  // 处理上传事件
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam) => {
    const { fileList } = info;
    setAvatarList(fileList.slice());
    const status = info.file.status;
    switch (status) {
      case 'uploading':
        message.info('Avatar is uploading...');
        break;
      case 'done':
        message.success(info.file.response.msg);
        setAvatarList([
          Object.assign(
            { ...info.file.response.data },
            { status: info.file.response.success ? 'done' : 'error' },
          ),
        ]);
        break;
      case 'success':
        message.success('Avatar uploaded successfully');
        break;
      case 'removed':
        message.success('Avatar removed successfully');
        break;
      case 'error':
        notification.error({
          message: 'Error',
          description: info.file?.response?.msg ?? 'Avatar upload failed',
        });
        break;
      default: {
        throw new Error('Not implemented yet: undefined case');
      }
    }
  };
  // 处理文件删除状态
  const handleRemove: UploadProps['onRemove'] = (file: UploadFile) => {
    return new Promise<boolean>((resolve, reject) => {
      const url = file?.url ?? '';
      // 从网址中截取文件的相对路径
      const idx = url.lastIndexOf('.cn/');
      const filePath = url.substring(idx + 4, url.length);
      confirm({
        centered: true,
        cancelText: '算了',
        title: '当真要删除?',
        icon: <QuestionCircleOutlined />,
        cancelButtonProps: { shape: 'round' },
        okButtonProps: { danger: true, shape: 'round' },
        // @ts-ignore
        content: url.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)[1],
        async onOk() {
          const res = await removeFile({ filePath: filePath });
          if (res.success) {
            resolve(true);
          } else {
            reject('Failed');
          }
        },
        onCancel() {
          reject('onCancel');
        },
      });
    });
  };
  // 处理上传前的文件
  const handleBeforeUpload = (file: RcFile) => {
    const MAX_FILE_SIZE = 2;
    const UNIT = 1024 * 1024;
    const curType = file.type;
    const fileType = ['image/png', 'image/jpeg', 'image/gif'];
    return new Promise<boolean>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file as Blob);
      reader.onload = function (e) {
        const base64: string | ArrayBuffer | null | undefined = e.target?.result;
        const image = document.createElement('img');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        typeof base64 === 'string' ? (image.src = base64) : undefined;
        image.onload = function () {
          if (!fileType.includes(curType)) {
            notification.error({
              message: '上传的文件类型错误',
              description: `请上传格式为${fileType}的图片`,
            });
            reject();
          } else if (file.size > MAX_FILE_SIZE * UNIT) {
            notification.error({
              message: '图像大小不符合要求',
              description: `单张图像不得超过${MAX_FILE_SIZE}M`,
            });
            reject();
          } else if (1 !== image.width / image.height) {
            notification.error({
              message: '图像尺寸比例不符合要求',
              description: `请上传宽高比例为1的图片作为用户头像`,
            });
            reject();
          } else if (200 > image.width || 200 > image.height) {
            notification.error({
              message: '图像尺寸宽高不符合要求',
              description: `请上传宽高大于200的图片作为用户头像`,
            });
            reject();
          } else {
            resolve(true);
          }
        };
      };
    });
  };
  // 处理onFinish事件
  const handleFinish = async (data: tableDataItem) => {
    await saveUser(Object.assign({ ...data }, { id: props?.record?.id ?? null, gid: 1 })).then(
      (res) => {
        message.success(res.msg);
        // 延时重载列表数据
        waitTime(1500).then(() => props.reloadTable());
      },
    );
  };
  return (
    <ModalForm<tableDataItem>
      modalProps={{
        centered: true,
        maskClosable: false,
        destroyOnClose: true,
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
      initialValues={props.record}
      validateTrigger={['onBlur']}
      onVisibleChange={props.handleSetModalVisit}
      onFinish={(values) => handleFinish(values).then(() => true)}
    >
      <ProFormUploadButton
        max={1}
        name="avatar"
        title={uploadTitle}
        fileList={avatarList}
        listType="picture-card"
        icon={<CloudUploadOutlined />}
        action="/console/public/upload"
        rules={[{ required: true, message: '请上传头像' }]}
        transform={(avatar) => {
          if ('string' === typeof avatar) return { avatar: avatar };
          return {
            avatar: avatar.map((item: UploadFile) => item?.response?.data?.url ?? '').toString(),
          };
        }}
        fieldProps={{
          onChange: handleChange,
          onRemove: handleRemove,
          progress: {
            strokeColor: {
              '0%': '#108ee9',
              '100%': '#87d068',
            },
            strokeWidth: 3,
            showInfo: false,
          },
          className: styles.avatarUpload,
          accept: '.png, .jpg, .jpeg, .gif',
          beforeUpload: (file: RcFile) =>
            handleBeforeUpload(file)
              .then((isCheck) => isCheck)
              .catch(() => Upload.LIST_IGNORE),
          headers: { Authorization: localStorage.getItem('Authorization') || '' },
          data: {
            field: 'avatar',
            path: `images/avatar/${formRef.current?.getFieldValue('name') ?? null}`,
          },
        }}
      />
      <ProFormText
        hasFeedback
        name="name"
        label="用户名"
        tooltip="你的登录账号"
        placeholder="请输入用户名"
        fieldProps={{ maxLength: 20, showCount: true }}
        rules={[
          { required: true, message: '请输入用户名' },
          { type: 'string', pattern: /^\w+$/, message: '用户名只能是英文或数字与下横线组合' },
        ]}
      />
      <ProFormText
        hasFeedback
        name="cname"
        label="中文名"
        tooltip="你的真实姓名"
        placeholder="请输入用户姓名"
        fieldProps={{ maxLength: 8, showCount: true }}
        rules={[
          { required: true, message: '请输入用户姓名' },
          {
            type: 'string',
            pattern: /^[\u4e00-\u9fa5]+$/,
            message: '用户姓名只能是中文',
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
        tooltip="6~18位的密码"
        transform={(value) => ({ password: md5(value) })}
        fieldProps={{ minLength: 6, maxLength: 18, showCount: true }}
        rules={[
          { required: !!props.isCreateUser, message: '请为用户设置密码' },
          {
            type: 'string',
            pattern: /^[^\u4e00-\u9fa5\s]{6,18}$/,
            message: '密码应为6~18位英文、数字及特殊符号且不含制表符的组合',
          },
        ]}
      />
      <ProFormText.Password
        hasFeedback
        label="确认密码"
        tooltip="再次输入密码"
        name="confirmPassword"
        dependencies={['password']}
        transform={(value) => ({ confirmPassword: md5(value) })}
        fieldProps={{ minLength: 6, maxLength: 18, showCount: true }}
        rules={[
          { required: !!props.isCreateUser, message: '请再次输入以确认用户密码' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || value === getFieldValue('password')) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('验证错误，两次输入的密码不一致'));
            },
          }),
        ]}
      />
    </ModalForm>
  );
});

export default () => {
  const { confirm } = Modal;
  // childRef
  const childRef: React.MutableRefObject<any> = useRef();
  // ActionType
  const ref: React.MutableRefObject<ActionType | undefined> = useRef<ActionType>();
  // ModalForm 状态
  const [modalVisit, setModalVisit] = useState<boolean>(false);
  // ModalForm 标题
  const [isCreateUser, setIsCreateUser] = useState<boolean>(false);
  // ModalForm 默认值
  const [userValues, setUserValues] = useState<tableDataItem>({});

  /**
   * 获取用户列表
   * @param params 参数
   * @param sort   排序
   * @param filter 筛选
   */
  const tableData = async (params: Record<string, any>, sort: any, filter: any) => {
    const paramData = Object.assign(params, sort, filter);
    // 过滤参数以避免后台接收到空值参数
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

  const handleCreate = () => {
    // 新建用户时清空默认值
    setUserValues({});
    setModalVisit(true);
    setIsCreateUser(true);
    childRef.current?.setAvatarLists([]);
  };

  const handleEdit = (record: tableDataItem) => {
    setUserValues(record);
    setModalVisit(true);
    setIsCreateUser(false);
    childRef.current?.setAvatarLists([
      {
        status: 'done',
        url: record.avatar,
        uid: Math.floor(Math.random() * 100).toString(),
        // @ts-ignore
        name: record.avatar.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)[1],
      },
    ]);
  };

  const handleDelete = (record: tableDataItem | tableDataItem[]) => {
    const ids: number[] = [];
    const titles: string[] = [];
    if (record instanceof Array) {
      record.forEach((item) => {
        ids.push(item.id as number);
        titles.push(item?.cname ?? '');
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
        const lcoalStorageId = localStorage.getItem('uid');
        // @ts-ignore
        if (record.id === lcoalStorageId || ids.includes(lcoalStorageId as number))
          return message.error('亲，请不要自残');
        // @ts-ignore
        await remove({ id: record.id || ids }).then((res) => {
          ref.current?.reload();
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
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'ip地址',
      dataIndex: 'ipaddress',
      render: (_, record) => _int2ip(record.ipaddress as number),
    },
    {
      sorter: true,
      title: '上次登录',
      dataIndex: 'last_login',
      render: (_, record) =>
        null === record.last_login
          ? '未曾登录'
          : moment(parseInt(record?.last_login ?? '1654092601') * 1000).format(
              'YYYY-MM-DD hh:mm:ss',
            ),
    },
    {
      sorter: true,
      title: '创建时间',
      dataIndex: 'create_time',
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
        ref={childRef}
        record={userValues}
        modalVisit={modalVisit}
        isCreateUser={isCreateUser}
        reloadTable={() => ref.current?.reload()}
        handleSetModalVisit={(status: boolean) => setModalVisit(status)}
      />
    </PageContainer>
  );
};
