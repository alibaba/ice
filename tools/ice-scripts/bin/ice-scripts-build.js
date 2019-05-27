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
