#!/usr/bin/env node
import * as path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs-extra';
import { program } from 'commander';
import create from './create.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pkgContent = fs.readJSONSync(path.join(__dirname, '..', 'package.json'));

(async function () {
  program
    .name(`create-ice version ${pkgContent.version}`)
    .usage('<command> [options]');

  program
    .option('--template <template>', 'select a template');

  program.on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ npm init ice');
    console.log('  $ npm init ice --template @ice/lite-scaffold');
    console.log('');
    console.log('  $ npm init ice ice-app');
    console.log('  $ npm init ice ice-app --template @ice/lite-scaffold');
    process.exit(0);
  });

  program.parse(process.argv);

  const dirname: string = program.args[0] ? program.args[0] : '.';
  const options = program.opts();

  const templateName: string = options.template ? options.template : program.args[1];

  console.log('create-ice version:', pkgContent.version);
  console.log('create-ice args', dirname, templateName);

  const dirPath = path.join(process.cwd(), dirname);
  await create(dirPath, templateName, dirname);
})();
