---
title: 快速上手
order: 2
---

本文介绍如何快速通过 `ice-scripts` 开发和构建一个项目。

## 创建项目

> 推荐通过 iceworks GUI 工具进行初始化

安装 `iceworks` 依赖：

```bash
$ npm install iceworks -g
```

创建一个空目录：

```bash
$ mkdir iceapp && cd iceapp
```

初始化项目：

```bash
$ iceworks init
```

完成项目初始化后既可以开始开始项目调试开发和项目构建。

## 调试开发

项目目录下启动调试服务：

```bash
$ npm start
```

开始调试服务后，可以访问 `http://localhost:4444` 进行页面预览。修改源码内容后将自动刷新页面。

调试服务支持的命令参数：

```bash
$ ice-scripts dev --help

Usage: ice-scripts dev [options]

Options:
  -p, --port <port>      服务端口号
  -h, --host <host>      服务主机名
  --https                开启 https
  --analyzer             开启构建分析
  --analyzer-port        设置分析端口号
  --disabled-reload      关闭 hot reload
```

比如使用 3000 端口启动 dev server

```bash
$ ice-scripts dev -p 3000
# 或者
$ npm run start -- -p 3000
```

比如开启 https

```bash
$ ice-scripts dev --https
```

## 构建代码

构建项目代码：

```bash
$ npm run build
```

构建产物默认生成到 `./build` 目录下。