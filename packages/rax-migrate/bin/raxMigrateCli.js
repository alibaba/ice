#!/usr/bin/env node
import process from 'process';
import { program } from 'commander';
import { transform } from '../esm/index.js';

const argv = process.argv.slice(2);

function printHelp() {
  console.log(`Usage: rax-migrate <command> [options]
Options:
  -v, --version        output the version number
  -h, --help           output usage information

Commands:
  transform <app-name>    tranform rax project to ice project
`);
}

(async function () {
  program
  .command('transform')
  .description('transform rax project to ice3 project.')
  .allowUnknownOption()
  .option('--name <name>', 'project name', 'ice-app')
  .action(async ({ rootDir, ...commandArgs }) => {
    // Print help.
    if (argv.length === 0 && (argv.h || argv.help)) {
      printHelp();
      process.exit(1);
    }

    if (argv.length === 1) {
      console.error('You need to provide the file name of rax project.');
      process.exit(1);
    }

    transform({
      rootDir,
      projcetName: commandArgs.name,
      raxProjectName: argv[1],
    });
  });

  program.parse(process.argv);

  const proc = program.runningCommand;

  if (proc) {
    proc.on('close', process.exit.bind(process));
    proc.on('error', () => {
      process.exit(1);
    });
  }
})();
