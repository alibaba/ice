#!/usr/bin/env node
import * as path from 'path';
import { log } from 'ice-npm-utils';
import * as fs from 'fs-extra';
import create from './create';

const pkgContent = fs.readJSONSync(path.join(__dirname, '..', 'package.json'));
console.log('create-ice version:', pkgContent.version);

(async function() {
  const args = process.argv;
  const dirname: string = args[2];
  const templateName: string = args[3];

  log.verbose('create-ice args', dirname, templateName);

  if (!dirname || dirname === '--help') {
    console.log('');
    console.log('init project');
    console.log('Examples:');
    console.log('  $ npm init ice ice-app');
    console.log('  $ npm init ice ice-app @alifd/fusion-design-pro');
    process.exit(0);
  }

  const dirPath = path.join(process.cwd(), dirname);
  await create(dirPath, templateName, dirname);
})();
