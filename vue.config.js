const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // transpileDependencies: true,
  publicPath: "./",
  outputDir: "docs",
  productionSourceMap: false,
  configureWebpack: {
    // 以下库使用cdn，不会被打包
    externals: process.env.NODE_ENV === 'production' ? {
      "vue": "Vue",
      "vuex": "Vuex",
      "vuedraggable": "vuedraggable",
      "compressorjs": "Compressor",
      "element-plus": "ElementPlus"
    } : {}
  },
  // chainWebpack: config => {
  //   config.plugins.delete('preload')
  //   config.plugins.delete('prefetch')
  //   config.module
  //     .rule('images')
  //     .use('url-loader')
  //     .loader('url-loader')
  //     .tap(options => Object.assign(options, { limit: 8192 }))
  // },
  devServer: {
    port: 9000
  }
})