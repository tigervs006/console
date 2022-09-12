/** @format */

import { message, Space } from 'antd';
import { useModel, history } from 'umi';
import { waitTime } from '@/extra/utils';
import { useState, useRef } from 'react';
import { getCate } from '@/pages/channel/service';
import Ckeditor from '@/pages/components/Ckeditor';
import { PageContainer } from '@ant-design/pro-layout';
import type { UploadFile } from 'antd/es/upload/interface';
import type { ProFormInstance } from '@ant-design/pro-form';
import { InputTagList } from '@/pages/components/InputTagList';
import { saveProduct, getInfo } from '@/pages/product/service';
import type { productDataItem, channelDataItem } from '../data';
import { UploadAdapter } from '@/pages/components/UploadAdapter';
import { CheckCircleOutlined, FormOutlined, UndoOutlined } from '@ant-design/icons';
import ProForm, { ProFormMoney, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';

export default () => {
    const formRef = useRef<ProFormInstance>();
    /* 商品卖点 */
    const [special, setSpecial] = useState<string[]>([]);
    /* 文件列表 */
    const { setUploadList } = useModel('file', ret => ({
        setUploadList: ret.setUploadList,
    }));
    /* 文档内容 */
    const [content, setContent] = useState<string>(() => {
        return formRef.current?.getFieldValue('content') || null;
    });
    /* 商品分类 */
    const category = async () => {
        return await getCate({ nid: 2 }).then(res =>
            res?.data?.list.map((item: channelDataItem) => ({
                value: item.id,
                label: item.cname,
            })),
        );
    };
    /* 获取编辑器内容 */
    const getContent = (CKcontent: string) => {
        setContent(CKcontent);
        /* 设置到字段中只是为了rules规则验证 */
        formRef.current?.setFieldsValue({ content: CKcontent });
    };
    /* 处理onFinsh提交 */
    const handleFinsh = async (data: productDataItem) => {
        await saveProduct({
            ...data,
            content: content,
            id: history.location.query?.id ?? '0',
        }).then(res => {
            res?.success && message.success(res.msg);
            /* 延时跳转到列表页 */
            res?.success && waitTime(2000).then(() => history.push({ pathname: '/product/list' }));
        });
    };
    /* 处理Request请求 */
    const handleRequest = async (params: { id?: string }) => {
        if (params?.id) {
            return await getInfo(params).then(res => {
                const info = res?.data?.info ?? {};
                /* 设置商品卖点 */
                setSpecial(info?.special);
                /* 设置编辑器内容 */
                setContent(info?.detail?.content ?? null);
                /* 设置文件列表 */
                setUploadList(
                    info?.album.map((item: string) => ({
                        url: item,
                        status: 'done',
                        uid: Math.floor(Math.random() * 100).toString(),
                        name: item.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)?.[1] || '',
                    })) ?? [],
                );
                return { ...info, content: info?.detail?.content ?? null };
            });
        } else {
            // 清空fileList
            setUploadList([]);
            return {}; // 不是编辑状态直接返回空对象
        }
    };
    return (
        <PageContainer>
            <ProForm<productDataItem>
                formRef={formRef}
                layout="vertical"
                wrapperCol={{
                    md: { span: 16 },
                    lg: { span: 16 },
                    xl: { span: 8 },
                }}
                initialValues={{
                    isCrop: 1,
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
                onFinish={(data: productDataItem) => handleFinsh(data)}
                /* request请求 */
                request={(params: Record<'id', string>) => handleRequest(params)}
            >
                <ProFormSelect
                    hasFeedback
                    width="sm"
                    name="pid"
                    label="分类"
                    request={category}
                    tooltip="商品发布的分类"
                    fieldProps={{ allowClear: false }}
                    rules={[{ required: true, message: '选择商品发布的分类' }]}
                />
                <ProFormMoney min={0} width="sm" hasFeedback label="售价" name="price" rules={[{ required: true, message: '请为商品设置售价' }]} />
                <ProFormText
                    hasFeedback
                    width="sm"
                    label="库存"
                    name="stock"
                    tooltip="根据实际情况设置库存"
                    fieldProps={{ allowClear: false }}
                    rules={[
                        { required: true, message: '请为商品设置库存' },
                        { pattern: /^\d+$/, message: '商品库存必需为正整数' },
                    ]}
                />
                <ProFormText
                    hasFeedback
                    label="商品名"
                    name="title"
                    tooltip="限制32个字符"
                    placeholder="请输入商品名作为标题"
                    /* 输入时去除首尾空格 */
                    getValueFromEvent={e => e.target.value.trim()}
                    fieldProps={{ maxLength: 32, showCount: true }}
                    rules={[
                        { required: true, message: '请完善商品名' },
                        { min: 15, message: '商品名不宜太短' },
                    ]}
                />
                <ProFormText
                    hasFeedback
                    label="关键词"
                    name="keywords"
                    tooltip="请用空格分隔"
                    placeholder="请输入关键词"
                    fieldProps={{ showCount: true, maxLength: 32 }}
                    rules={[
                        { required: true, message: '请输入关键词' },
                        { type: 'string', min: 8, message: '再多来两个关键词' },
                        {
                            type: 'string',
                            pattern: /^[^\u2018-\u2027\uff01-\uff0f\uff1a-\uff20\u3002]+$/,
                            message: '关键词只能使用英文逗号或空格分隔',
                        },
                    ]}
                />
                <ProFormTextArea
                    hasFeedback
                    label="商品简述"
                    name="description"
                    tooltip="SEO优化很重要"
                    placeholder="请输入商品简述"
                    /* 输入时去除首尾空格 */
                    getValueFromEvent={e => e.target.value.trim()}
                    fieldProps={{
                        maxLength: 256,
                        showCount: true,
                        allowClear: true,
                        autoSize: { minRows: 5, maxRows: 8 },
                    }}
                    rules={[
                        { required: true, message: '请输入商品简述' },
                        { type: 'string', min: 50, message: '再多几句商品简述吧' },
                    ]}
                />
                <ProForm.Item
                    hasFeedback
                    label="商品卖点"
                    name="special"
                    tooltip="提炼商品卖点"
                    rules={[
                        { required: true, message: '请至少填写一个商品卖点' },
                        () => ({
                            validator(_, value: string[]) {
                                return 3 >= value.length ? Promise.resolve() : Promise.reject(new Error('商品卖点只需要3个就行了'));
                            },
                        }),
                    ]}
                >
                    <InputTagList
                        color={'red'}
                        tagsList={special}
                        addition={'商品卖点'}
                        tagIcon={<CheckCircleOutlined />}
                        handleChange={value => formRef.current?.setFieldsValue({ special: value })}
                    />
                </ProForm.Item>
                <UploadAdapter
                    maxUpload={5}
                    imageWidth={600}
                    imageHeight={600}
                    formName={'album'}
                    formTitle={'Upload'}
                    formLabel={'商品相册'}
                    extraData={{ path: 'images/product' }}
                    formTooltip={'至少上传一张图片作为商品封面'}
                    validateRules={[{ required: true, type: 'array', min: 1, message: '请至少上传一张图像作为商品封面' }]}
                    setFieldsValue={(fileList: UploadFile[]) => formRef.current?.setFieldsValue({ album: fileList })}
                    useTransForm={value => ({ album: 'string' === typeof value ? value : value.map(item => item?.url ?? item) })}
                />
                <ProForm.Item
                    name="content"
                    label="商品详情"
                    tooltip="商品详情"
                    wrapperCol={{
                        xs: { span: 24 },
                        sm: { span: 24 },
                        xl: { span: 16 },
                    }}
                    rules={[{ required: true, message: '商品详情不得为空' }]}
                >
                    <Ckeditor content={content} setContent={getContent} uploadPath={'images/product'} />
                </ProForm.Item>
            </ProForm>
        </PageContainer>
    );
};
