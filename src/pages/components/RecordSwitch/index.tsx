/** @format */

import { message, Switch } from 'antd';
import React, { useState } from 'react';
import { postData } from '@/services/ant-design-pro/api';

export const RecordSwitch: React.FC<{
    url: string;
    echoChecked?: string;
    echoUnChecked?: string;
    record: { id?: number | string; status?: number | string };
}> = props => {
    // echoChecked
    const echoChecked: string = props?.echoChecked ?? '显示';
    // echoUnChecked
    const echoUnChecked: string = props?.echoUnChecked ?? '隐藏';
    // loading加载状态
    const [loadings, setLoadings] = useState<boolean>(false);
    /**
     * 设置栏目状态
     * @param e 事件
     * @param checked 状态
     * @param record 当前记录
     */
    const handleChange = async (checked: boolean, e: MouseEvent, record: Record<string, any>) => {
        // 阻止事件冒泡
        e.stopPropagation();
        setLoadings(true);
        await postData(props.url, { id: record.id, status: checked ? 1 : 0 }).then(res => {
            setLoadings(false);
            message.success(res.msg);
        });
    };
    return (
        <Switch
            loading={loadings}
            key={props.record.id}
            checkedChildren={echoChecked}
            unCheckedChildren={echoUnChecked}
            defaultChecked={!!props.record.status}
            onChange={(checked, event) => handleChange(checked, event, props.record)}
        />
    );
};
