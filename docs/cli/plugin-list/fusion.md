---
title: ice-plugin-fusion
order: 1
---

`ice-plugin-fusion` 是 Fusion UI 体系开发下必不可少的插件，本文将详细介绍插件具体用法。

## 功能

- 组件按需加载
- 组件（包含业务组件）样式自动引入
- 主题定制能力
- 多个不同包名的基础组件统一

## 如何使用

```bash
$ npm i --save-dev ice-plugin-fusion
```

Options：

- `themePackage`: 主题包
- `themeConfig`: 主题配置
- `uniteBaseComponent`: 如果项目里依赖了多个不同名称的基础包，可以通过 uniteBaseComponent 来统一基础包，减少重复的代码（社区用户无需关心该问题）


```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-plugin-fusion', {
      // 主题包
      themePackage: '@icedesign/theme',
      themeConfig: {
        // 自定义 css prefix，需要配合 ConfigProvider 更改 js 的 prefix
        nextPrefix: 'nextfd-',
        // 根据配置推导主品牌色
        primaryColor: '#f60',
        // 根据配置推导次品牌色，仅组件 0.x 版本支持
        secondaryCorlor: '#f60',
        // 覆盖 scss 原始变量
        'font-size-body-1': '14px',
      },
      // @icedesign/base | @alife/next | @ali/ice -> @alife/next
      uniteBaseComponent: '@alife/next'
    }]
  ]
}
```