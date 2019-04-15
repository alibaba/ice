const path = require('path');
const del = require('del');

const IceworksScaffolder = require('../src/');

const config = {
  name: 'Hello',
  layout: {
    name: 'blank-layout',
    title: '空白布局',
    source: {
      type: 'npm',
      npm: '@icedesign/blank-layout',
      version: '0.1.5',
      sourceCodeDirectory: 'src/',
      registry: 'http://registry.npmjs.com',
    },
    dependencies: {
      '@icedesign/layout': '^0.1.1',
      classnames: '^2.2.5',
      'prop-types': '^15.5.8',
    },
    screenshot:
      'https://img.alicdn.com/tfs/TB1T65abVOWBuNjy0FiXXXFxVXa-2840-1596.png',
    categories: ['布局'],
    features: {
      useComponents: [
        {
          basePackage: '@icedesign/layout',
          className: 'Layout',
        },
      ],
    },
    description:
      '完全空白的布局，通常用来做首页、产品介绍或者登陆页面。推荐使用登陆页分类下的区块。',
    thumbnail:
      'https://gw.alicdn.com/tfs/TB1SvQmlsLJ8KJjy0FnXXcFDpXa-976-974.png',
    repository: 'https://github.com/alibaba/ice',
    publishTime: '2018-02-06T09:24:12.391Z',
    updateTime: '2018-03-05T13:40:36.355Z',
  },
  blocks: [
    {
      name: 'ability-introduction',
      className: 'AbilityIntroduction',
      title: '产品能力介绍',
      source: {
        type: 'npm',
        npm: '@react-materials/ability-introduction-block',
        version: '0.1.0',
        sourceCodeDirectory: 'src/',
        registry: 'http://registry.npmjs.com',
      },
      dependencies: {
        '@icedesign/base': '^0.2.1',
        'prop-types': '^15.5.8',
        react: '^16.2.0',
      },
      screenshot:
        'https://gw.alicdn.com/tfs/TB1T_OutDtYBeNjy1XdXXXXyVXa-2458-1186.png',
      categories: ['信息展示'],
      features: {
        useComponents: [
          {
            basePackage: '@icedesign/base',
            className: 'Grid',
          },
        ],
      },
      description: '产品能力介绍',
      repository: 'https://github.com/alibaba/ice',
      publishTime: '2018-05-24T16:32:10.692Z',
      updateTime: '2018-05-24T16:32:19.707Z',
    },
    {
      name: 'application-progress',
      title: '申请进度信息展示',
      source: {
        type: 'npm',
        npm: '@icedesign/application-progress-block',
        version: '0.1.5',
        sourceCodeDirectory: 'src/',
        registry: 'http://registry.npmjs.com',
      },
      dependencies: {
        '@icedesign/base': '^0.2.0',
        '@icedesign/container': '^0.1.0',
        'enquire-js': '^0.1.2',
        'prop-types': '^15.5.8',
      },
      screenshot:
        'https://img.alicdn.com/tfs/TB1I67ih3vD8KJjy0FlXXagBFXa-947-929.png',
      categories: ['信息展示'],
      features: {
        useComponents: [
          {
            basePackage: '@icedesign/container',
            className: 'Container',
          },
          {
            basePackage: '@icedesign/base',
            className: 'Button',
          },
          {
            basePackage: '@icedesign/base',
            className: 'Step',
          },
          {
            basePackage: '@icedesign/base',
            className: 'Grid',
          },
          {
            basePackage: '@icedesign/base',
            className: 'Icon',
          },
        ],
      },
      description: '申请进度信息展示',
      repository: 'https://github.com/alibaba/ice',
      publishTime: '2018-01-02T12:20:33.619Z',
      updateTime: '2018-03-13T14:53:03.774Z',
    },
  ],
};

jest.setTimeout(60000);

describe('创建页面', () => {
  test('创建普通页面', () => {
    const cwd = path.join(__dirname, './features/default');
    const scaffold = new IceworksScaffolder({ cwd });
    return del([
      path.join(cwd, 'src', 'pages'),
      path.join(cwd, 'src', 'layouts'),
      path.join(cwd, 'mock'),
    ])
      .then(() => {
        return scaffold.createPage(config);
      })
      .then((result) => {
        const output = {
          dependencies: {
            '@icedesign/base': '^0.2.0',
            '@icedesign/container': '^0.1.0',
            '@icedesign/layout': '^0.1.1',
            classnames: '^2.2.5',
            'enquire-js': '^0.1.2',
            'prop-types': '^15.5.8',
            react: '^16.2.0',
          },
          files: [
            path.join(cwd, 'src/pages/Hello/Hello.jsx'),
            path.join(cwd, 'src/pages/Hello/index.js'),
            path.join(cwd, 'src/pages/Hello/index.scss'),
            path.join(cwd, 'mock/blank-layout.json'),
            path.join(cwd, 'src/layouts/BlankLayout/index.js'),
            path.join(cwd, 'src/layouts/BlankLayout/Layout.jsx'),
            path.join(cwd, 'src/layouts/BlankLayout/Layout.scss'),
            path.join(
              cwd,
              'src/pages/Hello/components/AbilityIntroduction/AbilityIntroduction.jsx'
            ),
            path.join(
              cwd,
              'src/pages/Hello/components/AbilityIntroduction/index.js'
            ),
            path.join(
              cwd,
              'src/pages/Hello/components/ApplicationProgress/ApplicationProgress.jsx'
            ),
            path.join(
              cwd,
              'src/pages/Hello/components/ApplicationProgress/index.js'
            ),
          ],
          output: {
            layout: './layouts/BlankLayout',
            page: './pages/Hello',
          },
        };
        expect(result).toEqual(output);
      })
      .catch((error) => {
        throw error;
      });
  });

  // test('创建 menu', () => {
  //   const cwd = path.join(__dirname, './features/menu');
  //   const scaffold = new IceworksScaffolder({ cwd });
  //   return del([
  //     path.join(cwd, 'src', 'pages'),
  //     path.join(cwd, 'src', 'layouts'),
  //     path.join(cwd, 'mock'),
  //   ])
  //     .then(() => {
  //       return scaffold.appendMenu({
  //         name: 'nav12',
  //         path: '/hello/',
  //         icon: 'home',
  //       });
  //     })
  //     .then((result) => {})
  //     .catch((error) => {
  //       throw error;
  //     });
  // });
});
/*



*/
