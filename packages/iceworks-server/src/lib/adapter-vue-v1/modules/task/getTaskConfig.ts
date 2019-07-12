export default () => {
  const dev = [
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

  const build = [
    {
      label: '构建路径',
      name: 'outputDir',
      link: '',
      componentName: 'Input',
      componentProps: {
        placeholder: 'dist',
      },
    },
    {
      label: '基础路径',
      name: 'publicPath',
      link: '',
      componentName: 'Input',
      componentProps: {
        placeholder: '/',
      },
    },
    {
      label: '启用 hash',
      name: 'filenameHashing',
      link: '',
      componentName: 'Switch',
      componentProps: {
        defaultChecked: true
      },
    }
  ];

  const lint = [];

  return { dev, build, lint };
};
