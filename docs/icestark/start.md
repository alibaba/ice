---
title: 快速上手
order: 2
---

## 初始化框架应用

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

打开 `src/app.tsx` 即可看到默认注册的几个子应用。

## 初始化子应用

```bash
# 基于 React 的子应用
$ npm init icestark-child @icedesign/stark-child-scaffold
$ cd icestark-child
# 安装依赖
$ npm install
# 启动服务
$ npm run start
```

接着可以在框架应用的 `src/app.tsx` 中增加对应的子应用配置。
