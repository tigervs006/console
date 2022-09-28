/** @format */

import React from 'react';
import { ProTable } from '@ant-design/pro-table';
import { ModalForm } from '@ant-design/pro-form';
import type { schemaData } from '@/pages/settings/data';
import type { ProColumns } from '@ant-design/pro-table';
import { info as schema } from '@/pages/settings/service';
export const TableSchema: React.FC<{
    modalVisit: boolean;
    setModalVisit: (status: boolean) => void;
    record?: { name: string; comment: string };
}> = props => {
    /* 获取数据列表 */
    const tableData = async () => {
        return await schema({ tablename: props.record!.name }).then(res => ({
            data: res?.data?.list,
            success: res?.success,
            total: res?.data?.total,
        }));
    };
    const columns: ProColumns<schemaData>[] = [
        {
            title: '字段',
            dataIndex: 'COLUMN_NAME',
        },
        {
            title: '类型',
            dataIndex: 'COLUMN_TYPE',
        },
        {
            title: '默认',
            dataIndex: 'COLUMN_DEFAULT',
        },
        {
            title: '非空',
            dataIndex: 'IS_NULLABLE',
        },
        {
            title: '自增',
            dataIndex: 'EXTRA',
        },
        {
            title: '备注',
            ellipsis: true,
            dataIndex: 'COLUMN_COMMENT',
        },
    ];
    return (
        <ModalForm
            submitter={false}
            modalProps={{
                centered: true,
                maskClosable: false,
                destroyOnClose: true,
            }}
            visible={props.modalVisit}
            onVisibleChange={props.setModalVisit}
            title={`${props.record?.name} ${props.record?.comment}`}
        >
            <ProTable<schemaData>
                rowKey="id"
                search={false}
                columns={columns}
                pagination={false}
                request={tableData}
                scroll={{ y: 800 }}
                toolBarRender={false}
            />
        </ModalForm>
    );
};
