---
title: 使用 antd 组件
order: 5
---

项目开发中如果使用 antd 组件作为基础 UI 组件，可以通过工程插件提供 antd 组件的按需加载和主题定制能力。

## 插件安装

```bash
$ npm install build-plugin-antd --save-dev
```

## 插件配置

插件提供了按需加载和主题定制相关的配置参数：

* `themeConfig` 设置替换主题颜色
* `importOptions` 同 `babel-plugin-import` 按需加载配置，默认参数 `{ libraryDirectory: 'es', style: true}`，根据用户设置进行合并

## 基础用法

```json
{
  "plugins": [
    ["build-plugin-antd", {
      "themeConfig": {
        "primary-color": "#1DA57A"
      }
    }]
  ]
}
```

## 使用 antd-mobile

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
