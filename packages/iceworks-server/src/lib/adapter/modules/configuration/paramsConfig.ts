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
    label: '构建路径',
    name: 'outputDir',
    description: '修改构建后的文件目录',
    link: 'https://ice.work/docs/cli/config/config#outputDir',
    componentName: 'Input',
    componentProps: {
      placeholder: 'dist',
    },
  },
  {
    label: '基础路径',
    name: 'publicPath',
    description:
      '该配置为项目中的所有资源指定一个基础路径。 仅在运行 build 时生效',
    link: 'https://ice.work/docs/cli/config/config#publicPath',
    componentName: 'Input',
    componentProps: {
      placeholder: '/',
    },
  },
  {
    label: '资源路径',
    name: 'devPublicPath',
    description: '同 publicPath 仅在运行 ice-scripts dev 时生效',
    link: 'https://ice.work/docs/cli/config/config#devPublicPath',
    componentName: 'Input',
    componentProps: {
      placeholder: 'http://127.0.0.1',
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
      placeholder: 'polyfill',
      dataSource: [
        { label: 'runtime', value: 'runtime' },
        { label: 'polyfill', value: 'polyfill' },
      ],
    },
  },
  {
    label: '启用 hash',
    name: 'hash',
    description: '如果希望构建后的资源带 hash 版本，可以开启该选项',
    link: 'https://ice.work/docs/cli/config/config#hash',
    componentName: 'Switch',
    componentProps: {
      defaultChecked: false
    },
  },
  {
    label: '资源压缩',
    name: 'minify',
    description: '构建后的资源将进行压缩，如果不希望资源被压缩可以关闭该选项',
    link: 'https://ice.work/docs/cli/config/config#minify',
    componentName: 'Switch',
    componentProps: {
      defaultChecked: false
    },
  },
  {
    label: '代码分离',
    name: 'vendor',
    description: '配置是否生成 vendor，如果希望禁用可以关闭该选项',
    link: 'https://ice.work/docs/cli/config/config#vendor',
    componentName: 'Switch',
    componentProps: {
      defaultChecked: false
    },
  },
];

export default { CLI_CONF };
