#!/usr/bin/env node
// import fs from 'fs/promises';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { program } from 'commander';
// import createService from '@ice/service';
// import parse from 'yargs-parser';
// import checkNodeVersion from './checkNodeVersion.mjs';

// const __dirname = fileURLToPath(import.meta.url);

const fs = require('fs/promises');
const path = require('path');
const { program } = require('commander');
const createService = require('../lib').default;
const parse = require('yargs-parser');
const checkNodeVersion = require('./checkNodeVersion');
const { getBuiltInPlugins } = require('../lib/getBuiltInPlugins');

(async function () {
  const icePackageInfo = JSON.parse(await fs.readFile(path.join(__dirname, '../package.json'), 'utf-8'));
  checkNodeVersion(icePackageInfo.engines.node, icePackageInfo.name);

  const rootDir = process.cwd();
  const commandArgs = parse(
    process.argv.slice(2), {
    configuration: { 'strip-dashed': true },
  });
  // ignore `_` in argv
  delete commandArgs._;

  program
    .version(icePackageInfo.version)
    .usage('<command> [options]');

  program
    .command('build')
    .description('build project')
    .allowUnknownOption()
    .option('--config <config>', 'use custom config')
    .option('--rootDir <rootDir>', 'project root directory')
    .action(async () => {
      const service = await createService({ rootDir, command: 'build', commandArgs, getBuiltInPlugins });
      service.run();
    });

  program
    .command('start')
    .description('start server')
    .allowUnknownOption()
    .option('--config <config>', 'use custom config')
    .option('-h, --host <host>', 'dev server host', '0.0.0.0')
    .option('-p, --port <port>', 'dev server port')
    .option('--rootDir <rootDir>', 'project root directory')
    .action(async () => {
      const service = await createService({ rootDir, command: 'start', commandArgs, getBuiltInPlugins });
      const devServer = await service.run();
    });

  program
    .command('test')
    .description('run tests with jest')
    .allowUnknownOption() // allow jest config
    .option('--config <config>', 'use custom config')
    .action(async () => {
      await createService({ rootDir, command: 'test', commandArgs, getBuiltInPlugins });
    });

  program.parse(process.argv);

  const proc = program.runningCommand;

  if (proc) {
    proc.on('close', process.exit.bind(process));
    proc.on('error', () => {
      process.exit(1);
    });
  }

  const subCmd = program.args[0];
  if (!subCmd) {
    program.help();
  }
})();

