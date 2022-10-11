/** @format */

import '../index.less';
import { useModel } from 'umi';
import { remove } from '../services';
import { waitTime } from '@/extra/utils';
import { CreateDirectory } from './modules';
import type { cateDataItem } from '../data';
import type { DataNode } from 'antd/es/tree';
import { EllipsisOutlined } from '@ant-design/icons';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useState, useMemo, useRef } from 'react';
import { Popconfirm, Typography, Dropdown, message, Input, Menu, Tree } from 'antd';

export const Directory: React.FC = () => {
    const { Search } = Input;
    const { Text } = Typography;
    const [path, setPath] = useState<number[]>();
    const childRef: React.ForwardedRef<any> = useRef();
    const [searchValue, setSearchValue] = useState<string>('');
    const [modalVisit, setModalVisit] = useState<boolean>(false);
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

    const { getInfo, refresh, cateData, setCateInfo } = useModel('attach', ret => ({
        refresh: ret.refresh,
        getInfo: ret.getInfo,
        cateData: ret.cateData,
        setCateInfo: ret.setCateInfo,
    }));

    /**
     * 获取父节点key
     * @param key React.Key
     * @param tree DataNode[]
     */
    const getParentKey = (key: React.Key, tree: cateDataItem[]): React.Key => {
        let parentKey: React.Key;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.children) {
                if (node.children.some(item => item.id === key)) {
                    parentKey = node.id;
                } else if (getParentKey(key, node.children)) {
                    parentKey = getParentKey(key, node.children);
                }
            }
        }
        return parentKey!;
    };

    /**
     * 处理点击事件
     * @return void
     * @param e MenuInfo
     * @param tKey TreeNodeKey
     */
    const onClick = (e: MenuInfo, tKey: number) => {
        switch (e.key) {
            // prettier-ignore
            case 'update': /* 编辑目录 */
                waitTime().then(() => setModalVisit(true));
                break;
            // prettier-ignore
            case 'create': /* 新增目录 */
                childRef.current?.setPid(tKey);
                if (tKey) {
                    waitTime()
                        .then(() => {
                            // @ts-ignore
                            setCateInfo((pre: Pick<cateDataItem, 'path'>) => {
                                /* 过滤零值并添加自身作为path */
                                return {
									// prettier-ignore
                                    path: pre?.path.split('').map(Number).concat(tKey).filter(v => v),
                                };
                            });
                        })
                        .finally(() => setModalVisit(true));
                } else {
                    setPath(undefined);
                    setModalVisit(true);
                    setCateInfo(undefined);
                }
                break;
            default: /* 删除目录 */
        }
    };

    /* 确认删除目录 */
    const confirmDelete = async (tKey: number) => {
        // prettier-ignore
        return await remove({ id: tKey })
            .then(res => {
                res?.success && message.success(res.msg);
                return res?.success;
            }).finally(() => refresh());
    };

    /**
     * 渲染下拉菜单
     * @return JSX.Element
     * @param tKey string
     */
    const menu = (tKey: number) => {
        const menuItem = [
            {
                key: 'create',
                label: '新增目录',
            },
            {
                key: 'update',
                label: '编辑目录',
            },
            {
                key: 'delete',
                label: (
                    <Popconfirm title="确认删除该目录?" onConfirm={() => confirmDelete(tKey)}>
                        <Text>删除目录</Text>
                    </Popconfirm>
                ),
            },
        ];
        /* 根目录默认不显示编辑及删除目录菜单 */
        return <Menu onClick={e => onClick(e, tKey)} items={0 != tKey ? menuItem : menuItem.splice(0, 1)} />;
    };

    /**
     * 自定义渲染title
     * @return JSX.Element
     * @param nodeData Record<string, any>
     */
    const titleRender = (nodeData: Record<string, any>) => {
        return (
            <div className="customRender">
                <Text>{nodeData.title}</Text>
                <Dropdown
                    trigger={['click']}
                    placement="bottomRight"
                    overlay={() => menu(nodeData.key)}
                    getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
                >
                    <Text onClick={e => e?.stopPropagation()}>
                        <EllipsisOutlined className="overlayDropDown" />
                    </Text>
                </Dropdown>
            </div>
        );
    };

    /** 处理后的treeData */
    const dataList: { key: React.Key; title: string }[] = [];

    /**
     * 展开树形数据
     * @return void
     * @param data treeData
     */
    const generateList = (data: cateDataItem[]) => {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const { id, name } = node;
            dataList.push({ key: id, title: name });
            if (node.children) {
                generateList(node.children);
            }
        }
    };
    /* 执行展开树形数据 */
    generateList(cateData);

    /**
     * 处理展开节点
     * @return void
     * @param newExpandedKeys React.Key[]
     */
    const onExpand = (newExpandedKeys: React.Key[]) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };

    /**
     * 处理搜索事件
     * @return void
     * @param e React.ChangeEvent
     */
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        // prettier-ignore
        const newExpandedKeys = dataList.map(item => {
                if (value && item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, cateData);
                }
                return null;
            }).filter((item: any, i: any, self: any) => item && self.indexOf(item) === i);
        setSearchValue(value);
        setAutoExpandParent(true);
        setExpandedKeys(newExpandedKeys as React.Key[]);
    };

    /**
     * 监听搜索框值
     * @return DataNode[]
     */
    const treeData = useMemo(() => {
        const loop = (data: cateDataItem[]): DataNode[] =>
            data.map(item => {
                const strTitle = item.name;
                const index = strTitle.indexOf(searchValue);
                const beforeStr = strTitle.substring(0, index);
                const afterStr = strTitle.slice(index + searchValue.length);
                // prettier-ignore
                const title = index > -1
						? <span>
                            {beforeStr}
                            <span className="site-tree-search-value">{searchValue}</span>
                            {afterStr}
                        </span>
                     	: <span>{strTitle}</span>;
                if (item.children) {
                    return { title, key: item.id, children: loop(item.children) };
                }
                return {
                    title,
                    key: item.id,
                };
            });

        return loop(cateData);
    }, [cateData, searchValue]);

    return (
        <>
            <Search allowClear onChange={onChange} className="treeSearch" placeholder="请输入分类名称" />
            <Tree
                treeData={treeData}
                onExpand={onExpand}
                titleRender={titleRender}
                rootClassName="customTree"
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onSelect={(key, event) => {
                    const { selected } = event;
                    /* 根目录不需要重新获取 */
                    selected && 0 < key[0] && getInfo({ id: key[0] as number });
                }}
            />
            <CreateDirectory path={path} ref={childRef} modalVisit={modalVisit} handleSetModalVisit={(status: boolean) => setModalVisit(status)} />
        </>
    );
};
