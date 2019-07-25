const is = require('electron-is');
const { resolve } = require('app-root-path');

const windowHost = is.dev()
  ? `http://localhost:4444`
  : `file://${resolve('public')}`;

module.exports = (name) => {
  return `${windowHost}/${name}.html`;
};