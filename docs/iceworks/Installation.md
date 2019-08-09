---
title: 安装工具
order: 2
---

## 基础环境

iceworks 通过 CLI 方式启动本地 Web 工作台，因此需要确保系统安装过 Node 和 Npm 环境。

#### Node.js 
可以在终端输入 `node -v` 查看是否已经安装 Node.js，看到类似的输出就说明已经安装过，如果还未安装可以从 [Node.js 官网](https://nodejs.org/en/) 进行下载安装。

```bash
$ node -v
v8.9.4
```

#### Npm

Npm 是随同 Node.js 一起安装的包管理工具，大多数时候我们不需要显示的安装 Npm，可以在终端输入 `npm -v` 查看。

```bash
$ npm -v
6.2.0
```

## 安装 iceworks

iceworks 通过 CLI 进行启动，因此在使用 iceworks 时只需要安装 CLI 工具即可，无需额外的安装成本。

```
# 安装 iceworks
$ npm install iceworks -g

# 检查是否安装成功
$ iceworks -V
3.0.0
```

## 启动 iceworks

安装完成后，只需要在命令行执行以下命令，即可在浏览器启动本地化 Web 版本：
```bash
$ iceworks # open http://localhost:8000/
```

## 常见安装问题

#### 安装很慢

问题描述：安装时间很长安装不上

解决方案：推荐使用淘宝镜像源进行下载

```bash
# 查看 registry
$ npm config get registry 

# 设置 registry
$ npm confit set registry https://registry.npm.taobao.org 
```

#### 安装失败

问题描述：提示 `Error：EACCES：permission denied` 类的权限问题：

![permission denied](https://img.alicdn.com/tfs/TB19UhZcFT7gK0jSZFpXXaTkpXa-1992-682.png)

解决方案：将 npm 默认目录定向到其他具有读写权限的目录

```bash
# 在根目录创建新的目录
$ mkdir ~/.npm-global

# 配置 npm 以使用新的目录路径
$ npm config set prefix '~/.npm-global'

# 添加环境变量
$ export PATH=~/.npm-global/bin:$PATH

# 更新系统的环境变量
$ source ~/.profile
```
