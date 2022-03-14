import * as MiniCssExtractPlugin from '@builder/pack/deps/mini-css-extract-plugin';
import * as FilterWarningsPlugin from '@builder/pack/deps/webpack-filter-warnings-plugin';
import * as SimpleProgressPlugin from '@builder/pack/deps/webpack-simple-progress-plugin';
import * as CaseSensitivePathsPlugin from '@builder/pack/deps/case-sensitive-paths-webpack-plugin';

export default (config) => {
  config
    .plugin('MiniCssExtractPlugin')
    .use(MiniCssExtractPlugin, [{
      filename: '[name].css',
    }])
    .end()
    .plugin('FilterWarningsPlugin')
    .use(FilterWarningsPlugin, [{
      exclude: /Conflicting order between:/,
    }])
    .end()
    .plugin('SimpleProgressPlugin')
    .use(SimpleProgressPlugin)
    .end()
    .plugin('CaseSensitivePathsPlugin')
    .use(CaseSensitivePathsPlugin);
};
