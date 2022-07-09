/** @format */

import { useState } from 'react';
import type { UploadFile } from 'antd/es/upload/interface';

export default () => {
    const [uploadList, setUploadList] = useState<UploadFile[]>([]);
    return { uploadList, setUploadList };
};
