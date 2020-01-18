---
title: 工程插件开发
order: 1
---

ice-scripts 通过插件机制，扩展其项目编译和命令运行时的能力。便于常见构建需求和复用解决方案的共享。

插件本质上是一个 JS 模块（npm 包），约定插件初始化模版如下：

```js
module.exports = ({ context, chainWebpack, log, onHook }, options) => {
  // 第一项参数为插件 API 提供的能力
  // options：插件自定义参数
};
```

插件方法会收到两个参数，第一个参数是插件提供的 API 接口和能力，推荐结构方式按需使用 API，第二个参数 `options` 是插件自定义的参数，由插件开发者决定其值。

## 插件 API

通过插件提供的 API，可以方便拓展和自定义能力。

### context

通过 `context` 访问命令运行时的相关参数：

- `context.command`：当前运行命令，值为 `dev | build`
- `context.commandArgs`：cli 命令的 optios 参数，如执行 `ice-scripts dev --https` 则其内容为 `{ https: true }`
- `context.rootDir`：当前命令运行目录
- `context.userConfig`：用户配置 `ice.config.js` 中的配置（与默认配置会进行 deepMerge）
- `context.pkg`：命令运行项目的 `package.json` 信息

```js
module.exports = ({ context }) => {
  const { userConfig, command } = context;
  if (userConfig.entry) {
    console.log('config entry :', userConfig.entry);
  }
  if (command === 'dev') {
    console.log('do someting');
  }
};
```
### chainWebpack

通过 `chainWepack` 对 webpack 配置进行自定义

```js
module.exports = ({ chainWepack }) => {
  chainWebpack(config => {
    // 通过 webpack-chain 修改 webpack 配置
    config.devServer.hot('dist');
    config.output.path('dist');
  })
}
```

更多 webpack-chain 用法，参考 [自定义 webpack 配置](/docs/cli/config/custom-webpack.md)

### log

通过 `log` 向插件提供统一的日志输出方法

```js
module.exports = ({ log }) => {
  log.verbose('verbose');
  log.info('info');
  log.error('error');
  log.warn('warn');
}
```

### onHook

通过 `onHook` 监听命令运行事件。

目前支持监听四种事件：

- `beforeDev`：执行dev命令脚本前
- `afterDev`：完成dev命令脚本后
- `beforeBuild`：执行build命令脚本前
- `afterBuild`：完成build命令脚本后

```js
module.exports = ({ onHook }) => {
  onHook('beforeDev', () => {
    // some code before dev
  });

  onHook('afterDev', (stats) => {
    // 通过stats可以判断webpack是否执行成功
  });
}
```

## 插件开发示例

下面是 ice-scrpts-plugin-css-assets-local 插件的代码示例

```js
const ExtractCssAssetsWebpackPlugin = require('extract-css-assets-webpack-plugin');

module.exports = ({ context, log, chainWebpack }, options) => {
  const { command } = context;
  // 仅在运行 ice-scripts build 的时候执行
  if (command === 'build') {
    log.info('离线化构建项目，自动下载网络资源，请耐心等待');

    chainWebpack((config) => {
      // 添加 extract-css-assets-webpack-plugin 插件
      config.plugin('ExtractCssAssetsWebpackPlugin')
        .use(ExtractCssAssetsWebpackPlugin, [{
          outputPath: options.outputPath || 'assets',
          relativeCssPath: options.relativeCssPath || '../',
        }]);
    });
  }
};
```

## 修改 webpack 配置

大部分情况下插件都是在修改 webpack 配置，此处收集一些修改 webpack 的常见场景。

### 新增 webpack loader

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

### 修改已有 webpack loader

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

### 新增 webpack 插件

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

### 修改已有 webpack 插件

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

### 修改指定命令的 webpack 配置

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

### 查看所有 webpack 配置

```js
// ice.config.js
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
// ice.config.js
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
// ice.config.js
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
