/** @format */

import styles from './index.less';
import { Input, Tag } from 'antd';
import type { InputRef } from 'antd';
import type { ForwardedRef } from 'react';
import { TweenOneGroup } from 'rc-tween-one';
import { useEffect, useState, useRef } from 'react';
import React, { useImperativeHandle, forwardRef } from 'react';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';

export const InputTagList: React.FC<{
    addition: string;
    ref: ForwardedRef<any>;
    handleChange: (value: string[]) => void;
}> = forwardRef((props, ref) => {
    const inputRef = useRef<InputRef>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [inputVisible, setInputVisible] = useState(false);
    useImperativeHandle(ref, () => ({ setTagList: (value: string[]) => setTags(value) }));
    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
        // return props.handleChange(tags);
    }, [tags, props, inputVisible]);

    /** 设置input输入框的可见性 */
    const showInput = () => setInputVisible(true);

    /** 处理输入框值变化的事件 */
    const handleInputChange = (e: any) => setInputValue(e.target.value);

    /** 处理删除Tag标签时的事件 */
    const handleClose = (removedTag: string) => {
        const tagsArr = tags.filter(tag => tag !== removedTag);
        props.handleChange(tagsArr);
        setTags(tagsArr);
    };

    /** 处理输入确认值时的事件 */
    const handleInputConfirm = () => {
        if (inputValue && -1 === tags.indexOf(inputValue)) {
            const tagsArr = [...tags, inputValue];
            props.handleChange(tagsArr);
            setTags(tagsArr);
        }
        setInputValue('');
        setInputVisible(false);
    };

    const forMap = (tag: string) => {
        const tagElem = (
            <Tag
                closable
                onClose={e => {
                    e.preventDefault();
                    handleClose(tag);
                }}
                color="processing"
                icon={<UserOutlined />}
            >
                {tag}
            </Tag>
        );
        return (
            <span key={tag} className={styles.tagElement}>
                {tagElem}
            </span>
        );
    };
    /** 循环遍历Tags标签组 */
    const tagChild = tags.map(forMap);
    return (
        <>
            <div>
                <TweenOneGroup
                    enter={{
                        scale: 0.8,
                        opacity: 0,
                        type: 'from',
                        duration: 100,
                    }}
                    onEnd={(e: any) => {
                        if (e.type === 'appear' || e.type === 'enter') {
                            e.target.style = 'display: inline-block';
                        }
                    }}
                    leave={{
                        width: 0,
                        scale: 0,
                        opacity: 0,
                        duration: 200,
                    }}
                    appear={false}
                >
                    {tagChild}
                </TweenOneGroup>
            </div>
            {inputVisible && (
                <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    style={{
                        width: '30%',
                    }}
                    value={inputValue}
                    onBlur={handleInputConfirm}
                    onChange={handleInputChange}
                    onPressEnter={handleInputConfirm}
                />
            )}
            {!inputVisible && (
                <Tag onClick={showInput} className={styles.siteTagPlus}>
                    <PlusOutlined /> {props.addition}
                </Tag>
            )}
        </>
    );
});
