#!/usr/bin/env node
const detect = require('detect-port');
const inquirer = require('inquirer');
const parse = require('yargs-parser');
const log = require('build-scripts/lib/utils/log');
const BuildService = require('./buildService');

const rawArgv = parse(process.argv.slice(2), {
  configuration: { 'strip-dashed': true }
});

const DEFAULT_PORT = rawArgv.port || process.env.PORT || 3333;
const defaultPort = parseInt(DEFAULT_PORT, 10);

module.exports = async (getBuiltInPlugins) => {
  let newPort = await detect(defaultPort);
  if (newPort !== defaultPort) {
    const question = {
      type: 'confirm',
      name: 'shouldChangePort',
      message: `${defaultPort} 端口已被占用，是否使用 ${newPort} 端口启动？`,
      default: true
    };
    const answer = await inquirer.prompt(question);
    if (!answer.shouldChangePort) {
      newPort = null;
    }
  }
  if (newPort === null) {
    process.exit(1);
  }

  process.env.NODE_ENV = 'development';
  rawArgv.port = parseInt(newPort, 10);

  // ignore _ in rawArgv
  delete rawArgv._;
  try {
    const service = new BuildService({
      command: 'start',
      args: { ...rawArgv },
      getBuiltInPlugins
    });
    const devServer = await service.run({});

    ['SIGINT', 'SIGTERM'].forEach(function (sig) {
      process.on(sig, function () {
        if (devServer) {
          devServer.close();
        }
        process.exit(0);
      });
    });
  } catch (err) {
    log.error(err.message);
    console.error(err);
    process.exit(1);
  }
};
