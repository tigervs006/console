/** @format */

import React from 'react';
import { Row, Col } from 'antd';
import { Previews } from './Previews';
import { Directory } from './Directory';
import type { DataNode } from 'antd/es/tree';
import type { Gutter } from 'antd/es/grid/row';

export const Attach: React.FC<{
    previewSpan?: number;
    directorySpan?: number;
    gutter?: Gutter | [Gutter, Gutter];
}> = props => {
    const gutter = props?.gutter ?? [32, 32];
    const previewSpan = props?.previewSpan ?? 20;
    const directorySpan = props?.directorySpan ?? 4;
    const defaultData: DataNode[] = [
        {
            key: 'all',
            title: '全部人类',
        },
        {
            key: 'adult',
            title: '成年人',
            children: [
                {
                    key: 'man',
                    title: '男人',
                    children: [
                        {
                            key: 'father',
                            title: '父亲',
                        },
                    ],
                },
                {
                    key: 'woman',
                    title: '女人',
                    children: [
                        {
                            key: 'mother',
                            title: '母亲',
                        },
                    ],
                },
            ],
        },
        {
            key: 'juveniles',
            title: '未成年人',
            children: [
                {
                    key: 'boy',
                    title: '男孩',
                    children: [
                        {
                            key: 'son',
                            title: '儿子',
                        },
                    ],
                },
                {
                    key: 'girl',
                    title: '女孩',
                    children: [
                        {
                            key: 'daughter',
                            title: '女儿',
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <Row gutter={gutter} style={{ padding: '16px' }}>
            <Col span={directorySpan}>
                <Directory defaultData={defaultData} />
            </Col>
            <Col span={previewSpan}>
                <Previews directory={defaultData} />
            </Col>
        </Row>
    );
};
