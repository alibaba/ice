#!/usr/bin/env node
const parse = require('yargs-parser');
const { build } = require('build-scripts');
const log = require('build-scripts/lib/utils/log');

module.exports = async (getBuiltInPlugins) => {
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
