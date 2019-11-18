import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as userHome from 'user-home';

// Note: why not use `import`
// ref: https://github.com/sindresorhus/conf
const Conf = require('conf');

const confPath = path.join(userHome, '.iceworks');

if (!fs.existsSync(confPath)) {
  mkdirp(confPath);
}

const schema = {
  lastDate3: {
    type: 'string',
    default: '',
  },
  workFolder: {
    type: 'string',
    default: userHome,
  },
  user: {
    type: 'object',
    default: {
      workId: '',
      name: '',
      avatarUrl:
        'https://img.alicdn.com/tfs/TB1hjBJXLxj_uVjSZFqXXaboFXa-147-150.jpg',
      isLogin: false,
    },
  },
  project: {
    type: 'string',
    default: '',
  },
  projects: {
    type: 'array',
    default: [],
  },
  editor: {
    type: 'string',
    default: 'code',
  },
  locale: {
    type: 'string',
    default: 'zh-CN',
  },
  theme: {
    type: 'string',
    default: '@alifd/theme-iceworks-dark',
  },
  npmClient: {
    type: 'string',
    default: '',
  },
  registry: {
    type: 'string',
    default: 'https://registry.npm.taobao.org',
  },
  material: {
    type: 'array',
    default: [
      {
        official: true,
        name: '飞冰物料',
        type: 'react',
        source: 'http://ice.alicdn.com/assets/materials/react-materials.json',
      },
      {
        official: true,
        name: 'Vue 物料',
        type: 'vue',
        source: 'http://ice.alicdn.com/assets/materials/vue-materials.json',
      },
      {
        official: true,
        name: 'Cra 物料',
        type: 'cra',
        source: 'http://iceworks.oss-cn-hangzhou.aliyuncs.com/assets/cra-materials.json',
      },
    ],
  },
  oss: {
    type: 'array',
    default: [],
  },
  panelSettings: {
    type: 'array',
    default: [],
  },
};

export { schema };

export default new Conf({
  schema,
  configName: 'db',
  cwd: confPath,
});
