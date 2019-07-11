const mv = require('midway');
const path = require('path');
const detectPort = require('detect-port');

const baseDir = path.join(process.cwd(), 'node_modules/iceworks-server');
let setPort = '7001';
setPort = await detectPort(setPort);
mv.startCluster({ sticky: true, baseDir, port: setPort });
