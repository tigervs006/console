/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

/** @format */

import './index.less';
import { history, useModel } from 'umi';
import { useState, useRef } from 'react';
import { getCate } from '@/pages/channel/service';
import Ckeditor from '@/pages/components/Ckeditor';
import { PageContainer } from '@ant-design/pro-layout';
import { FileSelect } from '../../components/FileSelect';
import type { articleData, channelDataItem } from '../data';
import type { ProFormInstance } from '@ant-design/pro-form';
import { saveContent, getContent as getContents } from '@/pages/content/service';
import { extFileFromUrl, randomString, extractImg, waitTime } from '@/extra/utils';
import { CheckCircleOutlined, UndoOutlined, FormOutlined, EyeOutlined } from '@ant-design/icons';
import { notification, Typography, Button, Modal, Image, Input, Radio, Space, message } from 'antd';
import ProForm, { ProFormDependency, ProFormCheckbox, ProFormTextArea, ProFormSelect, ProFormText } from '@ant-design/pro-form';

export default () => {
    const formRef = useRef<ProFormInstance>();
    /* 文档内容 */
    const [content, setContent] = useState<string>(() => {
        return formRef.current?.getFieldValue('content');
    });

    /* 文件列表 */
    const { setUploadList } = useModel('file', ret => ({
        setUploadList: ret.setUploadList,
    }));

    /* 新闻栏目 */
    const channel = async () => {
        return await getCate({ nid: 1 }).then(res =>
            res.data?.list.map((item: channelDataItem) => ({
                value: item.id,
                label: item.cname,
            })),
        );
    };

    /* 提取图像 */
    const adstractImg = () => {
        /* 从正文提取图像 */
        if (!content) {
            return notification.error({
                message: '正文内容为空',
                description: '请先完善正文内容并插入图像',
            });
        }
        const imgArr = extractImg(content);
        switch (true) {
            case 1 == imgArr.length:
                notification.success({
                    message: '提取图像成功',
                    description: extFileFromUrl(imgArr.toString()),
                });
                formRef.current?.setFieldValue('litpic', imgArr.at(0));
                break;
            case 1 < imgArr.length:
                /* 自动设置第一张图像为封面 */
                !formRef.current?.getFieldValue('litpic') && formRef.current?.setFieldValue('litpic', imgArr.at(0));
                Modal.confirm({
                    centered: true,
                    title: '请选择您要使用的图像',
                    icon: <CheckCircleOutlined />,
                    okButtonProps: { shape: 'round' },
                    cancelButtonProps: { shape: 'round' },
                    content: (
                        <Radio.Group defaultValue={imgArr[0]} onChange={e => formRef.current?.setFieldValue('litpic', e.target.value)}>
                            <Space size="middle" direction="vertical">
                                {imgArr.map(item => (
                                    <Radio value={item} key={randomString(3)}>
                                        <Image
                                            src={item}
                                            width={200}
                                            fallback="/manage/logo.svg"
                                            preview={{
                                                mask: (
                                                    <Typography.Text style={{ color: 'white' }}>
                                                        <EyeOutlined /> 预览
                                                    </Typography.Text>
                                                ),
                                            }}
                                        />
                                    </Radio>
                                ))}
                            </Space>
                        </Radio.Group>
                    ),
                });
                break;
            default:
                notification.error({
                    message: '提取图像失败',
                    description: '正文中不包含图像',
                });
        }
    };

    /* 获取编辑器内容 */
    const getContent = (CKcontent: string) => {
        /* 设置useState */
        setContent(CKcontent);
        /* 设置到字段中只是为了rules规则验证 */
        formRef.current?.setFieldsValue({ content: CKcontent });
    };

    /* 处理onFinsh提交 */
    const handleFinsh = async (data: articleData) => {
        await saveContent(
            Object.assign(data, {
                content: content,
                id: history.location.query?.id ?? null,
                author: data?.author ?? localStorage.getItem('user'),
            }),
        ).then(res => {
            res?.success && message.success(res.msg);
            /* 延时跳转到列表页 */
            res?.success && waitTime(2000).then(() => history.push({ pathname: '/content/list' }));
        });
    };

    /* 处理request请求 */
    const handleRequest = async (params: Record<'id', string>) => {
        if (params?.id) {
            /* 只有在编辑文档时请求网络 */
            return await getContents({ ...params }).then(res => {
                const info = res?.data?.info ?? {};
                /* 设置编辑器内容 */
                setContent(info?.content?.content ?? null);
                /* 设置fileList */
                setUploadList([
                    {
                        status: 'done',
                        url: info.litpic,
                        name: extFileFromUrl(info.litpic) ?? '',
                        uid: Math.floor(Math.random() * 100).toString(),
                    },
                ]);
                return { ...info, content: info?.content?.content ?? null };
            });
        } else {
            /* 清空fileList */
            setUploadList([]);
            return {}; /* 不是编辑文档直接返回空对象 */
        }
    };

    return (
        <PageContainer>
            <ProForm<articleData>
                formRef={formRef}
                layout="vertical"
                wrapperCol={{
                    md: { span: 16 },
                    lg: { span: 16 },
                    xl: { span: 8 },
                }}
                /* 表单默认值 */
                initialValues={{
                    isCrop: 1,
                    is_recom: 1,
                }}
                submitter={{
                    render: (_, doms) => {
                        return (
                            <Space size="middle" key="spaceGroup">
                                {doms}
                            </Space>
                        );
                    },
                    resetButtonProps: { shape: 'round', icon: <UndoOutlined /> },
                    submitButtonProps: { type: 'primary', shape: 'round', icon: <FormOutlined /> },
                }}
                /* 失焦校验数据 */
                validateTrigger={['onBlur']}
                /* request参数 */
                params={{ id: history.location.query?.id }}
                /* 提交文档数据 */
                onFinish={(data: articleData) => handleFinsh(data)}
                /* request请求 */
                request={(params: Record<'id', string>) => handleRequest(params)}
            >
                <ProFormSelect
                    hasFeedback
                    width="sm"
                    name="cid"
                    label="栏目"
                    request={channel}
                    tooltip="文档发布的栏目"
                    fieldProps={{ allowClear: false }}
                    rules={[{ required: true, message: '选择文档发布的栏目' }]}
                />
                <ProFormText
                    hasFeedback
                    label="标题"
                    name="title"
                    tooltip="限制32个字符"
                    placeholder="请输入文档标题"
                    /* 输入时去除首尾空格 */
                    getValueFromEvent={e => e.target.value.trim()}
                    fieldProps={{ maxLength: 32, showCount: true }}
                    rules={[
                        { required: true, message: '请输入文档标题' },
                        { min: 15, message: '文档标题不宜太短' },
                    ]}
                />
                <ProFormText
                    hasFeedback
                    label="关键词"
                    name="keywords"
                    tooltip="请用空格分隔"
                    placeholder="请输入关键词"
                    fieldProps={{ showCount: true, maxLength: 64 }}
                    rules={[
                        { required: true, message: '请输入关键词' },
                        { min: 10, message: '再多来两个关键词' },
                        {
                            type: 'string',
                            pattern: /^[^\u2018-\u2027\uff01-\uff0f\uff1a-\uff20\u3002]+$/,
                            message: '关键词只能使用英文逗号或空格分隔',
                        },
                    ]}
                />
                <ProFormTextArea
                    hasFeedback
                    label="文档简述"
                    name="description"
                    tooltip="SEO优化很重要"
                    placeholder="请输入文档简述"
                    /* 输入时去除首尾空格 */
                    getValueFromEvent={e => e.target.value.trim()}
                    fieldProps={{
                        allowClear: true,
                        showCount: true,
                        maxLength: 256,
                        autoSize: { minRows: 5, maxRows: 8 },
                    }}
                    rules={[
                        { required: true, message: '请输入文档简述' },
                        { min: 50, message: '再多几句文档简述', type: 'string' },
                    ]}
                />
                <ProFormSelect
                    options={[
                        {
                            value: 'upload',
                            label: '上传图像',
                        },
                        {
                            value: 'extract',
                            label: '提取图像',
                        },
                        {
                            value: 'input',
                            label: '图像网址',
                        },
                    ]}
                    width="xs"
                    label="上传方式"
                    name="uploadMode"
                    initialValue={['upload']}
                    tooltip="上传/提取/输入图像网址"
                    fieldProps={{
                        allowClear: false,
                        onChange: () => {
                            /* 只在编辑文档时清空fileList及litpic */
                            if (!history.location.query?.id) {
                                setUploadList([]);
                                formRef.current?.setFieldsValue({ litpic: [] });
                            }
                        },
                    }}
                />
                <ProFormDependency name={['uploadMode']}>
                    {({ uploadMode }) => {
                        switch (uploadMode) {
                            case 'input':
                                return (
                                    <ProFormText
                                        hasFeedback
                                        name="litpic"
                                        label="图像网址"
                                        tooltip="直接输入图像网址"
                                        placeholder="请输入输入图片网址"
                                        /* 输入时去除首尾空格 */
                                        getValueFromEvent={e => e.target.value.trim()}
                                        rules={[
                                            { required: true, message: '请输入图像网址或选择上传图像作为文档封面' },
                                            { type: 'url', message: '请输入有效的url地址' },
                                        ]}
                                    />
                                );
                            case 'extract':
                                return (
                                    <>
                                        <ProForm.Item
                                            hasFeedback
                                            name="litpic"
                                            label="提取图像"
                                            tooltip="从正文提取一张图像作为封面"
                                            rules={[
                                                { required: true, message: '请点击按钮从正文中提取一张图像作为文档封面' },
                                                { type: 'url', message: '请输入有效的url地址' },
                                            ]}
                                        >
                                            <Input readOnly placeholder="从正文提取一张图像作为封面" />
                                        </ProForm.Item>
                                        <ProForm.Item>
                                            <Button shape="round" type="primary" onClick={adstractImg}>
                                                提取图像
                                            </Button>
                                        </ProForm.Item>
                                    </>
                                );
                            default:
                                return (
                                    <ProForm.Item
                                        name="litpic"
                                        rules={[
                                            { required: true, message: '请完善文档封面' },
                                            { type: 'array', max: 1, message: '文档封面只需要1张图片就行了' },
                                        ]}
                                        transform={value => (value instanceof Array ? { litpic: value.at(-1) } : { litpic: value })}
                                    >
                                        <FileSelect setFieldValue={(fileList: string[]) => formRef.current?.setFieldValue('litpic', fileList)} />
                                    </ProForm.Item>
                                );
                        }
                    }}
                </ProFormDependency>
                <ProForm.Item label="文档属性" tooltip="设置文档属性">
                    <Space>
                        <ProFormCheckbox name="is_head">头条</ProFormCheckbox>
                        <ProFormCheckbox name="is_recom">推荐</ProFormCheckbox>
                        <ProFormCheckbox name="is_litpic">图文</ProFormCheckbox>
                    </Space>
                </ProForm.Item>
                <ProForm.Item
                    name="content"
                    label="文档内容"
                    tooltip="文档内容"
                    wrapperCol={{
                        xs: { span: 24 },
                        sm: { span: 24 },
                        xl: { span: 16 },
                    }}
                    rules={[
                        { required: true, message: '文档内容不得为空' },
                        { min: 100, message: '造句呢?再多说几句吧...' },
                    ]}
                >
                    <Ckeditor content={content} setContent={getContent} />
                </ProForm.Item>
            </ProForm>
        </PageContainer>
    );
};
