import path from 'path';
import { swc, swcPluginRemoveExport, swcPluginKeepExport, swcPluginNodeTransform, coreJsPath, caniuseLite } from '@ice/bundles';
import browserslist from 'browserslist';
import consola from 'consola';
import type { SwcConfig, ReactConfig } from '@ice/bundles';
import type { UnpluginOptions } from '@ice/bundles/compiled/unplugin/index.js';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import type { Config } from '../types.js';
import transformImport from '../utils/transformImport.js';

const { merge } = lodash;

type JSXSuffix = 'jsx' | 'tsx';

interface Options {
  rootDir: string;
  mode: 'development' | 'production' | 'none';
  fastRefresh: boolean;
  compileIncludes?: (string | RegExp)[];
  sourceMap?: Config['sourceMap'];
  compileExcludes?: RegExp[];
  swcOptions?: Config['swcOptions'];
  cacheDir?: string;
  polyfill?: Config['polyfill'];
  enableEnv?: boolean;
  getRoutesFile?: () => string[];
}

const formatId = (id: string) => id.split(path.sep).join('/');

// HACK: swc minify will hang on when '@remix-run/router' is not compiled.
// It may be a bug of swc, so we add it to compile deps when @swc/core is update to latest version.
const COMPILE_DEPS = ['@remix-run/router'];
const compilationPlugin = (options: Options): UnpluginOptions => {
  const {
    rootDir,
    sourceMap,
    mode,
    fastRefresh,
    compileIncludes = [],
    compileExcludes,
    swcOptions = {},
    cacheDir,
    polyfill,
    enableEnv,
    getRoutesFile,
  } = options;

  const { removeExportExprs, compilationConfig, keepExports, nodeTransform } = swcOptions;
  const compileRegex = [...compileIncludes, ...COMPILE_DEPS].map((includeRule) => {
    return includeRule instanceof RegExp ? includeRule : new RegExp(includeRule);
  });

  function isRouteEntry(id: string) {
    const routes = getRoutesFile();

    const matched = routes.find(route => {
      return id.indexOf(route) > -1;
    });

    return !!matched;
  }

  function isAppEntry(id: string) {
    return /(.*)src\/app.(ts|tsx|js|jsx)/.test(id);
  }

  const extensionRegex = /\.(jsx?|tsx?|mjs)$/;
  return {
    name: 'compilation-plugin',
    transformInclude(id) {
      // Resolved id is not formatted when used in webpack loader test.
      const formatedId = formatId(id);
      const needCompile = extensionRegex.test(formatedId) && !compileExcludes.some((regex) => regex.test(formatedId));
      const skipCompile = /node_modules/.test(id) && !compileRegex.some((regex) => regex.test(id));
      return needCompile && !skipCompile;
    },
    async transform(source: string, fileId: string) {
      const id = formatId(fileId);
      const suffix = (['jsx', 'tsx'] as JSXSuffix[]).find(suffix => new RegExp(`\\.${suffix}?$`).test(id));

      const programmaticOptions: SwcConfig = {
        swcrc: false,
        filename: id,
        sourceMaps: !!sourceMap,
      };

      const commonOptions = getJsxTransformOptions({ rootDir, mode, suffix, fastRefresh, polyfill, enableEnv });

      // auto detect development mode
      if (
        mode &&
        commonOptions?.jsc?.transform?.react &&
        !Object.prototype.hasOwnProperty.call(commonOptions.jsc.transform.react, 'development')
      ) {
        commonOptions.jsc.transform.react.development = mode === 'development';
      }

      merge(programmaticOptions, commonOptions);

      if (typeof compilationConfig === 'function') {
        merge(programmaticOptions, compilationConfig(source, fileId));
      } else if (compilationConfig) {
        merge(programmaticOptions, compilationConfig);
      }

      const swcPlugins = [];

      // handle app.tsx and page entries only
      if (removeExportExprs) {
        if (isRouteEntry(id) || isAppEntry(id)) {
          swcPlugins.push([
            swcPluginRemoveExport,
            removeExportExprs,
          ]);
        }
      }
      if (keepExports) {
        // Make a copy of keepExports, otherwise it will be modified by side effects operation such as push.
        const keepList = [...(Array.isArray(keepExports) ? keepExports : keepExports.value)];
        const customInlcude = !Array.isArray(keepExports) && keepExports?.include;
        let matchRule = false;
        if (customInlcude) {
          matchRule = customInlcude(id);
        } else {
          const matchRoute = isRouteEntry(id);
          const matchEntry = isAppEntry(id);
          if (matchEntry && keepList.indexOf('pageConfig') > -1) {
            // when build for pageConfig, should keep default, it equals to getAppConfig
            keepList.push('default');
          }
          matchRule = matchRoute || matchEntry;
        }
        if (matchRule) {
          swcPlugins.push([
            swcPluginKeepExport,
            keepList,
          ]);
        }
      }

      if (nodeTransform) {
        swcPlugins.push([swcPluginNodeTransform, {}]);
      }
      if (swcPlugins.length > 0) {
        merge(programmaticOptions, {
          jsc: {
            experimental: {
              cacheRoot: cacheDir,
              plugins: swcPlugins,
            },
          },
        });
      }

      try {
        const output = await swc.transform(source, programmaticOptions);

        const { code } = output;
        let { map } = output;
        return {
          code: await transformImport(
            code,
            coreJsPath,
          ),
          map,
        };
      } catch (error) {
        // Catch error for unhandled promise rejection.
        if (this) {
          // Handled by unplugin.
          this.error(error);
          return { code: null, map: null };
        } else {
          // Handled by webpack.
          throw error;
        }
      }
    },
  };
};

