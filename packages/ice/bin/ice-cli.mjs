#!/usr/bin/env node
import path from 'path';
import { fileURLToPath } from 'url';
import fse from 'fs-extra';
import { program, Option } from 'commander';
import detectPort from 'detect-port';
// hijack webpack before import other modules
import '../esm/requireHook.js';
import createService from '../esm/createService.js';
import { ALL_PLATFORMS } from '../esm/constant.js';
import checkNodeVersion from './checkNodeVersion.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async function () {
  const icePackageInfo = await fse.readJSON(path.join(__dirname, '../package.json'));
  checkNodeVersion(icePackageInfo.engines.node, icePackageInfo.name);
  process.env.__ICE_VERSION__ = icePackageInfo.version;
  const cwd = process.cwd();

  program.version(icePackageInfo.version).usage('<command> [options]');

  program
    .command('build')
    .description('build project')
    .allowUnknownOption()
    .addOption(new Option('--platform <platform>', 'set platform').default('web').choices(ALL_PLATFORMS))
    .option('--mode <mode>', 'set mode', 'production')
    .option('--analyzer', 'visualize size of output files', false)
    .option('--config <config>', 'use custom config')
    .option('--rootDir <rootDir>', 'project root directory', cwd)
    .action(async ({ rootDir, ...commandArgs }) => {
      process.env.NODE_ENV = 'production';
      const service = await createService({ rootDir, command: 'build', commandArgs });
      service.run();
    });

  program
    .command('start')
    .description('start server')
    .allowUnknownOption()
    .addOption(new Option('--platform <platform>', 'set platform').default('web').choices(ALL_PLATFORMS))
    .option('--mode <mode>', 'set mode', 'development')
    .option('--config <config>', 'custom config path')
    .option('-h, --host <host>', 'dev server host', '0.0.0.0')
    .option('-p, --port <port>', 'dev server port')
    .option('--no-open', "don't open browser on startup")
    .option('--no-mock', "don't start mock service")
    .option('--rootDir <rootDir>', 'project root directory', cwd)
    .option('--analyzer', 'visualize size of output files', false)
    .option('--https [https]', 'enable https', false)
    .option('--force', 'force remove cache directory', false)
    .action(async ({ rootDir, ...commandArgs }) => {
      process.env.NODE_ENV = 'development';
      const DEFAULT_PORT = 3000;
      commandArgs.port = typeof commandArgs.port === 'undefined' ? await detectPort(DEFAULT_PORT) : commandArgs.port;
      const service = await createService({ rootDir, command: 'start', commandArgs });
      service.run();
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
