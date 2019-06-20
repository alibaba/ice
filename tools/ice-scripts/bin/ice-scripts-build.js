#!/usr/bin/env node
const program = require('commander');
const validationSassAvailable = require('../lib/utils/validationSassAvailable');
const getCliOptions = require('../lib/utils/getCliOptions');
const checkUpdater = require('../lib/utils/checkUpdater');
const Context = require('../lib/core/Context');
const log = require('../lib/utils/log');

program
  .option('--config <config>', 'use custom config')
  .parse(process.argv);

validationSassAvailable();

(async () => {
  await checkUpdater();
  process.env.NODE_ENV = 'production';
  const cliOptions = getCliOptions(program);
  try {
    await new Context({
      command: 'build',
      args: cliOptions,
    }).run();
  } catch (err) {
    log.error(err.message);
    console.error(err);
    process.exit(1);
  }
})();
