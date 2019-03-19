#!/usr/bin/env node

'use strict';

const program = require('commander');
const init = require('../lib/init');

program
  .option('-s, --scaffold <port>', '模板 npm 包名')
  .parse(process.argv);

init({
  scaffold: program.scaffold
});
