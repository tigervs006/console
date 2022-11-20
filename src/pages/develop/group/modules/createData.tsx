/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import { useModel } from 'umi';
import type { ForwardedRef } from 'react';
import { saveGroupData } from '../../services';
import type { groupDataItem } from '../../data';
import { EditOutlined } from '@ant-design/icons';
import { BetaSchemaForm } from '@ant-design/pro-form';
import { Typography, message, Modal, Row } from 'antd';
import { FileSelect } from '@/pages/components/FileSelect';
import type { ProFormInstance } from '@ant-design/pro-form';
import type { ProFormColumnsType } from '@ant-design/pro-form';
import { extFileFromUrl, randomString, waitTime } from '@/extra/utils';
import React, { useImperativeHandle, forwardRef, useEffect, useState, useRef } from 'react';

export const CreateData: React.FC<{
    gid?: number;
    isCreate: boolean;
    ref: ForwardedRef<any>;
    record?: groupDataItem;
    reloadTable: () => void;
    formColumns: ProFormColumnsType[];
}> = forwardRef((props, ref) => {
    const { Text } = Typography;
    /* formRef */
    const formRef = useRef<ProFormInstance>();
    /* modal标题 */
    const modalTitle = props.isCreate ? '新增记录' : '编辑记录';
    /* uploadList */
    const { setUploadList } = useModel('file', ret => ({
        setUploadList: ret.setUploadList,
    }));
    /* openModal */
    const [openModal, setOpenModal] = useState<boolean>(false);
    /* imperative */
    useImperativeHandle(ref, () => ({ setModal: setOpenModal }));

    useEffect(() => {
        let fieldName: string;
        /* 查找valueType为upload的字段 */
        props.formColumns.forEach(item => {
            if ('upload' === (item.valueType as 'upload') || 'uploads' === (item.valueType as 'uploads')) {
                fieldName = item.dataIndex as string;
            }
        });
        /* 查找字段设置uploadList */
        if (props?.record) {
            for (const i in props.record) {
                // @ts-ignore
                if (fieldName && i === fieldName) {
                    const files: string[] = props.record[i];
                    setUploadList(
                        files?.map((file: string) => ({
                            url: file,
                            status: 'done',
                            uid: randomString(4),
                            name: extFileFromUrl(file) ?? '',
                        })) ?? [],
                    );
                }
            }
        }
    }, [props.record, props.formColumns, setUploadList]);

    /* 渲染自定义valueType */
    props.formColumns.map(item => {
        if ('upload' === (item.valueType as 'upload') || 'uploads' === (item.valueType as 'uploads')) {
            item.renderFormItem = (schema, config, form) => {
                const limit = 'uploads' === (item.valueType as 'uploads') ? 10 : undefined;
                return <FileSelect limit={limit} setFieldValue={(fileList: string[]) => form.setFieldValue([item.dataIndex as string], fileList)} />;
            };
        }
    });

    /* handleFinsh */
    const handleFinsh = async (data: Record<string, any>) => {
        if (!props?.gid) {
            return new Promise<boolean>(reject => {
                message.error!('缺失关键参数：gid');
                reject(false);
            });
        }
        return await saveGroupData({ ...data, id: props?.record?.id, gid: props?.gid })
            .then(res => {
                res?.success && message.success(res.msg);
                /* 延时重载列表数据 */
                waitTime(2000).then(() => props.reloadTable());
            })
            .finally(() => setOpenModal(false));
    };

    return (
        <Modal
            centered
            width={500}
            footer={false}
            destroyOnClose
            open={openModal}
            maskClosable={false}
            title={
                <>
                    <EditOutlined />
                    <Text> {modalTitle}</Text>
                </>
            }
            onCancel={() => setOpenModal(false)}
            afterClose={() => setUploadList([])}
        >
            <BetaSchemaForm
                grid
                layoutType="Form"
                formRef={formRef}
                rowProps={{
                    gutter: [8, 0],
                }}
                onFinish={handleFinsh}
                colProps={{ span: 24 }}
                columns={props.formColumns}
                validateTrigger={['onBlur']}
                initialValues={props?.record}
                submitter={{
                    submitButtonProps: {
                        shape: 'round',
                    },
                    searchConfig: {
                        resetText: '重置',
                    },
                    resetButtonProps: {
                        shape: 'round',
                        type: 'default',
                        onClick: () => formRef.current?.resetFields(),
                    },
                    render: (_, doms) => {
                        return (
                            <Row justify="end" style={{ gap: '8px' }}>
                                {doms}
                            </Row>
                        );
                    },
                }}
            />
        </Modal>
    );
});
