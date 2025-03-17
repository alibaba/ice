import { createRequire } from 'module';
import trustCert from '@ice/bundles/compiled/trusted-cert/index.js';
import fse from 'fs-extra';
import type { Config } from '@ice/shared-config/types';
import type { UserConfigContext } from 'build-scripts';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import type { UserConfig } from './types/userConfig.js';
import { logger } from './utils/logger.js';

const require = createRequire(import.meta.url);
const { merge } = lodash;
const { certificateFor } = trustCert;

const mergeDefaultValue = <T>(config: Config, key: string, value: T): Config => {
  if (value) {
    if (typeof value === 'object') {
      return {
        ...config,
        [key]: {
          ...(config[key] || {}),
          ...value,
        },
      };
    } else {
      config[key] = value;
      return config;
    }
  }
  return config;
};

const userConfig = [
  {
    name: 'alias',
    validation: 'object',
    setConfig: (config: Config, alias: UserConfig['alias']) => {
      return mergeDefaultValue(config, 'alias', alias);
    },
  },
  {
    name: 'output',
    validation: 'object',
    defaultValue: {
      distType: ['html'],
    },
  },
  {
    name: 'define',
    validation: 'object',
    setConfig: (config: Config, define: UserConfig['define']) => {
      return mergeDefaultValue(config, 'define', define);
    },
  },
  {
    name: 'devPublicPath',
    validation: 'string',
    defaultValue: '/',
    setConfig: (config: Config, publicPath: UserConfig['publicPath'], context: UserConfigContext) => {
      return mergeDefaultValue(config, 'publicPath', context.command === 'start' && publicPath);
    },
  },
  {
    name: 'dataLoader',
    validation: 'boolean|object',
    defaultValue: true,
  },
  {
    name: 'publicPath',
    validation: 'string',
    defaultValue: '/',
    setConfig: (config: Config, publicPath: UserConfig['publicPath'], context: UserConfigContext) => {
      return mergeDefaultValue(config, 'publicPath', context.command === 'build' && publicPath);
    },
  },
  {
    name: 'hash',
    validation: 'string|boolean',
    setConfig: (config: Config, hash: UserConfig['hash']) => {
      return mergeDefaultValue(config, 'hash', hash);
    },
  },
  {
    name: 'externals',
    validation: 'object',
    setConfig: (config: Config, externals: UserConfig['externals']) => {
      return mergeDefaultValue(config, 'externals', externals);
    },
  },
  {
    name: 'outputDir',
    validation: 'string',
    defaultValue: 'build',
    setConfig: (config: Config, outputDir: UserConfig['outputDir']) => {
      return mergeDefaultValue(config, 'outputDir', outputDir);
    },
  },
  {
    name: 'proxy',
    validation: 'object',
    setConfig: (config: Config, proxy: UserConfig['proxy']) => {
      return mergeDefaultValue(config, 'proxy', proxy);
    },
  },
  {
    name: 'polyfill',
    validation: 'string|boolean',
    setConfig: (config: Config, polyfill: UserConfig['polyfill']) => {
      return mergeDefaultValue(config, 'polyfill', polyfill);
    },
  },
  {
    name: 'filename',
    validation: 'string',
    setConfig: (config: Config, filename: UserConfig['filename']) => {
      if (filename) {
        const configFilename: Config['configureWebpack'][0] = (webpackConfig) => {
          webpackConfig.output.filename = filename;
          return webpackConfig;
        };
        config.configureWebpack = [...(config.configureWebpack || []), configFilename];
      }
    },
  },
  {
    name: 'ssg',
    validation: 'boolean',
    defaultValue: true,
  },
  {
    name: 'ssr',
    validation: 'boolean',
    defaultValue: false,
  },
  {
    name: 'server',
    validation: 'object',
    defaultValue: {
      onDemand: false,
      format: 'esm',
      bundle: false,
    },
    setConfig: (_config: Config, server: UserConfig['server']) => {
      if (server.format === 'esm' && server.bundle) {
        logger.error('Do not support bundle in ESM mode. Please set `server.bundle` to false.');
        process.exit(1);
      }
    },
  },
  {
    name: 'postcss',
    validation: 'object',
    defaultValue: {},
    setConfig(config: Config, postcss: UserConfig['postcss']) {
      return mergeDefaultValue(config, 'postcss', postcss);
    },
  },
  {
    name: 'cssModules',
    validation: 'object',
    defaultValue: {},
    setConfig(config: Config, postcss: UserConfig['cssModules']) {
      return mergeDefaultValue(config, 'cssModules', postcss);
    },
  },
  {
    name: 'webpack',
    validation: 'function',
    setConfig: (config: Config, configureWebpack: UserConfig['webpack']) => {
      if (configureWebpack) {
        // create warning for user
        const customConfigWebpack: Config['configureWebpack'][0] = (...args) => {
          logger.warn('It is not recommended to configure webpack directly.');
          return configureWebpack(...args);
        };
        config.configureWebpack = [...(config.configureWebpack || []), customConfigWebpack];
      }
    },
  },
  {
    name: 'minify',
    validation: 'boolean|string|object',
    setConfig: (config: Config, minify: UserConfig['minify'], context: UserConfigContext<Config>) => {
      if (typeof minify === 'boolean' || typeof minify === 'string') {
        config.minify = minify;
      } else if (minify && typeof minify === 'object') {
        config.minify = minify.type;
        config.minimizerOptions = minify.options;
      } else {
        // minify code in build, while disable minify in dev
        config.minify = context.command === 'build';
      }
    },
  },
  {
    name: 'dropLogLevel',
    validation: 'boolean|array|string',
    setConfig: (config: Config, dropLogLevel: UserConfig['dropLogLevel']) => {
      const levels = {
        trace: 0,
        debug: 1, // debug is alias for log
        log: 1,
        info: 2,
        warn: 3,
        error: 4,
      };
      if (typeof dropLogLevel === 'string') {
        const level = levels[dropLogLevel];
        if (typeof level === 'number') {
          return mergeDefaultValue(config, 'minimizerOptions', {
            compress: {
              pure_funcs: Object.keys(levels)
                .filter((methodName) => levels[methodName] <= level)
                .map((methodName) => `console.${methodName}`),
            },
          });
        } else {
          logger.warn(
            `If you use a string as the attribute value of dropLogLevel you should enter one of the following strings [${Object.keys(
              levels,
            ).join(',')}]`,
          );
        }
      } else if (dropLogLevel === true) {
        return mergeDefaultValue(config, 'minimizerOptions', {
          compress: {
            drop_console: true,
          },
        });
      } else if (Array.isArray(dropLogLevel)) {
        const pureFuncs = dropLogLevel.map((method) => `console.${method}`);
        return mergeDefaultValue(config, 'minimizerOptions', {
          compress: {
            pure_funcs: pureFuncs,
          },
        });
      } else if (dropLogLevel !== false) {
        logger.warn('dropLogLevel support boolean, array and string');
      }
    },
  },
  {
    name: 'compileDependencies',
    validation: 'array|boolean',
    getDefaultValue: () => (process.env.NODE_ENV !== 'development'),
    setConfig: (config: Config, customValue: UserConfig['compileDependencies'], context: UserConfigContext) => {
      const speedupMode = context.commandArgs.speedup;
      let compileRegex: RegExp | string | false;
      if (customValue === true) {
        compileRegex = speedupMode ? 'node_modules' : /node_modules\/*/;
      } else if (customValue && customValue.length > 0) {
        compileRegex = new RegExp(
          customValue
            .map((dep: string | RegExp) => {
              if (dep instanceof RegExp) {
                if (speedupMode) {
                  throw new Error('speedup mode does not support config compileDependencies as RegExp');
                }
                return dep.source;
              } else if (typeof dep === 'string') {
                // add default prefix of node_modules
                const matchStr = speedupMode ? dep : `node_modules/?.+${dep}/`;
                return matchStr;
              }
              return false;
            })
            .filter(Boolean)
            .join('|'),
        );
      }
      if (compileRegex) {
        config.compileIncludes = [compileRegex];
      }
    },
  },
  {
    name: 'routes',
    validation: 'object',
  },
  {
    name: 'sourceMap',
    validation: 'string|boolean',
    setConfig: (config: Config, sourceMap: UserConfig['sourceMap']) => {
      return mergeDefaultValue(config, 'sourceMap', sourceMap);
    },
  },
  {
    name: 'tsChecker',
    setConfig: (config: Config, tsChecker: UserConfig['tsChecker']) => {
      if (tsChecker) {
        return mergeDefaultValue(config, 'tsCheckerOptions', {
          issue: {
            include: [
              // only check for source code
              { file: '**/src/**/*' },
            ],
          },
        });
      }
    },
  },
  {
    name: 'eslint',
    validation: 'boolean|object',
    setConfig: (config: Config, eslint: UserConfig['eslint'], context: UserConfigContext) => {
      const { command } = context;
      if (eslint) {
        let dependencyError = false;
        try {
          const { ESLint } = require('eslint');
          const [mainVersion] = ESLint.version.split('.');
          if (mainVersion < 7) {
            dependencyError = true;
          }
        } catch (e) {
          dependencyError = false;
        }
        const dependenciesMsg = 'Please check dependencies of eslint(> 7.0.0)';

        if (dependencyError) {
          logger.warn(dependenciesMsg);
          return;
        }
        let eslintOptions = {
          extensions: ['js', 'ts', 'jsx', 'tsx'],
          lintDirtyModulesOnly: false,
          failOnError: true,
        };
        if (command === 'build') {
          // do not break build when lint error
          eslintOptions.failOnError = false;
        } else {
          // lint only changed files, skip lint on start
          eslintOptions.lintDirtyModulesOnly = true;
        }
        if (typeof eslint === 'object') {
          eslintOptions = {
            ...eslintOptions,
            ...eslint,
          };
        }
        return mergeDefaultValue(config, 'eslintOptions', eslintOptions);
      }
    },
  },
  {
    name: 'transform',
    validation: 'function',
    setConfig: (config: Config, transform: UserConfig['transform']) => {
      config.transforms = config.transforms ? [...config.transforms, transform] : [transform];
    },
  },
  {
    name: 'optimization',
    validation: 'object',
    setConfig: (config: Config, optimization: UserConfig['optimization'], context: UserConfigContext) => {
      const { commandArgs } = context;
      if (optimization?.optimizePackageImport) {
        if (commandArgs.speedup) {
          config.optimizePackageImports = [
            ...new Set([
              ...(Array.isArray(optimization?.optimizePackageImport) ? optimization?.optimizePackageImport : []),
              // Buit-in packages is modified based on
              // https://github.com/vercel/next.js/blob/7b73f1137b21c7b1fb1612c3389caaaadd18da65/packages/next/src/server/config.ts#L827
              '@alifd/next',
              '@ali/uni-api',
              'lucide-react',
              'date-fns',
              'lodash-es',
              'ramda',
              'antd',
              'react-bootstrap',
              'ahooks',
              '@ant-design/icons',
              '@headlessui/react',
              '@headlessui-float/react',
              '@heroicons/react/20/solid',
              '@heroicons/react/24/solid',
              '@heroicons/react/24/outline',
              '@visx/visx',
              '@tremor/react',
              'rxjs',
              '@mui/material',
              '@mui/icons-material',
              'recharts',
              'react-use',
              '@material-ui/core',
              '@material-ui/icons',
              '@tabler/icons-react',
              'mui-core',
              'react-icons/ai',
              'react-icons/bi',
              'react-icons/bs',
              'react-icons/cg',
              'react-icons/ci',
              'react-icons/di',
              'react-icons/fa',
              'react-icons/fa6',
              'react-icons/fc',
              'react-icons/fi',
              'react-icons/gi',
              'react-icons/go',
              'react-icons/gr',
              'react-icons/hi',
              'react-icons/hi2',
              'react-icons/im',
              'react-icons/io',
              'react-icons/io5',
              'react-icons/lia',
              'react-icons/lib',
              'react-icons/lu',
              'react-icons/md',
              'react-icons/pi',
              'react-icons/ri',
              'react-icons/rx',
              'react-icons/si',
              'react-icons/sl',
              'react-icons/tb',
              'react-icons/tfi',
              'react-icons/ti',
              'react-icons/vsc',
              'react-icons/wi',
            ]),
          ];
        } else {
          logger.warn(`
            optimizePackageImport only works in speedup mode,
            try to run \`npm ${commandArgs.command === 'start' ? 'start' : 'run build'} -- --speedup\``,
          );
        }
      }
    },
  },
  {
    name: 'mock',
    validation: 'object',
  },
  {
    name: 'experimental',
    validation: 'object',
  },
  {
    name: 'syntaxFeatures',
    validation: 'object',
    setConfig: (config: Config, syntaxFeatures: UserConfig['syntaxFeatures']) => {
      if (syntaxFeatures) {
        const { exportDefaultFrom, functionBind } = syntaxFeatures;
        if (exportDefaultFrom || functionBind) {
          config.swcOptions = merge(config.swcOptions, {
            compilationConfig: {
              jsc: {
                parser: {
                  exportDefaultFrom: !!exportDefaultFrom,
                  functionBind: !!functionBind,
                },
              },
            },
          });
        }
      }
    },
  },
  {
    name: 'splitChunks',
    validation: 'boolean',
    defaultValue: true,
    setConfig: (config: Config, splitChunks: UserConfig['splitChunks'], context: UserConfigContext) => {
      const { originalUserConfig } = context;
      // Make sure config.splitChunks is not overwritten when codeSplitting is set.
      if (!('codeSplitting' in originalUserConfig)) {
        config.splitChunks = splitChunks;
      }
    },
  },
  {
    name: 'codeSplitting',
    validation: 'boolean|string',
    defaultValue: true,
    setConfig: (config: Config, codeSplitting: UserConfig['codeSplitting'], context: UserConfigContext) => {
      const { originalUserConfig } = context;
      if ('splitChunks' in originalUserConfig) {
        logger.warn(
          'splitChunks is deprecated, please use codeSplitting instead.https://ice.work/docs/guide/basic/config#codesplitting',
        );
      } else {
        // When codeSplitting is set to false / router, do not config splitChunks.
        if (codeSplitting === false || codeSplitting === 'page') {
          config.splitChunks = false;
        } else {
          config.splitChunks = codeSplitting;
        }
      }
    },
  },
  {
    name: 'crossOriginLoading',
    validation: 'boolean|string',
    defaultValue: false,
    setConfig: (config: Config, crossOriginLoading: UserConfig['crossOriginLoading']) => {
      config.output = merge(config.output || {}, {
        crossOriginLoading,
      });
    },
  },
  {
    name: 'featurePolyfill',
    validation: 'object',
    defaultValue: {},
  },
  {
    name: 'htmlGenerating',
    validation: 'boolean|object',
    defaultValue: true,
  },
];

