---
title: 命令行使用指南
order: 2
---

ice-scripts 提供了 `init/dev/build` 的开发命令，如果使用 Iceworks 开发，那么大多数时候你不需要关心这些命令。

### ice init

根据模板初始化项目：

```bash
$ ice init --help

Usage: ice-init [options]

Options:

  -t, --template         模板 npm 包名，可不传
  -h, --help             output usage information
```

根据模板初始化组件/区块：

```bash
# 初始化项目
$ ice init
# 初始化组件
$ ice init component
# 初始化区块
$ ice init block
```

### ice dev

启动调试服务：

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
$ ice dev -p=3000
# 或者
$ npm run start -- -p=3000
```

比如开启 https

```bash
$ ice dev --https
```

### ice build

构建项目代码

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

### ice add block

添加区块

```bash
$ cd src/pages/home/components
$ ice add block -t @icedesign/document-list-block
=> src/pages/home/components/DocumentListBlock
```
