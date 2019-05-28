const CONFIGURATION_SETTINGS = [
  {
    label: '公共路径',
    name: 'outputPath',
    description:
      '应用的部署地址，如 my-app。如果留空，所有资源将使用相对路径。',
    link:
      'https://ice.work/docs/basis/ice-scripts#%E4%BF%AE%E6%94%B9%20publicPath',
    componentName: 'Input',
    componentProps: {
      placeholder: '/',
    },
  },
  {
    label: '路径哈希',
    name: 'hash',
    description: '构建后的静态资源路径带有带哈希值。',
    link: 'https://ice.work/docs/basis/ice-scripts#ice%20build',
    componentName: 'Switch',
    componentProps: {
      placeholder: '/',
    },
  },
];

export { CONFIGURATION_SETTINGS };
