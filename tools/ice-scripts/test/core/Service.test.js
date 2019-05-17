const path = require('path');
const Service = require('../../lib/core/Service');

describe('init service', () => {
  const service = new Service({
    context: path.join(__dirname, '../fixtures/service'),
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

  it('plugin with option', async () => {
    await service.runPlugins();
    const webpackConfig = service.getWebpackConfig();
    expect(webpackConfig.resolve.alias).toEqual({ react: 'b' });
  });

  it('require plugin', async () => {
    await service.runPlugins();
    const webpackConfig = service.getWebpackConfig();
    expect(webpackConfig.output.filename).toBe('[name].bundle.js');
  });

  it('plugin defined by string', async () => {
    await service.runPlugins();
    const webpackConfig = service.getWebpackConfig();
    expect(webpackConfig.output.path).toBe('custom');
  });

  it('default values', async () => {
    await service.runPlugins();
    const webpackConfig = service.getWebpackConfig();
    expect(webpackConfig.resolve.modules[0]).toBe('node_modules');
    expect(webpackConfig.resolve.extensions).toEqual(['.js', '.jsx', '.json', '.html', '.ts', '.tsx']);
  });
});

