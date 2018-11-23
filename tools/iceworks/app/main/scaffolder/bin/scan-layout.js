#!/usr/bin/env node
const scanLayout = require('../lib/scanLayout');
const path = require('path');
const cwd = process.cwd();
const destDir = path.join(cwd, process.argv[3] || '');
const inquirer = require('inquirer');
const spawnSync = require('child_process').spawnSync;
console.log('CREATE ICE APP: scanLayout');

scanLayout({
  destDir,
}).then((layouts) => {
  console.log('result', layouts);
});
