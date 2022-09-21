import { expect, it, describe } from 'vitest';
import type { Configuration } from 'webpack';
import { removeLoader, addLoader, modifyLoader, modifyRule, removePlugin } from '../src/index';

describe('test webpack config modify', () => {
  const getWebpackConfig = () => ({
    module: {
      rules: [
        {
          test: /.css$/,
          use: [
            {
              loader: '/absoulte/path/to/postcss-loader',
            },
            {
              loader: '/absoulte/path/to/css-loader',
            },
          ],
        },
      ],
    },
  });
  it('remove loader', () => {
    const webpackConfig: Configuration = getWebpackConfig();
    expect(removeLoader(webpackConfig, {
      rule: '.css',
      loader: 'css-loader',
    })).toStrictEqual({
      module: {
        rules: [{
          test: /.css$/,
          use: [
            {
              loader: '/absoulte/path/to/postcss-loader',
            },
          ],
        }],
      },
    });
  });
  it('add loader', () => {
    expect(addLoader(getWebpackConfig(), {
      rule: '.css',
      useItem: {
        loader: 'custom-loader',
      },
      before: 'css-loader',
    })).toStrictEqual({
      module: {
        rules: [{
          test: /.css$/,
          use: [
            {
              loader: '/absoulte/path/to/postcss-loader',
            },
            {
              loader: 'custom-loader',
            },
            {
              loader: '/absoulte/path/to/css-loader',
            },
          ],
        }],
      },
    });
    expect(addLoader(getWebpackConfig(), {
      rule: '.css',
      useItem: {
        loader: 'custom-loader',
      },
      after: 'css-loader',
    })).toStrictEqual({
      module: {
        rules: [{
          test: /.css$/,
          use: [
            {
              loader: '/absoulte/path/to/postcss-loader',
            },
            {
              loader: '/absoulte/path/to/css-loader',
            },
            {
              loader: 'custom-loader',
            },
          ],
        }],
      },
    });
  });
  it('modify loader', () => {
    expect(modifyLoader(getWebpackConfig(), {
      rule: '.css',
      loader: 'css-loader',
      options: () => ({ module: true }),
    })).toStrictEqual({
      module: {
        rules: [{
          test: /.css$/,
          use: [
            {
              loader: '/absoulte/path/to/postcss-loader',
            },
            {
              loader: '/absoulte/path/to/css-loader',
              options: { module: true },
            },
          ],
        }],
      },
    });
  });
  it('modify rule', () => {
    const webpackConfig = getWebpackConfig();
    webpackConfig.module.rules.push({
      test: /.less/,
      use: [],
    });
    expect(modifyRule(webpackConfig, {
      rule: '.css',
      options: () => ({
        test: /.css$/,
        use: [],
      }),
    })).toStrictEqual({
      module: {
        rules: [{
          test: /.css$/,
          use: [],
        }, {
          test: /.less/,
          use: [],
        }],
      },
    });
  });
  it('remove plugin', () => {
    class TestPlugin {}
    expect(removePlugin({
      plugins: [
        // @ts-ignore fake webpack plugin
        new TestPlugin(),
      ],
    }, 'TestPlugin')).toStrictEqual({
      plugins: [],
    });
  });
  it('miss loader', () => {
    expect(removeLoader(getWebpackConfig(), {
      rule: '.css',
      loader: 'test-loader',
    })).toStrictEqual(getWebpackConfig());
    expect(removeLoader(getWebpackConfig(), {
      rule: '.test',
      loader: 'css-loader',
    })).toStrictEqual(getWebpackConfig());
  });
});