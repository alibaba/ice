#!/usr/bin/env node
const program = require('commander');
const detect = require('detect-port');
const inquirer = require('inquirer');

const getCliOptions = require('../lib/utils/getCliOptions');
const Context = require('../lib/core/Context');
const log = require('../lib/utils/log');

program
  .option('-p, --port <port>', '服务端口号')
  .option('-h, --host <host>', '服务主机名', '0.0.0.0')
  .option('--https', '开启 https ')
  .option('--analyzer', '开启构建分析')
  .option('--analyzer-port', '设置分析端口号')
  .option('--disabled-reload', '关闭 hot reload')
  .option('--config <config>', 'use custom config')
  .parse(process.argv);

// 是否可交互：目前没用
const isInteractive = process.stdout.isTTY;

const DEFAULT_PORT = program.port || process.env.PORT || 4444;
const defaultPort = parseInt(DEFAULT_PORT, 10);

(async () => {
  let newPort = await detect(defaultPort);
  if (newPort !== defaultPort && isInteractive) {
    const question = {
      type: 'confirm',
      name: 'shouldChangePort',
      message: `${defaultPort} 端口已被占用，是否使用 ${newPort} 端口启动？`,
      default: true,
    };
    const answer = await inquirer.prompt(question);
    if (!answer.shouldChangePort) {
      newPort = null;
    }
  }
  if (newPort === null) {
    process.exit(500);
  }

  process.env.NODE_ENV = 'development';
  const cliOptions = getCliOptions(program);
  cliOptions.port = parseInt(newPort, 10);
  try {
    await new Context({
      command: 'dev',
      args: cliOptions,
    }).run();
  } catch (err) {
    log.error(err.message);
    console.error(err);
    process.exit(1);
  }
})();
