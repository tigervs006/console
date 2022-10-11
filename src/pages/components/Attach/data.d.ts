/** @format */

export type cateDataItem = {
    id: number;
    pid: number;
    path: string;
    name: string;
    ename: string;
    dirname: string;
    disabled?: boolean;
    create_time: string;
    config?: {
        size?: number;
        crop?: number;
        limit?: number;
        astrict?: number;
        aspects?: [number, number];
        astricts?: [number, number];
    };
    children?: cateDataItem[];
};
