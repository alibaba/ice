---
title: build-plugin-antd
order: 5
---

`build-plugin-antd` 插件为项目中使用 antd 组件提供按需加载和主题定制的能力。

## 功能

- antd 组件体系按需加载
- 主题定制能力

## 如何使用

Install:

```bash
$ npm i --save-dev build-plugin-antd
```

Options:

- `themeConfig`: 设置替换主题颜色
- `importOptions`: 同 `babel-plugin-import` 按需加载配置，默认参数 `{ libraryDirectory: 'es', style: true }`，根据用户设置进行合并

Usage:

基础用法

```json
{
  "plugins": [
    ["build-plugin-antd", {
      "themeConfig": {
        "primary-color": "#1DA57A"
      },
      "importOptions": {
        "libraryDirectory": "lib"
      }
    }]
  ]
}
```

使用 antd-mobile

```json
{
  "plugins": [
    ["build-plugin-antd", {
      "themeConfig": {
        "brand-primary": "#1DA57A"
      },
      "importOptions": {
        "libraryName": "antd-mobile",
        "libraryDirectory": "es",
        "style": true,
      }
    }]
  ]
}
```