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

export type productDataItem = {
    pid?: number;
    click: number;
    stock?: number;
    price?: number;
    sales?: number;
    title?: string;
    status?: number;
    litpic?: string;
    content?: string;
    keywords?: string;
    special: string[];
    inquiries?: number;
    description?: string;
    id?: string | string[];
    album?: Record<string, any>;
    channel: Record<string, any>;
};
export type channelDataItem = {
    id: number;
    name: string;
    cname: string;
};
