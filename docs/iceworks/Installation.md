---
title: 安装工具
order: 2
---

## 基础环境

iceworks 通过 CLI 方式启动本地 Web 工作台，因此需要确保系统安装过 Node.js 和 npm 环境。

#### Node.js

在终端中输入以下命令检查是否已安装 Node.js：

```bash
$ node -v
v8.9.4
```

如果有版本号输出则代表已安装 Node.js。如果无，则可以参考 [Node.js 官网](https://nodejs.org/en/)  进行下载安装。

#### npm

npm 是随同 Node.js 一起安装的包管理工具，大多数时候我们不需要显式地安装 npm，可以在终端输入 `npm -v` 检查：

```bash
$ npm -v
6.2.0
```

## 安装 iceworks

iceworks 通过 CLI 进行启动，因此在使用 iceworks 时只需要安装 CLI 工具即可：

```
$ npm install iceworks -g

$ iceworks -V
3.0.0
```

## 启动 iceworks

安装完成后在命令行执行以下命令，即可启动 iceworks，会在默认的浏览器中打开 http://localhost:8000/ 进行访问。

```bash
$ iceworks
```

## 常见问题

### 安装很慢

问题描述：安装非常慢，或者安装超时。

解决方案：使用淘宝镜像源进行下载。

```bash
$ npm install iceworks -g --registry https://registry.npm.taobao.org
```

### 安装失败

问题描述：提示 `Error：EACCES：permission denied` 类的权限问题：

![permission denied](https://img.alicdn.com/tfs/TB19UhZcFT7gK0jSZFpXXaTkpXa-1992-682.png)

解决方案：将 npm 默认目录定向到其他具有读写权限的目录

```bash
# 在用户根目录创建新的文件夹
$ mkdir ~/.npm-global

# 设置 npm 使用新的目录路径
$ npm config set prefix '~/.npm-global'

# 添加环境变量
$ export PATH=~/.npm-global/bin:$PATH

# 更新系统的环境变量
$ source ~/.profile
```
