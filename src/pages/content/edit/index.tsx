import { history } from 'umi';
import { useRef, useState } from 'react';
import type { RcFile } from 'antd/es/upload';
import Ckeditor from '@/pages/components/Ckeditor';
import { waitTime, extractImg } from '@/utils/tools';
import { PageContainer } from '@ant-design/pro-layout';
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
import { FormOutlined, UndoOutlined } from '@ant-design/icons';
import { notification, Upload, Button, Input, Space } from 'antd';
import { getChannel, getContent as getContents } from '@/pages/content/service';

export default () => {
  const formRef = useRef<ProFormInstance>();
  // 文档内容
  const [content, setContent] = useState<string>(() => {
    return formRef.current?.getFieldValue('content') || null;
  });
  // 新闻栏目
  const channel = async () => {
    const res = await getChannel();
    return res?.data?.list.map(
      (item: channelDataItem) =>
        ({
          value: item.id,
          label: item.cname,
        } ?? {}),
    );
  };
  // 提取图像
  const adstractImg = () => {
    //从content中提取第一张图像
    const imgArr: string[] = extractImg(content);
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
    formRef.current?.setFieldsValue({ litpic: imgArr });
  };
  // 转换图像网址
  const transLitpicUrl = (data: string[]) => {
    const newObj: Record<string, string> = {};
    data.map((item: string) => {
      newObj.litpic = item;
    });
    return { ...newObj };
  };
  const getFormatValues = () => {
    // 格式化后的数据
    const formatData = formRef.current?.getFieldsFormatValue?.();
    // 提取文档属性
    const attribute: string[] = [];
    for (const idx in formatData) {
      // 提取属性key值
      if (idx.match(/is_/)) attribute.push(idx);
    }
    console.log('提取到的文档属性：', attribute);
  };
  // 获得编辑器内容
  const getContent = (CKcontent: string) => {
    // 设置useState
    setContent(CKcontent);
    // 设置到字段中只是为了rules规则验证
    formRef.current?.setFieldsValue({ content: CKcontent });
  };

  // 处理上传前的文件
  const handleBeforeUpload = (file: RcFile) => {
    const MAX_FILE_SIZE = 2;
    const UNIT = 1024 * 1024;
    const curType = file.type;
    const fileType = ['image/png', 'image/jpeg', 'image/pjpeg'];
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file as Blob);
      reader.onload = function (e) {
        const base64: string | ArrayBuffer | null | undefined = e.target?.result;
        const image = document.createElement('img');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        typeof base64 === 'string' ? (image.src = base64) : undefined;
        image.onload = function () {
          if (!fileType.includes(curType)) {
            notification.error({
              message: '上传的文件类型错误',
              description: `请上传格式为${fileType}的图片`,
            });
            reject();
          } else if (file.size > MAX_FILE_SIZE * UNIT) {
            notification.error({
              message: '图像大小不符合要求',
              description: `单张图像大小不得超过${MAX_FILE_SIZE}M`,
            });
            reject();
          } else if (750 > image.width && 450 > image.height) {
            notification.error({
              message: '图像尺寸不符合要求',
              description: `当前图像尺寸：${image.width}X${image.height}，要求的图像尺寸应为：≥750X450`,
            });
            reject();
          } else {
            resolve();
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
        submitter={{
          render: (_, doms) => {
            return [
              <Space size="middle" key="spaceGroup">
                {doms}
                <Button danger shape="round" onClick={getFormatValues}>
                  获取数据
                </Button>
              </Space>,
            ];
          },
          resetButtonProps: { shape: 'round', icon: <UndoOutlined /> },
          submitButtonProps: { type: 'primary', shape: 'round', icon: <FormOutlined /> },
        }}
        // 提交文档数据
        onFinish={async (data) => {
          await waitTime(1000);
          console.log('onFinish', Object.assign({ ...data }, { content: content }));
        }}
        // request参数
        params={{ id: history.location.query?.id }}
        // 编辑文档时用
        request={async (params) => {
          if (params?.id) {
            // 只有在编辑文档时请求网络
            const res = await getContents({ ...params });
            const info = res?.data?.info ?? {};
            setContent(info?.content?.content ?? null);
            return res?.data
              ? Object.assign(
                  { ...info },
                  { litpic: [info?.litpic] },
                  { content: info?.content?.content ?? null },
                )
              : {};
          } else {
            return {};
          }
        }}
        // 表单默认值
        initialValues={{
          cid: 4,
          attribute: ['is_recom'],
        }}
      >
        <ProFormSelect
          width="xs"
          name="cid"
          label="栏目"
          request={channel}
          tooltip="文档发布的栏目"
          fieldProps={{ allowClear: false }}
          rules={[{ required: true, message: '选择文档发布的栏目' }]}
        />
        <ProFormText
          label="标题"
          name="title"
          tooltip="限制32个字符"
          placeholder="请输入文档标题"
          fieldProps={{ showCount: true, maxLength: 32 }}
          rules={[
            { required: true, message: '请输入文档标题' },
            { min: 15, message: '文档标题不宜太短' },
          ]}
        />
        <ProFormText
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
          label="文档简述"
          name="description"
          tooltip="SEO优化很重要"
          placeholder="请输入名称文档简述"
          fieldProps={{
            allowClear: true,
            showCount: true,
            maxLength: 256,
            autoSize: { minRows: 5, maxRows: 8 },
          }}
          rules={[
            { required: true, message: '请输入文档文档简述' },
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
            // 只在新增文档时改变上传方式清空litpic，否则ProFormUploadButton组件会报错
            onChange: () =>
              !history.location.query?.id && formRef.current?.setFieldsValue({ litpic: [] }),
          }}
        />
        <ProFormDependency name={['uploadMode']}>
          {({ uploadMode }) => {
            switch (uploadMode) {
              case 'input':
                return (
                  <ProFormText
                    name="litpic"
                    label="图像网址"
                    tooltip="直接输入图像网址"
                    placeholder="请输入输入图片网址"
                    transform={(litpic) => transLitpicUrl([litpic])}
                    rules={[
                      { required: true, message: '请输入图像网址或选择上传图像作为文档封面' },
                    ]}
                  />
                );
              case 'extract':
                return (
                  <>
                    <ProForm.Item
                      name="litpic"
                      label="提取图像"
                      tooltip="从正文提取一张图像作为封面"
                      transform={(litpic) => transLitpicUrl([litpic])}
                      rules={[
                        { required: true, message: '请点击按钮从正文中提取一张图像作为文档封面' },
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
                    action="upload.do"
                    tooltip="仅支持png、jpg、jpeg"
                    transform={(litpic) => transLitpicUrl(litpic)}
                    rules={[
                      { required: true, message: '请选择上传图像或输入图像网址作为文档封面' },
                      { max: 1, message: '文档封面只要一张就行了', type: 'array' },
                    ]}
                    fieldProps={{
                      listType: 'picture-card',
                      accept: '.png, .jpg, .jpeg, .gif',
                      headers: { Authorization: localStorage.getItem('Authorization') || '' },
                      beforeUpload: (file: RcFile) =>
                        handleBeforeUpload(file)
                          .then(() => true)
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
          transform={(attribute) => {
            const newObj = {};
            attribute.map((item: string) => {
              newObj[item] = 1;
            });
            return { ...newObj };
          }}
          // 前置转化对象为数组
          // convertValue={attribute => {
          //   console.log('convertValue', attribute)
          //   return attribute
          // }}
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
