import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as userHome from 'user-home';

// Note: why not use `import`
// ref: https://github.com/sindresorhus/conf
const Conf = require('conf');
const conf_path = path.join(userHome, '.iceworks');

if (!fs.existsSync(conf_path)) {
  mkdirp(conf_path);
}

const schema = {
  workFolder: {
    type: 'string',
    default: userHome,
  },
  user: {
    type: 'object',
    default: {
      workId: '',
      name: '请登录',
      avatarUrl: 'https://img.alicdn.com/tfs/TB1hjBJXLxj_uVjSZFqXXaboFXa-147-150.jpg',
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
  material: {
    type: 'array',
    default: [
      {
        name: '飞冰物料',
        description: '基于 ICE Design 设计语言，专业视觉设计，每周物料更新，丰富组合区块，不同领域模板',
        homepage: 'https://alibaba.github.io/ice/',
        logo: 'https://img.alicdn.com/tfs/TB1JbQWoQUmBKNjSZFOXXab2XXa-242-134.png',
        source: 'https://ice.alicdn.com/assets/react-materials.json',
        tags: [
          '官方',
          'React',
          'ICE'
        ],
        official: true
      }
    ],
  },
  oss: {
    type: 'array',
    default: [],
  },
};

export default new Conf({
  schema,
  configName: 'db',
  cwd: conf_path,
});
