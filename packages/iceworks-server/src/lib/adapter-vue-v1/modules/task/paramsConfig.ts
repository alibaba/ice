const DEV_CONF = [
  {
    label: '服务端口号',
    name: 'port',
    description: '',
    link: '',
    componentName: 'Input',
    componentProps: {
      placeholder: '4444',
    },
  },
  {
    label: '服务主机名',
    name: 'host',
    description: '',
    link: '',
    componentName: 'Input',
    componentProps: {
      placeholder: '127.0.0.1',
    },
  },
  {
    label: '开启 https',
    name: 'https',
    description: '',
    link: '',
    componentName: 'Switch',
    componentProps: {
      defaultChecked: false,
    },
  }
];

const BUILD_CONF = [
  {
    label: '构建路径',
    name: 'outputDir',
    description: '修改构建后的文件目录',
    componentName: 'Input',
    componentProps: {
      placeholder: 'dist',
    },
  },
  {
    label: '基础路径',
    name: 'publicPath',
    description: '为项目中的所有资源指定一个基础路径',
    componentName: 'Input',
    componentProps: {
      placeholder: '/',
    },
  },
  {
    label: '启用 hash',
    name: 'filenameHashing',
    description: '如果希望构建后的资源带 hash 版本，可以开启该选项',
    componentName: 'Switch',
    componentProps: {
      defaultChecked: true
    },
  }
];

const LINT_CONF = [];

export default { DEV_CONF, BUILD_CONF, LINT_CONF };
