---
title: 插件开发
order: 1
hidden: true
---

模块化的插件机制是框架的核心能力之一，它不但可以保证框架核心的足够精简和稳定，还可以通过插件对运行时和编译时的能力进行封装复用，以及生态的形成。

通过框架的插件插件机制，提供扩展 **运行时** 和 **编译时** 的能力，以及基于 **模块化** 的架构设计，使得扩展运行时的能力变得非常简单。

## 插件目录

一个插件本质上是一个 JS 模块（npm 包），约定插件初始化模版目录如下：

```md
.
├── src
│   ├── index.ts    # 插件入口
│   └── module.ts   # 插件模块
├── lib/            # 编译目录
├── test/
├── package.json
├── README.md
└── tsconfig.json
```

**插件入口文件：**

插件必须需要 export 一个函数，函数会接收到两个参数，第一个是框架提供的 pluginAPI，第二个是用户传给插件的自定义参数，如下:

`index.ts`

```js
module.exports = (pluginAPI, options) => {
  // 第一项参数为插件 pluginAPI 提供的能力
  // 第一项参数 options 为插件自定义参数
  const {
    context,
    log,
    onHook,
    ...rest
  } = pluginAPI;
};
```

**插件模块文件**

插件通过模块化方式提供运行时的能力，函数会接收一个 moduleApi 作为参数，该参数是一个对象，包含运行时所需的 API。

`module.ts`

```ts
const module = (moduleApi) => {
  const {
    appConfig,
    addProvider,
    modifyRoutes,
    wrapperRouteComponent
    ...rest
  } = pluginAPI;
}

export default module
```

## 插件 API

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

### registerTask

谨慎使用，注册多 webpack 任务

```ts
module.exports = ({ registerTask }) => {
  registerTask('web', webpackConfigWeb);
  registerTask('weex', webpackConfigWeex);
}
```

### registerCliOption

谨慎使用，注册各命令上支持的 cli 参数，比如 npm start --https 来开启 https

```ts
module.exports = ({ registerCliOption }) => {
    registerCliOption({
    name: 'https', // 注册的 cli 参数名称，
    commands: ['start'],  // 支持的命令，如果为空默认任何命令都将执行注册方法
    configWebpack: (config, value, context) => {
        // 命令链路上的相关操作
    }
  })
}
```

### setValue

> (key: string | number, value: any) => void

用来在context中注册变量，以供插件之间的通信

```
module.exports = ({setValue}) => {
  setValue('key', 123);
}
```

### getValue

> (key: string | number) => any

用来获取context中注册的变量。

```ts
module.exports = ({getValue}) => {
  const value = getValue('key'); // 123
}
```

### onGetWebpackConfig

在工程获取 webpack 时触发，可以用 webpack-chain 形式修改 webpack 配置：

```ts
// 场景一：所有 webpack 任务
module.exports = ({onGetConfig, registerTask}) => {
  registerTask('default', webpackConfig);

  onGetWebpackConfig((config) => {
    config.entry('xxx');
  });
}
// 场景二：多 webpack 任务
module.exports = ({onGetConfig, registerTask}) => {
  registerTask('web', webpackConfigWeb);
  registerTask('weex', webpackConfigWeex);

  onGetWebpackConfig('web'，(config) => {
    config.entry('xxx');
  });

  onGetWebpackConfig('weex'，(config) => {
    config.entry('xxx');
  });
}
```

### log

插件统一的 log 工具，底层使用 npmlog ，便于生成统一格式的 log

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
