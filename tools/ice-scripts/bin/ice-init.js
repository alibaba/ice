#!/usr/bin/env node

'use strict';

const program = require('commander');
const init = require('../lib/init');
const checkUpdater = require('../lib/utils/checkUpdater');
const cliInstance = require('../lib/utils/cliInstance');

program
  .option('-s, --scaffold <port>', '模板 npm 包名')
  .parse(process.argv);

checkUpdater().then(() => {
  cliInstance.initByProgram(program);
  init(cliInstance.get());
});
