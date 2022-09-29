/** @format */

import '../index.less';
import { useModel } from 'umi';
import type { DataNode } from 'antd/es/tree';
import React, { useState, useMemo } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { Typography, Dropdown, message, Input, Menu, Tree } from 'antd';

export const Directory: React.FC<{ defaultData: DataNode[] }> = props => {
    const { Search } = Input;
    const { Text } = Typography;
    const [searchValue, setSearchValue] = useState<string>('');
    const { setCurrentKey } = useModel('attach', ret => ({
        setCurrentKey: ret.setCurrentKey,
    }));
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

    /**
     * 处理点击事件
     * @return void
     * @param event MenuInfo
     * @param tKey TreeNodeKey
     */
    const onClick = (tKey: string, event: MenuInfo) => {
        const { key } = event;
        message.info!(`Click on key ${key} ${tKey}`);
    };

    /**
     * 渲染下拉菜单
     * @return JSX.Element
     * @param tKey string
     */
    const menu = (tKey: string) => {
        const menuItem = [
            {
                key: 'create',
                label: '新增分类',
            },
            {
                key: 'update',
                label: '编辑分类',
            },
            {
                key: 'delete',
                label: '删除分类',
            },
        ];
        return <Menu onClick={event => onClick(tKey, event)} items={'all' !== tKey ? menuItem : menuItem.splice(0, 1)} />;
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
    const generateList = (data: DataNode[]) => {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const { key, title } = node;
            dataList.push({ key, title: title as string });
            if (node.children) {
                generateList(node.children);
            }
        }
    };
    /* 执行展开树形数据 */
    generateList(props.defaultData);

    /**
     * 获取父节点key
     * @param key React.Key
     * @param tree DataNode[]
     */
    const getParentKey = (key: React.Key, tree: DataNode[]): React.Key => {
        let parentKey: React.Key;
        for (let i = 0; i < tree.length; i++) {
            const node = tree[i];
            if (node.children) {
                if (node.children.some(item => item.key === key)) {
                    parentKey = node.key;
                } else if (getParentKey(key, node.children)) {
                    parentKey = getParentKey(key, node.children);
                }
            }
        }
        return parentKey!;
    };

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
        const newExpandedKeys = dataList
            .map(item => {
                if (value && item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, props.defaultData);
                }
                return null;
            })
            .filter((item: any, i: any, self: any) => item && self.indexOf(item) === i);
        setSearchValue(value);
        setAutoExpandParent(true);
        setExpandedKeys(newExpandedKeys as React.Key[]);
    };

    /**
     * 监听搜索框值
     * @return DataNode[]
     */
    const treeData = useMemo(() => {
        const loop = (data: DataNode[]): DataNode[] =>
            data.map(item => {
                const strTitle = item.title as string;
                const index = strTitle.indexOf(searchValue);
                const beforeStr = strTitle.substring(0, index);
                const afterStr = strTitle.slice(index + searchValue.length);
                // prettier-ignore
                const title
                    = index > -1 ? (
                        <span>
                            {beforeStr}
                            <span className="site-tree-search-value">{searchValue}</span>
                            {afterStr}
                        </span>
                    ) : (
                        <span>{strTitle}</span>
                    );
                if (item.children) {
                    return { title, key: item.key, children: loop(item.children) };
                }

                return {
                    title,
                    key: item.key,
                };
            });

        return loop(props.defaultData);
    }, [searchValue]);

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
                    selected && setCurrentKey(key.toString());
                }}
            />
        </>
    );
};
