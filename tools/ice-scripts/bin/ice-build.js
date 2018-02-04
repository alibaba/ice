#!/usr/bin/env node

'use strict';

const program = require('commander');

program.on('--help', () => {
  console.log('todo 帮助信息');
});

program.option('--debug', 'debug mode without compression').parse(process.argv);

const build = require('../lib/build');

build({
  debug: !!program.debug,
});
