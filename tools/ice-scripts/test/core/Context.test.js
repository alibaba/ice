const path = require('path');
const Context = require('../../lib/core/Context');

describe('init context', () => {
  const context = new Context({
    command: 'dev',
    rootDir: path.join(__dirname, '../fixtures/service'),
    args: {
      disabledReload: false,
    },
  });
  test('get ice.config.js', () => {
    expect(context.userConfig.publicPath).toBe('/');
  });
  test('load plugins', () => {
    // builtInPlugins length is 2
    expect(context.plugins.length).toBe(5);
  });

  it('plugin with option', async () => {
    await context.runPlugins();
    const webpackConfig = context.getWebpackConfig();
    expect(webpackConfig.resolve.alias).toEqual({ react: 'b' });
  });

  it('require plugin', async () => {
    await context.runPlugins();
    const webpackConfig = context.getWebpackConfig();
    expect(webpackConfig.output.filename).toBe('[name].bundle.js');
  });

  it('plugin defined by string', async () => {
    await context.runPlugins();
    const webpackConfig = context.getWebpackConfig();
    expect(webpackConfig.output.path).toBe('custom');
  });

  it('default values', async () => {
    await context.runPlugins();
    const webpackConfig = context.getWebpackConfig();
    expect(webpackConfig.resolve.extensions).toEqual(['.js', '.jsx', '.json', '.html', '.ts', '.tsx']);
    expect(webpackConfig.entry.index).toEqual([
      require.resolve('@babel/polyfill'),
      require.resolve('react-dev-utils/webpackHotDevClient'),
      path.resolve(process.cwd(), 'src/index.js'),
    ]);
  });
});

