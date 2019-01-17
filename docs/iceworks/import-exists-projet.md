---
title: 已有项目接入 Iceworks
category: Iceworks
order: 3
---

将已有项目接入到 Icewokrs 中，需要增加对应信息的项目描述

## 1. 描述项目可被 Iceworks 识别

`package.json` 文件 `keywords` 字段增加 `ice-scaffold` 表示这是一个适配 ice 规范的模板项目。

```js
{
  "name": "my-project",
  "keywords": ["ice-scaffold"],
  // ...
}
```

## 2. 描述项目使用的框架语言

`package.json` 文件增加 `scaffoldConfig` 字段对象，示例如下：

```js
{
  // ...
  "scaffoldConfig": {
    "type": "react",
    "name": "ice-design-pro",
    "title": "ICE Design Pro",
    "screenshot": "https://img.alicdn.com/tfs/TB1_bulmpOWBuNjy0FiXXXFxVXa-1920-1080.png"
  }
}
```

其中 scaffoldConfig.type 字段描述当前项目所使用的框架名 `react` `vue` `angular` 等，此字段用于与物料源相映射。

## 3. 描述启动调试和构建的命令

`package.json` 里增加 start 和 build 命令, 这两个命令用于 **启动调试服务** **构建项目** 功能使用，你可以使用自己定义的命令行工具。

```js
{
  "scripts": {
    "start": "custom-cli start",
    "build": "custom-cli build"
  }
}
```
