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

export type moduleDataItem = {
    nid?: string;
    name?: string;
    status?: number;
    ctl_name?: string;
    id?: number | string;
    create_time?: string;
};

export interface channelCate {
    id: number;
    name: string;
    cname: string;
    fullpath: string;
}

export type tableDataItem = {
    nid?: number;
    sort?: number;
    name?: string;
    cname?: string;
    level?: number;
    title?: string;
    pname?: string;
    banner?: string;
    dirname?: string;
    fullpath?: string;
    keywords?: string;
    id?: number | string;
    description?: string;
    ceraet_time?: string;
    pid?: number | number[];
    path?: string | number[];
    status?: number | string;
    children?: tableDataItem[];
};
