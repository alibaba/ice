---
title: 快速开始
order: 2
---

> 需要保证已安装 [Node.js](https://nodejs.org)，并确保 Node 版本是 14 或以上。详见 [开发环境](./basic/env)。

## 创建应用

在终端执行以下命令：

```bash
$ npx create-ice ice-app --template ice-scaffold-simple
```

看到如下信息说明项目创建成功：

```bash
✔ download npm tarball successfully.
info clean package.json...
Initialize project successfully.
Starts the development server.

    cd ice-app
    npm install
    npm start
```

## 本地调试

首先需要安装项目依赖：

```bash
# 进入项目目录
$ cd ice-app
# 安装依赖
$ npm install
```

安装依赖完成以后，执行以下命令以启动调试：

```bash
# 启动调试
$ npm start
```

此时会自动打开浏览器窗口并访问 <http://localhost:3000>，这时会看到默认页面。

![img](https://img.alicdn.com/imgextra/i4/O1CN01OLXNy91dVsqNSM8x3_!!6000000003742-2-tps-654-792.png)

## 部署发布

执行以下命令以构建生产环境产物：

```bash
# 构建
$ npm build
```

产物默认生成到 `build` 目录下：

```markdown
./build
├── css
|  └── index.css
├── index.html
└── js
   ├── framework.js
   ├── index.js
   └── main.js
```

这时你可以把 `build` 目录部署到服务器上。
