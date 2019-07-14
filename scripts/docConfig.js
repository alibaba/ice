// 与目录对应，补全目录的顺序以及展示 title
const docCategories = {
  guide: {
    title: {},
    children: [{
      title: {
        'zh-cn': '开发',
        'en-us': 'development',
      },
      dir: 'dev',
    }, {
      title: {
        'zh-cn': '测试',
        'en-us': 'test',
      },
      dir: 'test',
    }, {
      title: {
        'zh-cn': '发布资源',
        'en-us': 'publish assets',
      },
      dir: 'publish',
    }, {
      title: {
        'zh-cn': '后端集成',
        'en-us': 'backend',
      },
      dir: 'backend',
    }, {
      title: {
        'zh-cn': '产品监控',
        'en-us': 'monitor',
      },
      dir: 'monitor',
    }, {
      title: {
        'zh-cn': '资源',
        'en-us': 'resource',
      },
      dir: 'resource',
    }],
  },
  iceworks: {
    // Iceworks
    title: {},
  },
  materials: {
    // 自定义物料
    title: {},
    children: [{
      title: {
        'zh-cn': '开发指南',
        'en-us': 'Guide',
      },
      dir: 'guide',
    }, {
      title: {
        'zh-cn': '物料模版',
        'en-us': 'Material template',
      },
      dir: 'template',
    }, {
      title: {
        'zh-cn': '参考',
        'en-us': 'Reference',
      },
      dir: 'reference',
    }],
  },
  'cli-1.x': {
    // ice-scripts 1.x
    title: {},
    currentVersion: '1.x',
    versions: [{
      value: '1.x',
      path: '/docs/cli-1.x/about',
    }, {
      value: '2.x',
      path: '/docs/cli/about',
    }],
    children: [{
      title: {
        'zh-cn': '基础指南',
        'en-us': 'basic',
      },
      dir: 'basic',
    }, {
      title: {
        'zh-cn': '进阶指南',
        'en-us': 'advanced',
      },
      dir: 'advanced',
    }, {
      title: {
        'zh-cn': '常见需求',
        'en-us': 'others',
      },
      dir: 'others',
    }],
  },
  cli: {
    // ice-scripts 2.x
    title: {},
    currentVersion: '2.x',
    versions: [{
      value: '1.x',
      path: '/docs/cli-1.x/about',
    }, {
      value: '2.x',
      path: '/docs/cli/about',
    }],
    children: [{
      title: {
        'zh-cn': '配置指南',
        'en-us': 'config',
      },
      dir: 'config',
    }, {
      title: {
        'zh-cn': '工程能力',
        'en-us': 'feature',
      },
      dir: 'feature',
    }, {
      title: {
        'zh-cn': '插件列表',
        'en-us': 'Plugins',
      },
      dir: 'plugin-list',
    }, {
      title: {
        'zh-cn': '插件开发',
        'en-us': 'Plguin dev',
      },
      dir: 'plugin-dev',
    }],
  },
  design: {
    // 中后台设计理念
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
};

module.exports = {
  docCategories,
};
