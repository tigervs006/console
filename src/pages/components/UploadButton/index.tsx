/** @format */

import { ImagePreview } from '@/pages/components/ImagePreview';
import { removeFile } from '@/services/ant-design-pro/api';
import { CloudUploadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { ProFormUploadButton } from '@ant-design/pro-form';
import { message, Modal, notification, Upload } from 'antd';
import type { RcFile, UploadChangeParam, UploadProps } from 'antd/es/upload';
import type { UploadFile, UploadListType } from 'antd/es/upload/interface';
import React, { useRef } from 'react';
import { useModel } from 'umi';

export const ProUploadButton: React.FC<API.uploadComponents> = props => {
    const { confirm } = Modal;
    // 大小限制
    const fileSize: number = props?.fileSize ?? 2;
    // 数量限制
    const maxUpload: number = props?.maxUpload ?? 1;
    // 图片宽度
    const imageWidth: number = props?.imageWidth ?? 750;
    // 图片预览
    const previewRef: React.ForwardedRef<any> = useRef();
    // 图片高度
    const imageHeight: number = props?.imageHeight ?? 422;
    // 展示方式
    const listType: UploadListType = props?.listType ?? 'picture-card';
    // 文件后缀
    const acceptFile: string = props?.acceptFile ?? '.png, .jpg, .jpeg, .gif';
    // 文件列表
    const { fileLists, setFileLists } = useModel('file', ret => ({
        fileLists: ret.fileList,
        setFileLists: ret.setFileList,
    }));
    // 文件格式
    const fileType: string[] = props?.fileType ?? ['image/png', 'image/jpeg', 'image/gif'];
    // 处理上传事件
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam) => {
        const { fileList } = info;
        setFileLists(fileList.slice());
        const status = info.file.status;
        switch (status) {
            case 'uploading':
                message.info!('File is uploading...');
                break;
            case 'done':
                message.success!(info.file.response.msg);
                setFileLists([Object.assign({ ...info.file.response.data }, { status: info.file.response.success ? 'done' : 'error' })]);
                break;
            case 'success':
                message.success!('File uploaded successfully');
                break;
            case 'removed':
                message.success!('File removed successfully');
                break;
            case 'error':
                notification.error({
                    message: 'Error',
                    description: info.file?.response?.msg ?? 'File upload failed',
                });
                break;
            default:
                throw new Error('Not implemented yet: undefined case');
        }
    };
    // 处理文件删除状态
    const handleRemove: UploadProps['onRemove'] = (file: UploadFile) => {
        return new Promise<boolean>((resolve, reject) => {
            const url = file?.url ?? '';
            // 从网址中截取文件的相对路径
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
                async onOk() {
                    const res = await removeFile({ filePath: filePath });
                    if (res.success) {
                        resolve(true);
                    } else {
                        reject('Failed');
                    }
                },
                onCancel() {
                    reject('onCancel');
                },
            });
        });
    };
    // 处理上传前的文件
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
    return (
        <>
            <ProFormUploadButton
                max={maxUpload}
                listType={listType}
                fileList={fileLists}
                name={props.formName}
                label={props?.formLabel}
                title={props?.formTitle}
                tooltip={props.formTooltip}
                rules={props?.validateRules}
                icon={<CloudUploadOutlined />}
                action="/console/public/upload"
                transform={value => props?.useTransForm!(value)}
                fieldProps={{
                    accept: acceptFile,
                    data: props.extraData,
                    onChange: handleChange,
                    onRemove: handleRemove,
                    progress: {
                        strokeColor: {
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        },
                        strokeWidth: 3,
                        showInfo: false,
                    },
                    className: props?.className,
                    onPreview: () => previewRef.current?.imagePreview(true),
                    headers: { Authorization: localStorage.getItem('Authorization') || '' },
                    beforeUpload: (file: RcFile) =>
                        handleBeforeUpload(file)
                            .then(res => res)
                            .catch(() => Upload.LIST_IGNORE),
                }}
            />
            <ImagePreview ref={previewRef} imgList={fileLists} />
        </>
    );
};
