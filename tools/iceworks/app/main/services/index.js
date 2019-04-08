const editors = require('./editors');
const folder = require('./folder');
const interaction = require('./interaction');
const glodlog = require('../glodlog');
const npm = require('./npm');
const nrm = require('./nrm');
const scaffolder = require('../scaffolder');
const sessions = require('./sessions');
const settings = require('./settings');
const shared = require('../shared');
const shells = require('./shells');
const storage = require('./storage');
const worker = require('./worker');
const templateBuilderUtils = require('@icedesign/template-builder/utils/');
const customBlocks = require('./customBlocks');
const alioss = require('./alioss');
const paths = require('../paths');

const pty = require('node-pty');

module.exports = {
  glodlog,
  editors,
  folder,
  interaction,
  templateBuilderUtils,
  npm,
  nrm,
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
