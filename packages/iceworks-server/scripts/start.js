const StartCommand = require('egg-scripts').StartCommand;
const path = require("path");

const baseDir = path.join(__dirname, '../');
const sc = new StartCommand([baseDir, '--title=egg-server-iceworks-server', 
  '--framework=midway',  '--workers=1']);
sc.start();
