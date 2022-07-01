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
    // {
    //   position: 'right',
    //   label: '示例',
    //   to: '/docs/examples/tailwind',
    // },
    {
      position: 'right',
      label: '博客',
      to: '/blog',
    },
    {
      label: '生态',
      position: 'right',
      items: [
        {
          label: '微前端 ICESTARK',
          to: 'http://micro-frontends.ice.work/',
        },
        {
          label: '包开发 ICE PKG',
          to: 'https://pkg.ice.work/',
        },
        {
          label: '可视化工具 AppWorks',
          to: 'https://appworks.site/',
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
          label: 'Fusion 组件',
        },
        {
          to: 'https://ant.design',
          label: 'Antd 组件',
        },
        {
          to: 'https://iceteam.gitee.io',
          label: '国内镜像站点',
        },
        {
          label: '社区钉钉群',
          to: 'https://iceworks.oss-cn-hangzhou.aliyuncs.com/assets/images/ice-group.png',
        },
      ],
    },
    {
      href: 'https://github.com/ice-lab/ice-next',
      label: 'GitHub',
      position: 'right',
    },
  ],
};
