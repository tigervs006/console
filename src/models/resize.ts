/** @format */

import { useLayoutEffect, useState } from 'react';

export default () => {
    const innerWidth: number = window.innerWidth;
    const [resize, setResize] = useState<{ pageSize: number; tableScroll: { x: number; y: number } | undefined }>(() => {
        switch (true) {
            case 2560 < innerWidth:
                return { pageSize: 35, tableScroll: { x: 1300, y: 1500 } };
            case 1920 < innerWidth:
                return { pageSize: 20, tableScroll: { x: 1300, y: 900 } };
            default:
                return { pageSize: 15, tableScroll: { x: 1300, y: 600 } };
        }
    });

    /** 处理窗口变化 */
    const handleResize = (resizeWidth: number): void => {
        switch (true) {
            case 2560 < resizeWidth:
                setResize({ pageSize: 35, tableScroll: { x: 1300, y: 1500 } });
                break;
            case 1920 < resizeWidth:
                setResize({ pageSize: 20, tableScroll: { x: 1300, y: 900 } });
                break;
            default:
                setResize({ pageSize: 15, tableScroll: { x: 1300, y: 600 } });
        }
    };

    useLayoutEffect(() => {
        /** 挂载监听事件 */
        window.addEventListener('resize', () => handleResize(window.innerWidth));
        /** 卸载监听事件 */
        return () => window.removeEventListener('resize', () => handleResize(window.innerWidth));
    }, []);

    return { resize };
};
