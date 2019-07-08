---
title: ice-plugin-load-assets
order: 8
---

插件提供自动加载 assts 资源能力

## 功能

 - 页面渲染前将自动加载配置的 assets 资源，资源类型包括 js 和 css
 - 根据不同的执行命令，加载不同的 assets 资源

## 如何使用

Install:

```bash
$ npm i --save-dev ice-plugin-load-assets
```

Usage:

```js
// 基础用法
module.exports = {
  plugins: [
    ['ice-plugin-load-assets', {
      // dev 命令和 build 命令 加载相同 assets 资源
      assets: ['https://unpkg.com/lodash@4.17.11/index.js', 'https://url/global.css'],
    }],
  ]
};
```

```js
// 配合 external 自动加载 react, react-dom 的资源
module.exports = {
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
  },
  plugins: [
    ['ice-plugin-load-assets', {
      assets: {
        dev: ['https://unpkg.com/react@16.7.0/umd/react.development.js', 'https://unpkg.com/react-dom@16.7.0/umd/react-dom.development.js'],
        build: ['https://unpkg.com/react@16.7.0/umd/react.production.min.js', 'https://unpkg.com/react-dom@16.7.0/umd/react-dom.production.min.js'],
      },
    }],
  ]
};
```