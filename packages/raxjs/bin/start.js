#!/usr/bin/env node
const { fork } = require('child_process');
const parse = require('yargs-parser');
const chokidar = require('chokidar');
const detect = require('detect-port');
const path = require('path');
const log = require('@alib/build-scripts/lib/utils/log');

let child = null;
const rawArgv = parse(process.argv.slice(2));
const scriptPath = require.resolve('./child-process-start.js');
const configPath = path.resolve(rawArgv.config || 'build.json');

const inspectRegExp = /^--(inspect(?:-brk)?)(?:=(?:([^:]+):)?(\d+))?$/;

function modifyInspectArgv(argv) {
  return Promise.all(
    argv.map(async item => {
      const matchResult = inspectRegExp.exec(item);
      if (!matchResult) {
        return item;
      }
      // eslint-disable-next-line no-unused-vars
      const [_, command, ip, port = 9229] = matchResult;
      const nPort = +port;
      const newPort = await detect(nPort);
      return `--${command}=${ip ? `${ip}:` : ''}${newPort}`;
    })
  );
}

function restartProcess() {
  (async () => {
    // remove the inspect related argv when passing to child process to avoid port-in-use error
    const argv = await modifyInspectArgv(process.execArgv);
    child = fork(scriptPath, process.argv.slice(2), { execArgv: argv });
    child.on('message', data => {
      if (process.send) {
        process.send(data);
      }
    });

    child.on('exit', code => {
      if (code) {
        process.exit(code);
      }
    });
  })();
}

const onUserChange = () => {
  console.log('\n');
  log.info('build.json has been changed');
  log.info('restart dev server');
  // add process env for mark restart dev process
  process.env.RESTART_DEV = true;
  child.kill();
  restartProcess();
};

module.exports = () => {
  restartProcess();

  const watcher = chokidar.watch(configPath, {
    ignoreInitial: true,
  });

  watcher.on('change', onUserChange);

  watcher.on('error', error => {
    log.error('fail to watch file', error);
    process.exit(1);
  });
};
