// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpackConfig = require('./config/webpack.config.js');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  outputDir: process.env.VUE_APP_OUTPUTDIR,
  configureWebpack: (config) => {
    if (isProd) {
      // 配置webpack 压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css$/,
          // 超过4kb压缩
          threshold: 4096,
        }),
      );
    }
  },
  chainWebpack: (config) => {
    // svg设置
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();

    // 项目标题
    config.plugin('html').tap((args) => {
      args[0].title = 'Anshare Vant Demo';
      return args;
    });

    if (process.env.IS_REPORT) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static',
        },
      ]);
    }
    webpackConfig(config);
  },
  // 不需要生产环境的 source map
  productionSourceMap: false,
  publicPath: './',
  css: {
    // 是否将css 提取到独立的文件,生产环境提取，开发环境不提取
    extract: !!isProd,
    // 开发模式开启css sourcemap
    sourceMap: !isProd,
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/styles/_variables.scss";',
      },
    },
  },
  devServer: {
    port: 90,
  },
};
