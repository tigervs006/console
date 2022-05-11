import { useRef, useState } from 'react';
import { waitTime } from '@/utils/tools';
import Ckeditor from '@/pages/components/Ckeditor';
import { getChannel } from '@/pages/content/service';
import { PageContainer } from '@ant-design/pro-layout';
import type { articleData, channelDataItem } from '../data';
import type { ProFormInstance } from '@ant-design/pro-form';
import { notification, Space, Row, Col } from 'antd';
import { UndoOutlined, FormOutlined } from '@ant-design/icons';
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormCheckbox,
  ProFormUploadButton,
} from '@ant-design/pro-form';

export default () => {
  const formRef = useRef<ProFormInstance>();
  // 文章内容
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [content, setContent] = useState<string>('');
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
  // 获得编辑器内容
  const getContent = (e: any, contents: string) => setContent(contents);
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
          render: (_, doms) => <Space size="middle">{doms}</Space>,
          resetButtonProps: { shape: 'round', icon: <UndoOutlined /> },
          submitButtonProps: { type: 'primary', shape: 'round', icon: <FormOutlined /> },
        }}
        onFinish={async (values) => {
          await waitTime(1000);
          console.log('onFinish', values);
        }}
        // request参数
        params={{ id: 125 }}
        // 编辑文章时用
        request={async (params) => {
          console.log('params', params);
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                cid: 4,
                title: 'I am title',
                attribute: ['is_recom'],
                keywords: 'I am keywords',
                description: 'I am description',
                litpic: ['https://cdn.tigervs.com/images/2020-12-03/5fc863031e5c9.png'],
              });
            }, 1000);
          });
        }}
        // 表单默认值
        initialValues={{
          cid: 4,
          title: '我是标题',
          keywords: '我是关键词',
          attribute: ['is_recom'],
          description: '我是文章简述',
          litpic: ['https://cdn.tigervs.com/images/2020-12-03/5fc863031e5c9.png'],
        }}
        // 监听输入变化
        // onValuesChange={(changeValues) => console.log(changeValues)}
      >
        <ProFormSelect
          width="xs"
          name="cid"
          label="栏目"
          request={channel}
          tooltip="文章发布的栏目"
          rules={[{ required: true, message: '选择文章发布的栏目' }]}
        />
        <ProFormText
          label="标题"
          name="title"
          tooltip="限制32个字符"
          placeholder="请输入文章标题"
          fieldProps={{ showCount: true, maxLength: 32 }}
          rules={[
            { required: true, message: '请输入文章标题' },
            { min: 15, message: '文章标题不宜太短' },
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
          label="文章简述"
          name="description"
          tooltip="SEO优化很重要"
          placeholder="请输入名称文章简述"
          fieldProps={{
            allowClear: true,
            showCount: true,
            maxLength: 256,
            autoSize: { minRows: 5, maxRows: 8 },
          }}
          rules={[
            { required: true, message: '请输入文章文章简述' },
            { min: 50, message: '再多几句文章简述', type: 'string' },
          ]}
        />
        <ProFormUploadButton
          max={1}
          name="litpic"
          label="文档封面"
          title="Upload"
          action="upload.do"
          tooltip="仅支持png、jpg、jpeg"
          transform={(item) => {
            const newObj: Record<string, string> = {};
            item.map((url: string) => {
              newObj.litpic = url;
            });
            return { ...newObj };
          }}
          rules={[
            { required: true, message: '文档封面必须得有' },
            { max: 1, message: '文档封面只要一张就行了', type: 'array' },
          ]}
          fieldProps={{
            beforeUpload: (file) => {
              const MAX_FILE_SIZE = 2;
              const UNIT = 1024 * 1024;
              const curType = file.type;
              const fileType = ['image/png', 'image/jpeg', 'image/pjpeg'];
              return new Promise((resolve, reject) => {
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
            },
            listType: 'picture-card',
            accept: '.png, .jpg, .jpeg, .gif',
            headers: { Authorization: localStorage.getItem('Authorization') || '' },
          }}
        />
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
          rules={[
            { required: true, message: '请您你设置文档属性', type: 'array' },
            { min: 1, message: '请至少选择一个文档属性', type: 'array' },
          ]}
        />
        {/* ckeditor5编辑器 */}
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={16} xxl={16}>
            <Ckeditor setContent={getContent} />
          </Col>
        </Row>
      </ProForm>
    </PageContainer>
  );
};
