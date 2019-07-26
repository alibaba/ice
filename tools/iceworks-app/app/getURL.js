const is = require('electron-is');
const { resolve } = require('app-root-path');
const address = require('address');

const windowHost = is.dev()
  ? `http://${address.ip()}:4444`
  : `file://${resolve('public')}`;

module.exports = (name) => {
  return `${windowHost}/${name}.html`;
};