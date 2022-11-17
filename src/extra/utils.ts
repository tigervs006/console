/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

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
    return function (a: any, b: any) {
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
    return function (a: any, b: any) {
        const v1 = a[property];
        const v2 = b[property];
        return v2 - v1;
    };
};

/**
 * 从网址中提取文件名
 * @return string
 * @param url string
 */
export const extFileFromUrl = (url: string) => {
    // prettier-ignore
    return url.match(/[^/]+/g)?.filter(item => item).pop();
};

/**
 * 提取文章图片
 * @return array
 * @param content
 * @param init string[]
 */
export const extractImg = (content: string, init: string[] = []) => {
    const imgArr = content.match(/<img.*?(?:>|\/>)/g);
    for (const idx in imgArr) {
        const url = imgArr[idx].match(/src="(\S+)"/i).pop();
        init.push(url);
    }
    return init;
};

/**
 * 文件转换为Base64
 * @return Promise<File>
 * @param fileObject 文件
 */
export const file2Base64 = (fileObject: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileObject);
        reader.onerror = error => reject(error);
        reader.onload = () => resolve(reader.result);
    });
};

/**
 * int解析为ip地址
 * @return string
 * @param intIp ip地址
 */
export const _int2ip = (intIp: number): string => {
    const tt = [];
    tt[0] = (intIp >>> 24) >>> 0;
    tt[1] = ((intIp << 8) >>> 24) >>> 0;
    tt[2] = (intIp << 16) >>> 24;
    tt[3] = (intIp << 24) >>> 24;
    return String(tt[0]) + '.' + String(tt[1]) + '.' + String(tt[2]) + '.' + String(tt[3]);
};

/**
 * 字符串转数组
 * @return Object
 * @param str string
 * @param object Record<string, any>
 */
export const strToObject = (str: string, object: Record<string, any> = {}) => {
    if (!str) return undefined;
    const strArr = str.split('\n');
    strArr.forEach(item => {
        const arr = item.split('=>');
        object[arr[0]] = { text: arr[1] };
    });
    return object;
};

/**
 * 数组转字符串
 * @return string
 * @param obj array
 * @param strArr string[]
 */
export const objToString = (obj: Record<string, any>, strArr: string[] = []) => {
    if (!obj) return '';
    for (const i in obj) {
        strArr.push(`${i}=>${obj[i].text}`);
    }
    return strArr.join('\n');
};

/**
 * 汉字转unicode
 * @return string
 * @param chineseStr
 */
export const toUnicodeStr = (chineseStr: string) => {
    if (chineseStr == '') {
        return 'Please input Chinese Characters';
    }
    let unicodeStr = '';
    for (let i = 0, iLength = chineseStr.length; i < iLength; i++) {
        unicodeStr += '\\u' + chineseStr.charCodeAt(i).toString(16);
    }
    return unicodeStr;
};

/**
 * unicode转汉字
 * @return string
 * @param unicodeStr
 */
export const toChineseStr = (unicodeStr: string) => {
    if (unicodeStr == '') {
        return 'Please input hexadecimal Unicode';
    }
    const unicodeArr = unicodeStr.split('\\u');
    let chineseStr = '';
    for (let i = 0, iLength = unicodeArr.length; i < iLength; i++) {
        chineseStr += String.fromCharCode(parseInt(unicodeArr[i], 16));
    }
    return chineseStr;
};

/**
 * 生成随机字符串
 * @return string
 * @param length 字符串长度
 */
export const randomString = (length: number): string => {
    const str = '0123456789abcdefghijklmnopqrstuvwxyz';
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
    return pinyin(words, { ...options, nonZh: 'consecutive', toneType: 'none', v: true });
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

/**
 * 反向查询父级的ID
 * @return Array
 * @param func
 * @param path
 * @param treeData
 */
export const findParentId = (treeData: Record<string, any>[], func: (data: Record<string, any>) => boolean, path: number[] = []): number[] => {
    for (const data of treeData) {
        path.push(data.id);
        if (func(data)) return path;
        if (data.children) {
            const findChildren = findParentId(data.children, func, path);
            if (findChildren.length) return findChildren;
        }
        path.pop();
    }
    return [];
};