interface GetJsxTransformOptions {
  rootDir: string;
  mode: Options['mode'];
  suffix?: JSXSuffix;
  fastRefresh: boolean;
  polyfill: Config['polyfill'];
  enableEnv: boolean;
}

export function getJsxTransformOptions({
  suffix,
  fastRefresh,
  polyfill,
  enableEnv,
  mode,
  rootDir,
}: GetJsxTransformOptions) {
  const reactTransformConfig: ReactConfig = {
    // Swc won't enable fast refresh when development is false in the latest version.
    development: mode === 'development',
    refresh: fastRefresh,
    runtime: 'automatic',
    importSource: '@ice/runtime/react', // The exact import source is '@ice/runtime/react/jsx-runtime'
  };

  const commonOptions: SwcConfig = {
    jsc: {
      transform: {
        react: reactTransformConfig,
        legacyDecorator: true,
      },
      // This option will greatly reduce your file size while bundling.
      // This option depends on `@swc/helpers`.
      externalHelpers: true,
    },
    module: {
      type: 'es6',
      noInterop: false,
    },
  };
  if (enableEnv) {
    commonOptions.env = {
      loose: false,
      ...(polyfill ? {
        mode: polyfill,
        coreJs: '3.32',
      } : {}),
    };
    const supportBrowsers = getSupportedBrowsers(rootDir, mode === 'development');
    if (supportBrowsers) {
      // Fix issue of https://github.com/swc-project/swc/issues/3365
      commonOptions.env.targets = supportBrowsers;
    }
  } else {
    // Set target `es2022` for default transform when env is false.
    commonOptions.jsc.target = 'es2022';
  }
  const syntaxFeatures = {
    dynamicImport: true,
    decorators: true,
    privateMethod: true,
    importMeta: true,
    exportNamespaceFrom: true,
  };
  const jsOptions = merge({
    jsc: {
      parser: {
        jsx: true,
        ...syntaxFeatures,
        syntax: 'ecmascript',
      },
    },
  }, commonOptions);

  const tsOptions = merge({
    jsc: {
      parser: {
        tsx: true,
        ...syntaxFeatures,
        syntax: 'typescript',
      },
    },
  }, commonOptions);

  if (suffix === 'jsx') {
    return jsOptions;
  } else if (suffix === 'tsx') {
    return tsOptions;
  }
  return commonOptions;
}

function getSupportedBrowsers(
  dir: string,
  isDevelopment: boolean,
): string[] | undefined {
  let browsers: any;
  try {
    browsers = browserslist.loadConfig({
      path: dir,
      env: isDevelopment ? 'development' : 'production',
    });
  } catch {
    consola.debug('[browsers]', 'fail to load config of browsers');
  }
  return browsers;
}

export function isSupportedFeature(feature: string, rootDir = process.cwd(), isDevelopment = false) {
  const browsers = getSupportedBrowsers(rootDir, isDevelopment);
  // Do not check supported feature when browsers is undefined.
  if (!browsers) {
    return true;
  }
  const supportedBrowsers = browserslist(browsers);
  const supportStats = caniuseLite.feature(caniuseLite.features[feature])?.stats;
  let notSupported = false;
  if (supportStats && supportedBrowsers && supportedBrowsers.length > 0) {
    notSupported = supportedBrowsers.some((browser) => {
      const [browserName, browserVersion] = browser.split(' ');
      const support = supportStats[browserName]?.[browserVersion];
      return support && support === 'n';
    });
  }
  return !notSupported;
}


export default compilationPlugin;
