// 与目录对应，补全目录的顺序以及展示 title
const docCategories = {
  guide: {
    title: {},
    currentVersion: '1.x',
    versions: [{
      value: '1.x',
      path: '/docs/guide/about',
    }, {
      value: '0.x',
      path: '/docs/guide-0.x/about',
    }],
    children: [{
      title: {
        'zh-cn': '基础指南',
        'en-us': 'Basic Guide',
      },
      dir: 'basic',
    },
    {
      title: {
        'zh-cn': '进阶指南',
        'en-us': 'Advanced guide',
      },
      dir: 'advance',
    },
    {
      title: {
        'zh-cn': '插件开发',
        'en-us': 'Develop',
      },
      dir: 'develop',
    },
    {
      title: {
        'zh-cn': '资源',
        'en-us': 'resource',
      },
      dir: 'resource',
    }],
  },
  'guide-0.x': {
    title: {},
    currentVersion: '0.x',
    versions: [{
      value: '1.x',
      path: '/docs/guide/about',
    }, {
      value: '0.x',
      path: '/docs/guide-0.x/about',
    }],
    children: [
      {
        title: {
          'zh-cn': '开发',
          'en-us': 'development',
        },
        dir: 'dev',
      },
      {
        title: {
          'zh-cn': '发布与集成',
          'en-us': 'publish assets',
        },
        dir: 'publish',
      },
      {
        title: {
          'zh-cn': '工程构建',
          'en-us': 'builder',
        },
        dir: 'builder',
      },
      {
        title: {
          'zh-cn': '产品监控',
          'en-us': 'monitor',
        },
        dir: 'monitor',
      },
      {
        title: {
          'zh-cn': '资源',
          'en-us': 'resource',
        },
        dir: 'resource',
      },
    ],
  },

  // iceworks
  iceworks: {
    title: {},
    children: [
      {
        title: {
          'zh-cn': '项目管理',
          'en-us': 'Project management',
        },
        dir: 'project',
      },
      {
        title: {
          'zh-cn': '工程管理',
          'en-us': 'Engineering management',
        },
        dir: 'engineering',
      },
      {
        title: {
          'zh-cn': '物料市场',
          'en-us': 'Materials market',
        },
        dir: 'material',
      },
      {
        title: {
          'zh-cn': '进阶指南',
          'en-us': 'Advanced guide',
        },
        dir: 'advanced',
      },
      {
        title: {
          'zh-cn': '贡献指南',
          'en-us': 'Contributing',
        },
        dir: 'contributing',
      },
    ],
  },

  // 自定义物料
  materials: {
    title: {},
    children: [
      {
        title: {
          'zh-cn': '开发指南',
          'en-us': 'Guide',
        },
        dir: 'guide',
      },
      {
        title: {
          'zh-cn': '物料模版',
          'en-us': 'Material template',
        },
        dir: 'template',
      },
      {
        title: {
          'zh-cn': '参考',
          'en-us': 'Reference',
        },
        dir: 'reference',
      },
    ],
  },

  // ice-scripts 1.x
  'cli-1.x': {
    title: {},
    currentVersion: '1.x',
    versions: [{
      value: '1.x',
      path: '/docs/cli-1.x/about',
    }, {
      value: '2.x',
      path: '/docs/cli/about',
    }],
    children: [
      {
        title: {
          'zh-cn': '基础指南',
          'en-us': 'basic',
        },
        dir: 'basic',
      },
      {
        title: {
          'zh-cn': '进阶指南',
          'en-us': 'advanced',
        },
        dir: 'advanced',
      },
      {
        title: {
          'zh-cn': '常见需求',
          'en-us': 'others',
        },
        dir: 'others',
      },
    ],
  },

  // ice-scripts 2.x
  cli: {
    title: {},
    currentVersion: '2.x',
    versions: [
      {
        value: '1.x',
        path: '/docs/cli-1.x/about',
      },
      {
        value: '2.x',
        path: '/docs/cli/about',
      },
    ],
    children: [
      {
        title: {
          'zh-cn': '配置指南',
          'en-us': 'config',
        },
        dir: 'config',
      },
      {
        title: {
          'zh-cn': '工程能力',
          'en-us': 'feature',
        },
        dir: 'feature',
      },
      {
        title: {
          'zh-cn': '插件列表',
          'en-us': 'Plugins',
        },
        dir: 'plugin-list',
      },
      {
        title: {
          'zh-cn': '插件开发',
          'en-us': 'Plguin dev',
        },
        dir: 'plugin-dev',
      },
    ],
  },

  // 中后台设计理念
  design: {
    title: {},
    children: [
      {
        title: {
          'zh-cn': '视觉',
          'en-us': 'vision',
        },
        dir: 'vision',
      },
      {
        title: {
          'zh-cn': '设计模式',
          'en-us': 'mode',
        },
        dir: 'mode',
      },
    ],
  },

  // icestark
  icestark: {
    // 工作台模式
    title: {},
    children: [{
      title: {
        'zh-cn': '指南',
        'en-us': 'guide',
      },
      dir: 'guide',
    }, {
      title: {
        'zh-cn': '参考',
        'en-us': 'Reference',
      },
      dir: 'reference',
    }],
  },
  icestore: {
    // icestore
    title: {},
    children: [{
      title: {
        'zh-cn': '指南',
        'en-us': 'guide',
      },
      dir: 'guide',
    }, {
      title: {
        'zh-cn': '参考',
        'en-us': 'Reference',
      },
      dir: 'reference',
    }],
  },
};

module.exports = {
  docCategories,
};
