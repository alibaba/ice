// TODO delete it after use material to create page and project

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
    name: 'ice-design-lite',
    title: 'ICE Design Lite',
    source: {
      type: 'npm',
      npm: '@icedesign/lite-scaffold',
      version: '2.0.2',
      registry: 'http://registry.npmjs.org',
    },
    builder: 'ice-scripts',
    dependencies: {
      '@alifd/next': '^1.x',
      '@icedesign/container': '^1.x',
      '@icedesign/img': '^1.x',
      '@icedesign/layout': '^1.x',
      '@icedesign/theme': '^1.x',
      axios: '^0.17.1',
      bizcharts: 'latest',
      classnames: '^2.2.5',
      'enquire-js': '^0.1.2',
      moment: '^2.23.0',
      'prop-types': '^15.5.8',
      react: '^16.4.1',
      'react-document-title': '^2.0.3',
      'react-dom': '^16.4.1',
      'react-router-dom': '^4.2.2',
    },
    devDependencies: {
      'babel-eslint': '^8.0.3',
      eslint: '^4.13.1',
      'eslint-config-airbnb': '^16.1.0',
      'eslint-plugin-babel': '^4.1.1',
      'eslint-plugin-import': '^2.8.0',
      'eslint-plugin-jsx-a11y': '^6.0.3',
      'eslint-plugin-react': '^7.5.1',
      'ice-scripts': '^1.6.0-next.3',
    },
    screenshot: 'https://img.alicdn.com/tfs/TB1CjPVw4naK1RjSZFBXXcW7VXa-2872-1580.png',
    screenshots: [
      'https://img.alicdn.com/tfs/TB1CjPVw4naK1RjSZFBXXcW7VXa-2872-1580.png',
    ],
    categories: [
      '基础模板',
    ],
    features: {},
    homepage: 'https://unpkg.com/@icedesign/lite-scaffold@latest/build/index.html',
    description: '该模板适用于从 0 到 1 开始搭建项目，内置基础的页面，路由和菜单展示',
    publishTime: '2018-05-04T08:55:11.945Z',
    updateTime: '2019-03-20T01:53:29.111Z',
  },
};
