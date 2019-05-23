---
title: 快速上手
order: 2
---

### 创建项目

如果你已经有一个项目，可以将其作为项目级依赖：`npm i --save-dev ice-scripts`

#### 通过 ice-cli 初始化项目

如果使用 iceworks 开发，那么大多数时候你不需要关心这些命令。

```bash
$ npm i -g ice-cli
$ ice --help
```

根据模板初始化项目：

```bash
$ ice init --help

Usage: ice-init [options]

Options:

  -t, --template         模板 npm 包名，可不传
  -h, --help             output usage information
```

比如初始化指定项目模版

```bash
# 初始化执行项目项目
$ ice init -t @icedesign/lite-scaffold
```

### ice-scripts dev

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
npm start
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

### ice-scripts build

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
npm run build
```

构建服务支持的命令参数：

```plain
$ ice-scripts build --help

Usage: ice-scripts build [options]

Options:
  -s, --skip-install     跳过安装依赖
  --skip-demo            跳过构建 build/index.html 的环节
  -h, --help             output usage information
```