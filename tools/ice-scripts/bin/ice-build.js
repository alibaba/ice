#!/usr/bin/env node


const program = require('commander');
const cliInstance = require('../lib/utils/cliInstance');
const build = require('../lib/build');

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
  .option('--project-type <type>', '项目类型, node|nodejs|web', /^(node|nodejs|web)$/i)
  .option('-s, --skip-install', '跳过安装依赖')
  .option('--skip-demo', '跳过构建 build/index.html 的环节')
  .option(
    '--inject-babel <type>',
    '注入 babel 运行环境, Enum: polyfill|runtime',
    /^(polyfill|runtime)$/
  )
  .parse(process.argv);

cliInstance.initByProgram(program);
build({
  cliOptions: cliInstance.get(),
});
