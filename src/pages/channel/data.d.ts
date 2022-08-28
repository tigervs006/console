/** @format */

export type moduleDataItem = {
    nid?: string;
    name?: string;
    status?: number;
    ctl_name?: string;
    id?: number | string;
    create_time?: string;
};

export type tableDataItem = {
    sort?: number;
    name?: string;
    cname?: string;
    level?: number;
    title?: string;
    pname?: string;
    banner?: string;
    keywords?: string;
    id?: number | string;
    description?: string;
    ceraet_time?: string;
    pid?: number | number[];
    path?: string | number[];
    status?: number | string;
    children?: tableDataItem[];
};
