#!/usr/bin/env node
const mv = require('midway');
const path = require('path');
const detectPort = require('detect-port');

const baseDir = path.join(process.cwd(), 'server');
let setPort = '7001';
setPort = detectPort(setPort);
mv.startCluster({ sticky: true, baseDir, port: setPort });
