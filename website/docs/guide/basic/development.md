---
title: 开发环境
order: 1
---

本文讲述在开发应用前如何安装最小开发环境。

## Node.js

开发前端应用前需要安装 [Node.js](https://nodejs.org)，并确保 node 版本是 14.x 或以上。推荐使用 [nvm](https://github.com/nvm-sh/nvm)（Windows 下使用 [nvm-windows](https://github.com/coreybutler/nvm-windows)） 或者 [fnm](https://github.com/Schniz/fnm) 来管理 node 版本。下面以在 mac 下安装 nvm 为例：

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
# 安装 node 14 版本
$ nvm install 14
# 使用 node 14
$ nvm use 14
# 验证 node 是否安装成功
$ node -v
v14.19.3
```

## 包管理工具

安装 Node.js 后，默认会包含 npm。除此以外，还有其他的包管理工具：

- [pnpm](https://pnpm.io/)（推荐）
- [cnpm](https://www.npmjs.com/package/cnpm)（推荐）
- [yarn](https://yarnpkg.com/)

安装 pnpm 示例如下：

```bash
$ npm i pnpm -g --register=https://registry.npmmirror.com/
# 验证 pnpm 是否安装成功
$ pnpm -v
7.1.7
```

如果经常需要切换 npm 镜像源，推荐使用 [nrm](https://github.com/Pana/nrm) 进行管理：

```bash
$ npm install -g nrm
# 验证 nrm 是否安装成功
$ nrm --version
# 查看所有镜像源
$ nrm ls
# 推荐使用淘宝镜像源
nrm use taobao
```

## IDE

推荐使用 IDE 进行前端应用开发和调试，会有更好的调试体验。目前比较流行的 IDE 有：

- [Visual Studio Code](https://code.visualstudio.com/)（推荐）
- [WebStorm](https://www.jetbrains.com/webstorm/)（推荐）
- [Sublime Text](https://www.sublimetext.com/)
- [Atom](https://atom.io/)

## 小程序开发者工具

目前小程序开发调试均需使用对应的开发者工具，在此附上小程序开发者工具下载链接：

- [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- [阿里小程序开发者工具](https://opendocs.alipay.com/mini/ide/download)
