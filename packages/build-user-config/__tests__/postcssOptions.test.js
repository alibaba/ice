import Config from 'webpack-chain';
import postcssOptions from '../src/userConfig/postcssOptions';

let config = null;
let consoleWarn = console.warn;

// silent warn of postcss plugin
beforeAll(() => {
  console.warn = jest.fn();
});

afterAll(() => {
  console.warn = consoleWarn;
});

describe('merge postcss options when postcss-loader is v3', () => {
  beforeEach(() => {
    config = new Config();

    config.module
      .rule('css')
      .use('postcss-loader')
      .loader(require.resolve('postcss-loader'))
      .options({
        sourceMap: true,
        plugins: [
          'postcss-import',
          [
            'postcss-preset-env',
            {
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            },
          ],
          'postcss-plugin-rpx2vw',
        ],
      });
  });

  afterEach(() => {
    config = null;
  });

  it('should convert default options in rax correctly', () => {
    const outerOptions = {};
    postcssOptions(config, outerOptions);

    const { options: innerOptions } = config.module
      .rule('css')
      .use('postcss-loader')
      // @ts-ignore
      .toConfig();

    expect(innerOptions.sourceMap).toEqual(true);
    expect(innerOptions.plugins).toHaveLength(3);
    expect(innerOptions.postcssOptions).toBeUndefined();

    expect(innerOptions).toMatchSnapshot();
  });

  // see: https://github.com/webpack-contrib/postcss-loader/tree/v3.0.0#options
  it('should convert root options correctly', () => {
    const outerOptions = {
      exec: true,
      sourceMap: false,
      parser: 'sugarss',
      syntax: 'sugarss',
      stringifier: 'midas',
      config: {},
      plugins: [],
    };
    postcssOptions(config, outerOptions);

    const { options: innerOptions } = config.module
      .rule('css')
      .use('postcss-loader')
      // @ts-ignore
      .toConfig();

    expect(innerOptions.exec).toEqual(true);
    expect(innerOptions.sourceMap).toEqual(false);
    expect(innerOptions.parser).toEqual('sugarss');
    expect(innerOptions.syntax).toEqual('sugarss');
    expect(innerOptions.stringifier).toEqual('midas');
    expect(innerOptions.config).toMatchObject({});
    expect(innerOptions.plugins).toHaveLength(3);

    expect(innerOptions).toMatchSnapshot();
  });

  it('should merge plugin correctly', () => {
    const outerOptions = {
      plugins: {
        'postcss-plugin-rpx2vw': false,
      },
    };
    postcssOptions(config, outerOptions);

    const { options: innerOptions } = config.module
      .rule('css')
      .use('postcss-loader')
      // @ts-ignore
      .toConfig();

    expect(innerOptions.sourceMap).toEqual(true);
    expect(innerOptions.plugins).toHaveLength(2);

    expect(innerOptions).toMatchSnapshot();
  });
});

describe('merge postcss options when postcss-loader is v5', () => {
  beforeEach(() => {
    config = new Config();

    config.module
      .rule('css')
      .use('postcss-loader')
      .loader(require.resolve('postcss-loader'))
      .options({
        sourceMap: true,
        postcssOptions: {
          plugins: [
            'postcss-import',
            [
              'postcss-preset-env',
              {
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              },
            ],
            'postcss-plugin-rpx2vw',
          ],
        },
      });
  });

  afterEach(() => {
    config = null;
  });

  it('should convert default options in rax correctly', () => {
    const outerOptions = {};
    postcssOptions(config, outerOptions);

    const { options: innerOptions } = config.module
      .rule('css')
      .use('postcss-loader')
      // @ts-ignore
      .toConfig();

    expect(innerOptions.sourceMap).toEqual(true);
    expect(innerOptions.plugins).toBeUndefined();
    expect(innerOptions.postcssOptions).toBeDefined();
    expect(innerOptions.postcssOptions.plugins).toHaveLength(3);

    expect(innerOptions).toMatchSnapshot();
  });

  // see: https://github.com/webpack-contrib/postcss-loader/tree/v5.3.0#options
  it('should convert root options correctly', () => {
    const outerOptions = {
      exec: true,
      sourceMap: false,
      parser: 'sugarss',
      syntax: 'sugarss',
      stringifier: 'midas',
      plugins: [],
      map: false,
    };

    postcssOptions(config, outerOptions);

    const { options: innerOptions } = config.module
      .rule('css')
      .use('postcss-loader')
      // @ts-ignore
      .toConfig();

    expect(innerOptions.execute).toEqual(true);
    expect(innerOptions.exec).toBeUndefined();
    expect(innerOptions.sourceMap).toEqual(false);
    expect(innerOptions.postcssOptions.parser).toEqual('sugarss');
    expect(innerOptions.postcssOptions.syntax).toEqual('sugarss');
    expect(innerOptions.postcssOptions.stringifier).toEqual('midas');
    expect(innerOptions.postcssOptions.plugins).toHaveLength(3);
    expect(innerOptions.postcssOptions.map).toEqual(false);

    expect(innerOptions).toMatchSnapshot();
  });

  it('should merge plugin correctly', () => {
    const outerOptions = {
      plugins: {
        'postcss-plugin-rpx2vw': false,
      },
    };
    postcssOptions(config, outerOptions);

    const { options: innerOptions } = config.module
      .rule('css')
      .use('postcss-loader')
      // @ts-ignore
      .toConfig();

    expect(innerOptions.sourceMap).toEqual(true);
    expect(innerOptions.postcssOptions.plugins).toHaveLength(2);

    expect(innerOptions).toMatchSnapshot();
  });
});
