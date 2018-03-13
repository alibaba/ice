#!/usr/bin/env node

'use strict';

const program = require('commander');
const checkSass = require('../lib/utils/check-sass');

program.on('--help', () => {
  console.log('todo 帮助信息');
});

program
  .option('-p, --port <port>', 'server port')
  .option('-h, --host <host>', 'server host')
  .option('-s, --skip-install', 'skip install dependencies')
  .parse(process.argv);

const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');

const DEFAULT_PORT = program.port || process.env.PORT || 3333;
const HOST = program.host || process.env.HOST || '0.0.0.0';

checkSass()
  .then(() => {
    return choosePort(HOST, parseInt(DEFAULT_PORT, 10));
  })
  .then((port) => {
    const dev = require('../lib/dev');
    if (port == null) {
      // We have not found a port.
      process.exit(500);
    }
    dev(
      Object.assign({}, program, {
        port: parseInt(port, 10),
        host: HOST,
        devType: 'project',
      })
    );
  })
  .catch((err) => {
    console.log(err);
    console.error('ice-scripts exited unexpectedly.');
    process.exit(1);
  });
