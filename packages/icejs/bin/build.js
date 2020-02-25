#!/usr/bin/env node
const parse = require('yargs-parser');
const { build } = require('@alib/build-scripts');
const log = require('@alib/build-scripts/lib/utils/log');
const getBuiltInPlugins = require('../lib/index');

module.exports = async () => {
  process.env.NODE_ENV = 'production';
  const rawArgv = parse(process.argv.slice(2), {
    configuration: { 'strip-dashed': true },
  });
  // ignore _ in rawArgv
  delete rawArgv._;
  try {
    await build({
      args: { ...rawArgv },
      getBuiltInPlugins,
    });
  } catch (err) {
    log.error(err.message);
    console.error(err);
    process.exit(1);
  }
};
