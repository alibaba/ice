const Config = require('webpack-chain');
const path = require('path');
const userConfigPlugin = require('../../lib/plugins/userConfig');

const MockApi = function () {
  this.config = new Config();
  this.chainWebpack = (fn) => {
    fn(this.config);
  };
};

describe('user config', () => {
  describe('entry', () => {
    test('string entry', () => {
      const api = new MockApi();
      api.service = { userConfig: { entry: 'src/index.js' }, commandArgs: {} };
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
});
