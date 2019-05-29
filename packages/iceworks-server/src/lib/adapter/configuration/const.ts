const CLI_CONF = [
  {
    label: '入口文件',
    name: 'entry',
    description:
      '默认会以 src/index.js 文件作为入口文件，如果你需要改变默认的入口文件，可以修改该配置项',
    link: 'https://ice.work/docs/cli/config/config#entry',
    componentName: 'Input',
    componentProps: {
      placeholder: 'src/index.js',
    },
  },
  {
    label: '基础路径',
    name: 'publicPath',
    description: '修改构建后的文件目录',
    link: 'https://ice.work/docs/cli/config/config#outputDir',
    componentName: 'Input',
    componentProps: {
      placeholder: 'https://cdn.example.com/assets/',
    },
  },
  {
    label: '构建目录',
    name: 'publicPath',
    description:
      '配置 webpack 的 output.publicPath 属性。 仅在运行 build 时生效',
    link: 'https://ice.work/docs/cli/config/config#publicPath',
    componentName: 'Input',
    componentProps: {
      placeholder: '/dist',
    },
  },
  {
    label: '开发资源路径',
    name: 'devPublicPath',
    description: '同 publicPath 仅在运行 ice-scripts dev 时生效',
    link: 'https://ice.work/docs/cli/config/config#devPublicPath',
    componentName: 'Input',
    componentProps: {
      placeholder: 'http://127.0.0.1/',
    },
  },
  {
    label: '运行环境',
    name: 'injectBabel',
    description:
      '注入 babel 运行环境，默认情况下会注入 @babel/polyfill 适合业务项目开发，如果开发类库项目，可以修改为 runtime 选项',
    link: 'https://ice.work/docs/cli/config/config#injectBabel',
    componentName: 'Select',
    componentProps: {
      dataSource: [
        { label: 'option1', value: 'option1' },
        { label: 'option2', value: 'option2' },
      ],
    },
  },
  {
    label: '启用 hash',
    name: 'hash',
    description: '如果希望构建后的资源带 hash 版本，可以开启该选项',
    link: 'https://ice.work/docs/cli/config/config#hash',
    componentName: 'Switch',
    componentProps: {},
  },
  {
    label: '资源压缩',
    name: 'minify',
    description: '构建后的资源将进行压缩，如果不希望资源被压缩可以关闭该选项',
    link: 'https://ice.work/docs/cli/config/config#minify',
    componentName: 'Switch',
    componentProps: {},
  },
];

export { CLI_CONF };
