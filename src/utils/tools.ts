/**
 * 延时返回结果
 * @return Promise
 * @param time 毫秒
 */
export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

/**
 * 提取文章图片
 * @return array
 * @param content
 * TODO: 表达式有优化空间
 */
export const extractImg = (content: string) => {
  const images: string[] = [];
  const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
  const imgArr = content.match(/<img.*?(?:>|\/>)/gi);
  for (const idx in imgArr) {
    const src = imgArr[idx].match(srcReg);
    images.push(src?.[1]);
  }
  return images;
};

/**
 * int解析为ip地址
 * @return string
 * @param intIp ip地址
 */
export const _int2ip = (intIp: number): string => {
  let str = '';
  const tt = [];
  tt[0] = (intIp >>> 24) >>> 0;
  tt[1] = ((intIp << 8) >>> 24) >>> 0;
  tt[2] = (intIp << 16) >>> 24;
  tt[3] = (intIp << 24) >>> 24;
  str = String(tt[0]) + '.' + String(tt[1]) + '.' + String(tt[2]) + '.' + String(tt[3]);
  return str;
};

/**
 * 生成随机字符串
 * @return string
 * @param length 字符串长度
 */
export const randomString = (length: number): string => {
  const str = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = length; i > 0; --i) result += str[Math.floor(Math.random() * str.length)];
  return result;
};

/**
 * 递归查询子项id
 * @return Array
 * @param data 数据
 * @param init ids
 */
export const recursiveQuery = (data: Record<string, any>, init: number[] = []) => {
  data.filter((item: any) => {
    if (item.children) {
      init.push(item.id);
      recursiveQuery(item.children, init);
    }
  });
  return init;
};
