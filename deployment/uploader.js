// eslint-disable-next-line import/no-extraneous-dependencies
const http = require('http');
const fs = require('fs');
const { success, info, err } = require('./consoleTemplate');

module.exports = class Uploader {
  constructor(args) {
    this.hostname = args.hostname;
    this.port = args.port;
    this.path = args.path;
    this.projectName = args.projectName;
    this.fileName = `./${this.projectName}.zip`;
    // 创建随机切割标识字
    this.boundaryKey = new Date().getTime();
  }

  // 开始上传
  start() {
    this.req = http.request(
      {
        hostname: this.hostname,
        port: this.port,
        path: this.path,
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=----${this.boundaryKey}`,
        },
      },
      (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          try {
            const r = JSON.parse(chunk);
            if (r.code === 200) {
              success('部署成功', `新版本上线，本地${this.fileName}已删除。累积节约时间${r.message * 5}分钟。`);
              fs.unlink(this.fileName, (e) => {
                if (e) return err('删除失败', `文件：${this.fileName}，原因：${e}`);
                return null;
              });
            }
          } catch (e) {
            err('部署失败', '服务器运维平台异常');
          }
        });
      },
    );
    const payload = `\r\n------${this.boundaryKey}\r\n`
      + `Content-Disposition: form-data; name="file"; filename="${this.projectName}.rar"\r\n`
      + 'Content-Type: application/octet-stream\r\n\r\n';
    const enddata = `\r\n------${this.boundaryKey}--`;

    const fileStream = fs.readFileSync(this.fileName);
    const fileLength = fs.statSync(this.fileName).size;

    this.req.setHeader(
      'Content-Length',
      Buffer.byteLength(payload) + Buffer.byteLength(enddata) + fileLength,
    );

    info('文件上传', `大小：${Uploader.bytesToSize(fileLength)}，请稍后……`);
    this.req.write(payload);
    this.req.write(fileStream);
    this.req.end(enddata);
    this.req.on('error', (e) => {
      err('上传出错', `5秒后自动重试。原因：${e.message}`);
      setTimeout(() => {
        this.start();
      }, 5000);
    });
  }

  static bytesToSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / (k ** i)).toPrecision(3)}${sizes[i]}`;
  }
};
