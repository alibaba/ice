#!/usr/bin/env node
const path = require('path');
const detectPort = require('detect-port');
const StartCommand = require('egg-scripts').StartCommand;
const baseDir = path.join(process.cwd(), 'server');
let setPort = '7001';
setPort = detectPort(setPort);
let start = new StartCommand([baseDir, '--sticky=true', '--framework=midway',
 'port = ' + setPort]);
start.start();
