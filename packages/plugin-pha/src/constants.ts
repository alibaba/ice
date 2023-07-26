import type { PluginData } from '@ice/app/types';
import type { Context } from 'build-scripts';

// Keys of appConfig  need transform to manifest.
export const decamelizeKeys = [
  'title',
  'name',
  'startUrl',
  'shortName',
  'lang',
  'dir',
  'description',
  'backgroundColor',
  'display',
  'icons',
  'appWorker',
  'window',
  'pageHeader',
  'tabHeader',
  'tabBar',
  'pages',
  'dataPrefetch',
  'spm',
  'metas',
  'links',
  'scripts',
  'offlineResources',
  'packageResources',
  'manifestPrefetchExpires',
  'manifestPrefetchMaxAge',
  'maxAge',
  'expires',
  'queryParamsPassKeys',
  'queryParamsPassIgnoreKeys',
  'splashViewTimeout',
  'splashViewAutoClose',
  'splashViewHtml',
  'splashViewUrl',
  'swiperThreshold',
  'requestHeaders',
  'enablePoplayer',
  'disableCapture',
  'enablePullRefresh',
  'pullRefreshBackgroundColor',
  'pullRefreshColorScheme',
  'pullRefresh',
  'cacheQueryParams',
  'customDataSource',
  'enableExpiredManifest',
  'bounces',
];

// Do not decamelize list.
export const camelizeKeys = [
  'appKey',
  'dataType',
  'valueType',
  'isSec',
  'LoginRequest',
  'sessionOption',
  'AntiCreep',
  'AntiFlood',
  'needLogin',
];

export const validPageConfigKeys = [
  'pageHeader',
  'defaultFrameIndex',
  'title',
  'priority',
  'titleImage',
  'titleBarColor',
  'backgroundColor',
  'enablePullRefresh',
  'external',
  'requestHeaders',
  'frames',
  'dataPrefetch',
  'spm',
  'queryParams',
  'queryParamsPassKeys',
  'pullRefresh',
  'queryParamsPassIgnoreKeys',
  'downgradeUrl',
  'bounces',
];

// The manifest configuration is the default value for the page configuration
export const pageDefaultValueKeys = [
  'pullRefresh',
];

export const getCompilerConfig = (options: {
  getAllPlugin: Context['getAllPlugin'];
}) => {
  const {
    getAllPlugin,
  } = options;
  const plugins = getAllPlugin(['keepExports']) as PluginData[];

  let keepExports = ['dataLoader'];
  plugins.forEach(plugin => {
    if (plugin.keepExports) {
      keepExports = keepExports.concat(plugin.keepExports);
    }
  });
  return {
    swc: {
      keepExports,
    },
    preBundle: false,
    externalDependencies: false,
    transformEnv: false,
    // Redirect import defineDataLoader from @ice/runtime to avoid build plugin side effect code.
    redirectImports: [{
      specifier: ['defineDataLoader'],
      source: '@ice/runtime',
    }],
    // Replace env vars.
    runtimeDefineVars: {
      'import.meta.target': JSON.stringify('appWorker'),
      'import.meta.renderer': JSON.stringify('client'),
    },
  };
};
