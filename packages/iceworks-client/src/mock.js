// TODO delete it when use material to create page and project

export default {
  layout: {
    name: 'BasicLayout',
    title: 'BasicLayout',
    description: '用户自定义布局 - BasicLayout',
    customLayout: true,
    localization: true,
    folderName: 'BasicLayout',
    screenshot: 'https://gw.alicdn.com/tfs/TB1Qby8ex9YBuNjy0FfXXXIsVXa-976-974.png',
    thumbnail: 'https://gw.alicdn.com/tfs/TB1Qby8ex9YBuNjy0FfXXXIsVXa-976-974.png',
  },
  blocks: [
    {
      name: 'excellent-home-page',
      title: '简洁大气首页',
      description: '简洁大气首页',
      homepage: 'https://unpkg.com/@icedesign/excellent-home-page-block/build/index.html',
      categories: [
        '欢迎页',
      ],
      repository: 'https://github.com/ice-lab/react-materials/tree/master/blocks/ExcellentHomePage',
      source: {
        type: 'npm',
        npm: '@icedesign/excellent-home-page-block',
        version: '1.0.0',
        registry: 'http://registry.npmjs.com',
        'version-0.x': '2.0.0',
        sourceCodeDirectory: 'src/',
      },
      dependencies: {
        'prop-types': '^15.5.8',
        react: '^16.2.0',
        '@alifd/next': '^1.x',
      },
      screenshot: 'https://unpkg.com/@icedesign/excellent-home-page-block/screenshot.png',
      screenshots: [
        'https://unpkg.com/@icedesign/excellent-home-page-block/screenshot.png',
      ],
      customConfig: null,
      features: {
        useComponents: [
          {
            basePackage: '@alifd/next',
            className: 'Button',
          },
        ],
      },
      publishTime: '2018-12-13T09:07:38.022Z',
      updateTime: '2019-04-26T13:54:41.243Z',
      _isNew: true,
      uid: 'd7eba710-7ae7-11e9-b51c-6b6abc08871d',
      alias: 'ExcellentHomePage',
    },
    {
      name: 'data-overview',
      title: '数据概览',
      description: '基础数据概览',
      homepage: 'https://unpkg.com/@icedesign/data-overview-block/build/index.html',
      categories: [
        '信息展示',
      ],
      repository: 'https://github.com/ice-lab/react-materials/tree/master/blocks/DataOverview',
      source: {
        type: 'npm',
        npm: '@icedesign/data-overview-block',
        version: '1.0.0',
        registry: 'http://registry.npmjs.com',
        'version-0.x': '2.0.0',
        sourceCodeDirectory: 'src/',
      },
      dependencies: {
        '@icedesign/container': '^1.x',
        'prop-types': '^15.5.8',
        react: '^16.2.0',
      },
      screenshot: 'https://unpkg.com/@icedesign/data-overview-block/screenshot.png',
      screenshots: [
        'https://unpkg.com/@icedesign/data-overview-block/screenshot.png',
      ],
      customConfig: null,
      features: {
        useComponents: [
          {
            basePackage: '@icedesign/container',
            className: 'Container',
          },
        ],
      },
      publishTime: '2018-12-13T09:03:35.646Z',
      updateTime: '2019-04-26T13:54:16.266Z',
      _isNew: true,
      uid: 'da3792e0-7ae7-11e9-b51c-6b6abc08871d',
      alias: 'DataOverview',
    },
  ],
  scaffold: {
    name: 'create-react-app',
    title: 'Create React App',
    source: {
      type: 'npm',
      npm: '@icedesign/scaffold-create-react-app',
      version: '2.0.1',
      registry: 'http://registry.npmjs.com',
    },
    builder: '',
    dependencies: {
      '@alifd/next': '^1.x',
      '@icedesign/theme': '^1.x',
      moment: '^2.23.0',
      react: '^16.2.0',
      'react-dom': '^16.2.0',
    },
    devDependencies: {
      'babel-plugin-import': '^1.6.7',
      'ice-skin-loader': '^0.1.1',
      'node-sass': '^4.7.2',
      'react-app-rewired': '^1.5.0',
      'react-scripts': '1.1.1',
      'sass-loader': '^6.0.7',
      'webpack-plugin-import': '^0.1.2',
    },
    screenshot: 'https://img.alicdn.com/tfs/TB1zu_AeCBYBeNjy0FeXXbnmFXa-1920-1080.png',
    screenshots: [
      'https://img.alicdn.com/tfs/TB1zu_AeCBYBeNjy0FeXXbnmFXa-1920-1080.png',
    ],
    categories: [
      '基础模板',
    ],
    features: {},
    homepage: 'https://alibaba.github.io/ice/scaffold-preview/create-react-app.html',
    description: '该模板基于 create-react-app 创建，使用 react-app-rewired 进行自定义配置，支持按需引入 ICE 基础组件，添加区块，主要适用于 0 到 1 开始搭建项目',
    publishTime: '2018-02-24T04:38:50.125Z',
    updateTime: '2019-01-24T17:11:34.711Z',
  },
};
