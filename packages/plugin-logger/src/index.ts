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

  // add ice exports
  applyMethod('addExport', {
    source: `./plugins/${exportName}`,
    exportName,
    importSource: `$$ice/plugins/${exportName}`,
    exportDefault: exportName,
  });

  onGetWebpackConfig((config) => {
    const { userConfig: { dropLogLevel } } = context;
    if (dropLogLevel) {
      const pureFuncs = getPureFuncs(levels[(dropLogLevel as string).toLowerCase()]);
      // @ts-ignore
      if (config.optimization.minimizers.has('ESBuild')) {
        config.optimization.minimizer('ESBuild').tap(([options]) => {
          return [
            {
              ...options,
              pure: pureFuncs,
            }
          ];
        });
        // @ts-ignore
      } else if (config.optimization.minimizers.has('TerserPlugin')) {
        config.optimization.minimizer('TerserPlugin').tap(([options]) => {
          return [
            {
              ...options,
              terserOptions: {
                ...options.terserOptions,
                compress: {
                  ...options.terserOptions.compress,
                  drop_console: false,
                  pure_funcs: pureFuncs,
                }
              }
            }
          ];
        });
        // @ts-ignore
      } else if (config.optimization.minimizers.has('SWC')) {
        config.optimization.minimizer('SWC').tap(([options]) => {
          return [
            {
              ...options,
              jsc: {
                ...options.jsc,
                minify: {
                  ...options.jsc?.minify,
                  compress: {
                    ...options.jsc?.minify?.compress,
                    drop_console: false,
                    pure_funcs: pureFuncs,
                  }
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
    .filter((methodName) => levels[methodName] <= level)
    .map(methodName => `console.${methodName}`);
}

export default plugin;
