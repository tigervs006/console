import { message } from 'antd';
import React, { useRef } from 'react';
import { waitTime } from '@/utils/tools';
import type { tableDataItem } from '../data';
import { fetchData, saveChannel } from '../service';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ModalForm, ProFormText, ProFormTextArea, ProFormTreeSelect } from '@ant-design/pro-form';

export const CreateModalForm: React.FC<{
  modalVisit: boolean;
  record: tableDataItem;
  reloadTable: () => void;
  isCreateChannel: boolean;
  handleSetModalVisit: (status: boolean) => void;
}> = (props) => {
  const formRef = useRef<ProFormInstance>();
  const defaultOption = [{ id: 0, cname: '顶级栏目' }];
  const modalTitle = props.isCreateChannel ? '新增栏目' : '编辑栏目';
  // 处理onFinish事件
  const handleFinish = async (data: tableDataItem) => {
    await saveChannel(Object.assign(data, { id: props?.record?.id ?? null, pid: 1 })).then(
      (res) => {
        message.success(res.msg);
        // 延时重载列表数据
        waitTime(1500).then(() => props.reloadTable());
      },
    );
  };
  return (
    <ModalForm<tableDataItem>
      modalProps={{
        centered: true,
        maskClosable: false,
        destroyOnClose: true,
      }}
      submitter={{
        searchConfig: {
          resetText: '重置',
        },
        submitButtonProps: {
          shape: 'round',
        },
        resetButtonProps: {
          shape: 'round',
          type: 'default',
          onClick: () => formRef.current?.resetFields(),
        },
      }}
      width={500}
      formRef={formRef}
      autoFocusFirstInput
      title={modalTitle}
      submitTimeout={2000}
      visible={props.modalVisit}
      initialValues={props.record}
      validateTrigger={['onBlur']}
      onVisibleChange={props.handleSetModalVisit}
      onValuesChange={(values) => console.log('onChange', values)}
      onFinish={(values) => handleFinish(values).then(() => true)}
    >
      <ProFormTreeSelect
        key="id"
        name="pid"
        hasFeedback
        label="上级栏目"
        initialValue="0"
        debounceTime={1000}
        tooltip="选择上级栏目"
        placeholder="请选择上级栏目"
        fieldProps={{
          fieldNames: {
            value: 'id',
            label: 'cname',
          },
          allowClear: true,
          showSearch: true,
          defaultValue: '0',
          filterTreeNode: true,
          treeNodeFilterProp: 'cname',
        }}
        rules={[{ required: true, message: '请选择上级栏目' }]}
        request={async (params) =>
          await fetchData(params).then((res) => defaultOption.concat(res?.data?.list))
        }
      />
      <ProFormText
        hasFeedback
        name="name"
        label="栏目英文"
        tooltip="伪静态URL地址需要"
        placeholder="请输入栏目英文名"
        fieldProps={{ maxLength: 20, showCount: true }}
        rules={[
          { required: true, message: '请输入栏目英文名' },
          {
            type: 'string',
            pattern: /^\w+$/,
            message: '栏目英文名只能是字母、数字和下划线的组合',
          },
        ]}
      />
      <ProFormText
        hasFeedback
        name="cname"
        label="栏目中文"
        tooltip="显示在前端的栏目名"
        placeholder="请输入栏目中文名"
        fieldProps={{ maxLength: 20, showCount: true }}
        rules={[
          { required: true, message: '请输入栏目中文名' },
          { type: 'string', pattern: /^[\u4e00-\u9fa5]+$/, message: '栏目中文名只能是中文' },
        ]}
      />
      <ProFormText
        hasFeedback
        name="title"
        label="栏目标题"
        tooltip="请控制在30字以内"
        placeholder="请输入栏目SEO标题"
        fieldProps={{ maxLength: 32, showCount: true }}
        rules={[{ required: true, message: '栏目标题不得为空' }]}
      />
      <ProFormText
        hasFeedback
        name="keywords"
        label="Keywords"
        tooltip="请控制在30字以内"
        placeholder="请输入栏目SEO关键词"
        fieldProps={{ maxLength: 32, showCount: true }}
        rules={[{ required: true, message: 'keywords不得为空' }]}
      />
      <ProFormTextArea
        hasFeedback
        name="description"
        label="Description"
        tooltip="请控制在100字以内"
        placeholder="请输入栏目SEO页面描述"
        rules={[{ required: true, message: 'description不得为空' }]}
        fieldProps={{ autoSize: { minRows: 4, maxRows: 6 }, maxLength: 100, showCount: true }}
      />
    </ModalForm>
  );
};
