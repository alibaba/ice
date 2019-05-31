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

const BUILD_CONF = [
  {
    label: '构建目录',
    name: 'publicPath',
    description: '',
    link: '',
    componentName: 'Input',
    componentProps: {},
  },
  {
    label: '启用 hash',
    name: 'hash',
    description: '',
    link: '',
    componentName: 'Switch',
    componentProps: {},
  },
  {
    label: '启用 sourcemap',
    name: 'sourcemap',
    description: '',
    link: '',
    componentName: 'Switch',
    componentProps: {},
  },
];

const DEV_CONF = [
  {
    label: '服务器端口',
    name: 'port',
    description: '',
    link: '',
    componentName: 'Input',
    componentProps: {
      placeholder: '4444',
    },
  },
  {
    label: '服务器主机名',
    name: 'host',
    description: '',
    link: '',
    componentName: 'Input',
    componentProps: {
      placeholder: '127.0.0.1',
    },
  },
  {
    label: '自动打开浏览器',
    name: 'browser',
    description: '',
    link: '',
    componentName: 'Switch',
    componentProps: {},
  },
  {
    label: '启动 HTTPS',
    name: 'https',
    description: '',
    link: '',
    componentName: 'Switch',
    componentProps: {},
  },
];

export { LINT_CONF, BUILD_CONF, DEV_CONF };
