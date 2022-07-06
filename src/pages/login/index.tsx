/** @format */

import md5 from 'md5';
import styles from './index.less';
import Footer from '@/components/Footer';
import { waitTime } from '@/extra/utils';
import { Alert, message, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import { FormattedMessage, history, SelectLang, useIntl, useModel } from 'umi';
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

    useEffect(() => {
        setInitialState!(s => ({
            ...s,
            isLoginPage: true,
        }));
    }, [setInitialState]);

    /* 查询用户信息 */
    const fetchUserInfo = async (params: { id: string }) => {
        await queryCurrentUser(params).then((res: any) => {
            setInitialState!(s => ({
                ...s,
                currentUser: res.data?.info,
            }));
        });
    };

    /* 查询用户菜单 */
    const fetchUserMenu = async (params: { id: string; status: number }) => {
        await queryUserMenu(params).then((res: any) => {
            setInitialState!(s => ({
                ...s,
                useMenuItem: res?.data?.list,
            }));
        });
    };

    /** 处理用户登录 */
    const handleSubmit = async (values: API.LoginParams) => {
        await login({ ...values, type })
            .then(async res => {
                const localItem = [
                    { uid: res.data?.info?.uid ?? '0' },
                    { avatar: res.data?.info?.avatar ?? '' },
                    { user: res.data?.info?.name ?? 'anonymous' },
                    { Authorization: res.data?.info?.authorization ?? '' },
                ];
                /* 写入localStorage */
                localItem.forEach(item => {
                    for (const idx in item) {
                        localStorage.setItem(idx, item[idx]);
                    }
                });
                const defaultLoginSuccessMessage = intl.formatMessage({
                    id: 'pages.login.success',
                    defaultMessage: res?.msg,
                });
                message.success(defaultLoginSuccessMessage);
                /* 延迟两秒是为了让token生效 */
                await waitTime(2000).then(() => {
                    setInitialState(s => ({
                        ...s,
                        isLoginPage: false,
                    }));
                    /* 查询用户信息 */
                    fetchUserInfo({ id: localStorage.getItem('uid') ?? '0' });
                    /* 查询用户菜单 */
                    fetchUserMenu({ id: localStorage.getItem('uid') ?? '0', status: 1 });
                });
                /** 登录成功后转到 redirect 参数所在的位置 */
                if (!history) return;
                const { query } = history.location;
                const { redirect } = query as { redirect: string };
                history.push(redirect || '/dashboard/analysis');
                return;
            })
            .catch(() => {
                /* 设置错误信息 */
                setUserLoginState({ status: 400, type: 'account' });
            });
    };

    const { status, type: loginType } = userLoginState;

    return (
        <div className={styles.container}>
            <div className={styles.lang} data-lang>
                {SelectLang && <SelectLang reload={false} />}
            </div>
            <div className={styles.content}>
                <LoginForm
                    title="Ant Design"
                    logo={<img alt="logo" src="/manage/logo.svg" />}
                    subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
                    initialValues={{
                        autoLogin: true,
                    }}
                    onFinish={async values => {
                        await handleSubmit(values as API.LoginParams);
                    }}
                >
                    <Tabs activeKey={type} onChange={setType}>
                        <Tabs.TabPane
                            key="account"
                            tab={intl.formatMessage({
                                id: 'pages.login.accountLogin.tab',
                                defaultMessage: '账户密码登录',
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
                    {400 === status && loginType === 'account' && (
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
                    {400 === status && loginType === 'mobile' && <LoginMessage content="验证码错误" />}
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
                                        pattern: /^1\d{10}$/,
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
    );
};