const cliOption = [
  {
    name: 'target',
    commands: ['start', 'build'],
  },
  {
    name: 'open',
    commands: ['start'],
  },
  {
    name: 'list',
    commands: ['start'],
  },
  {
    name: 'speedup',
    commands: ['start', 'build'],
  },
  {
    name: 'mode',
    commands: ['start', 'build', 'test'],
  },
  {
    name: 'analyzer',
    commands: ['start', 'build'],
    setConfig: (config: Config, analyzer: boolean) => {
      return mergeDefaultValue(config, 'analyzer', analyzer);
    },
  },
  {
    name: 'force',
    commands: ['start'],
    setConfig: (config: Config, force: boolean) => {
      if (force && fse.existsSync(config.cacheDir)) {
        fse.emptyDirSync(config.cacheDir);
      }
      return config;
    },
  },
  {
    name: 'https',
    commands: ['start'],
    setConfig: async (config: Config, https: boolean | 'self-signed', context) => {
      let httpsConfig: Config['https'] = false;
      if (https === 'self-signed') {
        const hosts = ['localhost'];
        const { host } = context.commandArgs;
        if (host && host !== 'localhost') {
          hosts.push(host);
        }
        // @ts-expect-error certificateFor types
        const certInfo = await certificateFor(hosts, { silent: true });
        const key = await fse.readFile(certInfo.keyFilePath, 'utf8');
        const cert = await fse.readFile(certInfo.certFilePath, 'utf8');
        httpsConfig = {
          key,
          cert,
        };
      } else if (https === true) {
        httpsConfig = true;
      }
      return mergeDefaultValue(config, 'https', httpsConfig);
    },
  },
  {
    name: 'mock',
    commands: ['start'],
  },
  {
    name: 'plugin',
    commands: ['start', 'build', 'test'],
  },
];

const defaultUserConfig = {};

function defineConfig(config: UserConfig | (() => UserConfig)) {
  if (typeof config === 'function') {
    config = config();
  }
  return config || defaultUserConfig;
}

export { defineConfig, userConfig, cliOption };
