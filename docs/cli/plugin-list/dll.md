---
title: ice-plugin-dll
order: 10
---

用于本地开发时，加快项目二次启动速度。

## 功能

 - 通过 webpack 的 dllPlugin 打包一份 dll 文件来达到项目二次启动的编译速度
 - 启动时分析项目的依赖 `dependencies` 信息，发生变化后将后重新打包 dll 文件

## 如何使用

Install:

```bash
$ npm i -save-dev ice-plugin-dll
```

Usage:

```js
module.exports = {
  plugins: [
    'ice-plugin-dll'
  ]
}
```

> 注意：`ice-plugin-dll` 仅在 `dev` 命令下生效