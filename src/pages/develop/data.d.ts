/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

export type configCateDataItem = {
    id: number;
    name: string;
    cname: string;
    status: number;
    create_time: number;
};

export type configListDataItem = {
    id?: number;
    cid: number;
    name: string;
    fname: string;
    value: string;
    status: number;
    create_time: string;
    formProps: Record<string, any>;
};

export type formProps = {
    title: string;
    pattern?: string;
    required?: boolean;
    valueType?: string;
    transform?: string;
    convertValue?: string;
    dependencies?: string[];
    dataIndex: string | string[];
    colProps?: Record<string, any>;
    valueEnum?: Record<string, any>;
    fieldProps?: Record<string, any>;
    formItemProps?: Record<string, any>;
    rules?: { pattern: string[]; message: string }[];
    renderFormItem?: (schema, config, form) => React.ReactNode;
};

export type tableProps = {
    sort: boolean;
    title: string;
    render?: string;
    filters: boolean;
    valueType?: string;
    hideInTable: boolean;
    hideInSearch: boolean;
    dataIndex: string | string[];
    valueEnum?: Record<string, any>;
};

export type groupDataItem = {
    id?: number;
    gid: number;
    name: string;
    cname: string;
    summary: string;
    create_time: string;
    fields_type: {
        name: string;
        type: string;
        cname: string;
        formOptions: number;
        tableOptions: number;
        formProps: formProps[];
        tableProps: tableProps[];
    }[];
};
