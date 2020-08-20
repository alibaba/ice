import { IPlugin } from '@alib/build-scripts';

const plugin: IPlugin = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    config.module
      .rule('compile')
      .test(/\.rml$/i)
      .use('rml')
      .loader('@reactml/loader')
      .options({
        renderer: 'react',
      });
  });
};

export default plugin;
