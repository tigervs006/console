/** @format */

import { Image } from 'antd';
import type { ForwardedRef } from 'react';
import { randomString } from '@/extra/utils';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

export const ImagePreview: React.FC<{
    curIdx?: number;
    imgList: UploadFile[];
    ref: ForwardedRef<any>;
}> = forwardRef((props, ref) => {
    const curId = props?.curIdx ?? 0;
    const [visible, setVisible] = useState<boolean>(false);
    useImperativeHandle(ref, () => ({ imagePreview: (value: boolean) => setVisible(value) }));
    return (
        <div style={{ display: 'none' }}>
            <Image.PreviewGroup preview={{ visible, current: curId, onVisibleChange: value => setVisible(value) }}>
                {props?.imgList.map(item => (
                    <Image key={randomString(4)} src={item.url} />
                ))}
            </Image.PreviewGroup>
        </div>
    );
});
