import md5 from 'md5';
import { message } from 'antd';
import React, { useRef, useState } from 'react';
import styles from '../../index.less';
import { waitTime } from '@/utils/tools';
import { saveUser } from '../../service';
import type { tableDataItem } from '../../data';
import type { UploadFile } from 'antd/es/upload/interface';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormDependency, ProFormText } from '@ant-design/pro-form';
import { ProUploadButton } from '@/pages/components/UploadButton';

export const CreateUser: React.FC<{
  modalVisit: boolean;
  isCreateUser: boolean;
  record: tableDataItem;
  reloadTable: () => void;
  handleSetModalVisit: (status: boolean) => void;
}> = (props) => {
  const formRef = useRef<ProFormInstance>();
  const modalTitle = props.isCreateUser ? '新增用户' : '编辑用户';
  const uploadTitle = props.isCreateUser ? '上传头像' : '更换头像';
  const [currentUser, setCurrentUser] = useState<string>(props?.record.name as string);
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
      <ProFormDependency name={['name']}>
        {/*@ts-ignore*/}
        {({ name }) => {
          if (name) {
            return (
              <ProUploadButton
                imageWidth={200}
                imageHeight={200}
                formName={'avatar'}
                formTitle={uploadTitle}
                className={styles.avatarUpload}
                validateRules={[{ required: true, message: '请为当前用户上传头像' }]}
                useTransForm={(value) => {
                  if ('string' === typeof value) return { avatar: value };
                  return {
                    avatar: value
                      .map((item: UploadFile) => item?.response?.data?.url ?? '')
                      .toString(),
                  };
                }}
                extraData={{
                  field: 'avatar',
                  path: `images/avatar/${currentUser}`,
                }}
              />
            );
          }
        }}
      </ProFormDependency>
      <ProFormText
        hasFeedback
        name="name"
        label="用户名"
        tooltip="你的登录账号"
        placeholder="请输入用户名"
        fieldProps={{
          maxLength: 20,
          showCount: true,
          onBlur: (e) => setCurrentUser(e.target.value),
        }}
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
          { required: props.isCreateUser, message: '请为用户设置密码' },
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
          { required: props.isCreateUser, message: '请再次输入以确认用户密码' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || value === getFieldValue('password')) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('验证失败，两次输入的密码不一致'));
            },
          }),
        ]}
      />
    </ModalForm>
  );
};
