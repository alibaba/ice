const { generatorLayout } = require('../utils');

const CONFIG = {
  name: 'BasicLayout',
  directory: __dirname,
  enableName: true,
  enableTheme: true,
  themeConfig: {
    theme: 'dark',
    primaryColor: 'red',
    secondaryColor: '#3080fe',
  },
  layout: 'fluid-layout',
  header: {
    position: 'static',
    width: 'full-width',
    enabled: true,
  },
  aside: {
    position: 'embed-fixed',
    mode: 'vertical',
    width: 200,
    collapsed: false,
    enabled: true,
  },
  footer: {
    position: 'fixed',
    width: 'full-width',
    enabled: true,
  },
};

generatorLayout(CONFIG)
  .then((res) => {
    console.log('生成布局成功:', res);
  })
  .catch((err) => {
    console.log('生成布局失败', err);
  });
