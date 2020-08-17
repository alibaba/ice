import Context from '@alib/build-scripts/lib/core/Context';

import path = require('path');

describe('simple test suite', () => {
  const defaultOptions = {
    args: {},
    rootDir: path.join(__dirname, 'fixtures/basic-spa/'),
  };

  test('test emtpty webpack', async () => {
    const context = new Context({
      ...defaultOptions,
      command: 'start',
      plugins: [
        [path.join(__dirname, '../src'), {}],
      ],
    });
    const configArr = await context.setUp();
    expect(configArr).toStrictEqual([]);
  });

  test('test module entry', async () => {
    const context = new Context({
      ...defaultOptions,
      command: 'start',
      plugins: [
        [path.join(__dirname, '../src'), {
          moduleEntry: './src/index',
          library: 'moduletest',
          externals: {
            react: 'React',
          },
        }],
      ],
    });
    const configArr = await context.setUp();
    const config = configArr[0].chainConfig.toConfig();
    expect(config.output.filename).toBe('[name].js');
    expect(config.output.library).toBe('moduletest');
    expect(config.output.libraryTarget).toBe('umd');
    expect(config.externals).toStrictEqual({
      react: 'React',
    });
  });
});