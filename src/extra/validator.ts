/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

export const validateMessages = {
    default: '${label}字段验证错误',
    required: '${label}是必填字段',
    whitespace: '${label}开头不得带有空格',
    enum: '${label}必须是以下[${enum}]之一',
    date: {
        parse: '${label}无法解析为日期',
        invalid: '${label}是无效的日期',
        format: '${label}是无效的日期格式',
    },
    types: {
        url: '${label}是无效的${type}网址',
        array: '${label}是无效的${type}数组',
        object: '${label}是无效的${type}对象',
        number: '${label}是无效的${type}数字',
        method: '${label}是无效的${type}方法',
        hex: '${label}是无效的${type}十六进制',
        integer: '${label}是无效的${type}整数',
        float: '${label}是无效的${type}浮点值',
        date: '${label}是无效的${type}日期格式',
        regexp: '${label}是无效的${type}表达式',
        string: '${label}是无效的${type}字符串',
        email: '${label}是无效的${type}邮件地址',
        boolean: '${label}是无效的${type}布尔值',
    },
    string: {
        len: '${label}长度必须为${len}个字符',
        min: '${label}长度最少为${min}个字符',
        max: '${label}长度不得超过${max}个字符',
        range: '${label}长度必须在${min}和${max}个字符之间',
    },
    number: {
        len: '${label}必须等于${len}',
        min: '${label}不得小于${min}',
        max: '${label}不得大于${max}',
        range: '${label}必须在${min}和${max}之间',
    },
    array: {
        len: '${label}数组长度必须等于${len}',
        min: '${label}数组长度必须小于${min}',
        max: '${label}数组长度不得超过${max}',
        range: '${label}数组长度必须在${min}和${max}之间',
    },
    pattern: {
        mismatch: '${label}与正则表达式[${pattern}]不匹配',
    },
};

export const defPatterns = {
    /* 验证全小写字母 */
    lower: new RegExp('^[a-z]+$'),
    /* 验证全大写字母 */
    upper: new RegExp('^[A-Z]+$'),
    /* 验证英文数字和下划线 */
    alphaDash: new RegExp('^\\w+$'),
    /* 验证小写字母开头 */
    lowerStart: new RegExp('^[a-z]\\w*$'),
    /* 验证大写字母开头 */
    upperStart: new RegExp('^[A-Z]\\w*$'),
    /* 验证是否中文 */
    chs: new RegExp('^[\u4e00-\u9fa5]+$'),
    /* 验证英文和数字 */
    chsAlphaNum: new RegExp('^[a-zA-Z0-9]$'),
    /* 验证电话号码 */
    phoneNum: new RegExp('^\\d{3}-\\d{8}|\\d{4}-\\d{7}$'),
    /* 验证不带协议的url */
    urlWithoutProtocol: new RegExp("^//[\\w.-]+(?:\\.[\\w.-]+)+[\\w\\-._~:/?#[\\]@!$&'*+,;=]+$"),
    /* 验证有效ipV4地址 */
    ipaddressV4: new RegExp('^(([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5]).){3}([1-9]?\\d|1\\d{2}|2[0-4]\\d|25[0-5])$'),
    /* 验证有效身份证 */
    identity: new RegExp('^[1-9][0-9]{5}(19[0-9]{2}|20[0|1][0-9])(0[1-9]|1[0|2])(0[1-9]|[1|2][0-9]|3[0|1])[0-9]{3}([0-9]|X)+$'),
    /** 验证有效ipV6地址 */
    // eslint-disable-next-line max-len
    ipaddressV6: new RegExp(
        '(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]+|::(ffff(:0{1,4})?:)?((25[0-5]|(2[0-4]|1?[0-9])?[0-9])\\\\.){3}(25[0-5]|(2[0-4]|1?[0-9])?[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1?[0-9])?[0-9])\\\\.){3}(25[0-5]|(2[0-4]|1?[0-9])?[0-9]))',
    ),
};
