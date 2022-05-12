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
 */
export const extractImg = (content: string) => {
  const images = [];
  const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
  const imgArr = content.match(/<img.*?(?:>|\/>)/gi);
  for (const idx in imgArr) {
    const src = imgArr[idx].match(srcReg);
    images.push(src?.[1] ?? undefined);
  }
  return images;
};
