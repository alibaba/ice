---
title: 自定义webpack配置
order: 4
---

`ice-scripts` 内部的基础 webpack 配置都是通过 [webpack-chain](https://github.com/neutrinojs/webpack-chain) 生成的，它通过 webpack 配置链式操作的 API，并可以定义具体 loader 规则和 webpack 插件的名称，可以让开发者更加细粒度修改 webpack 配置。

- [loader 规则命名](https://github.com/alibaba/ice/tree/master/tools/ice-scripts/lib/config/setWebpackLoaders.js)
- [webpack 插件命名](https://github.com/alibaba/ice/tree/master/tools/ice-scripts/lib/config/setWebpackPlugins.js)

`ice.config.js` 中提供的 `chainWebpack` 提供自定义 webpack 修改的接口。`chainWebpack` 接收两个参数：

- `config`: 链式的 webpack 配置，基于 `webpack-chain` 的 API 进行修改
- `options`: `{ command }` 命令执行参数，`command` 为当前执行命令 `dev | build`

## 修改 webpack 基础配置

```js
// ice.config.js
module.exports = {
  chainWebpack: (config) => {
    // 修改 webpack devServer.hot
    config.devServer.hot('dist');

    // 修改 webpack output.path
    config.output.path('dist');
  }
}
```

## 新增一个 Loader 配置

```js
// ice.config.js
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('new-rule')
      .test(/\.scss$/)
      .use('sass-loader')
        .loader('sass-loader');
  }
}
```

## 修改已有 Loader 配置

```js
// ice.config.js
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('scss')  // ice-scripts 中已定义这条规则
      .use('sass-loader')
        .loader('sass-loader')
        .tap(options => {
          // 根据需求修改 options 中的配置
          return options;
        });
  }
}
```

## 新增 webpack 插件

```js
// ice.config.js
const WebpackPluginImport = require('webpack-plugin-import');

module.exports = {
  chainWebpack: (config) => {
    config
      // 定义插件名称
      .plugin('WebpackPluginImport')
      // 第一项为具体插件，第二项为插件参数
      .use(WebpackPluginImport, [[
        {
          libraryName: /@ali\/ice-.*/,
          stylePath: 'style.js',
        },
      ]]);
  }
}
```

## 修改已有 webpack 插件

```js
// ice.config.js
module.exports = {
  chainWebpack: (config) => {
    config
      .plugin('WebpackPluginImport')
      .tap(args => {
        // 根据需求返回 WebpackPluginImport 插件构造函数的参数
        return [];
      });
  }
}
```

## 自定义不同命令下的 webpack 配置

```js
// ice.config.js
module.exports = {
  chainWebpack: (config, { command }) => {
    // 执行 ice-scripts dev 命令时
    if (command === 'dev') {
      config.devServer.historyApiFallback(true);
    }

    // 执行 ice-scripts build 命令时
    if (command === 'build') {
      config.optimization.minimize(true);
    }
  }
}
```
