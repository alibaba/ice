#!/usr/bin/env node

'use strict';

const program = require('commander');

program.on('--help', () => {
  console.log('todo 帮助信息');
});

program.parse(process.argv);

const subCmd = program.args[0];

switch (subCmd) {
  case 'build':
    const buildComponent = require('../lib/component-build');
    buildComponent({
      // pass opts
      generateStyle: true,
      propsSchema: true,
    });
    break;

  case 'dev':
    console.log('启动 component dev server...');
    break;
  // devType: 'component',

  default:
    console.log('未识别的命令');
}
