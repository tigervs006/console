/** @format */

export type productDataItem = {
    pid?: number;
    title?: string;
    status?: number;
    litpic?: string;
    content?: string;
    keywords?: string;
    description?: string;
    album?: Record<string, any>;
    id?: string | string[] | null;
};
export type channelDataItem = {
    id: number;
    name: string;
    cname: string;
};
