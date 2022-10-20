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

import { useState } from 'react';
import type { UploadFile } from 'antd/es/upload/interface';

export default () => {
    const [uploadList, setUploadList] = useState<UploadFile[]>([]);
    return { uploadList, setUploadList };
};
