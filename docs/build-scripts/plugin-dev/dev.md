---
title: 插件开发
order: 1
---

build-scripts 通过插件机制扩展其项目编译和命令运行时的能力，以便于插件构建需求和复用解决方案的共享。

## NPM 插件

约定插件初始化模版如下：

```js
// 从 @alib/build-scripts 导入相关类型
import { IPlugin } from '@alib/build-scripts';

const Plugin: IPlugin = ({ context, onGetWebpackConfig, log, onHook }, options) => {
  // 第一项参数为插件 API 提供的能力
  // options：插件自定义参数
};

export default Plugin;
```

插件方法会收到两个参数，第一个参数是插件提供的 API 接口和能力，推荐结构方式按需使用 API，第二个参数 `options` 是插件自定义的参数，由插件开发者决定其值。

插件开发推荐使用 typescript 进行开发，发布 npm 包是再相关源码进行编译，`package.json` 内容建议如下：

```json
{
  ...
  "scripts": {
    "start": "tsc -w",
    "build": "tsc",
    "prepublishOnly": "npm run build"
  },
  ...
}
```

## 本地插件

插件本质上是一个 JS 模块，本地插件可以直接通过一个 common js 模块导出：

```js
module.exports = ({ context, onGetWebpackConfig, log, onHook }, options) => {
  // 第一项参数为插件 API 提供的能力
  // options：插件自定义参数
};
```

插件 API 的具体用法，详见 [插件 API] 章节。
