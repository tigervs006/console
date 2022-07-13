/** @format */

import 'antd/es/slider/style';
import { useModel } from 'umi';
import ImgCrop from 'antd-img-crop';
import React, { useState, useRef } from 'react';
import type { NamePath } from 'antd/es/form/interface';
import { removeFile } from '@/services/ant-design-pro/api';
import { ImagePreview } from '@/pages/components/ImagePreview';
import ProForm, { ProFormDependency } from '@ant-design/pro-form';
import { Button, message, Modal, notification, Upload } from 'antd';
import type { UploadFile, UploadListType } from 'antd/es/upload/interface';
import type { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload';
import { CloudUploadOutlined, QuestionCircleOutlined } from '@ant-design/icons';

export const UploadAdapter: React.FC<
    API.uploadComponents & {
        cropAspect?: number;
        cropQuality?: number;
        setFieldsValue: (fileList: UploadFile[]) => void;
    }
> = props => {
    const { confirm } = Modal;
    /* 是否裁剪 */
    const isCrop: NamePath[] = ['isCrop'];
    /* 大小限制 */
    const fileSize: number = props?.fileSize ?? 2;
    /* 数量限制 */
    const maxUpload: number = props?.maxUpload ?? 1;
    /* 裁剪质量 */
    const quality: number = props?.cropQuality ?? 0.6;
    /* 裁剪比例 */
    const aspect: number = props?.cropAspect ?? 1 / 1!;
    /* 文件多选 */
    const multiple: boolean = props?.multiple ?? false;
    /* 图片宽度 */
    const imageWidth: number = props?.imageWidth ?? 750;
    /* 图片预览 */
    const previewRef: React.ForwardedRef<any> = useRef();
    /* 图片高度 */
    const imageHeight: number = props?.imageHeight ?? 422;
    /* 预览索引 */
    const [curId, setCurId] = useState<number>(0);
    /* 按钮文字 */
    const uploadText: string = props?.formTitle ?? '上传图像';
    /* 展示方式 */
    const listType: UploadListType = props?.listType ?? 'picture-card';
    /* 上传路径 */
    const uploadUrl: string = props?.uploadUrl ?? '/console/public/upload';
    /* 文件后缀 */
    const acceptFile: string = props?.acceptFile ?? '.png, .jpg, .jpeg, .gif';
    /* 文件列表 */
    const { uploadList, setUploadList } = useModel('file', ret => ({
        uploadList: ret.uploadList,
        setUploadList: ret.setUploadList,
    }));
    /* 文件格式 */
    const fileType: string[] = props?.fileType ?? ['image/png', 'image/jpeg', 'image/gif'];

    /* 上传按钮 */
    const showButton = () => {
        return maxUpload !== uploadList.length ? (
            <Button type="link" icon={<CloudUploadOutlined />}>
                {uploadText}
            </Button>
        ) : null;
    };

    /* 处理图片预览 */
    const handlePreview = (file: UploadFile) => {
        uploadList.forEach((item, index) => {
            item.uid === file.uid && setCurId(index);
        });
        previewRef.current?.imagePreview(true);
    };

    /* 处理文件删除状态 */
    const handleRemove: UploadProps['onRemove'] = (file: UploadFile) => {
        return new Promise<boolean>((resolve, reject) => {
            const url = file?.url ?? '';
            /* 从网址中截取文件的相对路径 */
            const idx = url.lastIndexOf('.cn/');
            const filePath = url.substring(idx + 4, url.length);
            confirm({
                centered: true,
                cancelText: '算了',
                title: '当真要删除?',
                icon: <QuestionCircleOutlined />,
                cancelButtonProps: { shape: 'round' },
                okButtonProps: { danger: true, shape: 'round' },
                content: url.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)?.[1],
                onOk() {
                    removeFile({ filePath: filePath }).then(res => {
                        res.success ? resolve(true) : reject('error');
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
                message.info!('File is uploading...');
                break;
            case 'done':
                /* 设置表单字段值 */
                props.setFieldsValue(fileList.concat([{ ...file?.response?.data, status: 'done' }]).filter(item => !item?.response));
                /* 设置uploadList值 */
                setUploadList(pre => pre.concat([{ ...file?.response?.data, status: 'done' }]).filter(item => !item?.response));
                message.success!(file.response.msg);
                break;
            case 'success':
                message.success!('File uploaded successfully');
                break;
            case 'removed':
                setUploadList(fileList);
                props.setFieldsValue(fileList);
                message.success!('File removed successfully');
                break;
            case 'error':
                notification.error({
                    message: 'Error',
                    description: file?.response?.msg ?? 'File upload failed',
                });
                break;
            case undefined:
                /* 这里很重要 */
                setUploadList([]);
                break;
            default:
                throw new Error('Not implemented yet: undefined case');
        }
    };

    /* 处理上传前的文件 */
    const handleBeforeUpload = (file: RcFile) => {
        const UNIT = 1024 * 1024;
        const curType = file.type;
        const MAX_FILE_SIZE = fileSize;
        return new Promise<boolean>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file as Blob);
            reader.onload = function (e) {
                const base64: string | ArrayBuffer | null | undefined = e.target?.result;
                const image = document.createElement('img');
                image.src = 'string' === typeof base64 ? base64 : (undefined as unknown as string);
                image.onload = function () {
                    if (!fileType.includes(curType)) {
                        notification.error({
                            message: '文件类型错误',
                            description: `请上传格式为 ${fileType} 的文件`,
                        });
                        reject();
                    } else if (file.size > MAX_FILE_SIZE * UNIT) {
                        notification.error({
                            message: '文件大小不符合要求',
                            description: `单个文件不得超过 ${MAX_FILE_SIZE}M`,
                        });
                        reject();
                    } else if (imageWidth > image.width || imageHeight > image.height) {
                        notification.error({
                            message: '图像尺寸不符合要求',
                            description: `请上传宽高大于或等于 ${imageWidth}X${imageHeight} 的图像`,
                        });
                        reject();
                    } else {
                        resolve(true);
                    }
                };
            };
        });
    };

    /* uploadProps */
    const uploadProps = {
        action: uploadUrl,
        multiple: multiple,
        accept: acceptFile,
        listType: listType,
        maxCount: maxUpload,
        fileList: uploadList,
        data: props.extraData,
        onRemove: handleRemove,
        onChange: handleChange,
        name: props.extraData.field,
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            showInfo: false,
        },
        className: props?.className,
        onPreview: file => handlePreview(file),
        headers: { Authorization: localStorage.getItem('Authorization') || '' },
        // prettier-ignore
        beforeUpload: (file: RcFile) => handleBeforeUpload(file).then((res: boolean) => res).catch(() => false),
    };

    return (
        <>
            <ProForm.Item
                name={props.formName}
                label={props?.formLabel}
                tooltip={props?.formTooltip}
                rules={props?.validateRules}
                transform={value => props?.useTransForm?.(value) ?? { [props.formName]: value }}
            >
                <ProFormDependency name={isCrop} ignoreFormListField>
                    {depValues => {
                        if (depValues.isCrop) {
                            return (
                                <ImgCrop grid quality={quality} aspect={aspect} modalTitle="裁剪图像">
                                    <Upload {...uploadProps}>{showButton()}</Upload>
                                </ImgCrop>
                            );
                        }
                        return <Upload {...uploadProps}>{showButton()}</Upload>;
                    }}
                </ProFormDependency>
            </ProForm.Item>
            <ImagePreview curIdx={curId} ref={previewRef} imgList={uploadList} />
        </>
    );
};
