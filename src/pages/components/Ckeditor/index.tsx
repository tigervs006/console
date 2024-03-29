/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import './index.less';
import React from 'react';
import { request } from 'umi';
import { Typography, message, Space } from 'antd';
import type { parentProps, stateData } from './data';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LoadingOutlined, EditOutlined } from '@ant-design/icons';

export default class Ckeditor extends React.Component<parentProps, stateData> {
    constructor(props: parentProps) {
        super(props);
        this.state = {
            saving: false,
            defaultType: 'secondary',
            defaultStatus: 'waiting for input...',
            uploadPath: props?.uploadPath ?? 'article/content',
            content: props?.content || '<p>来吧，请开始你的表演...</p>',
        };
    }

    render() {
        const { Text } = Typography;
        /* 自动保存 */
        const saveData = (data: any) => {
            console.log('自动保存：', data);
            message.success!('自动保存成功');
        };
        /* 自定义配置 */
        const customConfig = {
            autosave: {
                /* 每分钟自动保存 */
                waitingTime: 60000,
                save(editor: any) {
                    return saveData(editor.getData());
                },
            },
        };
        /* 编辑器初始化 */
        const handleOnReady = (editor: any) => {
            /* 字数统计 */
            const wordCountPlugin = editor.plugins.get('WordCount');
            const wordCountWrapper = document.getElementById('word-count');
            wordCountWrapper?.appendChild(wordCountPlugin.wordCountContainer);
            /* 自动保存设置 */
            const pendingActions = editor.plugins.get('PendingActions');
            pendingActions.on('change:hasAny', (evt: any, propertyName: any, newValue: boolean) => {
                if (newValue) {
                    this.setState({
                        saving: true,
                        defaultType: 'danger',
                        defaultStatus: 'inputing...',
                    });
                } else {
                    this.setState({
                        saving: false,
                        defaultType: 'success',
                        defaultStatus: 'Auto save succeeded!',
                    });
                }
            });
            /* 自定义上传接口 */
            editor.plugins.get('FileRepository').createUploadAdapter = (loader: Record<string, any>) => {
                const state = this.state;
                return {
                    async upload() {
                        const file = await loader.file;
                        const formData = new FormData();
                        formData.append('file', file);
                        formData.append('path', state.uploadPath);
                        return new Promise<{ default: string }>(async (resolve, reject) => {
                            await request('/attach/upload', { method: 'post', data: formData }).then(res => {
                                if (res?.success) {
                                    message.success(res?.msg);
                                    resolve({ default: res?.data?.url });
                                } else {
                                    reject();
                                }
                            });
                        });
                    },
                };
            };
        };
        return (
            <>
                <CKEditor
                    config={customConfig}
                    editor={ClassicEditor}
                    data={this.state.content}
                    onReady={(editor: any) => handleOnReady(editor)}
                    /* 数据改变时保存 */
                    onChange={(event: any, editor: any) => {
                        this.setState({ content: editor.getData() }, () => this.props.setContent(editor.getData()));
                    }}
                />
                <div className="edit-footer-info">
                    <div id="word-count" />
                    <Space>
                        <Text strong>
                            <EditOutlined /> Editor status:
                        </Text>
                        <Text type={this.state.defaultType}>
                            {this.state.saving && <LoadingOutlined />} {this.state.defaultStatus}
                        </Text>
                    </Space>
                </div>
            </>
        );
    }
}
