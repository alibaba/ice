module.exports = {
  title: '飞冰',
  logo: {
    alt: '飞冰（ICE）',
    src: 'img/logo.png',
  },
  items: [
    {
      type: 'search',
      position: 'right',
    },
    {
      to: '/docs/guide/about',
      position: 'right',
      label: '指南',
    },
    {
      position: 'right',
      label: '插件',
      to: '/docs/plugin/develop/start',
    },
    {
      position: 'right',
      label: '示例',
      to: '/docs/examples/antd',
    },
    {
      label: '生态',
      position: 'right',
      items: [
        {
          label: '微前端 icestark',
          to: 'http://micro-frontends.ice.work/',
        },
        {
          label: '可视化工具 AppWorks',
          to: 'https://appworks.site/',
        },
        {
          label: '自定义物料开发',
          to: 'https://appworks.site/materials/about.html',
        },
        {
          label: '前端环境 AppToolkit',
          to: 'https://github.com/appworks-lab/toolkit#readme',
        },
      ],
    },
    {
      label: '资源',
      position: 'right',
      items: [
        {
          to: 'https://fusion.design/pc/doc/component/102',
          label: 'fusion 组件',
        },
        {
          to: 'https://ant.design',
          label: 'antd 组件',
        },
        {
          to: 'https://iceteam.gitee.io',
          label: '国内镜像站点',
        },
        {
          label: '社区钉钉群',
          to: 'https://iceworks.oss-cn-hangzhou.aliyuncs.com/assets/images/ice-group.png',
        },
        {
          label: '阿里内部钉钉群',
          to: 'https://iceworks.oss-cn-hangzhou.aliyuncs.com/assets/images/ice-group-inside.JPG',
        },
      ],
    },
    {
      href: 'https://github.com/alibaba/ice',
      label: 'GitHub',
      position: 'right',
    },
  ],
};