export default [
  {
    label: '构建路径',
    name: 'outputDir',
    description: '修改构建后的文件目录',
    link: '',
    componentName: 'Input',
    componentProps: {
      placeholder: 'dist',
    },
  },
  {
    label: '基础路径',
    name: 'publicPath',
    description: '为项目中的所有资源指定一个基础路径',
    link: '',
    componentName: 'Input',
    componentProps: {
      placeholder: '/',
    },
  },
  {
    label: '启用 hash',
    name: 'filenameHashing',
    description: '如果希望构建后的资源带 hash 版本，可以开启该选项',
    link: '',
    componentName: 'Switch',
    componentProps: {
      defaultChecked: true
    },
  }
];
