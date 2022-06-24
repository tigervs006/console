/** @format */

import Footer from '@/components/Footer';
import { waitTime } from '@/extra/utils';
import { login } from '@/services/ant-design-pro/api';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import { AlipayCircleOutlined, LockOutlined, MobileOutlined, TaobaoCircleOutlined, UserOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { Alert, message, Tabs } from 'antd';
import md5 from 'md5';
import React, { useState } from 'react';
import { FormattedMessage, history, SelectLang, useIntl, useModel } from 'umi';
import styles from './index.less';

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

const Login: React.FC = () => {
    const intl = useIntl();
    const [type, setType] = useState<string>('account');
    const { initialState, setInitialState } = useModel('@@initialState');
    const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});

    const fetchUserInfo = async (params: { id: string }) => {
        const userInfo = await initialState?.fetchUserInfo?.(params);
        if (userInfo) {
            await setInitialState(s => ({
                ...s,
                currentUser: userInfo,
            }));
        }
    };

    /** 处理用户登录 */
    const handleSubmit = async (values: API.LoginParams) => {
        await login({ ...values, type })
            .then(async res => {
                if (200 === res.status) {
                    const uid = res.data?.info?.uid ?? '0';
                    const avatar = res.data?.info?.avatar ?? '';
                    const userName = res.data?.info?.name ?? 'anonymous';
                    const authorization = res.data?.info?.authorization ?? '';
                    // 写入到localStorage
                    localStorage.setItem('uid', uid);
                    localStorage.setItem('user', userName);
                    localStorage.setItem('avatar', avatar);
                    localStorage.setItem('Authorization', authorization);
                    const defaultLoginSuccessMessage = intl.formatMessage({
                        id: 'pages.login.success',
                        defaultMessage: '登录成功！',
                    });
                    message.success(defaultLoginSuccessMessage);
                    await waitTime(2000).then(() => fetchUserInfo({ id: res?.data?.info?.uid ?? '0' }));
                    /** 登录成功后转到 redirect 参数所在的位置 */
                    if (!history) return;
                    const { query } = history.location;
                    const { redirect } = query as { redirect: string };
                    history.push(redirect || '/dashboard');
                    return;
                }
            })
            .catch(() => {
                // 设置登录错误信息
                setUserLoginState({ status: 400, type: 'account' });
            });
    };

    const { status, type: loginType } = userLoginState;

    return (
        <div className={styles.container}>
            <div className={styles.lang} data-lang>
                {SelectLang && <SelectLang />}
            </div>
            <div className={styles.content}>
                <LoginForm
                    title="Ant Design"
                    logo={<img alt="logo" src="/manage/logo.svg" />}
                    subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
                    initialValues={{
                        autoLogin: true,
                    }}
                    actions={[
                        <FormattedMessage key="loginWith" id="pages.login.loginWith" defaultMessage="其他登录方式" />,
                        <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.icon} />,
                        <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.icon} />,
                        <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.icon} />,
                    ]}
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

export default Login;
