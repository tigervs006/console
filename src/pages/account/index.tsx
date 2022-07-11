/** @format */

import md5 from 'md5';
import { useModel } from 'umi';
import { message } from 'antd';
import avatar from '@/pages/user/index.less';
import { saveUser } from '@/pages/user/service';
import { useEffect, useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { UploadFile } from 'antd/es/upload/interface';
import type { ProFormInstance } from '@ant-design/pro-form';
import { UploadAdapter } from '@/pages/components/UploadAdapter';
import ProForm, { ProFormCheckbox, ProFormDependency, ProFormText } from '@ant-design/pro-form';

export default () => {
    const formRef = useRef<ProFormInstance>();
    const { initialState, refresh } = useModel('@@initialState');
    const userInfo: API.CurrentUser = initialState?.currentUser ?? {};
    const [require, setRequire] = useState<boolean>(false);

    // 文件列表
    const { setUploadList } = useModel('file', ret => ({
        setUploadList: ret.setUploadList,
    }));

    useEffect(() => {
        setUploadList([
            {
                status: 'done',
                url: userInfo?.avatar,
                uid: Math.floor(Math.random() * 100).toString(),
                name: userInfo?.avatar?.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)?.[1] ?? '',
            },
        ]);
    }, [setUploadList, userInfo?.avatar]);

    const handleFinish = async (data: API.CurrentUser) => {
        // @ts-ignore
        await saveUser({ ...data, scene: 'signle', id: userInfo?.id }).then(res => {
            refresh(); // 刷新全局初始化数据
            res?.msg && message.success(res.msg);
        });
    };
    return (
        <PageContainer>
            <ProForm
                layout="vertical"
                formRef={formRef}
                wrapperCol={{
                    md: { span: 16 },
                    lg: { span: 16 },
                    xl: { span: 8 },
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
                validateTrigger={['onBlur']}
                initialValues={{ ...userInfo, isCrop: 1 }}
                onFinish={values => handleFinish(values).then(() => true)}
            >
                <UploadAdapter
                    imageWidth={200}
                    imageHeight={200}
                    formName={'avatar'}
                    formTitle={'上传头像'}
                    className={avatar.avatarUpload}
                    extraData={{
                        field: 'avatar',
                        path: `images/avatar/${userInfo?.name}`,
                    }}
                    validateRules={[{ required: true, message: '请为当前用户上传头像' }]}
                    useTransForm={value => {
                        if ('string' === typeof value) return { avatar: value };
                        return {
                            avatar: value.map((item: UploadFile) => item?.url).toString(),
                        };
                    }}
                    setFieldsValue={(fileList: UploadFile[]) => formRef.current?.setFieldsValue({ avatar: fileList })}
                />
                <ProFormText
                    name="email"
                    label="邮箱"
                    rules={[
                        { required: true, message: '请输入您的邮箱!' },
                        { type: 'email', message: '请输入正确的邮箱地址' },
                    ]}
                />
                <ProFormText
                    name="name"
                    label="昵称"
                    rules={[
                        { required: true, message: '请输入您的昵称!' },
                        { type: 'string', pattern: /^\w+$/, message: '昵称作为登录名不得使用中文及其它特殊字符' },
                    ]}
                />
                <ProFormText
                    name="cname"
                    label="姓名"
                    rules={[
                        { required: true, message: '请输入您的姓名!' },
                        { type: 'string', pattern: /^[\u4e00-\u9fa5\w]+$/, message: '姓名不得包含其它特殊字符' },
                    ]}
                />
                <ProFormText
                    name="mobile"
                    label="手机号码"
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
                <ProFormCheckbox name="changePassword">修改密码</ProFormCheckbox>
                <ProFormDependency name={['changePassword']}>
                    {({ changePassword }) => {
                        if (changePassword) {
                            return [
                                <ProFormText.Password
                                    label="原密码"
                                    key="oldPassword"
                                    name="oldPassword"
                                    placeholder="输入以验证原密码"
                                    getValueFromEvent={e => e.target.value.trim()}
                                    transform={value => ({ oldPassword: md5(value) })}
                                    fieldProps={{
                                        readOnly: true,
                                        showCount: true,
                                        allowClear: true,
                                        onBlur: e => {
                                            e.target.setAttribute('readonly', 'true');
                                            setRequire(0 !== e.target.value.length);
                                        },
                                        onFocus: e => e.target.removeAttribute('readonly'),
                                    }}
                                />,
                                <ProFormText.Password
                                    label="新密码"
                                    key="password"
                                    name="password"
                                    placeholder="请输入新密码"
                                    getValueFromEvent={e => e.target.value.trim()}
                                    transform={value => ({ password: md5(value) })}
                                    fieldProps={{
                                        minLength: 6,
                                        maxLength: 18,
                                        readOnly: true,
                                        showCount: true,
                                        allowClear: true,
                                        onFocus: e => e.target.removeAttribute('readonly'),
                                        onBlur: e => e.target.setAttribute('readonly', 'true'),
                                    }}
                                    rules={[
                                        { required: require, message: '请输入要修改的新密码' },
                                        { type: 'string', pattern: /^\S{6,18}$/, message: '密码应为6~18位英文、数字及特殊符号且不含制表符的组合' },
                                    ]}
                                />,
                                <ProFormDependency name={['password']} key="confirmPassword">
                                    {({ password }) => {
                                        if (password) {
                                            return (
                                                <ProFormText.Password
                                                    label="确认新密码"
                                                    key="confirmPassword"
                                                    name="confirmPassword"
                                                    dependencies={['password']}
                                                    placeholder="输入以确认新密码"
                                                    getValueFromEvent={e => e.target.value.trim()}
                                                    transform={value => ({ confirmPassword: md5(value) })}
                                                    fieldProps={{
                                                        readOnly: true,
                                                        showCount: true,
                                                        allowClear: true,
                                                        onFocus: e => e.target.removeAttribute('readonly'),
                                                        onBlur: e => e.target.setAttribute('readonly', 'true'),
                                                    }}
                                                    rules={[
                                                        { required: true, message: '请再次输入以确认新密码' },
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
                                            );
                                        } else {
                                            return null;
                                        }
                                    }}
                                </ProFormDependency>,
                            ];
                        } else {
                            return null;
                        }
                    }}
                </ProFormDependency>
            </ProForm>
        </PageContainer>
    );
};
