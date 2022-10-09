/** @format */

import '../index.less';
import { useModel } from 'umi';
import type { UploadProps } from 'antd';
import React, { useState, useRef } from 'react';
import { CheckCard } from '@ant-design/pro-card';
import { ImagePreview } from '../../ImagePreview';
import type { UploadFile } from 'antd/es/upload/interface';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Typography, Pagination, TreeSelect, message, Button, Upload, Space, Row, Col } from 'antd';

export const Previews: React.FC = () => {
    const { Text } = Typography;
    const [value, setValue] = useState<string>();
    /* previewRef */
    const previewRef: React.ForwardedRef<any> = useRef();
    /* 设置预览索引 */
    const [currentId, setCurrentId] = useState<number>(0);
    const { cateData, currentKey } = useModel('attach', ret => ({
        cateData: ret.cateData,
        currentKey: ret.currentKey,
    }));
    /* 设置选中的值 */
    const [checkedItem, setCheckedItem] = useState<string[]>([]);
    console.log('currentKey', currentKey);
    const uploadProps: UploadProps = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success!(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error!(`${info.file.name} file upload failed.`);
            }
        },
    };

    /* 处理删除事件 */
    const handleDelete = (e: any, id: number | string) => {
        e.stopPropagation();
        message.info!(`删除图像 ${id}`);
    };

    /* 处理图像预览 */
    const handlePreivew = (e: any, id: number | string) => {
        e.stopPropagation();
        setCurrentId(id as number);
        previewRef.current?.imagePreview(true);
    };

    /* SelectChange事件 */
    const handleTreeSelectChange = (newValue: string) => {
        setValue(newValue);
    };

    /* 自定义生成模拟数据 */
    const displayCarouselItems = (num: number): UploadFile[] => {
        const renderValue = [];
        for (let i = 0; i < num; i++) {
            renderValue.push({
                uid: `${i}`,
                value: `${i}`,
                name: `demo-${i}.png`,
                url: '/manage/demo.png',
            });
        }
        return renderValue;
    };

    return (
        <Row>
            <Col span={24}>
                <Space size="middle" style={{ marginBottom: '1rem' }}>
                    <Upload {...uploadProps}>
                        <Button>上传图像</Button>
                    </Upload>
                    <Button onClick={() => alert(`删除图像 ${checkedItem}`)} disabled={!checkedItem.length}>
                        删除图像
                    </Button>
                    <TreeSelect
                        allowClear
                        showSearch
                        value={value}
                        treeData={cateData}
                        placeholder="移动至..."
                        treeNodeFilterProp="name"
                        style={{ minWidth: '150px' }}
                        disabled={!checkedItem.length}
                        onChange={handleTreeSelectChange}
                        fieldNames={{ label: 'name', value: 'id' }}
                    />
                </Space>
            </Col>
            <Col span={24}>
                {/* eslint-disable-next-line max-len */}
                <CheckCard.Group size="small" multiple={true} style={{ width: '100%' }} onChange={values => setCheckedItem(values as string[])}>
                    <Row gutter={16}>
                        {displayCarouselItems(32).map((item: Record<string, any>) => (
                            <Col span={3} key={item.uid}>
                                <CheckCard
                                    value={item.value}
                                    style={{ width: '150px', height: '150px' }}
                                    cover={
                                        <div className="ant-image">
                                            <img alt="demo" className="ant-image-img" src="/manage/demo.png" />
                                            <div className="ant-image-mask">
                                                <Space className="ant-image-mask-info">
                                                    <Text className="anticon" onClick={e => handlePreivew(e, item.value)}>
                                                        <p>
                                                            <EyeOutlined />
                                                            预览
                                                        </p>
                                                    </Text>
                                                    <Text className="anticon" onClick={e => handleDelete(e, item.value)}>
                                                        <p>
                                                            <DeleteOutlined />
                                                            删除
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
                <ImagePreview curIdx={currentId} ref={previewRef} imgList={displayCarouselItems(32)} />
            </Col>
            <Col span={24}>
                <Pagination
                    total={50}
                    size="small"
                    showSizeChanger
                    style={{ float: 'right' }}
                    showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`}
                />
            </Col>
        </Row>
    );
};
