---
title: 快速开始
order: 2
---

> 需要保证已安装 [Node.js](https://nodejs.org)，并确保 Node 版本是 14 或以上。详见 [开发环境](./basic/development.md)。

## 创建应用

在终端执行以下命令：

```bash
$ npm create ice ice-app
```

然后按照提示操作即可！

或者你通过附加的命令行选项指定使用的模板：

```bash
$ npm create ice ice-app --template @ice/lite-scaffold
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

## 小程序应用

通过小程序专用的模板创建项目并安装依赖：

```bash
$ npm create ice ice-app --template @ice/miniapp-scaffold
$ cd ice-app
$ npm install
```

可以看到项目的 `package.json` 中已经配置好命令：

```json title=package.json
  "scripts": {
    "start": "ice start",
    "start:wechat": "ice start --target wechat-miniprogram",
    "start:ali": "ice start --target ali-miniapp",
    "build": "ice build",
    "build:wechat": "ice build --target wechat-miniprogram",
    "build:ali": "ice start --target ali-miniapp"
  }
```

### 小程序调试

当需要开发调试小程序时，执行对应的命令即可。例如，需要开发调试微信小程序时，执行

```shell
$ npm run start:wechat
```

编译完成后，命令行会给出相应提示，提醒开发者使用对应的小程序开发者工具打开编译产物目录进行调试预览：

```shell
Use wechat-miniprogram developer tools to open the following folder:
~/miniapp-project/build
```

编译完成后，命令行会给出相应提示，提醒开发者使用对应的小程序开发者工具打开编译产物目录进行调试预览：

```shell
Use wechat-miniprogram developer tools to open the following folder:
~/miniapp-project/build
```

### 小程序部署发布

仍以微信小程序为例，执行以下命令以构建微信小程序生产环境产物：

```shell
$ npm run build:wechat
```

产物同样默认生成到 `build` 目录下。这时你可以使用对应的小程序开发者工具打开 `build` 目录并将其上传发布。
