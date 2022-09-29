/** @format */

import React from 'react';
import { Row, Col } from 'antd';
import { Previews } from './Previews';
import { Directory } from './Directory';
import type { Gutter } from 'antd/es/grid/row';

export const Attach: React.FC<{
    previewSpan?: number;
    directorySpan?: number;
    gutter?: Gutter | [Gutter, Gutter];
}> = props => {
    const gutter = props?.gutter ?? [32, 32];
    const previewSpan = props?.previewSpan ?? 20;
    const directorySpan = props?.directorySpan ?? 4;
    return (
        <Row gutter={gutter} style={{ padding: '16px' }}>
            <Col span={directorySpan}>
                <Directory />
            </Col>
            <Col span={previewSpan}>
                <Previews />
            </Col>
        </Row>
    );
};
