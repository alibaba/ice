---
title: 自定义 webpack 配置
order: 4
---

ice-scripts 内部的基础 webpack 配置都是通过 [webpack-chain](https://github.com/neutrinojs/webpack-chain) 生成的，它通过 webpack 配置链式操作的 API，并可以定义具体 loader 规则和 webpack 插件的名称，可以让开发者更加细粒度修改 webpack 配置。

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

## 新增 webpack loader

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

## 修改已有 webpack loader

内置 webpack loader 请参考 [loader 规则命名](https://github.com/ice-lab/ice-scripts/blob/master/packages/ice-scripts/lib/config/setWebpackLoaders.js)。

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

内置 webpack plugin 请参考 [webpack 插件命名](https://github.com/ice-lab/ice-scripts/blob/master/packages/ice-scripts/lib/config/setWebpackPlugins.js)。

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

## 修改指定命令的 webpack 配置

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

## 常见 webpack 定制需求

### 配置 splitChunks

通过配置 splitChunks 实现第三方库分离：

```js
module.exports = {
  chainWebpack: (config, { command }) => {
    config.optimization.splitChunks({ cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/, // 匹配 node_modules 目录
        name: 'vendor',
        chunks: 'all',
        minChunks: 1,
      },
    }});
  }
}
```

### 修改 UglifyJsPlugin

ice-scripts 内置了 `uglifyjs-webpack-plugin` 的实践配置，可以通过定制能力修改默认配置：

```js
module.exports = {
  chainWebpack: (config, { command }) => {
    // 仅在 build 构建下会存在 UglifyJsPlugin
    if (command === 'build') {
      // 生成 soruce-map 进行调试
      config.devtool('source-map');
      config.optimization
        .minimizer('UglifyJsPlugin')
        .tap(([options]) => [
          {
            ...options,
            sourceMap: true,
          },
        ]);
    }
  }
}
```

### 修改 babel 配置

ice-scripts 的 babel 配置同样可以通过 `webpack-chain` 方式进行修改：

```js
module.exports = {
  chainWebpack: (config, { command }) => {
    // 内置 jsx 和 tsx 规则均会使用到 babel 配置
    ['jsx', 'tsx'].forEach((rule) => {
      config.module
        .rule(rule)
        .use('babel-loader')
        .tap((options) => {
          // 添加一条 babel plugin，同理可添加 presets
          options.plugins.push(require.resolve('babel-plugin-transform-jsx-list'));

          // 修改 babel preset 配置，同理可修改 plugins
          options.presets = options.presets.map((preset) => {
            if (Array.isArray(preset)) {
              const [modulePath, presetOptions] = preset;
              // 判断指定配置
              if (modulePath.indexOf('preset-env') > -1) {
                return [
                  modulePath,
                  // 自定义新的 options
                  { ...presetOptions, modules: false },
                ];
              }
            }
            return preset;
          });
          return options;
        });
    });
  }
}
```

### 查看 webpack 配置

`ice-scripts` 中通过 webpack-chain 的方式管理 webpack 配置，如果想要查看具体的 webpack 配置信息，可以参考下面的文档。

#### 查看所有 webpack 配置

```js
const Config = require('webpack-chain');
module.exports = {
  chainWebpack: (config) => {
    // 通过 Config.toString 的方法输出当前 config 配置
    console.log(Config.toString(config));
  }
}
```

#### 查看 rule 配置

```js
const Config = require('webpack-chain');
module.exports = {
  chainWebpack: (config) => {
    // 输出所有定义的 rule 配置
    console.log(Config.toString(config.module.toConfig().rules));

    // 输出指定 rule 的配置
    const ruleName = 'scss';
    console.log(Config.toString(
      config.module.rule(ruleName).toConfig(),
    ));
  }
}
```

#### 查看 plugin 配置

```js
const Config = require('webpack-chain');
module.exports = {
  chainWebpack: (config) => {
    // 输出所有定义的 plugin 配置
    console.log(Config.toString(config.toConfig().plugins));

    // 输出指定 rule 的配置
    const pluginName = 'WebpackPluginImport';
    console.log(Config.toString(
      config.plugins.get(pluginName).toConfig(),
    ));
  }
}
```
