---
title: 使用 CLI 创建应用
order: 3
---

## 使用 DEF 创建

如果是阿里内部开发者，请参考[文档](https://yuque.alibaba-inc.com/ice/rdy99p/gsfp6h)，可直接打通内部发布流程。

## 环境准备

首先需要安装 [node](https://nodejs.org)，并确保 node 版本是 10.x 版本或以上。推荐使用 [nvm](https://github.com/nvm-sh/nvm) 来管理 node 版本，windows 用户可以参考 [nvm-windows](https://github.com/coreybutler/nvm-windows) 进行安装。下面以在 mac 下安装举例：

```bash
$ curl https://raw.githubusercontent.com/cnpm/nvm/master/install.sh | bash

# 增加以下内容到 ~/.bashrc 或者 ~/.zshrc
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# 使用 nvm 安装 node 的10.22.0版本
$ nvm install 10.22.0

# 使用 10.22.0 版本
$ nvm use 10.22.0

# 验证 node 是否安装成功
$ node -v
v10.22.0
$ npm -v
6.14.6
```

在国内使用 npm 安装依赖可能会比较慢。建议使用国内镜像源进行加速：

```bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
# 验证 cnpm 安装是否成功
$ cnpm -v
```

除了 npm，我们还可以使用 yarn 作为依赖管理工具：

```bash
$ npm i yarn -g
$ yarn -v
1.22.5
```

如果经常需要切换 npm 镜像源，推荐使用 [nrm](https://github.com/Pana/nrm) 进行管理：

```bash
$ npm install -g nrm
$ nrm ls
$ nrm use taobao
```

## 初始化项目

可以选择使用 npm 或者 yarn 工具进行项目初始化，如下输入项目名即可：

```bash
$ npm init ice <projectName>
# or
$ yarn create ice <projectName>
```

同时支持以下几种方式初始项目，以 npm 为例

```bash
# 当前目录初始项目
$ npm init ice # 根据提示选择模板
$ npm init ice --template <template> # 指定模板

# 指定目录初始项目
$ npm init ice <projectName> # 根据提示选择模板
$ npm init ice <projectName> --template <template> # 指定模板
```

> 可从 [模板库](https://ice.work/scaffold) 选择模板 `<template>`

## 选择模板

可以根据实际情况选择 TypeScript 和 JavaScript 模板，其中各包含一个轻量的 Lite 和功能完善的 Pro 模板：

```bash
? Please select a template (Use arrow keys)
❯ A lightweight TypeScript template.
  A lightweight JavaScript template.
  Pro TypeScript template，Integrated rich features such as charts, lists, forms, etc.
  Pro JavaScript template，Integrated rich features such as charts, lists, forms, etc
```

选择模板会自动创建项目，看到如下信息说明项目创建成功：

```bash
✔ download npm tarball successfully.
info clean package.json...
Initialize project successfully.
Starts the development server.

    cd <projectName>
    npm install
    npm start

✨  Done
```

## 启动项目

按照上面的提示，进入新建的项目安装依赖即可：

```bash
$ cd <projectName>
# 安装依赖
$ npm install
# 启动项目
$ npm start
```

执行上述命令后，会自动打开浏览器窗口访问 [http://localhost:3333](http://localhost:3333，)，这时应该看到默认的页面。
