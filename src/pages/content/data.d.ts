/** @format */

import { DataItem } from '@antv/g2plot/esm/interface/config';

export { DataItem };

export type authorData = {
    name: string;
    cname: string;
};

export type articleData = {
    id?: number;
    cid: number;
    title: string;
    litpic: string;
    author?: string;
    content: string;
    is_head?: number;
    keywords: string;
    is_recom?: number;
    is_litpic?: number;
    description: string;
    attribute?: string[];
};

export type tableDataItem = {
    id: number;
    cid: number;
    click: number;
    title: string;
    status: number;
    author: string;
    channel: {
        id: number;
        name: string;
        cname: string;
    };
    is_head: number;
    is_recom: number;
    loading?: boolean;
    is_collect: number;
    create_time: string;
    update_time: string;
};

export type channelDataItem = {
    id: number;
    name: string;
    cname: string;
};

export type channelOptions = {
    label: string;
    value: number;
};

export type valueEnumData = Record<string, { text: string; status: string }>;
