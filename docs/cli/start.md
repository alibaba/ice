---
title: 快速上手
order: 2
---

## 创建项目

基于 iceworks 创建项目 @TODO

## 调试开发

确认项目 `package.json` 中添加启动调试命令

```json
{
  "scripts": {
    "start": "ice-scripts dev"
  }
}
```

项目目录下启动调试服务：

```bash
$ npm start
```

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

确认项目 `package.json` 中添加启动调试命令

```json
{
  "scripts": {
    "build": "ice-scripts build"
  }
}
```

构建项目代码：

```bash
$ npm run build
```

构建产物默认生成到 `./build` 目录下。