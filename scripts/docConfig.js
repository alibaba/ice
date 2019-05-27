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
    versions: [{
      version: '0.x',
      dir: 'cli',
    }, {
      version: '1.x',
      dir: 'materials',
      current: true,
    }],
  },
  cli: {
    // ice-scripts
    title: {},
    versions: [{
      version: '0.x',
      dir: 'cli',
      current: true,
    }, {
      version: '1.x',
      dir: 'materials',
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
