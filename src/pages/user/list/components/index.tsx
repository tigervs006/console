/** @format */

import md5 from 'md5';
import { message } from 'antd';
import { useRequest } from 'umi';
import styles from '../../index.less';
import { waitTime } from '@/extra/utils';
import type { ForwardedRef } from 'react';
import { fetchGroupData, saveUser } from '../../service';
import type { UploadFile } from 'antd/es/upload/interface';
import { CropUpload } from '@/pages/components/CropUpload';
import type { ProFormInstance } from '@ant-design/pro-form';
import type { tableDataItem, groupDataItem } from '../../data';
import React, { useImperativeHandle, forwardRef, useState, useRef } from 'react';
import { ProFormDependency, ProFormSelect, ProFormText, ModalForm } from '@ant-design/pro-form';

export const CreateUser: React.FC<{
    modalVisit: boolean;
    isCreateUser: boolean;
    record: tableDataItem;
    ref: ForwardedRef<any>;
    reloadTable: () => void;
    handleSetModalVisit: (status: boolean) => void;
}> = forwardRef((props, ref) => {
    const formRef = useRef<ProFormInstance>();
    const [userGroup, setUserGroup] = useState<
        {
            label: string;
            value: number;
        }[]
    >([]);
    const [currentUser, setCurrentUser] = useState<string>();
    const modalTitle = props.isCreateUser ? '新增用户' : '编辑用户';
    const [passwordRequire, setPasswordRequire] = useState<boolean>(false);
    useImperativeHandle(ref, () => ({ setUser: (user: string) => setCurrentUser(user) }));
    /* 获取用户组列表 */
    useRequest(fetchGroupData, {
        defaultParams: [{ status: 1 }],
        onSuccess: (res: { list: groupDataItem[] }) => {
            setUserGroup(() => {
                return res?.list.map((item: groupDataItem) => ({
                    label: item.name!,
                    value: Number(item.id),
                }));
            });
        },
    });
    // 处理onFinish事件
    const handleFinish = async (data: tableDataItem) => {
        await saveUser(Object.assign({ ...data }, { id: props?.record?.id ?? null })).then(res => {
            res?.msg && message.success(res.msg);
            // 延时重载列表数据
            waitTime(1500).then(() => props.reloadTable());
        });
    };
    return (
        <ModalForm<tableDataItem>
            modalProps={{
                centered: true,
                maskClosable: false,
                destroyOnClose: true,
                afterClose: () => setPasswordRequire(false),
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
            onFinish={values => handleFinish(values).then(() => true)}
        >
            <ProFormDependency name={['name']}>
                {({ name }) => {
                    if (name) {
                        return (
                            <CropUpload
                                imageWidth={200}
                                imageHeight={200}
                                formName={'avatar'}
                                formTitle={'上传头像'}
                                className={styles.avatarUpload}
                                extraData={{
                                    field: 'avatar',
                                    path: `images/avatar/${currentUser}`,
                                }}
                                validateRules={[{ required: true, message: '请为当前用户上传头像' }]}
                                useTransForm={value => {
                                    if ('string' === typeof value) return { avatar: value };
                                    return {
                                        avatar: value.map((item: UploadFile) => item?.response?.data?.url ?? '').toString(),
                                    };
                                }}
                                setFieldsValue={(fileList: UploadFile[]) => formRef.current?.setFieldsValue({ avatar: fileList })}
                            />
                        );
                    } else {
                        return null;
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
                    onBlur: e => setCurrentUser(e.target.value),
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
            <ProFormSelect
                hasFeedback
                name="gid"
                label="用户组"
                debounceTime={1000}
                tooltip="当前用户所属的用户组"
                fieldProps={{ allowClear: false, options: userGroup }}
                rules={[{ required: true, message: '请选择当前用户所属的用户组' }]}
            />
			<ProFormText
				hasFeedback
				name="mobile"
				label="手机号"
				tooltip="你的手机号"
				placeholder="请输入手机号码"
				fieldProps={{
					maxLength: 11,
					showCount: true,
				}}
				rules={[
					{ required: true, message: '请输入用户的手机号' },
					{ type: 'string', pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码' },
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
                transform={value => ({ password: md5(value) })}
                fieldProps={{
                    minLength: 6,
                    maxLength: 18,
                    readOnly: true,
                    showCount: true,
                    onChange: () => setPasswordRequire(true),
                    onFocus: e => e.target.removeAttribute('readonly'),
                    onBlur: e => e.target.setAttribute('readonly', 'true'),
                }}
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
                transform={value => ({ confirmPassword: md5(value) })}
                fieldProps={{
                    minLength: 6,
                    maxLength: 18,
                    readOnly: true,
                    showCount: true,
                    onFocus: e => e.target.removeAttribute('readonly'),
                    onBlur: e => e.target.setAttribute('readonly', 'true'),
                }}
                rules={[
                    { required: passwordRequire, message: '请再次输入以确认用户密码' },
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
});
