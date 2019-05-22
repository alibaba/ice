#!/usr/bin/env node

const program = require('commander');
const lodash = require('lodash');
const pkgData = require('../package.json');

program
  .version(pkgData.version)
  .usage('<command> [options]')
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ ice init');
  });

// TODO: 执行 ice 输出 help 信息

program
  .command('init [type]')
  .description('init project/materials/component/block')
  .option('-t, --template', 'npm')
  .action((type, cmd) => {
    outputVersion();
    const options = lodash.pick(cmd, ['template']);
    options.type = type;

    console.log(options);
  })
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ ice init [project|materials|component|block]');
  });

program
  .command('add [type]')
  .description('add block/scaffold/component/demo/adaptor')
  .option('-t, --template', 'npm')
  .action((type, cmd) => {
    outputVersion();
    const options = lodash.pick(cmd, ['template']);
    options.type = type;

    console.log(options);
  })
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ ice add [block|scaffold|component] // develope materials');
    console.log('  $ ice add block // develope project');
    console.log('  $ ice add [demo|adaptor] // develope component');
  });

program
  .command('generate')
  .description('generate materials.json')
  .action(() => {
    console.log('generate');
  });

program
  .command('deploy')
  .description('deploy materials.json to fusion.design or unpkg(by npm)')
  .action(() => {
    outputVersion();
    console.log('sync');
  });

program
  .command('clear')
  .description('clear fusion.design token')
  .action(() => {
    outputVersion();
    console.log('clear');
  });

program
  .command('screenshot')
  .description('screenshot')
  .action(() => {
    outputVersion();
    console.log('screenshot');
  });

program.parse(process.argv);

const proc = program.runningCommand;

if (proc) {
  proc.on('close', process.exit.bind(process));
  proc.on('error', () => {
    process.exit(1);
  });
}

function outputVersion() {
  console.log(pkgData.name, pkgData.version);
}
