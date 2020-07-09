import { IPlugin } from '@alib/build-scripts';
import * as CircularDependencyPlugin from 'circular-dependency-plugin';

const plugin: IPlugin = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    config.plugin('CircularDependencyPlugin')
      .use(CircularDependencyPlugin, [{
        // exclude detection of files based on a RegExp
        exclude: /node_modules/,
        // include specific files based on a RegExp
        // include: /src/,
        // add errors to webpack instead of warnings
        failOnError: false,
        // allow import cycles that include an asyncronous import,
        // e.g. via import(/* webpackMode: "weak" */ './file.js')
        // allowAsyncCycles: false,
        // set the current working directory for displaying module paths
        cwd: process.cwd(),
      }]);
  });
};
export default plugin;
