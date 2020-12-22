---
title: 使用 antd 组件
order: 15
---

飞冰（ICE）官方提供了一套 antd 的脚手架，通过 CLI 即可直接创建：

```bash
$ mkdir icejs-antd && cd icejs-antd
$ npm ini ice --template @icedesign/ice-antd-scaffold
```

也可通过在 Iceworks 中添加自定义物料的方式使用，物料地址：https://ice.alicdn.com/assets/materials/antd-materials.json 。

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
