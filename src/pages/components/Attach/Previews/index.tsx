/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

/** @format */

import { useRequest, useModel } from 'umi';
import { findParentId } from '@/extra/utils';
import type { attachDataItem } from '../data';
import { CheckCard } from '@ant-design/pro-card';
import { ImagePreview } from '../../ImagePreview';
import { deletes, list, move } from '../services';
import { UploadAdapter } from '../../UploadAdapter';
import React, { useEffect, useState, useRef } from 'react';
import type { UploadFile } from 'antd/es/upload/interface';
import {
    ExclamationCircleOutlined,
    QuestionCircleOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    SyncOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import { Typography, Pagination, TreeSelect, message, Button, Badge, Modal, Space, Spin, Row, Col } from 'antd';

export const Previews: React.FC = () => {
    const { Text } = Typography;
    /* 图像处理 */
    const imageProcess = {
        1: '',
        2: '?x-oss-process=image/auto-orient,1/interlace,1/resize,m_lfit,w_150/quality,q_90',
        3: '?imageMogr2/thumbnail/150x/interlace/1/rquality/90',
    };
    /* previewRef */
    const previewRef: React.ForwardedRef<any> = useRef();
    /* 分页总数设置 */
    const [totals, setTotal] = useState<number>(0);
    /* 默认文件列表 */
    const [fileList, setFileList] = useState<attachDataItem[]>();
    /* 设置预览索引 */
    const [currentId, setCurrentId] = useState<number>(0);
    /* 设置文件列表 */
    const { setUploadList } = useModel('file', ret => ({
        setUploadList: ret.setUploadList,
    }));
    /* 设置选中的值 */
    const [checkedItem, setCheckedItem] = useState<attachDataItem[]>([]);
    // prettier-ignore
    const {
		limit,
		cateId,
		isModal,
		cateData,
		cateInfo,
		multiple,
		setCateId,
		pagination,
		setVisible,
		setPagination,
		setExpandedKeys
	} = useModel('attach', ret => ({
		limit: ret.limit,
        cateId: ret.cateId,
        isModal: ret.isModal,
        cateData: ret.cateData,
        cateInfo: ret.cateInfo,
		multiple: ret.multiple,
        setCateId: ret.setCateId,
		setVisible: ret.setVisible,
        pagination: ret.pagination,
        setPagination: ret.setPagination,
        setExpandedKeys: ret.setExpandedKeys,
    }));

    // prettier-ignore
    const {
        run: fetchList, refresh, loading } = useRequest(list, {
        manual: true,
        defaultParams: [{ id: 0, ...pagination }],
        onSuccess: (res: { total: number; list?: attachDataItem[] }) => {
            setTotal(res?.total);
            setFileList(res?.list);
			setCheckedItem([]);
        },
    });

    /* 处理移动分类 */
    const handleMoveCate = async (newValue: number) => {
        const ids: number[] = [];
        checkedItem.forEach(item => ids.push(item.id));
        const expandKey = findParentId(cateData, data => data.id == Array.of(newValue));
        1 < expandKey.length && expandKey.pop();
        await move({ id: ids, pid: newValue }).then(res => {
            if (res?.success) {
                setCheckedItem([]);
                message.success(res.msg);
                setExpandedKeys(expandKey);
                setCateId(Array.of(newValue));
            }
        });
    };

    /* 处理图像预览 */
    const handlePreivew = (e: any, id: number | string) => {
        e.stopPropagation();
        fileList?.forEach((item: attachDataItem, idx: number) => {
            id == item.id && setCurrentId(idx);
        });
        previewRef.current?.imagePreview(true);
    };

    useEffect(() => {
        fetchList!({ id: cateId.at(0), ...pagination });
    }, [cateId, fetchList, pagination]);

    /* 使用选中按钮 */
    const handleUseSelect = () => {
        const fileSelect = checkedItem.map(item => ({
            status: 'done',
            name: item.name,
            url: item.static_path,
            uid: item.id.toString(),
        }));
        // prettier-ignore
        multiple
			? setUploadList(prev => prev.concat(fileSelect as UploadFile[]).slice(-limit))
			: setUploadList(fileSelect.slice(-limit) as UploadFile[]);
        setVisible(false); /* close modal */
    };

    /* 处理删除事件 */
    const handleDelete = (e: any, record: attachDataItem | attachDataItem[]) => {
        e.stopPropagation();
        Modal.confirm({
            centered: true,
            cancelText: '算了',
            title: '当真要删除?',
            icon: <QuestionCircleOutlined />,
            cancelButtonProps: { shape: 'round' },
            okButtonProps: { danger: true, shape: 'round' },
            content: (
                <Space direction="vertical">
                    <Text>{record instanceof Array ? `这 ${record.length} 个文件` : `${record.name} 这个文件`}</Text>
                    <Text type="danger">
                        <ExclamationCircleOutlined /> 文件从存储中删除后将无法恢复
                    </Text>
                </Space>
            ),
            async onOk() {
                await deletes({ attach: record instanceof Array ? record : Array.of(record) }).then(res => {
                    if (res?.success) {
                        refresh();
                        setCheckedItem([]);
                        message.success(res.msg);
                    }
                });
            },
            onCancel() {
                setCheckedItem([]);
            },
        });
    };

    return (
        <Row>
            <Col span={24}>
                <Space size="middle" style={{ marginBottom: '1rem' }}>
                    <UploadAdapter
                        fetch={refresh}
                        {...cateInfo?.config}
                        formTitle={'上传文件'}
                        extraData={{ pid: cateInfo?.id ?? 0, path: cateInfo?.dirname ?? 'attach' }}
                    />
                    <Button icon={<SyncOutlined />} onClick={refresh}>
                        刷新列表
                    </Button>
                    {isModal ? (
                        <Badge count={checkedItem.length}>
                            <Button disabled={!checkedItem.length} icon={<CheckCircleOutlined />} onClick={() => handleUseSelect()}>
                                使用选中
                            </Button>
                        </Badge>
                    ) : (
                        <Badge count={checkedItem.length}>
                            <Button
                                icon={checkedItem.length ? <CloseCircleOutlined /> : <CheckCircleOutlined />}
                                onClick={() => {
                                    checkedItem.length ? setCheckedItem([]) : setCheckedItem(fileList ?? []);
                                }}
                            >
                                {checkedItem.length ? '清空选择' : '全部选择'}
                            </Button>
                        </Badge>
                    )}
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        disabled={!checkedItem.length}
                        onClick={e => handleDelete(e, checkedItem as attachDataItem[])}
                    >
                        删除文件
                    </Button>
                    <TreeSelect
                        allowClear
                        showSearch
                        treeData={cateData}
                        placeholder="移动至..."
                        treeNodeFilterProp="name"
                        onChange={handleMoveCate}
                        style={{ minWidth: '150px' }}
                        disabled={!checkedItem.length}
                        fieldNames={{ label: 'name', value: 'id' }}
                    />
                </Space>
            </Col>
            <Col span={24}>
                <Spin spinning={loading} tip="Loading...">
                    <CheckCard.Group
                        size="small"
                        multiple={true}
                        style={{ width: '100%' }}
                        value={checkedItem as any}
                        onChange={values => setCheckedItem(values as unknown as attachDataItem[])}
                    >
                        <Row gutter={16}>
                            {fileList?.map((item: Record<string, any>) => (
                                <Col span={isModal ? 4 : 3} key={item.id}>
                                    <CheckCard
                                        value={item}
                                        style={{
                                            overflow: 'hidden',
                                            width: isModal ? '100px' : '150px',
                                            height: isModal ? '100px' : '150px',
                                        }}
                                        cover={
                                            <div className="ant-image">
                                                <img
                                                    alt={item.name}
                                                    className="ant-image-img"
                                                    src={`${item.real_path}${imageProcess[item.storage]}`}
                                                />
                                                <div className="ant-image-mask">
                                                    <Space className="ant-image-mask-info">
                                                        <Text className="anticon" onClick={e => handlePreivew(e, item.id)}>
                                                            <p>
                                                                <EyeOutlined />
                                                                {!isModal && '预览'}
                                                            </p>
                                                        </Text>
                                                        <Text className="anticon" onClick={e => handleDelete(e, item as attachDataItem)}>
                                                            <p>
                                                                <DeleteOutlined />
                                                                {!isModal && '删除'}
                                                            </p>
                                                        </Text>
                                                    </Space>
                                                </div>
                                            </div>
                                        }
                                    />
                                </Col>
                            ))}
                        </Row>
                    </CheckCard.Group>
                </Spin>
            </Col>
            <Col span={24}>
                <ImagePreview curIdx={currentId} ref={previewRef} imgList={fileList ?? []} />
            </Col>
            <Col span={24}>
                <Pagination
                    responsive
                    size="small"
                    total={totals}
                    hideOnSinglePage
                    style={{ float: 'right' }}
                    current={pagination.current}
                    pageSize={pagination.pageSize}
                    pageSizeOptions={[24, 32, 40, 48]}
                    defaultPageSize={isModal ? 24 : 32}
                    showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条/总共 ${totals} 条`}
                    onChange={(page, pageSize) => setPagination({ current: page, pageSize: pageSize })}
                    onShowSizeChange={(current, size) => setPagination({ current: current, pageSize: size })}
                />
            </Col>
        </Row>
    );
};
