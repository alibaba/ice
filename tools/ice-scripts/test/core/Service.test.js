const path = require('path');
const Service = require('../../lib/core/Service');

describe('init service', () => {
  const service = new Service({
    context: path.join(__dirname, '../fixtures/getConfig'),
    args: {
      disabledReload: true,
    },
  });
  test('get ice.config.js', () => {
    expect(service.userConfig.publicPath).toBe('/');
  });
  test('load plugins', () => {
    // builtInPlugins length is 2
    expect(service.plugins.length).toBe(5);
  });
  describe('run plugins', () => {
    service.runPlugins();
    const webpackConfig = service.getWebpackConfig();

    test('plugin with option', () => {
      expect(webpackConfig.resolve.alias).toEqual({ react: 'b' });
    });

    test('require plugin', () => {
      expect(webpackConfig.output.filename).toBe('[name].bundle.js');
    });

    test('plugin defined by string', () => {
      expect(webpackConfig.output.path).toBe('custom');
    });
  });
});

