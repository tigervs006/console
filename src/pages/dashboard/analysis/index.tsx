/** @format */

import React from 'react';
import { useRequest } from 'umi';
import styles from './style.less';
import type moment from 'moment';
import { fakeChartData } from './service';
import { Suspense, useState } from 'react';
import type { AnalysisData } from './data.d';
import SalesCard from './components/SalesCard';
import TopSearch from './components/TopSearch';
import { Col, Dropdown, Menu, Row } from 'antd';
import { getTimeDistance } from './utils/utils';
import OfflineData from './components/OfflineData';
import PageLoading from './components/PageLoading';
import { EllipsisOutlined } from '@ant-design/icons';
import IntroduceRow from './components/IntroduceRow';
import type { RadioChangeEvent } from 'antd/es/radio';
import type { TimeType } from './components/SalesCard';
import { PageContainer } from '@ant-design/pro-layout';
import ProportionSales from './components/ProportionSales';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';

type RangePickerValue = RangePickerProps<moment.Moment>['value'];

type AnalysisProps = {
    dashboardAndanalysis: AnalysisData;
    loading: boolean;
};

type SalesType = 'all' | 'online' | 'stores';

const Analysis: React.FC<AnalysisProps> = () => {
    const [salesType, setSalesType] = useState<SalesType>('all');
    const [currentTabKey, setCurrentTabKey] = useState<string>('');
    const [rangePickerValue, setRangePickerValue] = useState<RangePickerValue>(getTimeDistance('year'));

    const { loading, data } = useRequest(fakeChartData);

    const selectDate = (type: TimeType) => {
        setRangePickerValue(getTimeDistance(type));
    };

    const handleRangePickerChange = (value: RangePickerValue) => {
        setRangePickerValue(value);
    };

    const isActive = (type: TimeType) => {
        if (!rangePickerValue) {
            return '';
        }
        const value = getTimeDistance(type);
        if (!value) {
            return '';
        }
        if (!rangePickerValue[0] || !rangePickerValue[1]) {
            return '';
        }
        if (rangePickerValue[0].isSame(value[0] as moment.Moment, 'day') && rangePickerValue[1].isSame(value[1] as moment.Moment, 'day')) {
            return styles.currentDate;
        }
        return '';
    };

    let salesPieData;
    if (salesType === 'all') {
        salesPieData = data?.salesTypeData;
    } else {
        salesPieData = salesType === 'online' ? data?.salesTypeDataOnline : data?.salesTypeDataOffline;
    }

    const menu = (
        <Menu>
            <Menu.Item>操作一</Menu.Item>
            <Menu.Item>操作二</Menu.Item>
        </Menu>
    );

    const dropdownGroup = (
        <span className={styles.iconGroup}>
            <Dropdown overlay={menu} placement="bottomRight">
                <EllipsisOutlined />
            </Dropdown>
        </span>
    );

    const handleChangeSalesType = (e: RadioChangeEvent) => {
        setSalesType(e.target.value);
    };

    const handleTabChange = (key: string) => {
        setCurrentTabKey(key);
    };

    const activeKey = currentTabKey || (data?.offlineData[0] && data?.offlineData[0].name) || '';

    return (
        <PageContainer>
            <>
                <Suspense fallback={<PageLoading />}>
                    <IntroduceRow loading={loading} visitData={data?.visitData || []} />
                </Suspense>

                <Suspense fallback={null}>
                    <SalesCard
                        rangePickerValue={rangePickerValue}
                        salesData={data?.salesData || []}
                        isActive={isActive}
                        handleRangePickerChange={handleRangePickerChange}
                        loading={loading}
                        selectDate={selectDate}
                    />
                </Suspense>

                <Row
                    gutter={24}
                    style={{
                        marginTop: 24,
                    }}
                >
                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                        <Suspense fallback={null}>
                            <TopSearch
                                loading={loading}
                                visitData2={data?.visitData2 || []}
                                searchData={data?.searchData || []}
                                dropdownGroup={dropdownGroup}
                            />
                        </Suspense>
                    </Col>
                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                        <Suspense fallback={null}>
                            <ProportionSales
                                dropdownGroup={dropdownGroup}
                                salesType={salesType}
                                loading={loading}
                                salesPieData={salesPieData || []}
                                handleChangeSalesType={handleChangeSalesType}
                            />
                        </Suspense>
                    </Col>
                </Row>

                <Suspense fallback={null}>
                    <OfflineData
                        activeKey={activeKey}
                        loading={loading}
                        offlineData={data?.offlineData || []}
                        offlineChartData={data?.offlineChartData || []}
                        handleTabChange={handleTabChange}
                    />
                </Suspense>
            </>
        </PageContainer>
    );
};

export default Analysis;
