import { message } from 'antd';
import React, { useRef } from 'react';
import { waitTime } from '@/utils/tools';
import type { tableDataItem } from '../data';
import { fetchData, saveChannel } from '../service';
import type { UploadFile } from 'antd/es/upload/interface';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProUploadButton } from '@/pages/components/UploadButton/ProUploadButton';
import { ModalForm, ProFormText, ProFormTextArea, ProFormTreeSelect } from '@ant-design/pro-form';

export const CreateModalForm: React.FC<{
  modalVisit: boolean;
  record: tableDataItem;
  reloadTable: () => void;
  isCreateChannel: boolean;
  setExpandByClick: (value: boolean) => void;
  handleSetModalVisit: (value: boolean) => void;
}> = (props) => {
  const formRef = useRef<ProFormInstance>();
  const defaultOption = [{ id: 0, cname: '顶级栏目' }];
  const modalTitle = props.isCreateChannel ? '新增栏目' : '编辑栏目';
  // 处理onFinish事件
  const handleFinish = async (data: tableDataItem) => {
    await saveChannel(Object.assign(data, { id: props?.record?.id ?? null })).then((res) => {
      message.success(res?.msg);
      props.setExpandByClick(true);
      // 延时重载列表数据
      waitTime(1500).then(() => props.reloadTable());
    });
  };
  return (
    <ModalForm<tableDataItem>
      modalProps={{
        centered: true,
        maskClosable: false,
        destroyOnClose: true,
        onCancel: () => props.setExpandByClick(true),
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
      title={modalTitle}
      autoFocusFirstInput
      submitTimeout={2000}
      visible={props.modalVisit}
      initialValues={props.record}
      validateTrigger={['onBlur']}
      onVisibleChange={props.handleSetModalVisit}
      onFinish={(values) => handleFinish(values).then(() => true)}
    >
      <ProUploadButton
        imageHeight={500}
        imageWidth={1920}
        formName={'banner'}
        formLabel={'栏目图片'}
        formTitle={'上传图片'}
        formTooltip={'上传图片作为栏目banner'}
        extraData={{ field: 'banner', path: 'images/banner' }}
        validateRules={[{ required: true, message: '请上传栏目大图' }]}
        useTransForm={(value) => {
          if ('string' === typeof value) return { banner: value };
          return {
            banner: value.map((item: UploadFile) => item?.response?.data?.url ?? '').toString(),
          };
        }}
      />
      <ProFormTreeSelect
        name="pid"
        hasFeedback
        label="上级栏目"
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
        name="cname"
        label="栏目名称"
        tooltip="显示在前端的栏目名称"
        placeholder="请输入栏目名称"
        fieldProps={{ maxLength: 20, showCount: true }}
        rules={[
          { required: true, message: '请输入栏目名称' },
          { type: 'string', pattern: /^[\u4e00-\u9fa5]+$/, message: '栏目名称只能是中文' },
        ]}
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
          { type: 'string', pattern: /^\w+$/, message: '栏目英文名只能是字母、数字和下划线的组合' },
        ]}
      />
      <ProFormText
        hasFeedback
        name="title"
        label="栏目标题"
        tooltip="请控制在30字以内"
        placeholder="请输入栏目SEO标题"
        fieldProps={{ maxLength: 32, showCount: true }}
        rules={[
          { required: true, message: '栏目标题不得为空' },
          { type: 'string', pattern: /^\S{8,32}$/, message: '栏目标题应在8~32个字符串之间' },
        ]}
      />
      <ProFormText
        hasFeedback
        name="keywords"
        label="Keywords"
        tooltip="请控制在30字以内"
        placeholder="请输入栏目SEO关键词"
        fieldProps={{ maxLength: 32, showCount: true }}
        rules={[
          { required: true, message: 'keywords不得为空' },
          { type: 'string', pattern: /^\S{8,32}$/, message: 'keywords应在8~32个字符串之间' },
        ]}
      />
      <ProFormTextArea
        hasFeedback
        name="description"
        label="Description"
        tooltip="请控制在100字以内"
        placeholder="请输入栏目SEO页面描述"
        rules={[
          { required: true, message: 'description不得为空' },
          { type: 'string', pattern: /^\S{20,100}$/, message: 'description应在20~100个字符串之间' },
        ]}
        fieldProps={{ autoSize: { minRows: 4, maxRows: 6 }, maxLength: 100, showCount: true }}
      />
    </ModalForm>
  );
};
