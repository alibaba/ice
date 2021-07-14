import { IPlugin } from '@alib/build-scripts';

const plugin: IPlugin = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    config.mode('production');
  });
};

export default plugin;