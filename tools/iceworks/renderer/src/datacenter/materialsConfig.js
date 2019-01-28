const RECOMMEND_MATERIALS = [
  {
    key: 'ice',
    name: '飞冰物料源',
    homepage: 'https://alibaba.github.io/ice/',
    checked: false,
    builtIn: true,
    logo: 'https://img.alicdn.com/tfs/TB1JbQWoQUmBKNjSZFOXXab2XXa-242-134.png',
    description:
      '基于 ICE Design 设计语言，专业视觉设计，每周物料更新，丰富组合区块，不同领域模板',
    source: 'https://ice.alicdn.com/assets/react-materials.json',
    tags: ['官方', 'React', 'ICE'],
    type: 'react',
  },
  {
    key: 'rax',
    name: '小程序物料源',
    homepage: 'https://developer.taobao.com/',
    checked: false,
    builtIn: true,
    logo: 'https://img.alicdn.com/tfs/TB1_rYRvOAnBKNjSZFvXXaTKXXa-1120-960.png',
    description: '基于 Rax 的小程序应用的物料源集合',
    source: 'https://ice.alicdn.com/assets/rax-materials.json',
    tags: ['官方', 'Rax', 'Miniapp'],
    type: 'rax',
  },
  {
    key: 'vue',
    name: 'Vue 物料源',
    checked: false,
    builtIn: true,
    logo: 'https://img.alicdn.com/tfs/TB1JCw6oQ7mBKNjSZFyXXbydFXa-400-400.png',
    description:
      '飞冰官方和 Vue 社区贡献者共建的物料源，基于 Element UI 组件库',
    source: 'http://ice.alicdn.com/assets/vue-materials.json',
    tags: ['推荐', 'Vue', 'Element UI'],
    type: 'vue',
  },
  {
    key: 'angular',
    name: 'Angular 物料源',
    checked: false,
    builtIn: true,
    logo:
      'https://img.alicdn.com/tfs/TB1bJ3goOMnBKNjSZFoXXbOSFXa-1360-1360.png',
    description:
      '飞冰官方和 Angular 社区贡献者共建的物料源，基于 Material UI 组件库',
    source: 'https://ice.alicdn.com/assets/angular-materials.json',
    tags: ['推荐', 'Angular', 'Material UI'],
    type: 'angular',
  }
];

const BLOCK_GROUPS_MATERIALS = {
  source: 'https://ice.alicdn.com/assets/block-group.json'
}

export {
  RECOMMEND_MATERIALS,
  BLOCK_GROUPS_MATERIALS
};
