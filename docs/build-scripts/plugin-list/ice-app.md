---
title: build-plugin-ice-app
order: 1
---

`build-plugin-ice-app` 做为 React 项目开发链路核心插件，提供了丰富的能力，是开发过程中必不可少的插件依赖。

## 功能

- 项目开发相关的工程配置以及命令行参数
- TypeScript 开发支持
- 数据 Mock 能力
- Proxy 代理设置
- 支持 CSS/Less/Sass/CSS Modules 的样式能力

## 如何使用

Install:

```bash
$ npm i --save-dev build-plugin-ice-app
```

Usage:

```json
{
  "plugins": [
    "build-plugin-ice-app"
  ]
}
```

插件支持的工程配置，详见 [工程配置-工程构建配置](/docs/build-scripts/config/config.md)