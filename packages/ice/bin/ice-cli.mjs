#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { program } from 'commander';
// hijack webpack before import other modules
import '../esm/requireHook.js';
import createService from '../esm/createService.js';
import checkNodeVersion from './checkNodeVersion.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async function () {
  const icePackageInfo = JSON.parse(await fs.readFile(path.join(__dirname, '../package.json'), 'utf-8'));
  checkNodeVersion(icePackageInfo.engines.node, icePackageInfo.name);
  process.env.__ICE_VERSION__ = icePackageInfo.version;
  const cwd = process.cwd();

  program
    .version(icePackageInfo.version)
    .usage('<command> [options]');

  program
    .command('build')
    .description('build project')
    .allowUnknownOption()
    .option('--config <config>', 'use custom config')
    .option('--rootDir <rootDir>', 'project root directory', cwd)
    .action(async ({ rootDir, ...commandArgs }) => {
      const service = await createService({ rootDir, command: 'build', commandArgs });
      service.run();
    });

  program
    .command('start')
    .description('start server')
    .allowUnknownOption()
    .option('--config <config>', 'use custom config')
    .option('-h, --host <host>', 'dev server host', '0.0.0.0')
    .option('-p, --port <port>', 'dev server port', 3333)
    .option('--no-open', 'don\'t open browser')
    .option('--rootDir <rootDir>', 'project root directory', cwd)
    .action(async ({ rootDir, ...commandArgs }) => {
      const service = await createService({ rootDir, command: 'start', commandArgs });
      service.run();
    });

  program
    .command('test')
    .description('run tests with jest')
    .allowUnknownOption() // allow jest config
    .option('--config <config>', 'use custom config')
    .option('--rootDir <rootDir>', 'project root directory', cwd)
    .action(async ({ rootDir, ...commandArgs }) => {
      await createService({ rootDir, command: 'test', commandArgs });
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
