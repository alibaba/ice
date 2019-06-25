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
  },
  {
    label: '开启构建分析',
    name: 'analyzer',
    description: '',
    link: '',
    componentName: 'Switch',
    componentProps: {
      defaultChecked: false
    },
  },
  {
    label: '开启热更新',
    name: 'disabled-reload',
    description: '',
    link: '',
    componentName: 'Switch',
    componentProps: {
      defaultChecked: true
    },
  },
];

const BUILD_CONF = [
  {
    label: '构建目录',
    name: 'outputDir',
    description: '',
    link: '',
    componentName: 'Input',
    componentProps: {
      placeholder: '/dist'
    },
  },
  {
    label: '资源压缩',
    name: 'minify',
    description: '',
    link: '',
    componentName: 'Switch',
    componentProps: {
      defaultChecked: true
    },
  },
  {
    label: '启用 hash',
    name: 'hash',
    description: '',
    link: '',
    componentName: 'Switch',
    componentProps: {
      defaultChecked: false,
    },
  },
];

const LINT_CONF = [
  {
    label: '定义执行脚本',
    name: 'script',
    description: '',
    link: '',
    componentName: 'Input',
    componentProps: {},
  },
  {
    label: '启动自动修复',
    name: 'fix',
    description: '',
    link: '',
    componentName: 'Switch',
    componentProps: {},
  },
];

export { DEV_CONF, BUILD_CONF, LINT_CONF };
