---
title: 自定义webpack配置
order: 4
---

### 链式修改webpack配置

`ice-scripts` 内部的基础webpack配置都是通过 [webpack-chain](https://github.com/neutrinojs/webpack-chain) 生成的，它通过webpack配置链式操作的API，并可以定义具体loader规则和webpack插件的名称，可以让开发者更加细粒度修改webpack配置。

- [Loader规则命名](https://github.com/alibaba/ice/tree/master/tools/ice-scripts/lib/config/setWebpackLoaders.js)
- [webpack插件命名](https://github.com/alibaba/ice/tree/master/tools/ice-scripts/lib/config/setWebpackPlugins.js)

`ice.config.js` 中提供的 `chainWebpack` 提供自定义webpack修改的接口。`chainWebpack` 接收两个参数：

- `config`: 链式的webpack配置，基于 `webpack-chain` 的API进行修改
- `opts`: `{ command, commandArgs }` 命令执行参数，`command` 为当前执行命令`dev | build` ， `commandArgs` 为cli命令参数

#### 修改常见webpack配置

```js
// ice.config.js
module.exports = {
  // 
  chainWebpack: (config, { command }) => {
    if (command === 'dev') {
      // 修改webpack devServer.hot
      config.devServer.hot('dist');
    } else {
      // 修改webpack output.path
      config.output.path('dist');
    }
  }
}

```

#### 添加一个Loader

```js
// ice.config.js
module.exports = {
  // 
  chainWebpack: (config) => {
    config.module
      .rule('new-rule')
      .test(/\.scss$/)
      .use('sass-loader')
        .loader('sass-loader');
  }
}
```

#### 修改Loader配置

```js
// ice.config.js
module.exports = {
  // 
  chainWebpack: (config) => {
    config.module
      .rule('scss')  // ice-scripts中已定义这条规则
      .use('sass-loader')
        .loader('sass-loader')
        .tap(options => {
          // 根据需求修改options中的配置
          return options;
        });
  }
}
```

#### 添加webpack插件

```js
// ice.config.js
const WebpackPluginImport = require('webpack-plugin-import');

module.exports = {
  // 
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

#### 修改webpack插件

```js
// ice.config.js
module.exports = {
  // 
  chainWebpack: (config) => {
    config
      .plugin('WebpackPluginImport')
      .tap(args => {
        // 根据需求返回WebpackPluginImport插件构造函数的参数
        return [];
      });
  }
}
```
