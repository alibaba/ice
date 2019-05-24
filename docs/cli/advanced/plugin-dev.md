---
title: 插件开发
order: 1
---

`ice-scripts` 通过插件机制，扩展其项目编译和命令运行时的能力。便于常见构建需求和复用解决方案的共享。

插件本质上时一个 JS 模块，约定插件初始化模版如下：

```js
module.exports = (api, opts) => {
  // api：插件API
  // opts：插件自定义参数
};

```

插件方法会收到两个参数，第一个是 `api` 插件提供的API接口和能力通过它来暴露，第二个参数 `opts` 是插件自定义的参数，由插件开发者决定其值。

## 插件API

通过插件提供的API，可以方便拓展和自定义能力。

### service

通过 `api.service` 访问命令运行时的相关参数：

- `api.service.command`：当前运行命令，值为 `dev | build`
- `api.service.commandArgs`：cli命令的optios参数，如执行 `ice-scripts dev --https` 则其内容为 `{ https: true }`
- `api.service.context`：当前命令运行目录
- `api.service.userConfig`：用户配置 `ice.config.js` 中的配置（与默认配置会进行deepMerge）
- `api.service.pkg`：命令运行项目的 `package.json` 信息

```js
module.exports = (api) => {
  const { userConfig } = api.service;
  if (userConfig.entry) {
    console.log('config entry :', userConfig.entry);
  }
  if (api.service.command === 'dev') {
    console.log('do someting');
  }
};
```
### chainWebpack

通过 `api.chainWepack` 对webpack配置进行自定义

```js
module.exports = (api) => {
  api.chainWebpack(config => {
    // 通过 webpack-chain 修改 webpack 配置
    config.devServer.hot('dist');
    config.output.path('dist');
  })
}
```

更多 webpack-chain 用法，参考 [自定义webpack配置](/docs/cli/basic/custom-webpack)

### log

通过 `api.log` 向插件提供统一的日志输出方法

```js
module.exports = (api) => {
  api.log.verbose('verbose');
  api.log.info('info');
  api.log.error('error');
  api.log.warn('warn');
}
```

### onHooks

通过 `api.onHooks` 监听命令运行事件。

目前支持监听四种事件：

- `beforeDev`：执行dev命令脚本前
- `afterDev`：完成dev命令脚本后
- `beforeBuild`：执行build命令脚本前
- `afterBuild`：完成build命令脚本后

```js
module.exports = (api) => {
  api.onHooks('beforeDev', () => {
    // some code before dev
  });

  api.onHooks('afterDev', (stats) => {
    // 通过stats可以判断webpack是否执行成功
  });
}
```

## 插件开发示例

下面是 ice-scrpts-plugin-css-assets-local 插件的代码示例

```js
const ExtractCssAssetsWebpackPlugin = require('extract-css-assets-webpack-plugin');

module.exports = (api, options) => {
  const { service: { command }, log } = api;

  // 仅在运行 ice-scripts build 的时候执行
  if (command === 'build') {
    log.info('离线化构建项目，自动下载网络资源，请耐心等待');

    api.chainWebpack((config) => {
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

- [ice-scripts-plugin-antd](https://github.com/alibaba/ice/tree/master/packages/ice-scripts-plugin-antd)
- [ice-scripts-plugin-component](https://github.com/alibaba/ice/tree/master/packages/ice-scripts-plugin-component)
- [ice-scripts-plugin-css-assets-local](https://github.com/alibaba/ice/tree/master/packages/ice-scripts-plugin-css-assets-local)
- [ice-scripts-plugin-fusion](https://github.com/alibaba/ice/tree/master/packages/ice-scripts-plugin-fusion)
- [ice-scripts-plugin-multi-pages](https://github.com/alibaba/ice/tree/master/packages/ice-scripts-plugin-multi-pages)
