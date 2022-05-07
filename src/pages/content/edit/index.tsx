import { useRequest } from 'umi';
import { useState } from 'react';
import Ckeditor from '@/pages/components/Ckeditor';
import { getChannel } from '@/pages/content/service';
import { PageContainer } from '@ant-design/pro-layout';
import type { channelDataItem, channelOptions } from '../data';

export default () => {
  // 文章内容
  const [content, setContent] = useState<string>('');
  // 新闻栏目
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [channelOptions, setChannelOptions] = useState<channelOptions[]>();
  // 获取新闻栏目
  useRequest(getChannel, {
    onSuccess: (res: { list: channelDataItem[] }) => {
      const channel = res?.list.map((item: channelDataItem) => ({
        label: item.cname,
        value: item.id,
      }));
      setChannelOptions(channel);
    },
  });

  const getContent = (e: any, contents: string) => {
    setContent(contents);
    console.log('parentContent:', e.name, content);
  };

  return (
    <PageContainer>
      <Ckeditor setContent={getContent} />
    </PageContainer>
  );
};
