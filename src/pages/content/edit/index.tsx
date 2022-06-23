/** @format */

import { history, useModel } from 'umi';
import { useRef, useState } from 'react';
import Ckeditor from '@/pages/components/Ckeditor';
import { waitTime, extractImg } from '@/extra/utils';
import { PageContainer } from '@ant-design/pro-layout';
import type { UploadFile } from 'antd/es/upload/interface';
import { CropUpload } from '@/pages/components/CropUpload';
import type { articleData, channelDataItem } from '../data';
import type { ProFormInstance } from '@ant-design/pro-form';
import { FormOutlined, UndoOutlined } from '@ant-design/icons';
import { notification, Button, Input, Space, message } from 'antd';
import { getChannel, saveContent, getContent as getContents } from '@/pages/content/service';
import ProForm, { ProFormDependency, ProFormCheckbox, ProFormTextArea, ProFormSelect, ProFormText } from '@ant-design/pro-form';

export default () => {
    const formRef = useRef<ProFormInstance>();
    // 文档内容
    const [content, setContent] = useState<string>(() => {
        return formRef.current?.getFieldValue('content') || null;
    });
    // 文件列表
    const { setFileLists } = useModel('file', ret => ({
        setFileLists: ret.setFileList,
    }));
    // 新闻栏目
    const channel = async () => {
        const res = await getChannel();
        return (
            res?.data?.list.map((item: channelDataItem) => ({
                value: item.id,
                label: item.cname,
            })) ?? {}
        );
    };
    // 提取图像
    const adstractImg = () => {
        // 从正文提取图像
        if (null === content) {
            return notification.error({
                message: '正文内容为空',
                description: '请先完善正文内容并插入图像',
            });
        }
        const imgArr = extractImg(content);
        if (imgArr.length) {
            notification.success({
                message: '提取图像成功',
                description: imgArr.toString().match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)?.[1],
            });
        } else {
            notification.error({
                message: '提取图像失败',
                description: '正文中不包含图像',
            });
        }
        formRef.current?.setFieldsValue({ litpic: imgArr.toString() });
    };
    // 获取编辑器内容
    const getContent = (CKcontent: string) => {
        // 设置useState
        setContent(CKcontent);
        // 设置到字段中只是为了rules规则验证
        formRef.current?.setFieldsValue({ content: CKcontent });
    };

    // 处理onFinsh提交
    const handleFinsh = async (data: articleData) => {
        await saveContent(
            Object.assign(
                { ...data },
                {
                    content: content,
                    id: history.location.query?.id ?? null,
                    author: localStorage?.getItem('user') ?? 'anonymous',
                },
            ),
        ).then(res => {
            message.success(res.msg);
            // 延时跳转到列表页
            waitTime(2500).then(() => history.push({ pathname: '/content/list' }));
        });
    };

    // 处理request请求
    const handleRequest = async (params: Record<'id', string>) => {
        if (params?.id) {
            // 只有在编辑文档时请求网络
            const res = await getContents({ ...params });
            const info = res?.data?.info ?? {};
            // 设置编辑器内容
            setContent(info?.content?.content ?? null);
            // 设置fileList
            setFileLists([
                {
                    status: 'done',
                    url: info.litpic,
                    uid: Math.floor(Math.random() * 100).toString(),
                    name: info.litpic.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)[1],
                },
            ]);
            const attribute = [];
            // 提取值为1的属性名
            for (const idx in info) {
                if ((idx === 'is_head' && 1 === info[idx]) || (idx === 'is_recom' && 1 === info[idx]) || (idx === 'is_litpic' && 1 === info[idx])) {
                    attribute.push(idx);
                }
            }
            return res?.data ? Object.assign({ ...info }, { attribute: attribute || [], content: info?.content?.content ?? null }) : {};
        } else {
            // 清空fileList
            setFileLists([]);
            return {}; // 不是编辑文档则直接返回空对象
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
                // 表单默认值
                initialValues={{
                    cid: 4,
                    attribute: ['is_recom'],
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
                // 失焦校验数据
                validateTrigger={['onBlur']}
                // 提交文档数据
                onFinish={(data: articleData) => handleFinsh(data)}
                // request参数
                params={{ id: history.location.query?.id }}
                // request请求
                request={(params: Record<'id', string>) => handleRequest(params)}
            >
                <ProFormSelect
                    hasFeedback
                    width="xs"
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
                    // 输入时去除首尾空格
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
                    placeholder="请输入名称文档简述"
                    // 输入时去除首尾空格
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
                            // 只在编辑文档时清空fileList及litpic
                            if (!history.location.query?.id) {
                                setFileLists([]);
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
                                        // 输入时去除首尾空格
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
                                    <CropUpload
                                        formName={'litpic'}
                                        cropAspect={16 / 9}
                                        formTitle={'Upload'}
                                        formTooltip={'上传一张图片作为文档封面'}
                                        extraData={{ field: 'litpic', path: 'images/article' }}
                                        useTransForm={value => {
                                            if ('string' === typeof value) return { litpic: value };
                                            return {
                                                litpic: value.map((item: UploadFile) => item?.response.data.url ?? '').toString(),
                                            };
                                        }}
                                        validateRules={[{ required: true, message: '请选择上传图像或输入图像网址作为文档封面' }]}
                                        setFieldsValue={(fileList: UploadFile[]) => formRef.current?.setFieldsValue({ litpic: fileList })}
                                    />
                                );
                        }
                    }}
                </ProFormDependency>
                <ProFormCheckbox.Group
                    label="文档属性"
                    name="attribute"
                    tooltip="选择文档属性"
                    // 提交时转化为对象
                    transform={attributes => {
                        const newObj = {};
                        attributes.map((item: string) => {
                            newObj[item] = 1;
                        });
                        return { ...newObj };
                    }}
                    options={[
                        { label: '头条', value: 'is_head' },
                        { label: '推荐', value: 'is_recom' },
                        { label: '图文', value: 'is_litpic' },
                    ]}
                    rules={[{ required: true, message: '请至少设置一个文档属性' }]}
                />
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
