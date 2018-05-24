#!/usr/bin/env node

'use strict';

const program = require('commander');

const validationSassAvailable = require('../lib/utils/validationSassAvailable');

program
  .option('-p, --port <port>', 'server port')
  .option('-h, --host <host>', 'server host')
  .option('--https', 'server https')
  .option('-s, --skip-install', 'skip install dependencies')
  .parse(process.argv);

const detect = require('detect-port');
const inquirer = require('inquirer');

const isInteractive = process.stdout.isTTY;
const DEFAULT_PORT = program.port || process.env.PORT || 4444;
const HOST = program.host || process.env.HOST || '0.0.0.0';

const defaultPort = parseInt(DEFAULT_PORT, 10);

validationSassAvailable()
  .then(() => {
    return detect(defaultPort);
  })
  .then((newPort) => {
    return new Promise((resolve) => {
      if (newPort === defaultPort) {
        return resolve(newPort);
      }

      if (isInteractive) {
        const question = {
          type: 'confirm',
          name: 'shouldChangePort',
          message: `${defaultPort} 端口已被占用，是否使用 ${newPort} 端口启动？`,
          default: true,
        };
        inquirer.prompt(question).then((answer) => {
          if (answer.shouldChangePort) {
            resolve(newPort);
          } else {
            resolve(null);
          }
        });
      } else {
        resolve(null);
      }
    });
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
