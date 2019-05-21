#!/usr/bin/env node


const program = require('commander');
const cliInstance = require('../lib/utils/cliInstance');
const checkUpdater = require('../lib/utils/checkUpdater');
const Service = require('../lib/core/Service');

/**
 * --project-type 参数说明
 *  - web: 纯前端项目
 *  - nodejs: koa/midway 项目，前端代码放在 client 下
 *  - node: 老的 koa 项目
 */
program
  .option('--debug', 'debug 模式下不压缩')
  .option('--hash', '构建后的资源带 hash 版本')
  .option('--sourcemap <type>', '构建后的资源带 sourcemap 文件', /^([a-z-]*source-map|eval|none)$/i)
  .option('-s, --skip-install', '跳过安装依赖')
  .option('--skip-demo', '跳过构建 build/index.html 的环节')
  .option(
    '--inject-babel <type>',
    '注入 babel 运行环境, Enum: polyfill|runtime',
    /^(polyfill|runtime)$/
  )
  .parse(process.argv);

checkUpdater().then(() => {
  cliInstance.initByProgram(program);
  process.env.NODE_ENV = 'production';
  const service = new Service({
    command: 'build',
    args: cliInstance.get(),
  });
  service.run();
});
