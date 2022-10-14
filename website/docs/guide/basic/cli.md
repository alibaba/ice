---
title: 命令行
order: 14
---

:::tip

指定命令行参数有两种方式：

1. 在 `package.json` 中指定参数：

```diff
{
  "scripts": {
-   "start": "ice start"
+   "start": "ice start --https"
  }
}
```

2. 在命令行中指定参数（需要多加 `--` 字符）：

```bash
$ npm start -- --https
```

:::

## start

启动本地开发服务器，用于调试项目。

```bash
Usage: ice-cli start [options]

start server

Options:
  --platform <platform>  指定编译的 platform
  --mode <mode>          指定 mode
  --config <config>      指定配置文件路径
  -h, --host <host>      指定开发服务器主机名
  -p, --port <port>      指定开发服务器端口
  --no-open              禁止默认打开浏览器预览行为
  --no-mock              禁用 mock 服务
  --rootDir <rootDir>    指定项目的根路径
  --analyzer             开启构建分析
  --https [https]        开启 https
  --force                移除构建缓存
```

## build

构建项目，输出生产环境下的资源。

```bash
Usage: ice-cli build [options]

build project

Options:
  --platform <platform>  指定编译的 platform
  --mode <mode>          指定 mode
  --analyzer             开启构建分析
  --config <config>      指定配置文件路径
  --rootDir <rootDir>    指定项目的根路径
```

## help

查看帮助。

```bash
$ ice help
Usage: ice-cli <command> [options]

Options:
  -V, --version    output the version number
  -h, --help       display help for command

Commands:
  build [options]  build project
  start [options]  start server
  help [command]   display help for command
```

也可以查看指定命令的详细帮助信息。

```bash
$ ice help build
Usage: ice-cli build [options]

build project

Options:
  --platform <platform>  set platform
  --mode <mode>          set mode
  --analyzer             visualize size of output files
  --config <config>      use custom config
  --rootDir <rootDir>    project root directory
  -h, --help             display help for command
```

## version

查看 icejs 的版本。

```bash
$ ice --version

3.0.0
```
