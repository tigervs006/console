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
    name?: string;
    icon?: string;
    path?: string;
    exact?: number;
    status?: number;
    locale?: string;
    plocale?: string;
    hideInMenu?: number;
    id?: number | string;
    authority?: string[];
    children?: menuDataItem[];
    paths?: string | number[];
    hideChildrenInMenu?: number;
};
