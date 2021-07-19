import * as path from 'path';
import { IPlugin } from '@alib/build-scripts';
import * as WorkboxPlugin from 'workbox-webpack-plugin';
import { Option } from './types';
import defaultRuntimeCaching from './defaultRuntimeCache';

const plugin: IPlugin = ({ onGetWebpackConfig, context, log }, options) => {
  const { command } = context;
  const isDev = command === 'start';

  const {
    sw = 'sw.js',
    dev = true,
    skipWaiting = true,
    additionalManifestEntries = [],
    scope = '/',
    runtimeCaching = []
  } = (options ?? {}) as Option;

  if (isDev && !dev) {
    log.info('[PWA]: PWA is disabled.');
    return;
  }

  const registerEntry = path.join(__dirname, 'register.js');
  const swScope = path.join(scope, '/');

  onGetWebpackConfig((config) => {
    const outputPath = config.output.get('path');
    // FIXME: must know last publicPath setting of all plugins
    const publicPath = config.output.get('publicPath');
    const swDest = path.join(outputPath, sw);

    const swPath = isDev ? `./${sw}` : `${publicPath}/${sw}`;

    console.log('');

    config
      .entry('index')
      .add(registerEntry);

    config
      .plugin('DefinePlugin')
      .tap(([args]) => [{
        ...args,
        // FIXME: how to get exact path
        __ICE_PWA_SW__: `'${swPath}'`,
        __ICE_START_URL__: '\'/\'',
        __ICE_SW_SCOPE__: `'${swScope}'`
      }]);

    config
      .plugin('workbox-webpack-plugin')
      .use(WorkboxPlugin.GenerateSW, [
        {
          cacheId: 'ice-precaches',
          swDest,
          cleanupOutdatedCaches: true,
          // inlineWorkboxRuntime: true,
          clientsClaim: true,
          skipWaiting,
          // exclude: [/\.(?:html)$/i],
          maximumFileSizeToCacheInBytes: '10240000',
          // setting for runtime Caching
          runtimeCaching: runtimeCaching.concat(defaultRuntimeCaching as any),

          additionalManifestEntries,
        }
      ]);
  });
};

export default plugin;