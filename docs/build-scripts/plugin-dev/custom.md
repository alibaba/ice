---
title: 自定义 webpack 配置
order: 3
---

build-scripts 内部的基础 webpack 配置都是通过 [webpack-chain](https://github.com/neutrinojs/webpack-chain) 生成的，它通过 webpack 配置链式操作的 API，并可以定义具体 loader 规则和 webpack 插件的名称，可以让开发者更加细粒度修改 webpack 配置。

如果项目中需要自定义 webpack 配置推荐通过本地插件的方式，配置方式可参考[build.json - 本地插件]章节。

## 修改 webpack 基础配置

```js
// local-plugin.js
module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    // 修改 webpack devServer.hot
    config.devServer.hot('dist');
    // 修改 webpack output.path
    config.output.path('dist');
  });
};

```

## 新增 webpack loader

```js
// local-plugin.js
module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    config.module
      .rule('new-rule')
      .test(/\.scss$/)
      .use('sass-loader')
        .loader('sass-loader');
  });
};
```

## 修改已有 webpack loader

通过 `build-plugin-ice-app` 内置 webpack loader 的命名，请参考本章节[附录]

```js
// local-plugin.js
module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    config.module.rule('scss')
      .use('MiniCssExtractPlugin.loader')
      // 规格 scss 规则中 MiniCssExtractPlugin.loader 的配置
      .tap((options) => ({ ...options, publicPath: '../' }));
  });
};
```

## 新增 webpack 插件

```js
// local-plugin.js
const WebpackPluginImport = require('webpack-plugin-import');
module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
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
  });
};
```

## 修改已有 webpack 插件

通过 `build-plugin-ice-app` 内置 webpack plugin 的命名，请参考本章节[附录]

```js
// local-plugin.js
module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    config.plugin('HtmlWebpackPlugin').tap((args) => [
      // 修改默认 HtmlWebpackPlugin 的 template 属性
      { ...(args[0] || {}), template: require.resolve('./template/index.html') },
    ]);
  });
};
```

## 修改指定命令的 webpack 配置

```js
// local-plugin.js
module.exports = ({ onGetWebpackConfig, context }) => {
  const { command } = context;
  onGetWebpackConfig((config) => {
     // 执行 build-scripts start 命令时
    if (command === 'start') {
      config.devServer.historyApiFallback(true);
    }
    // 执行 build-scripts build 命令时
    if (command === 'build') {
      config.optimization.minimize(true);
    }
  });
};
```

## 常见 webpack 定制需求

### 配置 splitChunks

通过配置 splitChunks 实现第三方库分离：

```js
// local-plugin.js
module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    config.optimization.splitChunks({ cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/, // 匹配 node_modules 目录
        name: 'vendor',
        chunks: 'all',
        minChunks: 1,
      },
    }});
  });
};
```

### 修改 TerserPlugin

build-scripts 内置了 `terser-webpack-plugin` 的实践配置，可以通过定制能力修改默认配置：

```js
// local-plugin.js
module.exports = ({ onGetWebpackConfig, context }) => {
  const { command } = context;
  onGetWebpackConfig((config) => {
    // 仅在 build 构建下会存在 UglifyJsPlugin
    if (command === 'build') {
      // 生成 soruce-map 进行调试
      config.devtool('source-map');
      config.optimization
        .minimizer('TerserPlugin')
        .tap(([options]) => [
          {
            ...options,
            sourceMap: true,
          },
        ]);
    }
  });
};
```

### 修改 babel 配置

build-scripts 的 babel 配置同样可以通过 `webpack-chain` 方式进行修改：

```js
// local-plugin.js
module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
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
  });
};
```

### 查看 webpack 配置

`build-scripts` 中通过 webpack-chain 的方式管理 webpack 配置，如果想要查看具体的 webpack 配置信息，可以参考下面的文档。

#### 查看所有 webpack 配置

```js
const Config = require('webpack-chain');
module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    // 通过 Config.toString 的方法输出当前 config 配置
    console.log(Config.toString(config));
  });
}
```

#### 查看 rule 配置

```js
const Config = require('webpack-chain');
module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    // 输出所有定义的 rule 配置
    console.log(Config.toString(config.module.toConfig().rules));

    // 输出指定 rule 的配置
    const ruleName = 'scss';
    console.log(Config.toString(
      config.module.rule(ruleName).toConfig(),
    ));
  });
}
```

#### 查看 plugin 配置

```js
const Config = require('webpack-chain');
module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    // 输出所有定义的 plugin 配置
    console.log(Config.toString(config.toConfig().plugins));

    // 输出指定 rule 的配置
    const pluginName = 'WebpackPluginImport';
    console.log(Config.toString(
      config.plugins.get(pluginName).toConfig(),
    ));
  });
}
```

## 附录

### 内置 webpack loader

rule 名称 | 对应 loader 名称 | 说明
-|-|-
css | MiniCssExtractPlugin.loader、css-loader、postcss-loader | 基础 css 规则
css-module | MiniCssExtractPlugin.loader、css-loader、postcss-loader | css module 规则
scss | sass-loader、MiniCssExtractPlugin.loader、css-loader、postcss-loader | scss 规则
scss-module | sass-loader、MiniCssExtractPlugin.loader、css-loader、postcss-loader | 基于 scss 的 css module 规则
less | less-loader、MiniCssExtractPlugin.loader、css-loader、postcss-loader | less 规则
less-loader | less-loader、MiniCssExtractPlugin.loader、css-loader、postcss-loader | 基于 less 的 css module 规则
woff2 | woff2 | woff2 文件加载规则
ttf | ttf | ttf 文件加载规则
eot | eot | eot 文件加载规则
svg | svg | svg 文件加载规则
img | img | 图片文件加载规则
jsx | babel-loader | js/jsx 文件加载规则
tsx | babel-loader、ts-loader | ts/tsx 文件加载规则

### 内置 webpack plugin

plugin 名称 | 对应 plugin 包名 | 用途说明
-|-|-
MiniCssExtractPlugin | mini-css-extract-plugin | 生成样式文件
FilterWarningsPlugin | webpack-filter-warnings-plugin | 优化构建输出
SimpleProgressPlugin | webpack-simple-progress-plugin | 显示加载进度条
CaseSensitivePathsPlugin | case-sensitive-paths-webpack-plugin | 解决加载包大小写敏感
DefinePlugin | webpack.DefinePlugin | 变量注入
HtmlWebpackPlugin | html-webpack-plugin | html 文件模版
CopyWebpackPlugin | copy-webpack-plugin | 拷贝 pulic 目录下文件
