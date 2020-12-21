---
title: 快速上手
order: 2
---

本篇文档演示如何快速创建微前端的应用，以下模板均使用了 icejs，通过 icejs 的插件机制可以更加简单的接入微前端能力。

## 初始化主应用

```bash
$ npm init ice icestark-layout @icedesign/stark-layout-scaffold
$ cd icestark-layout
# 安装依赖
$ npm install
# 启动服务
$ npm start
```

即可通过浏览器预览整个应用：

![demo](https://img.alicdn.com/tfs/TB1aJ0WjAL0gK0jSZFtXXXQCXXa-2880-1578.png)

打开 `src/app.tsx` 即可看到默认注册的几个微应用。

## 初始化微应用

```bash
# 基于 React 的微应用
$ npm init ice icestark-child @icedesign/stark-child-scaffold
$ cd icestark-child
# 安装依赖
$ npm install
# 启动服务
$ npm run start
```

接着可以在主应用的 `src/app.tsx` 中增加对应的微应用配置。
