#!/usr/bin/env node
const parse = require('yargs-parser');
const log = require('build-scripts/lib/utils/log');
const { isAbsolute, join } = require('path');
const BuildServer = require('./buildService');

module.exports = async (getBuiltInPlugins) => {
  process.env.NODE_ENV = 'production';
  const rawArgv = parse(process.argv.slice(2), {
    configuration: { 'strip-dashed': true },
  });

  const { rootDir = process.cwd() } = rawArgv;

  delete rawArgv.rootDir;
  // ignore _ in rawArgv
  delete rawArgv._;
  try {
    const service = new BuildServer({
      command: 'build',
      args: { ...rawArgv },
      getBuiltInPlugins,
      rootDir: isAbsolute(rootDir) ? rootDir : join(process.cwd(), rootDir),
    });
    await service.run({});
  } catch (err) {
    log.error(err.message);
    console.error(err);
    process.exit(1);
  }
};
