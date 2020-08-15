---
title: 快速开始
order: 3
---

> 如果是阿里内部开发者，请参考[文档](https://yuque.alibaba-inc.com/ice/rdy99p/gsfp6h)，可直接打通内部流程。

## 使用 Iceworks

**安装 Iceworks**

![安装](https://img.alicdn.com/tfs/TB1FWaiKKT2gK0jSZFvXXXnFXXa-960-600.gif)

- 点击 VS Code 活动栏上的「插件市场图标」
- 在侧边栏的搜索框上输入「Iceworks」
- 点击侧边栏上出现的搜索结果中的「Iceworks 插件栏」
- 在主窗口出现的页面上点击「安装」按钮

**初始化项目**

![创建](https://img.alicdn.com/tfs/TB1tyMVLFP7gK0jSZFjXXc5aXXa-960-600.gif)

- 点击 VS Code 活动栏上的「Iceworks 图标」
- 点击侧边栏上的「创建新应用」按钮
- 在主窗口出现的页面上根据引导创建项目

**启动项目**

![启动](https://img.alicdn.com/tfs/TB1jDa9L7T2gK0jSZFkXXcIQFXa-960-600.gif)

- 点击 VS Code 活动栏上的「Iceworks 图标」
- 鼠标移动到 「NPM 脚本」下的「start 项」
- 点击 start 项右边的「启动图标」

## 使用 CLI

**初始化项目**

可以选择使用 npm 或者 yarn 工具进行项目初始化，如下输入项目名即可：

```bash
$ npm init ice <projectName>
# or
$ yarn create ice <projectName>
```

同时支持以下几种方式初始项目，以 npm 为例

```bash
# 当前目录初始项目
$ npm init ice # 根据提示选择模板
$ npm init ice --template <template> # 指定模板

# 指定目录初始项目
$ npm init ice <projectName> # 根据提示选择模板
$ npm init ice <projectName> <tempalte> # 指定模板
$ npm init ice <projectName> --template <template> # 指定模板
```
> 可从 [模板库](https://ice.work/scaffold) 选择模板 `<template>`

查看帮助信息

```bash
$ npm init ice -h
# or
$ npm init ice --help
```

**选择模板**

可以根据实际情况选择 TypeScript 和 JavaScript 模板，其中各包含一个轻量的 Lite 和功能完善的 Pro 模板：

```bash
? Please select a template (Use arrow keys)
❯ A lightweight TypeScript template.
  A lightweight JavaScript template.
  Pro TypeScript template，Integrated rich features such as charts, lists, forms, etc.
  Pro JavaScript template，Integrated rich features such as charts, lists, forms, etc
```

选择模板会自动创建项目，看到如下信息说明项目创建成功：

```bash
✔ download npm tarball successfully.
info clean package.json...
Initialize project successfully.
Starts the development server.

    cd <projectName>
    npm install
    npm start

✨  Done
```

**启动项目**

按照上面的提示，进入新建的项目安装依赖即可：

```bash
$ cd <projectName>
# 安装依赖
$ npm install
# 启动项目
$ npm start
```

执行上述命令后，会自动打开浏览器窗口访问 [http://localhost:3333](http://localhost:3333，)，这时应该看到默认的页面。
