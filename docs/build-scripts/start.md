---
title: 快速上手
order: 2
---

本文介绍如何快速通过 `build-scripts` 开发和构建一个项目。

## 创建项目

全局安装 `iceworks` CLI 工具：

```bash
$ npm install iceworks -g
$ iceworks --help
```

创建项目：

```bash
# 创建一个空的项目目录
$ mkdir iceapp && cd iceapp

# 根据已有模板创建项目
$ iceworks init @alifd/scaffold-lite
# 安装依赖
$ npm install
```

完成项目初始化后既可以开始开始项目调试开发和项目构建。

## 调试开发

项目目录下启动调试服务：

```bash
$ npm start
```

开始调试服务后，可以访问 `http://localhost:3333` 进行页面预览。修改源码内容后将自动刷新页面。

调试服务支持的命令参数：

```bash
$ build-scripts start --help

Usage: ice-scripts start [options]

Options:
  --config <config>      自定义配置文件路径（仅支持 json）
  -p, --port <port>      服务端口号
  -h, --host <host>      服务主机名
  --https                开启 https
  --analyzer             开启构建分析
  --analyzer-port        设置分析端口号
  --disable-reload       关闭 hot reload
  --disable-mock         关闭 mock 功能
  --disable-open         关闭调试服务默认打开浏览器
```

比如使用 3000 端口启动 dev server

```bash
$ npm run start -- -p 3000
# 或者
$ ice-scripts dev -p 3000
```

比如开启 https

```bash
$ npm run start -- --https
```

## 构建代码

构建项目代码：

```bash
$ npm run build
```

构建服务支持的命令参数：

```bash
$ build-scripts build --help

Usage: ice-scripts build [options]

Options:
  --config <config>      自定义配置文件路径（仅支持 json）
  --analyzer             开启构建分析
  --analyzer-port        设置分析端口号
```

构建产物默认生成到 `./build` 目录下。