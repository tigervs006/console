import { history } from 'umi';
import { useRef, useState } from 'react';
import Ckeditor from '@/pages/components/Ckeditor';
import { waitTime, extractImg } from '@/utils/tools';
import { PageContainer } from '@ant-design/pro-layout';
import type { UploadFile } from 'antd/es/upload/interface';
import type { articleData, channelDataItem } from '../data';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, {
  ProFormCheckbox,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import type { RcFile, UploadProps, UploadChangeParam } from 'antd/es/upload';
import { notification, Upload, Modal, Button, Input, Space, message } from 'antd';
import { QuestionCircleOutlined, FormOutlined, UndoOutlined } from '@ant-design/icons';
import {
  removeFile,
  getChannel,
  getContent as getContents,
  saveContent,
} from '@/pages/content/service';

export default () => {
  const { confirm } = Modal;
  const formRef = useRef<ProFormInstance>();
  // 文档内容
  const [content, setContent] = useState<string>(() => {
    return formRef.current?.getFieldValue('content') || null;
  });
  // 文件列表
  const [fileLists, setFileLists] = useState<UploadFile[]>([]);
  // 新闻栏目
  const channel = async () => {
    const res = await getChannel();
    return (
      res?.data?.list.map((item: channelDataItem) => ({
        value: item.id,
        label: item.cname,
      })) ?? {}
    );
  };
  // 提取图像
  const adstractImg = () => {
    // 从正文提取图像
    if (null === content) {
      return notification.error({
        message: '正文内容为空',
        description: '请先完善正文内容并插入图像',
      });
    }
    const imgArr = extractImg(content);
    if (imgArr.length) {
      notification.success({
        message: '提取图像成功',
        description: imgArr.toString(),
      });
    } else {
      notification.error({
        message: '提取图像失败',
        description: '正文中不包含图像',
      });
    }
    formRef.current?.setFieldsValue({ litpic: imgArr.toString() });
  };
  // 获取编辑器内容
  const getContent = (CKcontent: string) => {
    // 设置useState
    setContent(CKcontent);
    // 设置到字段中只是为了rules规则验证
    formRef.current?.setFieldsValue({ content: CKcontent });
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
        // @ts-ignore
        content: url.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)[1],
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

  // 处理文件上传状态
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam) => {
    const { fileList } = info;
    /**
     * 此处一定要先setState，否则状态
     * 一直显示uploading并且无法读取
     * response属性，antd历史遗留bug
     * https://github.com/ant-design/ant-design/issues/2423
     */
    setFileLists(fileList.slice());
    const status = info.file.status;
    switch (status) {
      case 'done':
        message.success(info.file.response.msg);
        setFileLists([
          Object.assign(
            { ...info.file.response.data },
            { status: info.file.response.success ? 'done' : 'error' },
          ),
        ]);
        break;
      case 'error':
        notification.error({
          message: 'Error',
          description: info.file?.response?.msg ?? 'Upload failed',
        });
        break;
      case 'success':
        message.success(info.file?.response?.msg ?? 'Upload successful');
        break;
      case 'removed':
        message.success('Removed successfully');
        break;
      case 'uploading':
        message.info('uploading...');
        break;
      default:
        throw new Error('Not implemented yet: undefined case');
    }
  };

  // 处理onFinsh提交
  const handleFinsh = async (data: articleData) => {
    await saveContent(
      Object.assign(
        { ...data },
        {
          content: content,
          id: history.location.query?.id ?? null,
          author: localStorage?.getItem('user') ?? 'anonymous',
        },
      ),
    ).then((res) => {
      message.success(res.msg);
      // 延时跳转到列表页
      waitTime(2500).then(() => history.push({ pathname: '/content/list' }));
    });
  };

  // 处理request请求
  const handleRequest = async (params: Record<'id', string>) => {
    if (params?.id) {
      // 只有在编辑文档时请求网络
      const res = await getContents({ ...params });
      const info = res?.data?.info ?? {};
      // 设置编辑器内容
      setContent(info?.content?.content ?? null);
      // 设置fileList
      setFileLists([
        {
          status: 'done',
          url: info.litpic,
          uid: Math.floor(Math.random() * 100).toString(),
          name: info.litpic.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)[1],
        },
      ]);
      const attribute = [];
      // 提取值为1的属性名
      for (const idx in info) {
        if (
          (idx === 'is_head' && 1 === info[idx]) ||
          (idx === 'is_recom' && 1 === info[idx]) ||
          (idx === 'is_litpic' && 1 === info[idx])
        ) {
          attribute.push(idx);
        }
      }
      return res?.data
        ? Object.assign(
            { ...info },
            { attribute: attribute || [], content: info?.content?.content ?? null },
          )
        : {};
    } else {
      return {};
    }
  };

  // 处理上传前的文件
  const handleBeforeUpload = (file: RcFile) => {
    const MAX_FILE_SIZE = 2;
    const UNIT = 1024 * 1024;
    const curType = file.type;
    const fileType = ['image/png', 'image/jpeg', 'image/pjpeg'];
    return new Promise<boolean>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file as Blob);
      reader.onload = function (e) {
        const base64: string | ArrayBuffer | null | undefined = e.target?.result;
        const image = document.createElement('img');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        'string' === typeof base64 ? (image.src = base64) : undefined;
        image.onload = function () {
          if (!fileType.includes(curType)) {
            notification.error({
              message: '上传的文件类型错误',
              description: `请上传格式为${fileType}的图像`,
            });
            reject();
          } else if (file.size > MAX_FILE_SIZE * UNIT) {
            notification.error({
              message: '图像大小不符合要求',
              description: `单张图像大小不得超过${MAX_FILE_SIZE}M`,
            });
            reject();
          } else if (750 > image.width && 422 > image.height) {
            notification.error({
              message: '图像尺寸不符合要求',
              description: `当前图像尺寸：${image.width}X${image.height}，要求的图像尺寸应为：≥750X422`,
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
    <PageContainer>
      <ProForm<articleData>
        formRef={formRef}
        layout="vertical"
        wrapperCol={{
          md: { span: 16 },
          lg: { span: 16 },
          xl: { span: 8 },
        }}
        // 表单默认值
        initialValues={{
          cid: 4,
          attribute: ['is_recom'],
        }}
        submitter={{
          render: (_, doms) => {
            return (
              <Space size="middle" key="spaceGroup">
                {doms}
              </Space>
            );
          },
          resetButtonProps: { shape: 'round', icon: <UndoOutlined /> },
          submitButtonProps: { type: 'primary', shape: 'round', icon: <FormOutlined /> },
        }}
        // 失焦校验数据
        validateTrigger={['onBlur']}
        // 提交文档数据
        onFinish={(data: articleData) => handleFinsh(data)}
        // request参数
        params={{ id: history.location.query?.id }}
        // request请求
        request={(params: Record<'id', string>) => handleRequest(params)}
      >
        <ProFormSelect
          hasFeedback
          width="xs"
          name="cid"
          label="栏目"
          request={channel}
          tooltip="文档发布的栏目"
          fieldProps={{ allowClear: false }}
          rules={[{ required: true, message: '选择文档发布的栏目' }]}
        />
        <ProFormText
          hasFeedback
          label="标题"
          name="title"
          tooltip="限制32个字符"
          placeholder="请输入文档标题"
          // 输入时去除首尾空格
          getValueFromEvent={(e) => e.target.value.trim()}
          fieldProps={{ maxLength: 32, showCount: true }}
          rules={[
            { required: true, message: '请输入文档标题' },
            { min: 15, message: '文档标题不宜太短' },
          ]}
        />
        <ProFormText
          hasFeedback
          label="关键词"
          name="keywords"
          tooltip="请用空格分隔"
          placeholder="请输入关键词"
          fieldProps={{ showCount: true, maxLength: 64 }}
          rules={[
            { required: true, message: '请输入关键词' },
            { min: 10, message: '再多来两个关键词' },
          ]}
        />
        <ProFormTextArea
          hasFeedback
          label="文档简述"
          name="description"
          tooltip="SEO优化很重要"
          placeholder="请输入名称文档简述"
          // 输入时去除首尾空格
          getValueFromEvent={(e) => e.target.value.trim()}
          fieldProps={{
            allowClear: true,
            showCount: true,
            maxLength: 256,
            autoSize: { minRows: 5, maxRows: 8 },
          }}
          rules={[
            { required: true, message: '请输入文档简述' },
            { min: 50, message: '再多几句文档简述', type: 'string' },
          ]}
        />
        <ProFormSelect
          options={[
            {
              value: 'upload',
              label: '上传图像',
            },
            {
              value: 'extract',
              label: '提取图像',
            },
            {
              value: 'input',
              label: '图像网址',
            },
          ]}
          width="xs"
          label="上传方式"
          name="uploadMode"
          initialValue={['upload']}
          tooltip="上传/提取/输入图像网址"
          fieldProps={{
            allowClear: false,
            onChange: () => {
              // 只在编辑文档时清空fileList及litpic
              if (!history.location.query?.id) {
                setFileLists([]);
                formRef.current?.setFieldsValue({ litpic: [] });
              }
            },
          }}
        />
        <ProFormDependency name={['uploadMode']}>
          {({ uploadMode }) => {
            switch (uploadMode) {
              case 'input':
                return (
                  <ProFormText
                    hasFeedback
                    name="litpic"
                    label="图像网址"
                    tooltip="直接输入图像网址"
                    placeholder="请输入输入图片网址"
                    // 输入时去除首尾空格
                    getValueFromEvent={(e) => e.target.value.trim()}
                    rules={[
                      { required: true, message: '请输入图像网址或选择上传图像作为文档封面' },
                      { type: 'url', message: '请输入有效的url地址' },
                    ]}
                  />
                );
              case 'extract':
                return (
                  <>
                    <ProForm.Item
                      hasFeedback
                      name="litpic"
                      label="提取图像"
                      tooltip="从正文提取一张图像作为封面"
                      rules={[
                        { required: true, message: '请点击按钮从正文中提取一张图像作为文档封面' },
                        { type: 'url', message: '请输入有效的url地址' },
                      ]}
                    >
                      <Input readOnly placeholder="从正文提取一张图像作为封面" />
                    </ProForm.Item>
                    <ProForm.Item>
                      <Button shape="round" type="primary" onClick={adstractImg}>
                        提取图像
                      </Button>
                    </ProForm.Item>
                  </>
                );
              default:
                return (
                  <ProFormUploadButton
                    max={1}
                    name="litpic"
                    label="上传图像"
                    title="Upload"
                    fileList={fileLists}
                    tooltip="仅支持png、jpg、jpeg"
                    action="/console/public/upload"
                    transform={(litpic) => {
                      if ('string' === typeof litpic) return { litpic: litpic };
                      return {
                        litpic: litpic
                          .map((item: UploadFile) => item?.response.data.url ?? '')
                          .toString(),
                      };
                    }}
                    rules={[
                      { required: true, message: '请选择上传图像或输入图像网址作为文档封面' },
                    ]}
                    fieldProps={{
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
                      listType: 'picture-card',
                      data: { field: 'litpic' },
                      accept: '.png, .jpg, .jpeg, .gif',
                      headers: { Authorization: localStorage.getItem('Authorization') || '' },
                      beforeUpload: (file: RcFile) =>
                        handleBeforeUpload(file)
                          .then((check) => check)
                          .catch(() => Upload.LIST_IGNORE),
                    }}
                  />
                );
            }
          }}
        </ProFormDependency>
        <ProFormCheckbox.Group
          label="文档属性"
          name="attribute"
          tooltip="选择文档属性"
          // 提交时转化为对象
          transform={(attributes) => {
            const newObj = {};
            attributes.map((item: string) => {
              newObj[item] = 1;
            });
            return { ...newObj };
          }}
          options={[
            { label: '头条', value: 'is_head' },
            { label: '推荐', value: 'is_recom' },
            { label: '图文', value: 'is_litpic' },
          ]}
          rules={[{ required: true, message: '请至少设置一个文档属性' }]}
        />
        <ProForm.Item
          name="content"
          label="文档内容"
          tooltip="文档内容"
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 24 },
            xl: { span: 16 },
          }}
          rules={[
            { required: true, message: '文档内容不得为空' },
            { min: 100, message: '造句呢?再多说几句吧...' },
          ]}
        >
          <Ckeditor content={content} setContent={getContent} />
        </ProForm.Item>
      </ProForm>
    </PageContainer>
  );
};
