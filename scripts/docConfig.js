// 与目录对应，补全目录的顺序以及展示 title
const docCategories = {
  guide: {
    title: {},
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

  // 小程序
  miniprogram: {
    // 工作台模式
    title: {},
    children: [{
      title: {
        'zh-cn': '基础指南',
        'en-us': 'basic',
      },
      dir: 'basic',
    }]
  },

  // iceworks
  iceworks: {
    title: {},
    children: [
      {
        title: {
          'zh-cn': '使用指南',
          'en-us': 'Guide',
        },
        dir: 'guide',
      },
      {
        title: {
          'zh-cn': '附加说明',
          'en-us': 'More',
        },
        dir: 'more',
      },
      {
        title: {
          'zh-cn': 'VS Code 指南',
          'en-us': 'VS Code',
        },
        dir: 'vscode',
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
