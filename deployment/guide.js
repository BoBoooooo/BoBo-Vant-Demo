const inquirer = require('inquirer');
const exec = require('child_process').execSync;

const commandList = [
  {
    // 命令文字说明
    name: '本地启动',
    // npm命令
    value: 'npm run dev',
    // 环境配置文件
    envFile: '.env.dev',
  },
  {
    name: '外网发布',
    value: 'npm run deploy:intranet-public:out',
    envFile: '.env.public',
  },
];
const choices = commandList.map(({ name, value, envFile }, i) => ({ name: `${i + 1}、${name}(${value})[${envFile}]`, value }));

inquirer.prompt([{
  type: 'list',
  message: '请选执行的命令:',
  name: 'command',
  choices,
}]).then(({ command }) => {
  exec(command, { stdio: 'inherit' });
});
