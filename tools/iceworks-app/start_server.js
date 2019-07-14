#!/usr/bin/env node
const detectPort = require('detect-port');
const mv = require('midway');
const path = require('path');
const baseDir = path.join(__dirname, 'server');
let setPort = '7001';
setPort = detectPort(setPort);
mv.startCluster({ sticky: true, baseDir, port: setPort, workers: 1, typescript:true});
