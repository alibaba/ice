#!/usr/bin/env node

const yargs = require('yargs');

yargs
  .command('serve [port]', 'start the server', (yargs) => {
    console.log(222);
  }, (argv) => {
    console.log(111);
  })
  .command('init [port]', 'start the server', (yargs) => {
    // console.log(222);
  }, (argv) => {
    console.log(333);
  })
  .help('help')
  .argv;

  // yargs.showHelp();
