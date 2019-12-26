---
title: build-plugin-modular-import
order: 8
---

用于快捷增加 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 的配置

## 功能

- 参考 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)

## 如何使用

Install:

```bash
$ npm i --save-dev build-plugin-modular-import
```

Usage:

```json
{
  "plugins": [
    ["ice-plugin-modular-import", [{
      "libraryName": "lodash",
      "libraryDirectory": "",
      "camel2DashComponentName": false
    }, {
      "libraryName": "@material-ui/core",
      "libraryDirectory": "components",
      "camel2DashComponentName": false
    }]]
  ]
}
```
