/** @format */

import { pinyin } from 'pinyin-pro';

/**
 * 延时返回结果
 * @return Promise
 * @param time 500毫秒
 */
export const waitTime = (time: number = 500) => {
    return new Promise<boolean>(resolve => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

/**
 * 指定属性值升序
 * @return number
 * @param property 属性
 */
export const sortAsc = (property: string) => {
    return function (a: number, b: number) {
        const v1 = a[property];
        const v2 = b[property];
        return v1 - v2;
    };
};

/**
 * 指定属性值降序
 * @return number
 * @param property 属性
 */
export const sortDesc = (property: string) => {
    return function (a: number, b: number) {
        const v1 = a[property];
        const v2 = b[property];
        return v2 - v1;
    };
};

/**
 * 提取文章图片
 * @return array
 * @param content
 * TODO: 表达式有优化空间
 */
export const extractImg = (content: string) => {
    const images: string[] = [];
    const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    const imgArr = content.match(/<img.*?(?:>|\/>)/gi);
    for (const idx in imgArr) {
        const src = imgArr[idx].match(srcReg);
        images.push(src?.[1]);
    }
    return images;
};

/**
 * int解析为ip地址
 * @return string
 * @param intIp ip地址
 */
export const _int2ip = (intIp: number): string => {
    let str = '';
    const tt = [];
    tt[0] = (intIp >>> 24) >>> 0;
    tt[1] = ((intIp << 8) >>> 24) >>> 0;
    tt[2] = (intIp << 16) >>> 24;
    tt[3] = (intIp << 24) >>> 24;
    str = String(tt[0]) + '.' + String(tt[1]) + '.' + String(tt[2]) + '.' + String(tt[3]);
    return str;
};

/**
 * 生成随机字符串
 * @return string
 * @param length 字符串长度
 */
export const randomString = (length: number): string => {
    const str = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = length; i > 0; --i) result += str[Math.floor(Math.random() * str.length)];
    return result;
};

/**
 * 汉字转拼音
 * @return string
 * @param words 汉字
 * @param options 设置项
 */
export const zh2Pinyin = (words: string, options?: Record<string, any>) => {
    return pinyin(words, { ...options, removeNonZh: true, toneType: 'none', v: true });
};

/**
 * 查询存在子项的父id
 * @return Array
 * @param data 数据
 * @param init ids
 */
export const recursiveQuery = (data: Record<string, any>[], init: number[] = []) => {
    data.filter((item: any) => {
        if (item.children) {
            init.push(item.id);
            recursiveQuery(item.children, init);
        }
    });
    return init;
};

/**
 * 查询当前存在子项的id
 * @return Array
 * @param data 数据
 * @param init  ids
 */
export const queryChildId = (data: Record<string, any>[], init: number[] = []) => {
    data.filter((item: Record<string, any>) => {
        init.push(item.id);
        if (item.children) queryChildId(item.children, init);
    });
    return init;
};

/**
 * 反向查询父级的name
 * @return Array
 * @param data 树形数据
 * @param name 当前栏目名
 * @param path name路径
 */
export const queryParentPath = (data: Record<string, any>[], name: string, path: string[] = []) => {
    for (const item of data) {
        path.push(item.name);
        if (name === item.name) {
            return path;
        }
        if (item.children) {
            const child: string[] = queryParentPath(item.children, name, path);
            if (child.length) return child;
        }
        path.pop();
    }
    return [];
};
