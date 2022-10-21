/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import numeral from 'numeral';
import type moment from 'moment';
import styles from '../style.less';
import type { DataItem } from '../data.d';
import { Column } from '@ant-design/charts';
import { Card, Col, DatePicker, Row, Tabs } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';

export type TimeType = 'today' | 'week' | 'month' | 'year';
type RangePickerValue = RangePickerProps<moment.Moment>['value'];

const { RangePicker } = DatePicker;
const rankingListData: { title: string; total: number }[] = [];
for (let i = 0; i < 7; i += 1) {
    rankingListData.push({
        title: `工专路 ${i} 号店`,
        total: 323234,
    });
}

const SalesCard = ({
    handleRangePickerChange,
    rangePickerValue,
    selectDate,
    salesData,
    isActive,
    loading,
}: {
    loading: boolean;
    salesData: DataItem[];
    rangePickerValue: RangePickerValue;
    isActive: (key: TimeType) => string;
    selectDate: (key: TimeType) => void;
    handleRangePickerChange: (dates: RangePickerValue, dateStrings: [string, string]) => void;
}) => {
    const tabItem = [
        {
            key: 'sales',
            label: '销售额',
            children: (
                <Row>
                    <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                        <div className={styles.salesBar}>
                            <Column
                                height={300}
                                forceFit
                                data={salesData as any}
                                xField="x"
                                yField="y"
                                xAxis={{
                                    visible: true,
                                    title: {
                                        visible: false,
                                    },
                                }}
                                yAxis={{
                                    visible: true,
                                    title: {
                                        visible: false,
                                    },
                                }}
                                title={{
                                    visible: true,
                                    text: '销售趋势',
                                    style: {
                                        fontSize: 14,
                                    },
                                }}
                                meta={{
                                    y: {
                                        alias: '销售量',
                                    },
                                }}
                            />
                        </div>
                    </Col>
                    <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                        <div className={styles.salesRank}>
                            <h4 className={styles.rankingTitle}>门店销售额排名</h4>
                            <ul className={styles.rankingList}>
                                {rankingListData.map((item, i) => (
                                    <li key={item.title}>
                                        <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>{i + 1}</span>
                                        <span className={styles.rankingItemTitle} title={item.title}>
                                            {item.title}
                                        </span>
                                        <span className={styles.rankingItemValue}>{numeral(item.total).format('0,0')}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Col>
                </Row>
            ),
        },
        {
            key: 'views',
            label: '访问量',
            children: (
                <Row>
                    <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                        <div className={styles.salesBar}>
                            <Column
                                height={300}
                                forceFit
                                data={salesData as any}
                                xField="x"
                                yField="y"
                                xAxis={{
                                    visible: true,
                                    title: {
                                        visible: false,
                                    },
                                }}
                                yAxis={{
                                    visible: true,
                                    title: {
                                        visible: false,
                                    },
                                }}
                                title={{
                                    visible: true,
                                    text: '访问量趋势',
                                    style: {
                                        fontSize: 14,
                                    },
                                }}
                                meta={{
                                    y: {
                                        alias: '访问量',
                                    },
                                }}
                            />
                        </div>
                    </Col>
                    <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                        <div className={styles.salesRank}>
                            <h4 className={styles.rankingTitle}>门店访问量排名</h4>
                            <ul className={styles.rankingList}>
                                {rankingListData.map((item, i) => (
                                    <li key={item.title}>
                                        <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>{i + 1}</span>
                                        <span className={styles.rankingItemTitle} title={item.title}>
                                            {item.title}
                                        </span>
                                        <span>{numeral(item.total).format('0,0')}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Col>
                </Row>
            ),
        },
    ];
    return (
        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
            <div className={styles.salesCard}>
                <Tabs
                    items={tabItem}
                    tabBarExtraContent={
                        <div className={styles.salesExtraWrap}>
                            <div className={styles.salesExtra}>
                                <a className={isActive('today')} onClick={() => selectDate('today')}>
                                    今日
                                </a>
                                <a className={isActive('week')} onClick={() => selectDate('week')}>
                                    本周
                                </a>
                                <a className={isActive('month')} onClick={() => selectDate('month')}>
                                    本月
                                </a>
                                <a className={isActive('year')} onClick={() => selectDate('year')}>
                                    本年
                                </a>
                            </div>
                            <RangePicker style={{ width: 256 }} value={rangePickerValue} onChange={handleRangePickerChange} />
                        </div>
                    }
                    size="large"
                    tabBarStyle={{ marginBottom: 24 }}
                />
            </div>
        </Card>
    );
};

export default SalesCard;
