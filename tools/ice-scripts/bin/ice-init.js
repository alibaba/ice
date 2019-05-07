#!/usr/bin/env node


const program = require('commander');
const init = require('../lib/commands/init');
const checkUpdater = require('../lib/utils/checkUpdater');
const cliInstance = require('../lib/utils/cliInstance');

program
  .option('-t, --template <template>', '对应模板的 npm 包名')
  // 即将移除 --scaffold
  .option('-s, --scaffold <scaffold>', '模板 npm 包名')
  .parse(process.argv);

checkUpdater().then(() => {
  cliInstance.initByProgram(program);

  // ice init component/block
  const type = program.args[0] || 'project';
  cliInstance.set('type', type);

  // 兼容 --scaffold
  const scaffold = cliInstance.get('scaffold');
  if (scaffold) {
    cliInstance.set('template', scaffold);
  }

  init(cliInstance.get());
});
