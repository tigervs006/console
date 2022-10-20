/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

/** @format */

import type { BaseType } from 'antd/lib/typography/Base';

export interface stateData {
    saving: boolean;
    content: string;
    uploadPath: string;
    defaultType: BaseType;
    defaultStatus: string;
}
export interface parentProps {
    content?: string;
    uploadPath?: string;
    setContent: (contents: string) => void;
}
