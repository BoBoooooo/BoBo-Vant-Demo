/*
 * @file: 自动打包编译后的文件
 * @copyright: NanJing Anshare Tech .Com
 * @author: ytyang
 * @Date: 2018年12月13日02:01:59
 */

const fs = require('fs');
const compressing = require('compressing');
// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const Uploader = require('./uploader');
const { success, info, err } = require('./consoleTemplate');

// 获取传入的参数
function getArgs() {
  const params = {};
  process.argv.slice(2, process.argv.length).forEach((arg) => {
    if (arg.slice(0, 2) === '--') {
      const longArg = arg.split('=');
      [, params[longArg[0].slice(2, longArg[0].length)]] = longArg;
    } else if (arg[0] === '-') {
      const flag = arg.slice(1, arg.length);
      params.serverType = flag;
    }
  });
  return params;
}

// 删除文件夹
function deleteDir(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = `${folderPath}/${file}`;
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteDir(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
  }
}

const args = getArgs();
const parent = path.resolve(__dirname, '..');
// 从package.json获取项目名
const outputDir = (args.prefix ? args.prefix : '') + process.env.npm_package_name;

console.clear();

// 部署服务器配置
const serverConfig = {
  // 公司内网演示环境：www.axtech.net.cn:56266
  INTRANETDEMO: {
    projectName: outputDir,
    hostname: 'www.axtech.net.cn',
    port: 56266,
    path: '/DevOpsPlatformBackend/upload',
  },
};

info('正在压缩', '请稍后');
compressing.zip
  .compressDir(`${parent}/${outputDir}`, `${outputDir}.zip`)
  .then(() => {
    deleteDir(`${parent}/${outputDir}`);
    success('打包成功', `已经压缩到文件：${outputDir}.zip`);
    // 上传到服务器
    if (args.serverType) {
      // 上传到服务!
      new Uploader(serverConfig[args.serverType]).start();
    }
  })
  .catch((e) => {
    err('打包失败', e);
  });
