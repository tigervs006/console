/** @format */

import { message } from 'antd';
import { useModel } from 'umi';
import { save } from '../../services';
import type { ForwardedRef } from 'react';
import { zh2Pinyin } from '@/extra/utils';
import type { cateDataItem } from '../../data';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormCascader, ProFormText, ModalForm } from '@ant-design/pro-form';
import React, { useImperativeHandle, forwardRef, useState, useRef } from 'react';

export const CreateDirectory: React.FC<{
    path?: number[];
    modalVisit: boolean;
    ref: ForwardedRef<any>;
    cateInfo?: cateDataItem;
    handleSetModalVisit: (status: boolean) => void;
}> = forwardRef((props, ref) => {
    const formRef = useRef<ProFormInstance>();
    const [parent, setParent] = useState<number>();
    const modalTitle = props?.cateInfo ? '编辑目录' : '新增目录';
    const { cateData } = useModel('attach', ret => ({
        cateData: ret.cateData,
    }));

    /* useImperative */
    useImperativeHandle(ref, () => ({ setPid: (pid: number) => setParent(pid) }));

    /* 处理新增/编辑事件 */
    const handleOnFinsh = async (values: cateDataItem) => {
        // prettier-ignore
        const data = !props?.cateInfo
			? { ...values, pid: parent ?? 0 }
			: { ...values, id: props.cateInfo.id, pid: parent ?? props.cateInfo.pid }
        await save(data).then(res => {
            res?.success && message.success(res.msg);
        });
    };

    return (
        <ModalForm<cateDataItem>
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
            width={350}
            formRef={formRef}
            title={modalTitle}
            autoFocusFirstInput
            visible={props.modalVisit}
            validateTrigger={['onBlur']}
            onVisibleChange={props.handleSetModalVisit}
            onFinish={values => handleOnFinsh(values).then(() => true)}
            initialValues={props?.cateInfo ?? { path: props?.path ?? [0] }}
        >
            <ProFormCascader
                name="path"
                hasFeedback
                label="上级目录"
                placeholder="请选择上级目录"
                rules={[{ required: true, message: '请选择上级附件目录' }]}
                fieldProps={{
                    showSearch: true,
                    options: cateData,
                    changeOnSelect: true,
                    onChange: (value: any) => setParent(value.at(-1)),
                    fieldNames: { label: 'name', value: 'id', children: 'children' },
                }}
                transform={(value: string | number[]) => (value instanceof Array ? { path: value.join('-') } : { path: value })}
                convertValue={(value: string | number[]) => (value instanceof Array ? value : value?.split('-').map(Number) ?? [0])}
            />
            <ProFormText
                hasFeedback
                name="name"
                label="目录名称"
                placeholder="请输入目录名称"
                fieldProps={{
                    maxLength: 64,
                    showCount: true,
                    onBlur: e => {
                        // prettier-ignore
                        !props?.cateInfo && formRef.current?.setFieldsValue({
							ename: zh2Pinyin(e.target.value).replace(/\s+/g, ''),
						});
                    },
                }}
                rules={[
                    { required: true, message: '请输入目录名称' },
                    { type: 'string', pattern: /^[\u4e00-\u9fa5\w]+$/, message: '目录名称不得包含特殊符号' },
                ]}
            />
            <ProFormText
                hasFeedback
                name="ename"
                label="目录别名"
                tooltip="不支持自定义"
                placeholder="由系统自动生成"
                fieldProps={{
                    maxLength: 64,
                    readOnly: true,
                    showCount: true,
                }}
                rules={[
                    { required: true, message: '请输入目录别名' },
                    { type: 'string', pattern: /^\w+$/, message: '目录别名只能是字母、数字和下划线的组合' },
                ]}
            />
        </ModalForm>
    );
});
