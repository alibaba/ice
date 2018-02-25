---
title: 开发环境配置
order: 1
category: 入门指引
---

ICE SDK 基于 Nodejs 环境开发，提供了一整套的 SDK 辅助方法简化开发者在 ICE 开发中的操作步骤。在开始使用 ICE 前请先安装相应的开发环境。

## 一键安装

安装流程分为几个步骤，ICE 提供了 OSX 以及 window 的一键安装脚本，你可以通过以下方式安装 ICE SDK。

### OSX 安装方法

```bash
curl http://gitlab.alibaba-inc.com/ice/kit-ice/raw/master/install.sh | sh
```

### Windows 安装方法

点击 [Windows ICE SDK install](http://gitlab.alibaba-inc.com/ice/kit-ice-windows/raw/master/build/ICE%20install.exe) 下载安装包，并按照相关指示操作。

> 提示：Windows 的一键安装包其实使用了自解压程序，将几个安装文件打包在一起，同时使用 bat 批处理文件给出交互提示来实现的。具体代码请参见：http://gitlab.alibaba-inc.com/ice/kit-ice-windows

如果一键安装无法满足你的需求，可以查看以下具体的安装步骤，参照执行即可。

## 具体安装步骤

### 1. 安装 Nodejs 环境

由于 Nodejs 官网访问速度较慢，可直接阿里的镜像下载 v4.6.0 版本的安装包，下载对应平台的安装包，安装成功后重启终端执行：


- Mac: <http://web.npm.alibaba-inc.com/mirrors/node/v4.6.0/node-v4.6.0.pkg>
- win64: <http://web.npm.alibaba-inc.com/mirrors/node/v4.6.0/node-v4.6.0-x64.msi>
- win32: <http://web.npm.alibaba-inc.com/mirrors/node/v4.6.0/node-v4.6.0-x86.msi>

> 提示：其他平台用户可进入 <http://web.npm.alibaba-inc.com/mirrors/node/v4.6.0/> 选择对应平台的安装包

```bash
node -v
npm -v
```

执行之后可以看到 Node、npm 版本，表示安装成功。

### 2. 安装 tnpm

npm 是 Node 的包管理器，类似 Maven。tnpm 包含了集团的 Node Repository 镜像，支持同步社区包和管理内部的包，为了加快包的安装速度，需要安装 tnpm。执行：

```bash
npm install -g tnpm --registry=http://registry.npm.alibaba-inc.com
```

安装结束后执行

```bash
tnpm -v
```

查看 tnpm 安装的版本， 则表示安装成功；

> tnpm 的官网是： [http://npm.alibaba-inc.com](http://npm.alibaba-inc.com/)

### 3. 安装 def

def 前端集成开发环境，def 作为内部的包发布在 tnpm 上，执行命令

```bash
tnpm install @ali/def -g
```

安装结束后执行

```bash
def -v
```

查看 def 安装的版本， 则表示安装成功；

### 4. 安装 ICE 套件

执行命令，会有一个确认过程，回车即可；

```bash
def install @ali/def-kit-ice
```

稍作等待，ICE 套件就安装完成了。你可以选择继续安装我们的 ICE IDE 工具，开启高效编码。

## 安装 ICE IDE 编码套件

详细功能介绍请参见：[ICE IDE 介绍](/docs/guide/ice-ide)

### 第一步：安装 VSCode 并将 code 命令写入命令行

ICE IDE 套件基于 VSCode 开发，首先需要安装 VSCode。

打开 VSCode 官方网站：https://code.visualstudio.com/ 然后点击下载最新版的 Stable 稳定版。

![](https://img.alicdn.com/tfs/TB1KfQTdwMPMeJjy1XcXXXpppXa-1208-729.png)

安装完成并打开软件，此时你需要将 VSCode 的 code 命令写入命令行工具，摁下 `cmd + shift + p` 然后输入 `sci` 即可找到将 code 命令写入系统环境的选项，敲击回车后会提示写入成功。

![](https://img.alicdn.com/tfs/TB1mzpkdMMPMeJjy1XbXXcwxVXa-1224-194.png)

### 第二步：执行一键安装配置脚本

剩下的你只需要执行下面命令即可，后续的事情，我们的一键安装脚本会帮你搞定：

`file=$(mktemp); curl -s http://gitlab.alibaba-inc.com/ice/ice-ide/raw/master/allinone/latest/setup.sh > $file; sh $file; rm $file`