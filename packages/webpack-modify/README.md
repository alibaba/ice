# @ice/webpack-modify

This package providers several APIs to simplify the modification of webpack configurations.

## Usage

```js
import { removeLoader, modifyLoader, addLoader, removePlugin } from '@ice/webpack-modify';

let modifiedConfig = {};

const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "sass-loader" }],
      },
    ],
  },
};

// remove loader
modifiedConfig = removeLoader(webpackConfig, {
  rule: 'css',
  loader: 'style-loader',
});
// modify loader
modifiedConfig = modifyLoader(webpackConfig, {
  rule: 'css',
  loader: 'style-loader',
  options: () => ({}),
});
// add loader
modifiedConfig = addLoader(webpackConfig, {
  rule: 'css',
  before: 'style-loader'
});
modifiedConfig = addLoader(webpackConfig, {
  rule: 'css',
  after: 'style-loader'
});
// modify webpack rule options
modifiedConfig = modifyRule(webpackConfig, {
  rule: 'css',
  options: () => {
    return [
      {
        loader: 'css-loader',
        options: () => ([]),
      },
    ]
  },
})
// remove plugin
modifiedConfig = removePlugin(webpackConfig, {
  pluginName: 'AssetsManifestPlugin',
});
```
