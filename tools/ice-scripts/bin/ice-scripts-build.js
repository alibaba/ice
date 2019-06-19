#!/usr/bin/env node
const program = require('commander');
const getCliOptions = require('../lib/utils/getCliOptions');
const Context = require('../lib/core/Context');
const log = require('../lib/utils/log');

program
  .parse(process.argv);

(async () => {
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
