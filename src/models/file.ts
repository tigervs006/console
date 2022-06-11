import { useState } from 'react';
import type { UploadFile } from 'antd/es/upload/interface';

export default () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  return { fileList, setFileList };
};
