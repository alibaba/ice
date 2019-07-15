const StartCommand = require('egg-scripts').StartCommand;
const detectPort = require('detect-port');
const path = require("path");

const baseDir = path.join(__dirname, '../');
let setPort = '7001';
setPort = detectPort(setPort);
const sc = new StartCommand([baseDir, '--title=egg-server-iceworks-server', 
    '--framework=midway', '--port=' + setPort, '--workers=1']);
sc.start();