import { IPlugin } from '@alib/build-scripts';
import { Option } from './types';

const plugin: IPlugin = ({ onGetWebpackConfig }, options) => {

  onGetWebpackConfig((config) => {
    config.mode('production');
  });
};

export default plugin;