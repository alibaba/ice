#!/usr/bin/env node

'use strict';

const program = require('commander');

program.on('--help', () => {
  console.log('todo 帮助信息');
});

program.option('--debug', 'debug mode without compression').parse(process.argv);

const checkSass = require('../lib/utils/check-sass');

checkSass()
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
