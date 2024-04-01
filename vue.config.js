const path = require('path')
const resolve = path.resolve

module.exports = ({
  lintOnSave: false,
  publicPath: '.',
  // webpack配置
  chainWebpack: config => {
    config.module.rules.delete('svg')
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  }
})
