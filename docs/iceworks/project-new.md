---
title: 新建项目
category: iceworks
order: 1
---

iceworks 提供了两种方式开始你的项目管理。

## 从已有的项目中导入

![从已有的项目中打开](https://img.alicdn.com/tfs/TB1TPiuMVzqK1RjSZFCXXbbxVXa-875-580.gif)

将已有项目接入到 icewokrs 中，需要增加对应信息的项目描述。

## 1. 描述项目可被 iceworks 识别

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

## 使用模板创建

在项目面板点击「项目选项卡」，点击「创建项目」，选择一个模板创建项目（如果没有合适的模板，你也可以[自定义模板](./marterial-scaffold)）。

创建项目成功后将提示你是否自动安装依赖，请选择「是」。

![使用模板创建项目](https://img.alicdn.com/tfs/TB13eWtM3HqK1RjSZFEXXcGMXXa-875-580.gif)