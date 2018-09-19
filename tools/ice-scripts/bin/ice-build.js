#!/usr/bin/env node

'use strict';

const program = require('commander');
const optionsAttachToEnv = require('../lib/utils/optionsAttachToEnv');

program
  .option('--debug', 'debug 模式下不压缩')
  .option('--hash', '构建后的资源带 hash 版本')
  .option('-s, --skip-install', '跳过安装依赖')
  .parse(process.argv);

optionsAttachToEnv(program);
const validationSassAvailable = require('../lib/utils/validationSassAvailable');

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
