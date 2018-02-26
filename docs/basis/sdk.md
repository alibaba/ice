---
title: SDK 命令详解
order: 2
category: 入门指引
---

ICE SDK 指的是 `ice-scripts` 这个 npm 包，如果你不希望使用 Iceworks，它提供了终端中零配置的开发体验。接下来我们来了解下 ICE SDK 有哪些命令。

## 启动开发模式

执行如下命令即可进入开发模式

```bash
npm start
```

对应的 ICE 命令是 `ice dev`，SDK 会启动一个本地的 HTTP Server，你可以根据终端中的信息打开对应的页面进行前端的开发调试。

**可选参数**

* `-p`, `--port` 指定本地服务端口
* `-h`, `--host` 指定本地服务绑定主机
* `-s`, `--skip-install` 跳过依赖安装
* `--help` 查看帮助信息

## 打包编译

执行如下命令即可进行项目的编译，编译产生的文件默认会生成在项目目录下的 `build` 目录内。

```bash
npm run build
```

对应的 ICE 命令是 `ice build`，在编译完成后您可以将这些编译产物托管到 OSS 或 CDN 上。

**可选参数**

* `--debug` 使用 debug 模式不会进行代码的压缩，方便定位问题
* `-h`, `--help` 查看帮助信息
