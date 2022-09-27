import { createRequire } from 'module';
import trustCert from '@ice/bundles/compiled/trusted-cert/index.js';
import fse from 'fs-extra';
import consola from 'consola';
import type { UserConfig, Config } from '@ice/types';
import type { UserConfigContext } from 'build-scripts';
import lodash from '@ice/bundles/compiled/lodash/index.js';

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
    validation: 'boolean',
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
    defaultValue: true,
  },
  {
    name: 'server',
    validation: 'object',
    defaultValue: {
      format: 'esm',
      bundle: false,
    },
    setConfig: (_config: Config, server: UserConfig['server']) => {
      if (server.format === 'esm' && server.bundle) {
        consola.error('Do not support bundle in ESM mode. Please set `server.bundle` to false.');
        process.exit(1);
      }
    },
  },
  {
    name: 'webpack',
    validation: 'function',
    setConfig: (config: Config, configureWebpack: UserConfig['webpack']) => {
      if (configureWebpack) {
        // create warning for user
        const customConfigWebpack: Config['configureWebpack'][0] = (...args) => {
          consola.warn('It is not recommended to configure webpack directly.');
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
    validation: 'string',
    setConfig: (config: Config, dropLogLevel: UserConfig['dropLogLevel']) => {
      const levels = {
        trace: 0,
        debug: 1, // debug is alias for log
        log: 1,
        info: 2,
        warn: 3,
        error: 4,
      };
      const level = levels[dropLogLevel];
      if (typeof level === 'number') {
        return mergeDefaultValue(config, 'minimizerOptions', {
          compress: {
            pure_funcs: Object.keys(levels)
              .filter((methodName) => levels[methodName] <= level)
              .map(methodName => `console.${methodName}`),
          },
        });
      } else {
        consola.warn(`dropLogLevel only support [${Object.keys(levels).join(',')}]`);
      }
    },
  },
  {
    name: 'compileDependencies',
    validation: 'array|boolean',
    getDefaultValue: () => (process.env.NODE_ENV === 'development' ? false : [/node_modules\/*/]),
    setConfig: (config: Config, customValue: UserConfig['compileDependencies']) => {
      let compileRegex: RegExp | false;
      if (customValue === true) {
        compileRegex = /node_modules\/*/;
      } else if (customValue && customValue.length > 0) {
        compileRegex = new RegExp(customValue.map((dep: string | RegExp) => {
          if (dep instanceof RegExp) {
            return dep.source;
          } else if (typeof dep === 'string') {
            // add default prefix of node_modules
            const matchStr = `node_modules/?.+${dep}/`;
            return matchStr;
          }
          return false;
        }).filter(Boolean).join('|'));
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
          consola.warn(dependenciesMsg);
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
    setConfig: (config: Config, splitChunks: UserConfig['splitChunks']) => {
      config.splitChunks = splitChunks;
    },
  },
];

const cliOption = [
  {
    name: 'platform',
    commands: ['start', 'build'],
  },
  {
    name: 'open',
    commands: ['start'],
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
];


export {
  userConfig,
  cliOption,
};
