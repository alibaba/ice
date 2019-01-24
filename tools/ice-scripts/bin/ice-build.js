#!/usr/bin/env node

'use strict';

const program = require('commander');
const { collectDetail } = require('@alifd/fusion-collector');
const optionsAttachToEnv = require('../lib/utils/optionsAttachToEnv');

/**
 * --project-type 参数说明
 *  - web: 纯前端项目
 *  - nodejs: koa/midway 项目，前端代码放在 client 下
 *  - node: 老的 koa 项目
 */
program
  .option('--debug', 'debug 模式下不压缩')
  .option('--hash', '构建后的资源带 hash 版本')
  .option('--sourcemap <type>', '构建后的资源带 sourcemap 文件', /^([a-z-]*source-map|eval|none)$/i, 'none')
  .option('--project-type <type>', '项目类型, node|nodejs|web', /^(node|nodejs|web)$/i, 'web')
  .option('-s, --skip-install', '跳过安装依赖')
  .option(
    '--inject-babel <type>',
    '注入 babel 运行环境, Enum: polyfill|runtime',
    /^(polyfill|runtime)$/,
    'polyfill'
  )
  .parse(process.argv);

optionsAttachToEnv(program);
const validationSassAvailable = require('../lib/utils/validationSassAvailable');

try {
  collectDetail({
    rootDir: process.cwd(), // 项目根地址
    basicPackage: ['@alifd/next', '@icedesign/base'], // 主体包名称
    kit: 'ice-scripts', // 统计的来源
  });
} catch (e) {}

validationSassAvailable()
  .then(() => {
    // eslint-disable-next-line
    const build = require('../lib/build');
    build();
  })
  .catch((err) => {
    // eslint-disable-next-line
    console.log(err);
    // eslint-disable-next-line
    console.error('ice-scripts exited unexpectedly.');
    process.exit(1);
  });
