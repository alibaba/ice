#!/usr/bin/env node

'use strict';

const program = require('commander');

program
  .option('--debug', 'debug 模式下不压缩')
  .option('--hash', '构建后的资源带 hash 版本')
  .parse(process.argv);

const validationSassAvailable = require('../lib/utils/validationSassAvailable');

validationSassAvailable()
  .then(() => {
    if (program.debug) {
      process.env.BUILD_DEBUG = true;
    }
    if (program.hash) {
      process.env.BUILD_HASH = true;
    }
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
