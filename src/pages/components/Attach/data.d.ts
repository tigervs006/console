/** @format */

export type cateDataItem = {
    id: number;
    pid: number;
    path: string;
    name: string;
    ename: string;
    create_time: string;
    children?: cateDataItem[];
};
