const Config = require('webpack-chain');
const path = require('path');
const userConfigPlugin = require('../../lib/plugins/userConfig');
const processEntry = require('../../lib/config/processEntry');

const MockApi = function () {
  this.config = new Config();
  this.chainWebpack = (fn) => {
    fn(this.config);
  };
  this.processEntry = (entry) => {
    const { commandArgs, command, userConfig } = this.service;
    return processEntry(entry, {
      polyfill: userConfig.injectBabel !== 'runtime',
      hotDev: command === 'dev' && !commandArgs.disabledReload,
    });
  };
};

describe('user config', () => {
  describe('entry', () => {
    test('string entry', () => {
      const api = new MockApi();
      api.service = { userConfig: { entry: 'src/index.js' }, commandArgs: {} };
      api.config.entry('index').add('src/test.js');
      userConfigPlugin(api);
      expect(api.config.toConfig().entry.index).toEqual([
        require.resolve('@babel/polyfill'),
        path.resolve(process.cwd(), 'src/index.js'),
      ]);
    });

    test('entry add hotDev', () => {
      const api = new MockApi();
      api.service = {
        userConfig: { entry: 'src/index.js', injectBabel: 'runtime' },
        command: 'dev',
        commandArgs: {},
      };
      userConfigPlugin(api);
      expect(api.config.toConfig().entry.index).toEqual([
        require.resolve('react-dev-utils/webpackHotDevClient'),
        path.resolve(process.cwd(), 'src/index.js'),
      ]);
    });

    test('multi entris', () => {
      const api = new MockApi();
      api.service = {
        userConfig: {
          entry: {
            index: 'src/index.js',
            dashboard: 'src/dashboard.js',
          },
          injectBabel: 'runtime',
        },
        commandArgs: {},
      };
      userConfigPlugin(api);
      expect(api.config.toConfig().entry).toEqual({
        index: [path.resolve(process.cwd(), 'src/index.js')],
        dashboard: [path.resolve(process.cwd(), 'src/dashboard.js')],
      });
    });
  });

  describe('hash', () => {
    test('config hash is true', () => {
      const api = new MockApi();
      api.service = {
        userConfig: { hash: true },
      };
      api.config.output.filename('js/[name].js');
      expect(api.config.output.get('filename')).toBe('js/[name].js');
      userConfigPlugin(api);
      expect(api.config.output.get('filename')).toBe('js/[name].[hash:6].js');
    });
  });

  describe('outputAssetsPath', () => {
    test('set up outputAssetsPath', () => {
      const api = new MockApi();
      api.service = {
        userConfig: {
          outputAssetsPath: {
            js: 'test/js',
            css: 'test/css',
          },
        },
      };
      api.config.output.filename('js/[name].[hash:6].js');
      userConfigPlugin(api);
      expect(api.config.output.get('filename')).toBe('test/js/[name].[hash:6].js');
    });
  });
});
