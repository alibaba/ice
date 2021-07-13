import { upperFirst, camelCase } from 'lodash';
import { IPlugin } from 'build-scripts';

interface PluginOptions {
  externalNext: boolean;
  cssVariable: boolean;
  importOptions: Partial<{libraryDirectory: string; style: any}>
}

interface BabelOptions {
  plugins?: [string, ...any][];
  presets?: [string, any][];
}

const plugin: IPlugin = ({ onGetWebpackConfig, getAllTask, context }, options) => {
  const { externalNext, cssVariable = true, importOptions = { style: true, libraryDirectory: 'es' } } = (options || {}) as Partial<PluginOptions>;
  const { userConfig } = context;
  const taskNames = getAllTask();
  // ignore externals rule and babel-plugin-import when compile dist
  const ignoreTasks = ['component-dist'];
  taskNames.forEach((taskName) => {
    onGetWebpackConfig((config) => {
      if (!externalNext && !ignoreTasks.includes(taskName)) {
        const babelPluginImportOptions = {
          libraryName: '@alifd/next',
          ...importOptions,
        };
        if (cssVariable) {
          babelPluginImportOptions.style = (name: string) => `${name}/style2`;
        }
        ['jsx', 'tsx'].forEach((rule) => {
          config.module
            .rule(rule)
            .use('babel-loader')
            .tap((babelOptions: BabelOptions) => {
              const plugins = babelOptions.plugins.concat(
                [require.resolve('babel-plugin-import'), babelPluginImportOptions, babelPluginImportOptions.libraryName]
              );
              return {
                ...babelOptions,
                plugins,
              };
            });
        });
      }

      if (externalNext && !ignoreTasks.includes(taskName)) {
        const externals = [];
        if (userConfig.externals) {
          externals.push(userConfig.externals);
        }
        const feNextRegex = /@alife\/next\/(es|lib)\/([-\w+]+)$/;
        const nextRegex = /@(alife|alifd)\/next\/(es|lib)\/([-\w+]+)$/;
        const baseRegex = /@icedesign\/base\/lib\/([-\w+]+)$/;
        externals.push(function(_context: string, request: string, callback: Function) {
          const isNext = nextRegex.test(request);
          const isDesignBase = baseRegex.test(request);
          if (isNext || isDesignBase) {
            const componentName = isNext ? request.match(nextRegex)[3] : request.match(baseRegex)[1];
            const externalKey = isNext ? 'Next' : 'ICEDesignBase';
            if (componentName) {
              const externalInfo = [externalKey, upperFirst(camelCase(componentName))];
              const commonPackage = feNextRegex.test(request) ? '@alife/next' : '@alifd/next';
              const commonExternal = [isNext ? commonPackage : '@icedesign/base', upperFirst(camelCase(componentName))];
              // compatible with umd export
              return callback(null, {
                root: externalInfo,
                amd: commonExternal,
                commonjs: commonExternal,
                commonjs2: commonExternal,
              });
            }
          } else if (nextRegex.test(_context) && /\.(scss|css)$/.test(request)) {
            // external style files imported by next style.js
            return callback(null, 'Next');
          }
          return callback();
        });
        config.externals(externals);
      }
      // 转化 icon content
      config.module.rule('scss').use('unicode-loader').loader(require.resolve('./webpackLoaders/unicodeLoader')).before('sass-loader');
    });
  });
};

export default plugin;
