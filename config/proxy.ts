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
    '/api/': {
      target: 'https://demo.brandsz.cn/console',
      changeOrigin: true,
      pathRewrite: { '/api': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'https://www.brandsz.cn/console',
      changeOrigin: true,
      pathRewrite: { '/api': '' },
    },
  },
  test: {
    '/api/': {
      target: 'https://test.brandsz.cn/console',
      changeOrigin: true,
      pathRewrite: { '/api': '' },
    },
  }
}
