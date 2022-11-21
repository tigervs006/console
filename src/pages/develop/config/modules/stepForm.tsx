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
import ProCard from '@ant-design/pro-card';
import { configSave } from '../../services';
import { useImperativeHandle, useState } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { FileSelect } from '@/pages/components/FileSelect';
import { Typography, message, Drawer, Row, Col } from 'antd';
import React, { forwardRef, useEffect, useRef } from 'react';
import type { configListDataItem, formProps } from '../../data';
import { defPatterns, validateMessages } from '@/extra/validator';
import { colOptions, patterns, valueOptions } from '@/extra/options';
import type { ProFormInstance, ProFormColumnsType } from '@ant-design/pro-form';
import { extFileFromUrl, objToString, randomString, strToObject, zh2Pinyin, waitTime } from '@/extra/utils';
import {
    ProFormDependency,
    ProFormTextArea,
    BetaSchemaForm,
    ProFormSelect,
    ProFormDigit,
    ProFormRadio,
    ProFormText,
    ProFormList,
    StepsForm,
} from '@ant-design/pro-form';

export const StepForm: React.FC<{
    id: number;
    isCreate: boolean;
    ref: ForwardedRef<any>;
    reloadTable: () => void;
    record?: configListDataItem;
}> = forwardRef((props, ref) => {
    const { Text } = Typography;
    /* subRef */
    const subRef = useRef<ProFormInstance>();
    /* infoRef */
    const infoRef = useRef<ProFormInstance>();
    /* formRef */
    const formRef = useRef<ProFormInstance>();
    /* propsRef */
    const propsRef = useRef<ProFormInstance>();
    /* modal标题 */
    const modalTitle = props.isCreate ? '新增配置' : '编辑配置';
    /* uploadList */
    const { setUploadList } = useModel('file', ret => ({
        setUploadList: ret.setUploadList,
    }));
    /* requireds */
    const [requireds, setRequireds] = useState<boolean>(false);
    /* openDrawer */
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    /* imperative */
    useImperativeHandle(ref, () => ({ setDrawer: setOpenDrawer }));
    /* defColumns */
    const [columns, setColumns] = useState<ProFormColumnsType<formProps>[]>([]);
    /* formMapRef */
    const formMapRef = useRef<React.MutableRefObject<ProFormInstance | undefined>[]>([]);

    useEffect(() => {
        if (0 <= props?.record?.formProps?.valueType?.indexOf('upload')) {
            const files: string[] | undefined = props?.record?.value.split(',');
            setUploadList(
                files?.map((file: string) => ({
                    url: file,
                    status: 'done',
                    uid: randomString(4),
                    name: extFileFromUrl(file) ?? '',
                })) ?? [],
            );
        }
        formMapRef?.current?.forEach(formInstanceRef => {
            formInstanceRef?.current?.setFieldsValue(props?.record);
        });
    }, [props?.record, setUploadList]);

    /* 处理分步表单 */
    const handleChange = (current: number) => {
        const propsValues = propsRef.current?.getFieldsValue();
        const formProps: Record<string, any>[] = Array.of(propsValues);
        formProps?.map(item => {
            item.title = '配置值';
            item.dataIndex = 'value';
            item.valueType = item?.formProps.valueType;
            if (item?.formProps?.tooltip) {
                item.tooltip = item.formProps.tooltip;
            }
            if (item?.formProps?.convertValue) {
                item.convertValue = eval(item.formProps.convertValue);
            }
            if (item?.formProps?.transform) {
                item.transform = eval(item.formProps.transform);
            }
            if (item?.formProps?.colProps?.at(0)) {
                item.colProps = JSON.parse(item.formProps.colProps.at(0));
            }
            if (item?.formProps?.valueEnum) {
                const objects = strToObject(item.formProps.valueEnum);
                item.valueEnum = objects;
                if ('switch' === item.formProps.valueType) {
                    item.fieldProps = {
                        checkedChildren: objects?.[1].text,
                        unCheckedChildren: objects?.[0].text,
                    };
                }
            }
            if (item?.formProps?.formItemProps?.rules) {
                item.formItemProps = {
                    rules: item.formProps.formItemProps.rules.map((rule: { pattern: string[]; message: string }) => ({
                        pattern: new RegExp(rule.pattern?.at(0) as string),
                        message: rule.message,
                    })),
                };
            }
            if (item?.formProps?.required && item?.formItemProps?.rules) {
                item.formItemProps = { rules: item.formItemProps.rules.concat({ required: true, message: '${label}是必填字段' }) };
            } else if (item?.formProps?.required && !item?.formItemProps?.rules) {
                item.formItemProps = { rules: [{ required: true, message: '${label}是必填字段' }] };
            }
            if ('upload' === (item.formProps.valueType as 'upload') || 'uploads' === (item.formProps.valueType as 'uploads')) {
                item.renderFormItem = (schema: any, config: any, form: any) => {
                    const limit = 'uploads' === (item.valueType as 'uploads') ? 10 : undefined;
                    return <FileSelect limit={limit} setFieldValue={(fileList: string[]) => form.setFieldValue('value', fileList)} />;
                };
            }
            /* 删除冗余属性 */
            delete item?.formProps;
        });
        /* 设置columns */
        2 == current && setColumns(formProps);
    };

    /* 处理表单提交 */
    const handleFinish = (data: configListDataItem) => {
        return new Promise<boolean>((resolve, reject) => {
            // prettier-ignore
            configSave({ ...data, id: props?.record?.id, cid: props.id }).then(res => {
				res?.success && message.success(res.msg);
				waitTime(2000).then(() => props.reloadTable());
				resolve(true);
			}).catch(() => reject(false)).finally(() => setOpenDrawer(false))
        });
    };

    return (
        <StepsForm
            formRef={formRef}
            formMapRef={formMapRef}
            onFinish={handleFinish}
            onCurrentChange={handleChange}
            formProps={{
                validateTrigger: ['onBlur'],
                validateMessages: validateMessages,
            }}
            submitter={{
                resetButtonProps: {
                    shape: 'round',
                },
                submitButtonProps: {
                    shape: 'round',
                },
                render: (_, doms) => {
                    return (
                        <Row justify="end" style={{ gap: '8px' }}>
                            {doms}
                        </Row>
                    );
                },
            }}
            stepsFormRender={(dom, submitter) => {
                return (
                    <Drawer
                        width={600}
                        destroyOnClose
                        open={openDrawer}
                        title={modalTitle}
                        footer={submitter}
                        maskClosable={false}
                        className="group-drawer"
                        onClose={() => setOpenDrawer(false)}
                    >
                        {dom}
                    </Drawer>
                );
            }}
            stepsProps={{
                items: [
                    { title: '字段信息', description: '配置名称，字段名称...' },
                    { title: '表单属性', description: '表单验证，显示类型...' },
                    { title: '提交保存', description: '提交保存配置值...' },
                ],
            }}
        >
            <StepsForm.StepForm name="info" formRef={infoRef}>
                <ProFormRadio.Group
                    name="status"
                    label="是否显示"
                    initialValue={1}
                    tooltip="设置是否显示在表单中"
                    options={[
                        { label: '是', value: 1 },
                        { label: '否', value: 0 },
                    ]}
                />
                <ProFormDigit
                    width="xs"
                    name="sort"
                    label="字段排序"
                    initialValue={50}
                    tooltip="字段在表单中的排序"
                    fieldProps={{
                        precision: 0,
                    }}
                />
                <ProFormText
                    name="name"
                    label="配置名称"
                    rules={[{ required: true }]}
                    fieldProps={{
                        onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
                            // prettier-ignore
                            !props?.record && infoRef.current?.setFieldValue('fname',
								zh2Pinyin(e.target.value).replace(/\s+/g, ''));
                        },
                    }}
                />
                <ProFormText
                    name="fname"
                    label="字段名称"
                    rules={[{ required: true }, { pattern: defPatterns.alphaDash, message: '字段名称只能是英文数字和下划线的组合' }]}
                />
            </StepsForm.StepForm>
            <StepsForm.StepForm name="props" formRef={propsRef}>
                <Row gutter={8}>
                    <Col span={24}>
                        <ProFormRadio.Group
                            name={['formProps', 'required']}
                            label="是否必填"
                            initialValue={1}
                            options={[
                                { label: '是', value: 1 },
                                { label: '否', value: 0 },
                            ]}
                        />
                    </Col>
                    <Col span={24}>
                        <ProFormList
                            alwaysShowItemLabel
                            deleteIconProps={{
                                tooltipText: '删除此行',
                                Icon: CloseCircleOutlined,
                            }}
                            creatorButtonProps={{
                                creatorButtonText: '验证规则',
                            }}
                            name={['formProps', 'formItemProps', 'rules']}
                            label={<Text strong>表单验证</Text>}
                            itemRender={(dom, listMeta) => (
                                <ProCard
                                    bordered
                                    extra={dom.action}
                                    style={{ marginBlockEnd: 8 }}
                                    bodyStyle={{ paddingBlockEnd: 0 }}
                                    title={`规则 #${listMeta.index + 1}`}
                                >
                                    {dom.listDom}
                                </ProCard>
                            )}
                        >
                            <Row gutter={8}>
                                <Col span={12}>
                                    <ProFormSelect
                                        name="pattern"
                                        label="验证规则"
                                        options={patterns}
                                        tooltip="选择或自定义正则"
                                        validateTrigger={['onChange']}
                                        fieldProps={{
                                            mode: 'tags',
                                            allowClear: true,
                                            showSearch: true,
                                            autoClearSearchValue: true,
                                            onChange: value => (value?.length ? setRequireds(true) : setRequireds(false)),
                                        }}
                                        rules={[
                                            () => ({
                                                validator(_, value: string[]) {
                                                    if (!value) return Promise.resolve();
                                                    // prettier-ignore
                                                    return 1 >= value.length
														? Promise.resolve() : Promise.reject(new Error('只选择一个验证规则就行了'));
                                                },
                                            }),
                                        ]}
                                    />
                                </Col>
                                <Col span={12}>
                                    <ProFormText name="message" label="错误提示" rules={[{ required: requireds, message: '请完善错误提示信息' }]} />
                                </Col>
                            </Row>
                        </ProFormList>
                    </Col>
                    <Col span={24}>
                        <ProFormText name={['formProps', 'tooltip']} label="表单提示" placeholder="表单提示信息" />
                    </Col>
                    <Col span={12}>
                        <ProFormSelect
                            label="栅格布局"
                            options={colOptions}
                            colProps={{ span: 12 }}
                            tooltip="表单默认使用Grid布局"
                            validateTrigger={['onChange']}
                            name={['formProps', 'colProps']}
                            fieldProps={{
                                mode: 'tags',
                                allowClear: true,
                                showSearch: true,
                                autoClearSearchValue: true,
                            }}
                            rules={[
                                () => ({
                                    validator(_, value: string[]) {
                                        if (!value) return Promise.resolve();
                                        // prettier-ignore
                                        return 1 >= value.length
											? Promise.resolve() : Promise.reject(new Error('只选择一个栅格布局就行了'));
                                    },
                                }),
                            ]}
                        />
                    </Col>
                    <Col span={12}>
                        <ProFormSelect
                            label="显示类型"
                            initialValue={'text'}
                            options={valueOptions}
                            colProps={{ span: 12 }}
                            placeholder="请选择字段类型"
                            name={['formProps', 'valueType']}
                            rules={[{ required: true, message: '请选择合适的字段类型' }]}
                            fieldProps={{
                                showSearch: true,
                                onChange: select => {
                                    valueOptions.forEach(item => {
                                        if (select === item.value) {
                                            !item.mode && propsRef.current?.setFieldValue('valueEnum', undefined);
                                        }
                                    });
                                },
                            }}
                        />
                    </Col>
                    <ProFormDependency key="typeEnum" name={[['formProps', 'valueType']]}>
                        {(depValues: Record<string, any>) => {
                            let mode: boolean = false;
                            valueOptions.forEach(item => {
                                if (item.value === depValues.formProps.valueType) {
                                    mode = !!item.mode;
                                }
                            });
                            return mode ? (
                                <Col span={24}>
                                    <ProFormTextArea
                                        hasFeedback
                                        label="值的参数"
                                        tooltip="多个参数请换行"
                                        placeholder={'0=>启用\n1=>禁用'}
                                        name={['formProps', 'valueEnum']}
                                        rules={[{ required: true, message: '请完善字段参数' }]}
                                        fieldProps={{
                                            allowClear: true,
                                            autoSize: { minRows: 4, maxRows: 6 },
                                        }}
                                        convertValue={value => ('string' === typeof value ? value : objToString(value))}
                                    />
                                </Col>
                            ) : undefined;
                        }}
                    </ProFormDependency>
                    <Col span={24}>
                        <ProFormTextArea
                            hasFeedback
                            label="前置转化"
                            placeholder={'(value) => void'}
                            tooltip="在组件获得数据之前格式化值"
                            name={['formProps', 'convertValue']}
                            fieldProps={{
                                allowClear: true,
                                autoSize: { minRows: 4, maxRows: 6 },
                            }}
                        />
                    </Col>
                    <Col span={24}>
                        <ProFormTextArea
                            hasFeedback
                            label="提交转化"
                            placeholder={'(value) => void'}
                            tooltip="提交时将值转化为提交的数据"
                            name={['formProps', 'transform']}
                            fieldProps={{
                                allowClear: true,
                                autoSize: { minRows: 4, maxRows: 6 },
                            }}
                        />
                    </Col>
                </Row>
            </StepsForm.StepForm>
            <StepsForm.StepForm name="submit" formRef={subRef}>
                <BetaSchemaForm columns={columns} layoutType="Embed" />
            </StepsForm.StepForm>
        </StepsForm>
    );
});
