# webpack-plugin-import

自动引入组件 style.js

## Why

为了避免开发过程中开发者需要手动引入组件样式，通过工程的方式自动引入。如果只是使用基础组件，那么直接用 babel-plugin-import 配置固定包名即可实现，但是如果有业务组件（不可枚举的 npm），则需要通过该插件解决。

## Feature

- 如果依赖 npm 的 package.json 里有 componentConfig 字段（ice-devtools 生成），则默认引入 style.js
- 根据参数对于指定的包名引入 style.js

## Use

```js
const WebpackConfig = require('webpack-chain');
const WebpackPluginImport = require('webpack-plugin-import');

const config = new WebpackConfig();
config.plugin('import').use(WebpackPluginImport, [
  // 如果不能保证 npm 里有 componentConfig 字段，则通过白名单方式指定
  {
    libraryName: /^@icedesign\/base\/lib\/([^/]+)/,
    stylePath: 'style.js',
  },
  {
    libraryName: /@icedesign\/.*/,
    stylePath: 'style.js',
  },
  {
    libraryName: /^@alifd\/next\/lib\/([^/]+)/,
    stylePath: 'style.js',
  },
  {
    libraryName: /@alifd\/.*/,
    stylePath: 'style.js',
  },
]);
```