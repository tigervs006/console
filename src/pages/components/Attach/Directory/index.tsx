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

import '../index.less';
import { useModel } from 'umi';
import { remove } from '../services';
import { CreateDirectory } from './modules';
import type { cateDataItem } from '../data';
import type { DataNode } from 'antd/es/tree';
import { EllipsisOutlined } from '@ant-design/icons';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useState, useMemo, useRef } from 'react';
import { Popconfirm, Typography, Dropdown, message, Input, Menu, Tree, Spin } from 'antd';

export const Directory: React.FC = () => {
    const { Search } = Input;
    const { Text } = Typography;
    const [path, setPath] = useState<number[]>();
    const childRef: React.ForwardedRef<any> = useRef();
    const [searchValue, setSearchValue] = useState<string>('');
    const [modalVisit, setModalVisit] = useState<boolean>(false);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

    // prettier-ignore
    const {
		cateId,
		getInfo,
		refresh,
		loading,
		isModal,
		cateData,
		setCateId,
		setCateInfo,
		expandedKeys,
		setPagination,
		setExpandedKeys
	} = useModel('attach', ret => ({
            cateId: ret.cateId,
            loading: ret.loading,
            refresh: ret.refresh,
            getInfo: ret.getInfo,
            isModal: ret.isModal,
            cateData: ret.cateData,
            setCateId: ret.setCateId,
            setCateInfo: ret.setCateInfo,
            expandedKeys: ret.expandedKeys,
            setPagination: ret.setPagination,
            setExpandedKeys: ret.setExpandedKeys,
        }),
    );

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
				e.domEvent.stopPropagation()
				getInfo({ id: tKey }).then(res => {
					res?.info && setModalVisit(true)
				})
                break;
            // prettier-ignore
            case 'create': /* 新增目录 */
				e.domEvent.stopPropagation()
				childRef.current?.setPid(tKey);
                if (tKey) {
					// prettier-ignore
					getInfo({ id: tKey }).then(res => {
						// prettier-ignore
						setPath(res?.info.path.split('-').map(Number).concat(tKey).filter((v: number) => v))
					}).finally(() => setModalVisit(true))
                } else {
                    setPath([0]);
                    setModalVisit(true);
                    setCateInfo(undefined);
                }
                break;
            default:
                e.domEvent.stopPropagation();
        }
    };

    /* 确认删除目录 */
    const confirmDelete = async (tKey: number) => {
        // prettier-ignore
        return await remove({ id: tKey }).then(res => {
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
            <Spin spinning={loading} tip="Loading...">
                <Tree
                    treeData={treeData}
                    onExpand={onExpand}
                    selectedKeys={cateId}
                    defaultSelectedKeys={[0]}
                    titleRender={titleRender}
                    expandedKeys={expandedKeys}
                    height={isModal ? 490 : undefined}
                    autoExpandParent={autoExpandParent}
                    rootClassName={isModal ? 'modalTree' : 'normalTree'}
                    onSelect={(key, event) => {
                        const { selected } = event;
                        selected && setCateId(key as number[]);
                        /* 切换目录时且key非根目录时刷新目录信息 */
                        selected && key[0] && getInfo({ id: key[0] as number });
                        /* 切换目录时重置页码及使用默认pageSize */
                        selected && setPagination(prev => ({ current: 1, pageSize: prev.pageSize }));
                    }}
                />
            </Spin>
            <CreateDirectory
                path={path}
                ref={childRef}
                modalVisit={modalVisit}
                handleSetModalVisit={(status: boolean) => {
                    setModalVisit(status);
                    !status && setPath(undefined);
                }}
            />
        </>
    );
};
