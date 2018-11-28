const is = require('electron-is');
const { resolve } = require('app-root-path');
const address = require('address');
const env = require('./env');

exports.env = env;

exports.isDev = is.dev();
exports.isProd = is.production();
exports.isMac = is.osx();
exports.isWin = is.windows();
exports.isLinux = is.linux();

exports.defToken = is.dev()
  ? 'f87bf958ad0ecb310b86b1536746b5209799902b1f556850f1a29f26a2375f28'
  : '72d7d45ac4495e9fb0047a96579a9af886e5c869f8ae148b68957c543d49ada1';
exports.defEnv = is.dev() ? 'daily' : 'prod';

const windowHost = is.dev()
  ? `http://${address.ip()}:7001`
  : `file://${resolve('renderer')}`;
// renderer 服务器路径
exports.rendererHost = windowHost;

exports.windowURL = (name) => {
  return `${windowHost}/${name}.html`;
};

const registries = [
  {
    name: 'npm',
    value: 'https://registry.npmjs.com',
    label: 'npm - https://registry.npmjs.com',
  },
  {
    name: 'cnpm',
    value: 'https://registry.npm.taobao.org',
    label: 'cnpm - https://registry.npm.taobao.org',
  },
  {
    name: 'tnpm',
    value: 'http://registry.npm.alibaba-inc.com',
    label: 'tnpm - http://registry.npm.alibaba-inc.com',
  },
];
exports.registries = registries;

const defaultMaterials = [
  {
    name: '飞冰物料源',
    source: 'https://ice.alicdn.com/assets/react-materials.json',
    builtIn: true,
    type: 'react',
  },
  {
    name: '小程序物料源',
    source: 'https://ice.alicdn.com/assets/rax-materials.json',
    builtIn: true,
    type: 'rax',
  },
  {
    name: 'Vue 物料源',
    source: 'http://ice.alicdn.com/assets/vue-materials.json',
    builtIn: true,
    type: 'vue',
  },
  {
    name: 'Angular 物料源',
    source: 'https://ice.alicdn.com/assets/angular-materials.json',
    builtIn: true,
    type: 'angular',
  },
];
exports.defaultMaterials = defaultMaterials;
