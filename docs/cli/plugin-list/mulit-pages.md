---
title: ice-plugin-multi-pages
order: 5
---

`ice-plugin-multi-pages` 支持解析 `src/pages/*/index.js` 生成多 entry 的配置。

## 功能

- 构建传统的多页应用，默认会将 `src/pages/*/index.js` 作为 entry，每个 page 都会作为一个 entry，以 pageName 构建多个同名 HTML 文件。

## 如何使用

Install:

```bash
$ npm i --save-dev ice-plugin-multi-pages
```

Options:

- `getEntryName{function}`: 自定义 entry name，默认取小写的 `src/pages/*/index.js` 文件夹名称。

Usage:

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-plugin-multi-pages', {
      // customize entry name
      // BasicCharts => basic_charts
      getEntryName: (pageName) => _.snakeCase(pageName);
    }]
  ]
}
```