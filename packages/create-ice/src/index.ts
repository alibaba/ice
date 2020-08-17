#!/usr/bin/env node
import * as path from 'path';
import * as fs from 'fs-extra';
import { Command } from 'commander';
import create from './create';

const pkgContent = fs.readJSONSync(path.join(__dirname, '..', 'package.json'));

(async function() {
  const program = new Command();

  program
    .name(`create-ice version ${pkgContent.version}`)
    .usage('<command> [options]');

  program
    .option('--template <template>', 'select a template');

  program.on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ npm init ice');
    console.log('  $ npm init ice --template @alifd/fusion-design-pro');
    console.log('');
    console.log('  $ npm init ice ice-app');
    console.log('  $ npm init ice ice-app @alifd/fusion-design-pro');
    console.log('  $ npm init ice ice-app --template @alifd/fusion-design-pro');
    process.exit(0);
  });

  program.parse(process.argv);

  const dirname: string = program.args[0] ? program.args[0] : '.';
  const templateName: string = program.template ? program.template : program.args[1];

  console.log('create-ice version:', pkgContent.version);
  console.log('create-ice args', dirname, templateName);

  const dirPath = path.join(process.cwd(), dirname);
  await create(dirPath, templateName, dirname);
})();
