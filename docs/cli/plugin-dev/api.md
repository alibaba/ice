---
title: 插件 API
order: 1
---

ice-scripts 通过插件机制，扩展其项目编译和命令运行时的能力。便于常见构建需求和复用解决方案的共享。

插件本质上时一个 JS 模块，约定插件初始化模版如下：

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

更多 webpack-chain 用法，参考 [自定义 webpack 配置](/docs/cli/basic/custom-webpack)

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

更多官方插件源码：

- [ice-plugin-antd](https://github.com/alibaba/ice/tree/master/packages/ice-plugin-antd)
- [ice-plugin-component](https://github.com/alibaba/ice/tree/master/packages/ice-plugin-component)
- [ice-plugin-css-assets-local](https://github.com/alibaba/ice/tree/master/packages/ice-plugin-css-assets-local)
- [ice-plugin-fusion](https://github.com/alibaba/ice/tree/master/packages/ice-plugin-fusion)
- [ice-plugin-multi-pages](https://github.com/alibaba/ice/tree/master/packages/ice-plugin-multi-pages)
