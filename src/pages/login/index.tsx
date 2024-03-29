/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import md5 from 'md5';
import styles from './index.less';
import React, { useState } from 'react';
import Footer from '@/components/Footer';
import { sortDesc, waitTime } from '@/extra/utils';
import { Alert, message, Tabs } from 'antd';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import { FormattedMessage, SelectLang, useModel, useIntl, history } from 'umi';
import { MobileOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { currentUser as queryCurrentUser, currentUserMenu as queryUserMenu, login } from '@/services/ant-design-pro/api';

const LoginMessage: React.FC<{
    content: string;
}> = ({ content }) => (
    <Alert
        style={{
            marginBottom: 24,
        }}
        message={content}
        type="error"
        showIcon
    />
);

export default () => {
    const intl = useIntl();
    const [type, setType] = useState<string>('account');
    const { setInitialState } = useModel('@@initialState');
    const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});

    /* 查询用户信息 */
    const fetchUserInfo = async (params: { id: string | null }) => {
        await queryCurrentUser(params).then((res: any) => {
            setInitialState!(s => ({
                ...s,
                currentUser: res.data?.info,
            }));
        });
    };

    /* 查询用户菜单 */
    const fetchUserMenu = async () => {
        await queryUserMenu().then(res => {
            setInitialState!(s => ({
                ...s,
                userMenuItem: res?.data?.list.sort(sortDesc('sort')),
            }));
        });
    };

    /** 处理用户登录 */
    const handleSubmit = async (values: API.LoginParams) => {
        await login({ ...values, type })
            .then(async res => {
                const localItem = [
                    { uid: res.data?.info?.uid },
                    { user: res.data?.info?.name },
                    { expiresAt: res.data?.info?.expiresAt },
                    { access_token: res.data?.info?.access_token },
                    { refresh_token: res.data?.info?.refresh_token },
                ];
                /* 写入localStorage */
                localItem.forEach(item => {
                    for (const idx in item) {
                        localStorage.setItem(idx, item[idx]);
                    }
                });
                const defaultLoginSuccessMessage = intl.formatMessage({
                    id: 'pages.login.success',
                    defaultMessage: res?.msg ?? '登录成功',
                });
                message.success(defaultLoginSuccessMessage);
                /* 查询用户菜单 */
                await fetchUserMenu();
                /* 查询用户信息 */
                await fetchUserInfo({ id: localStorage.getItem('uid') });
                waitTime().then(() => {
                    const { query } = history.location;
                    const { redirect } = query as { redirect: string };
                    history.push(redirect || '/dashboard/analysis');
                });
            })
            .catch(() => {
                /* 设置错误信息 */
                setUserLoginState({ status: 401, type: 'account' });
            });
    };

    const { status, type: loginType } = userLoginState;

    return (
        <>
            <style>{'.ant-pro-form-login-container{ justify-content: center }'}</style>
            <div className={styles.container}>
                <div className={styles.lang} data-lang>
                    {SelectLang && <SelectLang reload={false} />}
                </div>
                <div className={styles.content}>
                    <LoginForm
                        title="Tiger System"
                        initialValues={{
                            autoLogin: true,
                        }}
                        logo={<img alt="logo" src="/manage/logo.png" />}
                        onFinish={async values => {
                            await handleSubmit(values as API.LoginParams);
                        }}
                        subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
                    >
                        <Tabs activeKey={type} onChange={setType}>
                            <Tabs.TabPane
                                key="account"
                                tab={intl.formatMessage({
                                    id: 'pages.login.accountLogin.tab',
                                    defaultMessage: '密码登录',
                                })}
                            />
                            <Tabs.TabPane
                                key="mobile"
                                tab={intl.formatMessage({
                                    id: 'pages.login.phoneLogin.tab',
                                    defaultMessage: '手机号登录',
                                })}
                            />
                        </Tabs>
                        {401 === status && loginType === 'account' && (
                            <LoginMessage
                                content={intl.formatMessage({
                                    id: 'pages.login.accountLogin.errorMessage',
                                    defaultMessage: '账户或密码错误',
                                })}
                            />
                        )}
                        {type === 'account' && (
                            <>
                                <ProFormText
                                    name="name"
                                    fieldProps={{
                                        size: 'large',
                                        prefix: <UserOutlined className={styles.prefixIcon} />,
                                    }}
                                    placeholder={intl.formatMessage({
                                        id: 'pages.login.name.placeholder',
                                        defaultMessage: '请输入用户名',
                                    })}
                                    rules={[
                                        {
                                            required: true,
                                            message: <FormattedMessage id="pages.login.name.required" defaultMessage="请输入用户名!" />,
                                        },
                                    ]}
                                />
                                <ProFormText.Password
                                    name="password"
                                    fieldProps={{
                                        size: 'large',
                                        prefix: <LockOutlined className={styles.prefixIcon} />,
                                    }}
                                    // 提交时md5加密password
                                    transform={password => ({ password: md5(password) })}
                                    placeholder={intl.formatMessage({
                                        id: 'pages.login.password.placeholder',
                                        defaultMessage: '请输入密码',
                                    })}
                                    rules={[
                                        {
                                            required: true,
                                            message: <FormattedMessage id="pages.login.password.required" defaultMessage="请输入密码！" />,
                                        },
                                    ]}
                                />
                            </>
                        )}
                        {401 === status && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
                        {type === 'mobile' && (
                            <>
                                <ProFormText
                                    fieldProps={{
                                        size: 'large',
                                        prefix: <MobileOutlined className={styles.prefixIcon} />,
                                    }}
                                    name="mobile"
                                    placeholder={intl.formatMessage({
                                        id: 'pages.login.phoneNumber.placeholder',
                                        defaultMessage: '手机号',
                                    })}
                                    rules={[
                                        {
                                            required: true,
                                            message: <FormattedMessage id="pages.login.phoneNumber.required" defaultMessage="请输入手机号！" />,
                                        },
                                        {
                                            pattern: /^1[3456789]\d{9}$/,
                                            message: <FormattedMessage id="pages.login.phoneNumber.invalid" defaultMessage="手机号格式错误！" />,
                                        },
                                    ]}
                                />
                                <ProFormCaptcha
                                    fieldProps={{
                                        size: 'large',
                                        prefix: <LockOutlined className={styles.prefixIcon} />,
                                    }}
                                    captchaProps={{
                                        size: 'large',
                                    }}
                                    placeholder={intl.formatMessage({
                                        id: 'pages.login.captcha.placeholder',
                                        defaultMessage: '请输入验证码',
                                    })}
                                    captchaTextRender={(timing, count) => {
                                        if (timing) {
                                            return `${count} ${intl.formatMessage({
                                                id: 'pages.getCaptchaSecondText',
                                                defaultMessage: '获取验证码',
                                            })}`;
                                        }
                                        return intl.formatMessage({
                                            id: 'pages.login.phoneLogin.getVerificationCode',
                                            defaultMessage: '获取验证码',
                                        });
                                    }}
                                    name="captcha"
                                    rules={[
                                        {
                                            required: true,
                                            message: <FormattedMessage id="pages.login.captcha.required" defaultMessage="请输入验证码！" />,
                                        },
                                    ]}
                                    onGetCaptcha={async phone => {
                                        const result = await getFakeCaptcha({
                                            phone,
                                        });
                                        if (result === false) {
                                            return;
                                        }
                                        message.success('获取验证码成功！验证码为：1234');
                                    }}
                                />
                            </>
                        )}
                        <div
                            style={{
                                marginBottom: 24,
                            }}
                        >
                            <ProFormCheckbox noStyle name="autoLogin">
                                <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
                            </ProFormCheckbox>
                            <a
                                style={{
                                    float: 'right',
                                }}
                            >
                                <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
                            </a>
                        </div>
                    </LoginForm>
                </div>
                <Footer />
            </div>
        </>
    );
};
