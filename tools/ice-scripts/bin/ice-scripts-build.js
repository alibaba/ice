#!/usr/bin/env node
const program = require('commander');
const validationSassAvailable = require('../lib/utils/validationSassAvailable');
const getCliOptions = require('../lib/utils/getCliOptions');
const checkUpdater = require('../lib/utils/checkUpdater');
const Context = require('../lib/core/Context');

program
  .parse(process.argv);

validationSassAvailable();

checkUpdater().then(() => {
  process.env.NODE_ENV = 'production';
  const cliOptions = getCliOptions(program);

  new Context({
    command: 'build',
    args: cliOptions,
  }).run();
});
