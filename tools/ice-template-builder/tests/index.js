const { generateTemplate } = require('../utils');

const CONFIG = {
  // 模板名称
  name: 'app',

  // 模板类型: 默认为 redux (可以扩展支持 mobx)
  type: 'redux',

  // 下载到指定的目录
  directory: `${__dirname}/app`,

  // 是否启用自定义模板名称
  enableName: true,

  // 是否启用主题
  enableTheme: true,

  // 布局方式: fluid-layout、boxed-layout
  layout: 'boxed-layout',

  // 主题配置
  themeConfig: {
    theme: 'dark',
    primaryColor: 'red',
    secondaryColor: '#3080fe',
  },

  // 是否启用 Header
  header: {
    position: 'static',
    width: 'full-width',
    enabled: true,
  },

  // 是否启用 Aside
  aside: {
    position: 'embed-fixed',
    mode: 'vertical',
    width: 200,
    collapsed: false,
    enabled: true,
  },

  // 是否启用 Footer
  footer: {
    position: 'fixed',
    width: 'full-width',
    enabled: true,
  },

  // Redux 配置
  redux: {
    enabled: true, // 生成基础的 redux 配置文件，默认会同步路由信息到 redux store
    mockModule: true, // 生成简单的 Mock 示例代码
    authorityModule: true, // 生成权限管理的示例代码
    registerLoginModule: true, // 生成注册登录的示例代码
  },

  // Mobx 配置
  mobx: {},
};

generateTemplate(CONFIG)
  .then((res) => {
    console.log('生成成功：', res);
  })
  .catch((err) => {
    console.log('生成失败：', err);
  });
