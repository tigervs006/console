/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import 'antd/es/slider/style';
import { useModel } from 'umi';
import ImgCrop from 'antd-img-crop';
import React, { useState } from 'react';
import { removeFile } from '@/services/ant-design-pro/api';
import { notification, message, Button, Upload, Modal } from 'antd';
import type { UploadListType, UploadFile } from 'antd/es/upload/interface';
import type { UploadChangeParam, UploadProps, RcFile } from 'antd/es/upload';
import { QuestionCircleOutlined, CloudUploadOutlined, LoadingOutlined } from '@ant-design/icons';

export const UploadAdapter: React.FC<
    Omit<API.uploadComponents, 'formName'> & {
        crop?: number;
        fetch: () => void;
        cropQuality?: number;
        aspects?: [number, number];
        astricts?: [number, number];
    }
> = props => {
    const { confirm } = Modal;
    /* 是否裁剪 */
    const isCrop: number = props?.crop ?? 0;
    /* 大小限制 */
    const fileSize: number = props?.size ?? 0;
    /* 数量限制 */
    const maxUpload: number = props?.maxUpload ?? 0;
    /* 裁剪质量 */
    const quality: number = props?.cropQuality ?? 0.6;
    /* 按钮文字 */
    const uploadText: string = props?.formTitle ?? '上传图像';
    /* 展示方式 */
    const listType: UploadListType = props?.listType ?? 'text';
    /* loading */
    const [loading, setLoading] = useState<boolean>(false);
    /* 文件多选 */
    const multiple: boolean = isCrop ? false : props?.multiple ?? true;
    /* 图片宽度 */
    const imageWidth: number = props?.astricts ? props.astricts[0] : 0;
    /* 图片高度 */
    const imageHeight: number = props?.astricts ? props.astricts[1] : 0;
    /* 上传路径 */
    const uploadUrl: string = props?.uploadUrl ?? '/console/attach/upload';
    /* 文件列表 */
    const { uploadList, setUploadList } = useModel('file', ret => ({
        uploadList: ret.uploadList,
        setUploadList: ret.setUploadList,
    }));
    /* 裁剪比例 */
    const aspect: number = props?.aspects ? props.aspects[0] / props.aspects[1] : 1;
    /* 文件后缀 */
    const acceptFile: string | undefined = props?.fileExt?.map(item => `.${item}`).join(',');
    /* fileMime */
    const fileMime: string[] = props?.fileMime ?? [
        'video/mp4',
        'image/png',
        'image/gif',
        'image/jpeg',
        'audio/mpeg',
        'image/x-icon',
        'application/vnd.ms-works',
        'application/vnd.ms-excel',
        'image/vnd.microsoft.icon',
        'application/octet-stream',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];

    /* 处理文件删除状态 */
    const handleRemove: UploadProps['onRemove'] = (file: UploadFile) => {
        return new Promise<boolean>((resolve, reject) => {
            const url = file?.url ?? '';
            let filePath: string | undefined;
            if (1 < url.indexOf('.cn/')) {
                /* 从网址中截取文件的相对路径 */
                filePath = url.substring(url.indexOf('.cn/') + 4);
            }
            confirm({
                centered: true,
                cancelText: '算了',
                title: '当真要删除?',
                icon: <QuestionCircleOutlined />,
                cancelButtonProps: { shape: 'round' },
                okButtonProps: { danger: true, shape: 'round' },
                content: url.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)?.[1],
                onOk() {
                    removeFile({ filePath: filePath ?? url }).then(res => {
                        res?.success ? resolve(true) : reject('error');
                    });
                },
                onCancel() {
                    reject('onCancel');
                },
            });
        });
    };

    /* 处理上传事件 */
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam) => {
        const { file, fileList } = info;
        setUploadList(fileList.slice());
        const status = info.file.status;
        switch (status) {
            case 'uploading':
                setLoading(true);
                message.info!(`File ${file.name} is uploading...`);
                break;
            case 'success':
                message.success!(`File ${file.name} uploaded successfully`);
                break;
            case 'removed':
                setUploadList(fileList);
                message.success!(`File ${file.name} removed successfully`);
                break;
            case 'error':
                notification.error({
                    message: 'Error',
                    description: file?.response?.msg ?? `File ${file.name} upload failed`,
                });
                break;
            case 'done':
                props.fetch();
                setLoading(false);
                const uploadMsg = file.response.msg;
                const uploadStatus = file.response.success;
                /* 设置uploadList值 */
                setUploadList(pre => pre.concat([{ ...file?.response?.data, status: 'done' }]).filter(item => !item?.response));
                if (uploadStatus) {
                    message.success!(`File ${file.name} ${uploadMsg}`);
                } else {
                    setUploadList([]);
                    message.error!(`File ${file.name} ${uploadMsg}`);
                }
                break;
            case undefined:
                setLoading(false);
                /* 这里很重要 */
                setUploadList([]);
                break;
            default:
                throw new Error('Not implemented yet: undefined case');
        }
    };

    /* 处理上传前的图像 */
    const handleBeforeUpload = (file: RcFile) => {
        const UNIT = 1024 * 1024;
        const fileType = file.type;
        return new Promise<boolean>((resolve, reject) => {
            if (!fileMime.includes(fileType)) {
                notification.error({
                    message: '文件类型错误',
                    description: `请上传格式为 ${fileMime} 的文件`,
                });
                reject(false);
            } else if (fileSize && file.size > fileSize * UNIT) {
                notification.error({
                    message: '文件大小不符合要求',
                    description: `单个文件不得超过 ${fileSize}M`,
                });
                reject(false);
            } else if (0 < file?.type.indexOf('image')) {
                const reader = new FileReader();
                reader.readAsDataURL(file as Blob);
                reader.onload = function (e) {
                    const base64: string | ArrayBuffer | null | undefined = e.target?.result;
                    const image = document.createElement('img');
                    image.src = 'string' === typeof base64 ? base64 : (undefined as unknown as string);
                    image.onload = function () {
                        if (imageWidth > image.width || imageHeight > image.height) {
                            notification.error({
                                message: '图像尺寸不符合要求',
                                description: `请上传宽高大于或等于 ${imageWidth}X${imageHeight} 的图像`,
                            });
                            reject(false);
                        }
                    };
                };
            } else {
                resolve(true);
            }
        });
    };

    /* uploadProps */
    const uploadProps = {
        action: uploadUrl,
        disabled: loading,
        multiple: multiple,
        accept: acceptFile,
        listType: listType,
        maxCount: maxUpload,
        fileList: uploadList,
        showUploadList: false,
        data: props.extraData,
        onRemove: handleRemove,
        onChange: handleChange,
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            showInfo: false,
        },
        className: props?.className,
        headers: { Authorization: localStorage?.getItem('access_token') ?? '' },
        beforeUpload: (file: RcFile) => {
            // prettier-ignore
            return handleBeforeUpload(file).then((res: boolean) => res).catch((err: boolean) => err)
        },
    };

    return (
        <>
            {/* prettier-ignore */}
            {isCrop ? (
                <ImgCrop grid quality={quality} aspect={aspect} modalTitle="裁剪图像">
                    <Upload {...uploadProps}>
                        <Button icon={loading ? <LoadingOutlined /> : <CloudUploadOutlined />}>{loading ? 'Uploading' : uploadText}</Button>
                    </Upload>
                </ImgCrop>
            ) : (
                <Upload {...uploadProps}>
                    <Button icon={loading ? <LoadingOutlined /> : <CloudUploadOutlined />}>{loading ? 'Uploading' : uploadText}</Button>
                </Upload>
            )}
        </>
    );
};
