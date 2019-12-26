---
title: build-plugin-multi-pages
order: 9
---

`build-plugin-multi-pages` 支持解析 `src/pages/*/index.js` 生成多 entry 的配置。

## 功能

- 构建传统的多页应用，默认会将 `src/pages/*/index.js` 作为 entry，每个 page 都会作为一个 entry，以 pageName 构建多个同名 HTML 文件。

## 如何使用

Install:

```bash
$ npm i --save-dev build-plugin-multi-pages
```

Usage:

```json
{
  "plugins": [
    "build-plugin-multi-pages"
  ]
}
```
