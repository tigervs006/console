/** @format */

import { Image } from 'antd';
import type { ForwardedRef } from 'react';
import { randomString } from '@/extra/utils';
import type { attachDataItem } from '../Attach/data';
import React, { useImperativeHandle, forwardRef, useState } from 'react';

export const ImagePreview: React.FC<{
    curIdx?: number;
    ref: ForwardedRef<any>;
    imgList: attachDataItem[];
}> = forwardRef((props, ref) => {
    const curId = props?.curIdx ?? 0;
    const [visible, setVisible] = useState<boolean>(false);
    useImperativeHandle(ref, () => ({ imagePreview: (value: boolean) => setVisible(value) }));
    return (
        <div style={{ display: 'none' }}>
            <Image.PreviewGroup preview={{ visible, current: curId, onVisibleChange: value => setVisible(value) }}>
                {props?.imgList.map(item => (
                    <Image key={item?.id ?? randomString(4)} src={item?.url ?? item.static_path} />
                ))}
            </Image.PreviewGroup>
        </div>
    );
});
