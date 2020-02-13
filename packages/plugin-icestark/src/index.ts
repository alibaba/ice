import * as path from 'path';
import * as glob from 'glob';
import { IPlugin } from '@alib/build-scripts';

const plugin: IPlugin = ({ onGetWebpackConfig, context }) => {
  const { rootDir } = context;
  
  const hasDefaultLayout = glob.sync(`${path.join(rootDir, 'src/layouts/index')}.@(ts?(x)|js?(x))`).length;
  onGetWebpackConfig((config) => {
    // set alias for default layout
    config.resolve.alias.set('$ice/Layout', hasDefaultLayout ? path.join(rootDir, 'src/layouts') : path.join(__dirname, 'runtime/Layout'));
    // set alias for icestark
    ['@ice/stark', '@ice/stark-app'].forEach((pkgName) => {
      config.resolve.alias.set(pkgName, require.resolve(pkgName));
    });
  });
};

export default plugin;