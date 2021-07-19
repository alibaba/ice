#!/usr/bin/env node
const parse = require('yargs-parser');
const { viteBuild } = require('@builder/vite-service/lib/build');
const { WebpackService } = require('build-scripts');
const log = require('build-scripts/lib/utils/log');

class ViteService extends WebpackService {
  getCommandModule(options) {
    const { userConfig } = options;
    if (!userConfig.vite) {
      return super.getCommandModule(options);
    } else {
      return viteBuild;
    }
  }
};

module.exports = async (getBuiltInPlugins) => {
  process.env.NODE_ENV = 'production';
  const rawArgv = parse(process.argv.slice(2), {
    configuration: { 'strip-dashed': true },
  });
  // ignore _ in rawArgv
  delete rawArgv._;
  try {
    const service = new ViteService({
      command: 'build',
      args: { ...rawArgv },
      getBuiltInPlugins
    });
    await service.run({});
  } catch (err) {
    log.error(err.message);
    console.error(err);
    process.exit(1);
  }
};
