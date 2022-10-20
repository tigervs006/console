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

export type regionDataItem = {
    cid?: number;
    pid?: number;
    code?: number;
    name?: string;
    level?: number;
    pname?: string;
    status?: number;
    merger?: string;
    id?: number | string;
    create_time?: string;
    children?: regionDataItem[];
};

export type recordDataItem = {
    id: number;
    uid: number;
    gid: number;
    path: string;
    level: number;
    action: string;
    ipaddress: number;
    create_time: string;
};

export type databaseDataItem = {
    name: string;
    size: string;
    rows: number;
    engine: string;
    comment: string;
    version: number;
    checksum?: number;
    collation: string;
    data_free: number;
    row_format: string;
    check_time?: string;
    create_time: string;
    data_length: number;
    update_time?: string;
    index_length: number;
    avg_row_length: number;
    auto_increment: number;
    max_data_length: number;
    create_options?: string;
};

export type schemaData = {
    EXTRA: string;
    DATA_TYPE: string;
    TABLE_NAME: string;
    COLUMN_KEY: string;
    PRIVILEGES: string;
    COLUMN_NAME: string;
    IS_NULLABLE: string;
    COLUMN_TYPE: string;
    TABLE_SCHEMA: string;
    TABLE_CATALOG: string;
    NUMERIC_SCALE: number;
    COLLATION_NAME?: string;
    COLUMN_DEFAULT?: string;
    COLUMN_COMMENT?: string;
    ORDINAL_POSITION: number;
    NUMERIC_PRECISION: number;
    DATETIME_PRECISION?: string;
    CHARACTER_SET_NAME?: string;
    GENERATION_EXPRESSION?: string;
    CHARACTER_OCTET_LENGTH?: number;
    CHARACTER_MAXIMUM_LENGTH?: number;
};

export type backupRecordDataItem = {
    part: number;
    size: string;
    time: number;
    backtime: string;
    filename: string;
    compress?: string;
};
