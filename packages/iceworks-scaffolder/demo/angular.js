const IceworksScaffolder = require('../src/');

const config = {
  name: 'hello',
  layout: {
    customLayout: true,
    description: '用户自定义布局 - blank-layout',
    name: 'blank-layout',
    screenshot:
      'https://gw.alicdn.com/tfs/TB1Qby8ex9YBuNjy0FfXXXIsVXa-976-974.png',
    title: 'blank-layout',
  },
  blocks: [
    {
      name: 'card-list',
      className: 'card-list',
      title: '产品能力介绍',
      source: {
        type: 'npm',
        npm: '@angular-materials/card-list',
        version: '1.0.0',
        sourceCodeDirectory: 'src/',
        registry: 'http://registry.npmjs.com',
      },
      dependencies: {},
      screenshot:
        'https://gw.alicdn.com/tfs/TB1T_OutDtYBeNjy1XdXXXXyVXa-2458-1186.png',
      categories: ['信息展示'],
      features: {},
      description: '产品能力介绍',
      repository: 'https://github.com/alibaba/ice',
      publishTime: '2018-05-24T16:32:10.692Z',
      updateTime: '2018-05-24T16:32:19.707Z',
    },
  ],
};

const scaffold = new IceworksScaffolder({
  cwd:
    '/Users/noyobo/iceworks-workspace/ngx-2',
});

scaffold
  .createPage(config)
  .then((result) => {
    console.log(result);
    return scaffold.appendRouter({
      path: '/hello',
      component: 'HelloComponent',
      module: 'HelloModule',
      pagePath: result.output.page,
    });
  })
  .then(() => {
    console.log('router 生成完成');
    return scaffold.appendMenu({
      name: 'Hello',
      path: '/hello',
    });
  })
  .then(() => {
    console.log('menu 生成完成');
  })
  .catch((e) => {
    console.log(e);
  });

// scaffold
//   .appendRouter({
//     path: '/hello',
//     component: 'HelloComponent',
//     module: 'HelloModule',
//     pagePath: './pages/hello'
//   })
//   .then(() => {})
//   .catch((e) => {
//     console.log(e);
//   });
