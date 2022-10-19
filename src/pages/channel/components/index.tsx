/** @format */

import { message } from 'antd';
import React, { useRef, useState } from 'react';
import { waitTime, zh2Pinyin } from '@/extra/utils';
import { fetchData, saveChannel } from '../service';
import { FileSelect } from '@/pages/components/FileSelect';
import type { ProFormInstance } from '@ant-design/pro-form';
import type { moduleDataItem, tableDataItem } from '../data';
import ProForm, { ProFormCascader, ProFormTextArea, ProFormSelect, ProFormText, DrawerForm } from '@ant-design/pro-form';

export const CreateDrawerForm: React.FC<{
    drawerVisit: boolean;
    record: tableDataItem;
    reloadTable: () => void;
    module: moduleDataItem[];
    isCreateChannel: boolean;
    setExpandByClick: (value: boolean) => void;
    handleSetDrawerVisit: (value: boolean) => void;
}> = props => {
    /* 上级栏目 */
    const [pid, setPid] = useState<number>();
    const formRef = useRef<ProFormInstance>();
    const defaultOption = [{ id: 0, cname: '顶级栏目' }];
    const drawerTitle = props.isCreateChannel ? '新增栏目' : '编辑栏目';
    /* 处理onFinish事件 */
    const handleFinish = async (data: tableDataItem) => {
        const post = {
            ...data,
            id: props?.record?.id ?? '',
            pid: pid ?? props?.record?.pid,
        };
        await saveChannel(post).then(res => {
            res?.success && message.success(res.msg);
            props.setExpandByClick(true);
            /* 延时重载列表数据 */
            waitTime(2000).then(() => props.reloadTable());
        });
    };
    return (
        <DrawerForm<tableDataItem>
            drawerProps={{
                maskClosable: false,
                destroyOnClose: true,
                onClose: () => props.setExpandByClick(true),
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
            width={600}
            formRef={formRef}
            title={drawerTitle}
            submitTimeout={2000}
            visible={props.drawerVisit}
            validateTrigger={['onBlur']}
            onVisibleChange={props.handleSetDrawerVisit}
            initialValues={{ ...props.record, isCrop: 0 }}
            onFinish={values => handleFinish(values).then(() => true)}
        >
            <ProForm.Item
                name="banner"
                label="栏目图片"
                tooltip="上传图片作为栏目banner"
                transform={value => (value instanceof Array ? { banner: value.at(0) } : { banner: value })}
            >
                <FileSelect setFieldValue={(fileList: string[]) => formRef.current?.setFieldValue('banner', fileList)} />
            </ProForm.Item>
            <ProFormCascader
                name="path"
                hasFeedback
                label="上级栏目"
                tooltip="选择上级栏目"
                placeholder="请选择上级栏目"
                fieldProps={{
                    fieldNames: {
                        value: 'id',
                        label: 'cname',
                    },
                    showSearch: true,
                    allowClear: false,
                    defaultValue: [0],
                    changeOnSelect: true,
                    onChange: (value: any) => setPid(value.at(-1)),
                }}
                rules={[{ required: true, message: '请选择上级栏目' }]}
                request={async params => await fetchData(params).then(res => defaultOption.concat(res?.data?.list ?? []))}
                transform={(value: string | number[]) => (value instanceof Array ? { path: value.join('-') } : { path: value })}
                convertValue={(value: string | number[]) => (value instanceof Array ? value : value?.split('-')?.map(Number) ?? [0])}
            />
            <ProFormText
                hasFeedback
                name="cname"
                label="栏目名称"
                tooltip="显示在前端的栏目名称"
                placeholder="请输入栏目名称"
                fieldProps={{
                    maxLength: 32,
                    showCount: true,
                    onBlur: e => {
                        // prettier-ignore
                        !props?.record?.id && formRef.current?.setFieldsValue({
                                name: zh2Pinyin(e.target.value).replace(/\s+/g, ''),
                            });
                    },
                }}
                rules={[
                    { required: true, message: '请输入栏目名称' },
                    { type: 'string', pattern: /^[\u4e00-\u9fa5\w\-]+$/, message: '栏目名称不得包含其它特殊符号' },
                ]}
            />
            <ProFormText
                hasFeedback
                name="name"
                label="栏目别名"
                tooltip="栏目别名"
                placeholder="请输入栏目别名"
                fieldProps={{ maxLength: 50, showCount: true }}
                rules={[
                    { required: true, message: '请输入栏目别名' },
                    { type: 'string', pattern: /^\w+$/, message: '栏目别名只能是字母、数字和下划线的组合' },
                ]}
            />
            <ProFormSelect
                hasFeedback
                name="nid"
                label="模型标识"
                tooltip="栏目列表/详情模板"
                rules={[{ required: true, message: '请选择栏目标识' }]}
                fieldProps={{
                    showSearch: true,
                    allowClear: false,
                    placeholder: '请选择模型标识',
                    options: props.module.map(item => ({ label: item.name, value: item.id })),
                }}
            />
            <ProFormText
                hasFeedback
                name="title"
                label="栏目标题"
                tooltip="请控制在30字以内"
                placeholder="请输入栏目SEO标题"
                fieldProps={{ maxLength: 32, showCount: true }}
                rules={[
                    { required: true, message: '栏目标题不得为空' },
                    { type: 'string', pattern: /^\S{8,32}$/, message: '栏目标题应在8~32个字符串之间' },
                ]}
            />
            <ProFormText
                hasFeedback
                name="keywords"
                label="Keywords"
                tooltip="请控制在30字以内"
                placeholder="请输入栏目SEO关键词"
                fieldProps={{ maxLength: 32, showCount: true }}
                rules={[
                    { required: true, message: 'keywords不得为空' },
                    { type: 'string', pattern: /^\S{8,32}$/, message: 'keywords应在8~32个字符串之间' },
                ]}
            />
            <ProFormTextArea
                hasFeedback
                name="description"
                label="Description"
                tooltip="请控制在100字以内"
                placeholder="请输入栏目SEO页面描述"
                rules={[
                    { required: true, message: 'description不得为空' },
                    { type: 'string', pattern: /^\S{20,100}$/, message: 'description应在20~100个字符串之间' },
                ]}
                fieldProps={{ autoSize: { minRows: 4, maxRows: 6 }, maxLength: 100, showCount: true }}
            />
        </DrawerForm>
    );
};
