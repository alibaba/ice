import * as path from 'path';
import { IPlugin } from 'build-scripts';
import * as WorkboxPlugin from 'workbox-webpack-plugin';
import { Option } from './types';
import defaultRuntimeCaching from './runtimeCaching';
import hasWebManifest from './hasWebManifest';
import ManifestPlugin from './ManifestPlugin';

const plugin: IPlugin = ({ onGetWebpackConfig, context, log }, options) => {
  const { command, rootDir } = context;
  const isDev = command === 'start';

  const {
    sw = 'sw.js',
    dev = true,
    skipWaiting = true,
    basename = '/',
    additionalManifestEntries = [],
    scope = basename,
    runtimeCaching = [],
    dynamicStartUrl = true,
  } = (options ?? {}) as Option;

  if (isDev && !dev) {
    log.info('[PWA]: PWA is disabled.');
    return;
  }

  const registerEntry = path.join(__dirname, 'register.js');
  const swScope = path.join(scope, '/');
  let devOptions = {};

  onGetWebpackConfig((config) => {
    const outputPath = config.output.get('path');

    const swDest = path.join(outputPath, sw);
    const swPath = path.join(basename, sw);

    console.info(`[PWA]: ${sw} compiled to ${swDest}`);

    // service worker registration
    config
      .entry('index')
      .add(registerEntry);

    /**
    * Define global varibles for registration
     */
    config
      .plugin('DefinePlugin')
      .tap(([args]) => [{
        ...args,
        __ICE_PWA_SW__: `'${swPath}'`,
        __ICE_START_URL__: `'${basename}'`,
        __ICE_SW_SCOPE__: `'${swScope}'`,
        __ICE_DYNAMIC_START_URL__: `'${dynamicStartUrl}'`
      }]);

    if (hasWebManifest(rootDir)) {
      config.plugin('ManifestPlugin').use(ManifestPlugin);
    }

    if (isDev) {
      log.info('[PWA]: PWA is running in DEV mode. That means hot-reload is enabled for service worker serves all older files.');
      devOptions = {
        exclude: [/hot-update\.(?:js|json)$/i],
        runtimeCaching: [
          ...defaultRuntimeCaching.filter(cache => ['ice-js-assets', 'others'].some (type => cache.options.cacheName === type)),
          {
            urlPattern: /(?<!(hot-update))\.(?:js|json)$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'ice-pwa-dev'
            }
          }
        ],
      };
    }

    config
      .plugin('workbox-webpack-plugin')
      .use(WorkboxPlugin.GenerateSW, [
        {
          cacheId: 'ice',
          swDest,

          // auto clean outdated caches
          cleanupOutdatedCaches: true,

          // bundle workbox to sw.js
          inlineWorkboxRuntime: true,

          // make service worker controls any existing clients once actived.
          clientsClaim: true,

          // default to slient
          skipWaiting,

          // precache assets which under 10M
          maximumFileSizeToCacheInBytes: 10240000,

          // custom runtim caching
          runtimeCaching: runtimeCaching.concat(defaultRuntimeCaching),

          // custom manifests
          additionalManifestEntries,

          mode: 'development',

          navigateFallback: '/index.html',

          exclude: [/index\.(?:js|html)$/i],

          ...devOptions
        }
      ]);
  });
};

export default plugin;