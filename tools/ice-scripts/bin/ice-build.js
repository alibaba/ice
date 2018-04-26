#!/usr/bin/env node

'use strict';

const program = require('commander');

program.option('--debug', 'debug 模式下不压缩').parse(process.argv);

const validationSassAvailable = require('../lib/utils/validationSassAvailable');

validationSassAvailable()
  .then(() => {
    const build = require('../lib/build');
    build({
      debug: !!program.debug,
    });
  })
  .catch((err) => {
    console.log(err);
    console.error('ice-scripts exited unexpectedly.');
    process.exit(1);
  });
