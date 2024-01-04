#!/usr/bin/env node
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import semver from 'semver';
import fse from 'fs-extra';
import { program, Option } from 'commander';
import yargsParser from 'yargs-parser';
import createService from '../esm/createService.js';
import { TARGETS, WEB } from '../esm/constant.js';

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
    .addOption(new Option('--target <target>', 'set build target').default(WEB).choices(TARGETS))
    .option('--target <target>', 'same as --target', WEB)
    .option('--mode <mode>', 'set mode', 'production')
    .option('--analyzer', 'visualize size of output files', false)
    .option('--config <config>', 'use custom config')
    .option('--rootDir <rootDir>', 'project root directory', cwd)
    .action(async ({ rootDir, ...commandArgs }, ctx) => {
      renamePlatformToTarget(commandArgs);
      process.env.NODE_ENV = 'production';
      const service = await createService({
        rootDir,
        command: 'build',
        commandArgs: {
          ...parseUnknownOptions(ctx.args),
          ...commandArgs,
        },
      });
      service.run().catch((error) => {
        console.log(chalk.red('Build Error'), error);
        // Set exit code to 1 to exit process with failure code, otherwise CI may regard build as success.
        process.exit(1);
      });
    });

  program
    .command('start')
    .description('start server')
    .allowUnknownOption()
    .addOption(new Option('--target <target>', 'set build target').default(WEB).choices(TARGETS))
    .option('--target <target>', 'same as --target', WEB)
    .option('--mode <mode>', 'set mode', 'development')
    .option('--config <config>', 'custom config path')
    .option('-h, --host <host>', 'dev server host')
    .option('-p, --port <port>', 'dev server port')
    .option('--no-open', "don't open browser on startup")
    .option('--no-mock', "don't start mock service")
    .option('--rootDir <rootDir>', 'project root directory', cwd)
    .option('--analyzer', 'visualize size of output files', false)
    .option('--https [https]', 'enable https', false)
    .option('--force', 'force remove cache directory', false)
    .option('--speedup', 'speed up build time based on Rust tools', false)
    .action(async ({ rootDir, ...commandArgs }, ctx) => {
      renamePlatformToTarget(commandArgs);
      process.env.NODE_ENV = 'development';
      const service = await createService({
        rootDir,
        command: 'start',
        commandArgs: {
          ...parseUnknownOptions(ctx.args),
          ...commandArgs,
        },
      });
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

function parseUnknownOptions(args) {
  let unKnownOptions = {};
  if (args.length > 0) {
    unKnownOptions = yargsParser(args, {
      // Transform dashed arguments to camel case.
      // e.g. --foo-bar => { fooBar: true }.
      configuration: { 'strip-dashed': true },
    });
    // Custom options do not support positional arguments.
    delete unKnownOptions._;
  }
  return unKnownOptions;
}

// Rename `platform` to `target`, for compatibility.
// For ice.js <3.0.3, using --platform to set build target.
function renamePlatformToTarget(commandArgs) {
  // Rename `platform` to `target`.
  if (Object.prototype.hasOwnProperty.call(commandArgs, 'platform')) {
    commandArgs.target = commandArgs.platform;
    delete commandArgs.platform;
  }
}

function checkNodeVersion(requireNodeVersion, frameworkName = 'ice') {
  if (!semver.satisfies(process.version, requireNodeVersion)) {
    console.log();
    console.log(chalk.red(`  You are using Node ${process.version}`));
    console.log(chalk.red(`  ${frameworkName} requires Node ${requireNodeVersion}, please update Node.`));
    console.log();
    console.log();
    process.exit(1);
  }
}
