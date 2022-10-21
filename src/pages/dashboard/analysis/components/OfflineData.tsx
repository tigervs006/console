/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import styles from '../style.less';
import NumberInfo from './NumberInfo';
import { Card, Tabs, Col, Row } from 'antd';
import { RingProgress, Line } from '@ant-design/charts';
import type { OfflineDataType, DataItem } from '../data.d';

const CustomTab = ({ data, currentTabKey: currentKey }: { data: OfflineDataType; currentTabKey: string }) => (
    <Row gutter={8} style={{ width: 138, margin: '8px 0' }}>
        <Col span={12}>
            <NumberInfo
                title={data.name}
                subTitle="转化率"
                gap={2}
                total={`${data.cvr * 100}%`}
                theme={currentKey !== data.name ? 'light' : undefined}
            />
        </Col>
        <Col span={12} style={{ paddingTop: 36 }}>
            <RingProgress forceFit height={60} width={60} percent={data.cvr} />
        </Col>
    </Row>
);

const OfflineData = ({
    offlineChartData,
    handleTabChange,
    offlineData,
    activeKey,
    loading,
}: {
    activeKey: string;
    loading: boolean;
    offlineData: OfflineDataType[];
    offlineChartData: DataItem[];
    handleTabChange: (activeKey: string) => void;
}) => (
    <Card loading={loading} className={styles.offlineCard} bordered={false} style={{ marginTop: 32 }}>
        <Tabs
            activeKey={activeKey}
            onChange={handleTabChange}
            items={offlineData.map(item => ({
                key: item.name,
                label: <CustomTab data={item} currentTabKey={activeKey} />,
                children: (
                    <div style={{ padding: '0 24px' }}>
                        <Line
                            forceFit
                            height={400}
                            data={offlineChartData}
                            responsive
                            xField="date"
                            yField="value"
                            seriesField="type"
                            interactions={[
                                {
                                    type: 'slider',
                                    cfg: {},
                                },
                            ]}
                            legend={{
                                position: 'top-center',
                            }}
                        />
                    </div>
                ),
            }))}
        />
    </Card>
);

export default OfflineData;
