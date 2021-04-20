import Context from 'build-scripts/lib/core/Context';
import { init } from '@builder/pack/deps/webpack/webpack';
import path = require('path');

init();
describe('simple test suite', () => {
  const defaultOptions = {
    args: {},
    rootDir: path.join(__dirname, 'fixtures/basic-spa/'),
  };

  test('test module entry', async () => {
    const context = new Context({
      ...defaultOptions,
      command: 'start',
      plugins: [
        [path.join(__dirname, '../src'), {
          moduleEntry: './src/index',
          library: 'moduletest',
          moduleExternals: {
            react: 'React',
          },
        }],
      ],
    });
    const configArr = await context.setUp();
    const config = configArr[0].chainConfig.toConfig();
    expect(config.output.filename).toBe('./[name]/index.js');
    expect(config.output.library).toBe('moduletest');
    expect(config.output.libraryTarget).toBe('umd');
    expect(config.externals).toStrictEqual({
      react: 'React',
    });
  });
});