const mv = require('midway');
const path = require('path');

const baseDir = path.join(process.cwd(), 'node_modules/iceworks-server');
mv.startCluster({ sticky: true, baseDir });