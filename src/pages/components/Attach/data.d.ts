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

export type cateDataItem = {
    id: number;
    pid: number;
    path: string;
    name: string;
    ename: string;
    option: number;
    dirname: string;
    disabled?: boolean;
    create_time: string;
    config?: {
        suff?: number;
        mime?: number;
        size?: number;
        crop?: number;
        limit?: number;
        astrict?: number;
        fileExt?: string[];
        fileMime?: string[];
        aspects?: [number, number];
        astricts?: [number, number];
    };
    children?: cateDataItem[];
};

export type attachDataItem = {
    id: number;
    pid: number;
    name: string;
    path: string;
    type: string;
    url?: string;
    storage: number;
    real_path: string;
    static_path: string;
    create_time: string;
};
