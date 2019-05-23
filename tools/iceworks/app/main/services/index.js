const templateBuilderUtils = require('@icedesign/template-builder/utils/');
const pty = require('node-pty');
const glodlog = require('../glodlog');
const scaffolder = require('../scaffolder');
const shared = require('../shared');
const paths = require('../paths');
const editors = require('./editors');
const folder = require('./folder');
const interaction = require('./interaction');
const npm = require('./npm');
const sessions = require('./sessions');
const settings = require('./settings');
const shells = require('./shells');
const storage = require('./storage');
const worker = require('./worker');
const customBlocks = require('./customBlocks');
const alioss = require('./alioss');


module.exports = {
  glodlog,
  editors,
  folder,
  interaction,
  templateBuilderUtils,
  npm,
  scaffolder,
  sessions,
  settings,
  shared,
  shells,
  storage,
  worker,
  pty,
  customBlocks,
  alioss,
  paths,
};
