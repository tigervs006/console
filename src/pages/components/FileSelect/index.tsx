/** @format */

import './index.less';
import lodash from 'lodash';
import { useModel } from 'umi';
import { Attach } from '../Attach';
import Draggable from 'react-draggable';
import '@/pages/components/Attach/index.less';
import { ImagePreview } from '../ImagePreview';
import React, { useState, useRef } from 'react';
import { Typography, Button, Space } from 'antd';
import { ModalForm } from '@ant-design/pro-form';
import type { attachDataItem } from '../Attach/data';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import { CameraOutlined, CloseOutlined, EyeOutlined } from '@ant-design/icons';

export const FileSelect: React.FC = () => {
    const { Text } = Typography;
    /* previewRef */
    const previewRef: React.ForwardedRef<any> = useRef();
    /* currentIdx */
    const [curIdx, setCurIdx] = useState<number>(0);
    /* draggleRef */
    const draggleRef = useRef<HTMLDivElement>(null);
    /* setDisabled */
    const [disabled, setDisabled] = useState<boolean>(false);
    /* setBounds */
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });

    const { uploadList, setUploadList } = useModel('file', ret => ({
        uploadList: ret.uploadList,
        setUploadList: ret.setUploadList,
    }));
    // prettier-ignore
    const {
		visible,
		setCateId,
		setIsModal,
		setVisible,
		setPagination,
		setExpandedKeys
	} = useModel('attach', ret => ({
        isModal: ret.isModal,
		visible: ret.visible,
        setCateId: ret.setCateId,
        setIsModal: ret.setIsModal,
		setVisible: ret.setVisible,
        setPagination: ret.setPagination,
        setExpandedKeys: ret.setExpandedKeys,
    }));

    /* Modal位置 */
    const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
        const targetRect = draggleRef.current?.getBoundingClientRect();
        const { clientWidth, clientHeight } = window.document.documentElement;
        if (!targetRect) {
            return;
        }
        setBounds({
            top: -targetRect.top + uiData.y,
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };

    /* 处理移除文件 */
    const handleRemove = (idx: number) => {
        setUploadList(prev => {
            /* 克隆数组 */
            const list = lodash.cloneDeep(prev);
            /* 过滤空数组 */
            list.splice(idx, 1).filter(item => item);
            return list;
        });
    };

    /* 处理文件预览 */
    const handlePreview = (idx: number) => {
        setCurIdx(idx);
        previewRef.current?.imagePreview(true);
    };

    const handleOpenFolder = () => {
        setCateId([0]);
        setVisible(true);
        setExpandedKeys([]);
        setPagination({ current: 1, pageSize: 24 });
    };

    return (
        <>
            <Space size="large" className="ant-image-container">
                {uploadList
                    ? uploadList?.map((item, idx) => (
                          <div key={item.uid} className="ant-image">
                              <img src={item.url} alt={item.name} className="ant-image-img" />
                              <div className="ant-image-mask">
                                  <Space className="ant-image-mask-info">
                                      <Text className="anticon" onClick={() => handlePreview(idx)}>
                                          <p>
                                              <EyeOutlined />
                                              预览
                                          </p>
                                      </Text>
                                  </Space>
                              </div>
                              <Button shape="circle" icon={<CloseOutlined style={{ fontSize: '.8rem' }} />} onClick={() => handleRemove(idx)} />
                          </div>
                      ))
                    : null}
                <div className="ant-image-select">
                    <CameraOutlined id="select" onClick={() => handleOpenFolder()} />
                </div>
            </Space>
            <ImagePreview ref={previewRef} curIdx={curIdx} imgList={uploadList as unknown as attachDataItem[]} />
            <ModalForm
                width={960}
                visible={visible}
                submitter={false}
                onVisibleChange={value => setIsModal(value)}
                modalProps={{
                    centered: true,
                    maskClosable: false,
                    destroyOnClose: true,
                    afterClose: () => {
                        setCateId([0]);
                        setExpandedKeys([]);
                        setPagination({ current: 1, pageSize: 32 });
                    },
                    onCancel: () => setVisible(false),
                    modalRender: modal => (
                        <Draggable bounds={bounds} disabled={disabled} onStart={(event, uiData) => onStart(event, uiData)}>
                            <div ref={draggleRef}>{modal}</div>
                        </Draggable>
                    ),
                }}
                title={
                    <div
                        style={{
                            width: '100%',
                            cursor: 'move',
                        }}
                        onMouseOut={() => {
                            setDisabled(true);
                        }}
                        onMouseOver={() => {
                            disabled && setDisabled(false);
                        }}
                    >
                        文件管理
                    </div>
                }
            >
                <Attach previewSpan={18} directorySpan={6} />
            </ModalForm>
        </>
    );
};
