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
