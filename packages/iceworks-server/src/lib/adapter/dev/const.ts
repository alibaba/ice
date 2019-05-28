const DEV_SETTINGS = [
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

export default DEV_SETTINGS;
