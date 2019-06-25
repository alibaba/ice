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

Install:

```bash
$ npm i --save-dev ice-plugin-fusion
```

Options:

- `themePackage`: 主题包，如何新建主题包请参考文档 [主题配置](/docs/guide/dev/theme.md)。
- `themeConfig`: 主题配置
- `uniteBaseComponent`: 如果项目里依赖了多个不同名称的基础包，可以通过 uniteBaseComponent 来统一基础包，减少重复的代码（社区用户无需关心该问题）

Usage:

基础用法：

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

多主题配置：

```js
module.exports = {
  plugins: [
    ['ice-plugin-fusion', {
      // 通过数组方式配置多主题包
      themePackage: [{
        name: '@icedesign/theme',
        // 设置默认加载主题，如果不进行设置，默认以最后添加主题包作为默认主题
        default: true,
      }, {
        name: '@alifd/theme-ice-purple',
        // 设置自定义主题颜色，可以在 scss 文件中直接使用该变量，比如： .bg-color { background: $custom-color; }
        themeConfig: {
          'custom-color': '#000',
        },
      }],
    }]
  ]
}
```

`ice.config.js` 中完成多主题包配置后，业务代码中可以直接调用 `__changeTheme__` 方法在多个主题包之间进行切换：

```js
// 可以在设置的主题包 @icedesign/theme 和 @alifd/theme-ice-purple 之间切换
window.__changeTheme__('@alifd/theme-ice-purple');
```
