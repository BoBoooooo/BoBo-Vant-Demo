/*
 * @file: prod环境下cdn资源引用
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2020年09月07 18:18:11
 */

const cdn = require('./cdn');

module.exports = (config) => {
  // 如果启用了cdn,则添加cdn内容
  if (cdn.enable) {
    config.plugin('html').tap((args) => {
      args.forEach((arg) => {
        arg.cdns = {
          JS: Object.values(cdn.JS).map(item => (typeof item === 'string' ? item : item.url)),
          CSS: Object.values(cdn.CSS),
        };
      });
      return args;
    });
    config.externals(
      Object.entries(cdn.JS).reduce((result, [key, value]) => {
        result[key] = typeof value === 'string' ? key : value.exportName;
        return result;
      }, {}),
    );
  }
};
