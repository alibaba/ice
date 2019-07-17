import { IConfSchema, IContext } from '../../../../interface';

export default (ctx: IContext): IConfSchema[] => {
  const { i18n } = ctx;

  const result: any[] = [
    {
      name: 'outputDir',
      description: '',
      link: '',
      componentName: 'Input',
      componentProps: {
        placeholder: 'dist',
      },
    },
    {
      name: 'publicPath',
      description: '',
      link: '',
      componentName: 'Input',
      componentProps: {
        placeholder: '/',
      },
    },
    {
      name: 'filenameHashing',
      description: '',
      link: '',
      componentName: 'Switch',
      componentProps: {
        defaultChecked: true,
      },
    },
  ];

  return result.map(
    (v): IConfSchema => {
      v.label = i18n.format(`vueAdapter.configuration.${v.name}.label`);
      v.description = i18n.format(`vueAdapter.configuration.${v.name}.des`);

      return v;
    },
  );
};
