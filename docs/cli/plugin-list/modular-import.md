---
title: ice-plugin-modular-import
order: 7
---

用于快捷增加 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 的配置

## 功能

- 参考 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)

## 如何使用

Install:

```bash
$ npm i --save-dev ice-plugin-modular-import
```

Options:

参考 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)

Usage:

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-plugin-modular-import', {
      'libraryName': '@material-ui/core',
      'libraryDirectory': 'components',
      'camel2DashComponentName': false,
    }]
  ]
}
```

配置多个组件：

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-plugin-modular-import', {
      'libraryName': '@material-ui/core',
      'libraryDirectory': 'components',
      'camel2DashComponentName': false,
    }],
    ['ice-plugin-modular-import', {
      'libraryName': 'lodash',
      'libraryDirectory': '',
      'camel2DashComponentName': false,
    }]
  ]
}
```
