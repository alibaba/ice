const cliOptions = require('../../lib/plugins/cliOptions');
const Config = require('webpack-chain');

const config = new Config();
const api = {
  chainWebpack: (fn) => {
    fn(config);
  },
  commandArgs: {
    disabledReload: true,
  },
};


test('test cliOptions', () => {
  cliOptions(api);
});
