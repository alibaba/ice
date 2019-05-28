---
title: 快速上手
order: 2
---

本文介绍如何快速通过 `ice-scripts` 开发和构建一个项目。

## 创建项目

> 支持 CLI 和 GUI 两种方式创建，此处演示 CLI 用法

安装 CLI 工具：

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
$ ice dev --help

Usage: ice-dev [options]

Options:
  -p, --port <port>      服务端口号
  -h, --host <host>      服务主机名
  --https                开启 https
  --analyzer             开启构建分析
  --analyzer-port        设置分析端口号
  --disabled-reload      关闭 hot reload
  --project-type <type>  项目类型, node|web (default: "web")
  --inject-babel <type>  注入 babel 运行环境, Enum: polyfill|runtime (default: "polyfill")
```

比如使用 3000 端口启动 dev server

```bash
$ npm run start -- -p 3000
```

比如开启 https

```bash
$ npm run start -- --https
```

### ice build

构建项目代码：

```bash
$ npm run build
```

构建产物默认生成到 `./build` 目录下。

```plain
$ ice build --help

Usage: ice-build [options]

Options:
  --debug                debug 模式下不压缩
  --hash                 构建后的资源带 hash 版本
  --sourcemap <type>     构建后的资源带 sourcemap 文件
  --project-type <type>  项目类型, node|nodejs|web
  -s, --skip-install     跳过安装依赖
  --skip-demo            跳过构建 build/index.html 的环节
  --inject-babel <type>  注入 babel 运行环境, Enum: polyfill|runtime
  -h, --help             output usage information
```