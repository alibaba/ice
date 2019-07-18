import { IConfSchema, IContext, ITaskConf } from '../../../../interface';

export default (ctx: IContext): ITaskConf => {
  const { i18n } = ctx;

  function addLabel(env: string, item): IConfSchema {
    item.label = i18n.format(`vueAdapter.task.${env}.${item.name}.label`);

    return item;
  }

  const dev: any = [
    {
      name: 'port',
      description: '',
      link: '',
      componentName: 'Input',
      componentProps: {
        placeholder: '4444',
      },
    },
    {
      name: 'host',
      description: '',
      link: '',
      componentName: 'Input',
      componentProps: {
        placeholder: '127.0.0.1',
      },
    },
    {
      name: 'https',
      description: '',
      link: '',
      componentName: 'Switch',
      componentProps: {
        defaultChecked: false,
      },
    },
  ];

  const build: any = [
    {
      name: 'outputDir',
      link: '',
      componentName: 'Input',
      componentProps: {
        placeholder: 'dist',
      },
    },
    {
      name: 'publicPath',
      link: '',
      componentName: 'Input',
      componentProps: {
        placeholder: '/',
      },
    },
    {
      name: 'filenameHashing',
      link: '',
      componentName: 'Switch',
      componentProps: {
        defaultChecked: true,
      },
    },
  ];

  const lint: any = [];

  dev.map((v): IConfSchema => addLabel('dev', v));
  build.map((v): IConfSchema => addLabel('build', v));

  return { dev, build, lint };
};
