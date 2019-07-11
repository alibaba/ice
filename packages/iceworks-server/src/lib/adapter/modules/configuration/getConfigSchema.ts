import { IConfSchema, IContext } from '../../../../interface';

export default (ctx: IContext): IConfSchema[] => {
  const { i18n } = ctx;

  const result: any[] = [
    {
      name: 'entry',
      link: 'https://ice.work/docs/cli/config/config#entry',
      componentName: 'Input',
      componentProps: {
        placeholder: 'src/index.js',
      },
    },
    {
      name: 'outputDir',
      link: 'https://ice.work/docs/cli/config/config#outputDir',
      componentName: 'Input',
      componentProps: {
        placeholder: 'dist',
      },
    },
    {
      name: 'publicPath',
      link: 'https://ice.work/docs/cli/config/config#publicPath',
      componentName: 'Input',
      componentProps: {
        placeholder: '/',
      },
    },
    {
      name: 'devPublicPath',
      link: 'https://ice.work/docs/cli/config/config#devPublicPath',
      componentName: 'Input',
      componentProps: {
        placeholder: 'http://127.0.0.1',
      },
    },
    {
      name: 'injectBabel',
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
      name: 'hash',
      link: 'https://ice.work/docs/cli/config/config#hash',
      componentName: 'Switch',
      componentProps: {
        defaultChecked: false
      },
    },
    {
      name: 'minify',
      link: 'https://ice.work/docs/cli/config/config#minify',
      componentName: 'Switch',
      componentProps: {
        defaultChecked: false
      },
    },
    {
      name: 'vendor',
      link: 'https://ice.work/docs/cli/config/config#vendor',
      componentName: 'Switch',
      componentProps: {
        defaultChecked: false
      },
    },
  ];

  return result.map((v): IConfSchema => {
    v.label = i18n.format(`baseAdapter.configuration.${v.name}.label`);
    v.description = i18n.format(`baseAdapter.configuration.${v.name}.des`);

    return v;
  });
};
