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
};

module.exports = {
  docCategories,
};
