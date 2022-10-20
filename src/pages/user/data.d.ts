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

export type tableDataItem = {
    id?: number;
    gid?: number;
    name?: string;
    cname?: string;
    status?: number;
    email?: string;
    avatar?: string;
    ipaddress?: number;
    last_login?: string;
    create_time?: string;
};

export type menuDataItem = {
    pid?: number;
    type?: number;
    name?: string;
    path?: string;
    exact?: number;
    routes?: string;
    status?: number;
    locale?: string;
    plocale?: string;
    hideInMenu?: number;
    id?: number | string;
    icon?: string | JSX.Element;
    children?: menuDataItem[];
    paths?: string | number[];
    hideChildrenInMenu?: number;
};

export type groupDataItem = {
    name?: string;
    status?: number;
    id?: number | string;
    menu?: string | number[];
};

export type routesDataItem = {
    rule: string;
    method: string;
    route_name: string;
};
