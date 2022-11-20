/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import type { DefaultOptionType } from 'rc-select/lib/Select';

/* colOptions */
export const colOptions: DefaultOptionType[] = [];
for (let i = 1; i < 25; i++) {
    colOptions.push({
        label: `col-${i}`,
        value: JSON.stringify({ span: i }),
    });
}

export const valueOptions: (DefaultOptionType & { mode: number })[] = [
    { label: '时间', value: 'time', mode: 0 },
    { label: '日期', value: 'date', mode: 0 },
    { label: '图片', value: 'image', mode: 0 },
    { label: '开关', value: 'switch', mode: 1 },
    { label: '头像', value: 'avatar', mode: 0 },
    { label: '周期', value: 'dateWeek', mode: 0 },
    { label: '年份', value: 'dateYear', mode: 0 },
    { label: '月份', value: 'dateMonth', mode: 0 },
    { label: '季度', value: 'dateQuarter', mode: 0 },
    { label: '文本框', value: 'text', mode: 0 },
    { label: '代码框', value: 'code', mode: 0 },
    { label: '单选框', value: 'radio', mode: 1 },
    { label: '下拉框', value: 'select', mode: 1 },
    { label: '多选框', value: 'checkbox', mode: 1 },
    { label: '进度条', value: 'progress', mode: 0 },
    { label: '星级组件', value: 'rate', mode: 0 },
    { label: '金额入框', value: 'money', mode: 0 },
    { label: '格式化秒', value: 'second', mode: 0 },
    { label: '当前时间', value: 'fromNow', mode: 0 },
    { label: '日期时间', value: 'dateTime', mode: 0 },
    { label: '时间范围', value: 'timeRange', mode: 0 },
    { label: '日期范围', value: 'dateRange', mode: 0 },
    { label: '多行文本', value: 'textarea', mode: 1 },
    { label: '树型下拉', value: 'treeSelect', mode: 1 },
    { label: '时间范围', value: 'dateTimeRange', mode: 0 },
    { label: '数字输入框', value: 'digit', mode: 0 },
    { label: '颜色选择器', value: 'color', mode: 0 },
    { label: '单文件上传', value: 'upload', mode: 0 },
    { label: '百分比组件', value: 'percent', mode: 0 },
    { label: '多文件上传', value: 'uploads', mode: 0 },
    { label: '密码输入框', value: 'password', mode: 0 },
    { label: '级联选择器', value: 'cascader', mode: 1 },
    { label: 'json代码框', value: 'jsonCode', mode: 0 },
    { label: '按钮单选框', value: 'radioButton', mode: 1 },
];

export const patterns: DefaultOptionType[] = [
    { label: '数字', value: '^\\d+$' },
    { label: '整数', value: '^[1-9]+$' },
    { label: '英文', value: '^[a-zA-Z]+$' },
    { label: '手机', value: '^1[3456789]\\d{9}$' },
    { label: '中文', value: '^[\\u4e00-\\u9fa5]+$' },
    { label: '邮箱', value: '^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\\.[a-zA-Z0-9_-])+$' },
    // eslint-disable-next-line max-len
    { label: '网址', value: "^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w.-]+)+[\\w\\-._~:/?#[]@!\\$&'*\\+,;=.]+$" },
    // eslint-disable-next-line max-len
    { label: '身份证', value: '^[1-9][0-9]{5}(19[0-9]{2}|20[0|1][0-9])(0[1-9]|1[0|1|2])(0[1-9]|[1|2][0-9]|3[0|1])[0-9]{3}([0-9]|X)+$' },
    { label: '英文数字', value: '^[A-Za-z0-9]+$' },
    { label: '英文数字和下划线', value: '^\\w+$' },
];
