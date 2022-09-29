/** @format */

import { Row, Col } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { Previews } from '@/pages/components/Attach/Previews';
import { Directory } from '@/pages/components/Attach/Directory';

export default () => {
    return (
        <PageContainer>
            <Row gutter={[32, 32]} style={{ padding: '16px' }}>
                <Col span={4}>
                    <Directory />
                </Col>
                <Col span={20}>
                    <Previews />
                </Col>
            </Row>
        </PageContainer>
    );
};
