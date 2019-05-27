---
title: ice-plugin-css-assets-local
order: 4
---

`ice-plugin-css-assets-local` 提供将 css 中的网络资源本地化能力，本文将详细介绍该插件具体用法。

## 功能

- 将 CSS 中依赖的资源本地化，例如字体文件等。

## 如何使用

```bash
$ npm i --save-dev ice-plugin-css-assets-local
```

Options：

- `outputPath`: 默认值： `assets` 提取后的文件目录前缀
- `relativeCssPath`: 默认值： `../` 提取的文件后相对于 CSS 的路径

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-plugin-css-assets-local', {
      outputPath: 'assets',
      relativeCssPath: '../'
    }]
  ]
}
```