---
title: 开发环境配置
order: 1
category: 入门指引
---

飞冰的开发环境依赖于 Node.js，如您已经安装了 Node.js 且版本号符合 \*LTS 版本，则可以忽略此文档。

### 安装 Node.js 环境

#### macOS 用户

我们建议您使用 \*nvm 来管理 Node.js 的安装。

打开终端，执行如下命令

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

完成后重启终端，执行 `nvm install --lts` 来安装最新 LTS 版本的 Node.js

#### Windows 用户

访问 Node.js 的官网 <https://nodejs.org/>，下载对应平台且标记为 LTS 版本的安装包，并执行安装，安装成功后在终端执行：

### 验证安装的 Node.js 版本

在终端中执行如下命令 (Windows 下可以是 Git Bash 或其它终端模拟器)

```bash
node -v
npm -v
```

终端打印出 Node.js 和 npm 的版本，则表示安装成功。

> * LTS: 指的是 Node.js 的长期维护版本，您可以在这里 https://github.com/nodejs/Release#release-schedule 看到 Node.js 各版本的官方持续维护期限
> * nvm: 请参考 https://github.com/creationix/nvm
