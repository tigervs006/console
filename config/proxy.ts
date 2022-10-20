/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/console/': {
      changeOrigin: true,
      target: 'https://www.brandsz.cn',
    },
  },
  pre: {
    '/console/': {
      changeOrigin: true,
      target: 'https://www.brandsz.cn',
    },
  },
  test: {
    '/console/': {
      changeOrigin: true,
      target: 'https://test.brandsz.cn',
    },
  },
};
