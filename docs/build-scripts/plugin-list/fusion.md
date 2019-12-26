---
title: build-plugin-fusion
order: 4
---

`build-plugin-fusion` 是 Fusion UI 体系开发下必不可少的插件，本文将详细介绍插件具体用法。

## 功能

- 组件按需加载
- 组件（包含业务组件）样式自动引入
- 主题定制能力
- 多个不同包名的基础组件统一

## 如何使用

### Install

```bash
$ npm i --save-dev build-plugin-fusion
```

### Options

- `themePackage`：Fusion 组件主题包配置，如果设置为数组则启动多主题能力
- `themeConfig`：主题配置，通过设置 sass 变量对现有主题进行覆盖
- `uniteBaseComponent`：如果项目里依赖了多个不同名称的基础包，可以通过 uniteBaseComponent 来统一基础包，减少重复的代码
- `nextPrefix`：Fusion 组件样式 prefix，一般情况下需要配合入口代码的 ConfigProvider 使用，可以将所有的 className 改掉
- `importOptions`：同 babel-plugin-import 参数，默认为 { style: true, libraryDirectory: 'es'} 根据用户设置项将进行合并

### 基础用法

配置主题包：

```json
{
  plugins: [
    ["build-plugin-fusion", {
      "themePackage": "@icedesign/theme",
      "nextPrefix": "nextfd-",
      "uniteBaseComponent": "@alife/next"
    }]
  ]
}
```

### 修改主题变量

```json

{
  plugins: [
    ["build-plugin-fusion", {
      "themeConfig": {
        "primaryColor": "#f60",
        "font-size-body-1": "14px"
      }
    }]
  ]
}

```

### 多主题配置

build-plugin-fusion 结合 fusion 自身可以配置主题包的能力，支持多个主题包的配置，大大简化多主题切换的成本，通过 css 变量能力实现动态主题的切换，核心实现思路如下：
1. 提取主题包中的 scss 变量（色值变量）
2. 将 scss 变量具体内容转换为 css 变量，即 `$color-brand1-1: #E2EDFF; => $color-brand1-1: var(--color-brand-1);`
3. 注入新的 scss 变量值（如 `$color-brand1-1: var(--color-brand-1)` ）进行编译
4. 在 window 下注入 `__changeTheme__` 方法，实现不同主题包全局 css 变量声明的切换

```json
{
  "plugins": [
    ["build-plugin-fusion", {
      "themePackage": [{
        "name": "@icedesign/theme",
        "default": true,
        "themeConfig": {
          "custom-color": "#000"
        }
      }, {
        "name": "@alifd/theme-ice-purple",
        "themeConfig": {
          "custom-color": "#fff"
        }
      }]
    }]
  ]
}
```

通过数组的方式配置多个主题，实现多主题内容的注入。
build.json 中完成多主题包配置后，业务代码中可以直接调用 `__changeTheme__` 方法在多个主题包之间进行切换：

```js
// 可以在设置的主题包 @icedesign/theme 和 @alifd/theme-ice-purple 之间切换
window.__changeTheme__('@alifd/theme-ice-purple');
```