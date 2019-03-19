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
    key: 'ice',
    name: '飞冰物料源',
    homepage: 'https://alibaba.github.io/ice/',
    checked: true,
    builtIn: true,
    logo: 'https://img.alicdn.com/tfs/TB1JbQWoQUmBKNjSZFOXXab2XXa-242-134.png',
    description:
      '基于 ICE Design 设计语言，专业视觉设计，每周物料更新，丰富组合区块，不同领域模板',
    source: 'https://ice.alicdn.com/assets/react-materials.json',
    backupSource: 'https://cdn.jsdelivr.net/npm/@icedesign/materails-db@latest/lib/react-materials.json',
    tags: ['官方', 'React', 'ICE'],
    type: 'react',
  },
  {
    key: 'rax',
    name: '小程序物料源',
    homepage: 'https://developer.taobao.com/',
    checked: true,
    builtIn: true,
    logo: 'https://img.alicdn.com/tfs/TB1_rYRvOAnBKNjSZFvXXaTKXXa-1120-960.png',
    description: '基于 Rax 的小程序应用的物料源集合',
    source: 'https://ice.alicdn.com/assets/rax-materials.json',
    backupSource: 'https://cdn.jsdelivr.net/npm/@icedesign/materails-db@latest/lib/rax-materials.json',
    tags: ['官方', 'Rax', 'Miniapp'],
    type: 'rax',
  },
  {
    key: 'vue',
    name: 'Vue 物料源',
    checked: true,
    builtIn: true,
    logo: 'https://img.alicdn.com/tfs/TB1JCw6oQ7mBKNjSZFyXXbydFXa-400-400.png',
    description:
      '飞冰官方和 Vue 社区贡献者共建的物料源，基于 Element UI 组件库',
    source: 'http://ice.alicdn.com/assets/vue-materials.json',
    backupSource: 'https://cdn.jsdelivr.net/npm/@icedesign/materails-db@latest/lib/vue-materials.json',
    tags: ['推荐', 'Vue', 'Element UI'],
    type: 'vue',
  },
  {
    key: 'angular',
    name: 'Angular 物料源',
    checked: true,
    builtIn: true,
    logo:
      'https://img.alicdn.com/tfs/TB1bJ3goOMnBKNjSZFoXXbOSFXa-1360-1360.png',
    description:
      '飞冰官方和 Angular 社区贡献者共建的物料源，基于 Material UI 组件库',
    source: 'https://ice.alicdn.com/assets/angular-materials.json',
    backupSource: 'https://cdn.jsdelivr.net/npm/@icedesign/materails-db@latest/lib/angular-materials.json',
    tags: ['推荐', 'Angular', 'Material UI'],
    type: 'angular',
  }
];
exports.defaultMaterials = defaultMaterials;

const iceBaseMaterials = [
  {
    name: '飞冰基础组件物料源 base',
    source: 'https://ice.alicdn.com/assets/base-components.json',
  },
  {
    name: '飞冰基础组件物料源 next',
    source: 'https://ice.alicdn.com/assets/base-components-1.x.json',
  },
];
exports.iceBaseMaterials = iceBaseMaterials;

const blockGroupsMaterials = {
  source: 'https://ice.alicdn.com/assets/block-group.json',
};
exports.blockGroupsMaterials = blockGroupsMaterials;
