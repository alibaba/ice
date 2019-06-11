#!/usr/bin/env node

const program = require('commander');
const add = require('../lib/add');
const cliInstance = require('../lib/utils/cliInstance');

program
  .option('-t, --template <template>', '对应区块的 npm 包名')
  .parse(process.argv);

cliInstance.initByProgram(program);

// ice add block
const type = program.args[0] || 'block';
cliInstance.set('type', type);

add(cliInstance.get());
