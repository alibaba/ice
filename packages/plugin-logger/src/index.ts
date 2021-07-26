import * as path from 'path';
import { IPlugin } from 'build-scripts';
import levels from './levels';

const plugin: IPlugin = async ({ applyMethod, registerUserConfig, onGetWebpackConfig, context }): Promise<void> => {
  registerUserConfig([
    {
      name: 'dropLogLevel',
      validation: 'string'
    }
  ]);
  const exportName = 'logger';
  applyMethod('addPluginTemplate', path.join(__dirname, `../${exportName}`));

  // add types exports
  applyMethod('addAppConfigTypes', { source: `../plugins/${exportName}/types`, specifier: '{ ILogger }', exportName: `${exportName}?: ILogger` });

  onGetWebpackConfig((config) => {
    const { userConfig: { esbuild, dropLogLevel } } = context;
    if (dropLogLevel) {
      if (esbuild) {
        config.optimization.minimizer('ESBuild').tap(options => {
          const pluginOptions = options[0];
          return [
            {
              ...pluginOptions,
              pure: getPureFuncs(levels[(dropLogLevel as string).toLowerCase()]),
            }
          ];
        });
        // @ts-ignore
      } else if (config.optimization.minimizers.has('TerserPlugin')) {
        config.optimization.minimizer('TerserPlugin').tap(options => {
          const pluginOptions = options[0];
          return [
            {
              ...pluginOptions,
              terserOptions: {
                ...pluginOptions.terserOptions,
                compress: {
                  ...pluginOptions.terserOptions.compress,
                  drop_console: false,
                  pure_funcs: getPureFuncs(levels[(dropLogLevel as string).toLowerCase()]),
                }
              }
            }
          ];
        });
      }
    }
  });
};

function getPureFuncs(level: number) {
  return Object.keys(levels)
    .filter((methodName) => levels[methodName] < level)
    .map(methodName => `console.${methodName}`);
}

export default plugin;
