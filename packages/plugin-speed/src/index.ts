import type { IPlugin } from 'build-scripts';

const plugin: IPlugin = ({ context, onHook, registerCliOption, applyMethod }) => {
  const { commandArgs, command, userConfig } = context;
  // register cli option
  registerCliOption({
    name: 'build-speed',
    commands: ['start', 'build'],
  });

  if (commandArgs.buildSpeed) {
    // eslint-disable-next-line global-require
    const SpeedMeasurePlugin = require('@builder/pack/deps/speed-measure-webpack-plugin');
    const smp = new SpeedMeasurePlugin({
      // https://github.com/stephencookdev/speed-measure-webpack-plugin/issues/167
      // ignore plugins with do not work properly with speed-measure-webpack-plugin
      ignorePlugins: ['MiniCssExtractPlugin'],
      loaderTopFiles: 10,
    });
    // @ts-ignore
    onHook(`before.${command}.load`, ({ webpackConfig: configArr }) => {
      configArr.forEach((item) => {
        const origConfig = item.chainConfig;
        const wrappedConfig = smp.wrap(origConfig.toConfig());
        item.chainConfig = new Proxy(origConfig, {
          get(target, property) {
            if (property === 'toConfig') {
              return () => wrappedConfig;
            }
            return target[property];
          },
        });
      });
    });
  }
  // add runtime plugin only --build-speed is configured in mode vite
  if (!commandArgs.buildSpeed || !userConfig.vite) {
    applyMethod('addDisableRuntimePlugin', 'build-plugin-speed');
  }
};

export default plugin;