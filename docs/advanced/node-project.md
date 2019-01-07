---
title: Koa 项目
order: 5
category: 进阶指南
---

## 开始使用

### 简介

基于 Iceworks 能够一键生成 Ice 和 Node 的前后端分离的项目；前端使用 React 技术栈，后端使用 Koa 2.x 作为服务端开发框架。

### 特性

- 一键生成项目
- 基于飞冰海量物料快速组装页面
- 可视化工程管理

### 目录结构

目录结构采用分层设计，主体分为 client 和 server 两部分，即 client 对应前端工程，server 对应服务端工程，提供 RESTful API 和 client 端进行数据通信；脚手架默认只提供最简的的 RESTful API 接口，因为在实际场景中，Node 层可能只是用来作为微服务架构中的 API 转发层，并不需要 ORM、数据库等功能。但可以通过插件化来进行支持，在创建项目的时候进行自定义选择生成项目的类型。

```makedown
project
├── client
│     ├── components       // 公共组件
│     ├── layouts          // 通用布局
│     ├── pages            // 页面
│     ├── menuConfig.js    // 导航配置
│     ├── routerConfig.js  // 路由配置
│     ├── router.js        // 路由入口
│     ├── index.html
│     ├── favicon.png
│     └── index.js         // 入口文件
|
├── server
│     ├── config           // 配置文件
│     ├── controller       // 用于解析用户的输入，处理后返回相应的结果
│     ├── middleware       // 用于编写中间件
│     ├── model            // 用于放置模型
│     ├── router           // 用于路由文件
│     └── app.js           // 入口文件
|
├── build                  // 构建后的前端静态资源
│     ├── index.html
│     ├── css
│     └── js
├── .gitignore             // git 忽略目录配置
├── .editorconfig          // 代码风格配置
├── .eslintignore          // eslint 忽略目录配置
├── .eslintrc              // eslint 配置
├── .webpackrc.js          // 自定义 webpack 配置
├── package.json           // package.json
└── README.md              // 项目说明
```

### client
client 用于组织前端工程资源，包括 HTML、CSS、JavaScript 等和 UI 相关的代码。

### server
 server 用于组织服务端的相关的代码，即常见的 MVC 的组织方式。

### build
build 目录是 client 构建后的前端静态资源，Node 服务器启动的时候，该目录下的文件会映射至应用的根路径 / 下。

### 公共配置
公共配置包含代码风格、eslint 等基础配置，在整个应用中，前后端共用一套公共的基础配置。

## 使用 Iceworks 管理项目

### 基本操作

在模板页面创建项目的表单中,勾选 `添加 Koa2` 即可生成对应模板的 Koa 项目

![](https://img.alicdn.com/tfs/TB1CY2NjNjaK1RjSZFAXXbdLFXa-982-712.png "")

使用 Iceworks 管理 Koa 项目的操作与前端项目完全一致，在项目页面支持添加页面、添加区块、依赖管理、布局管理、启动调试服务等操作。

![](https://img.alicdn.com/tfs/TB1XMYDjNTpK1RjSZFMXXbG_VXa-982-712.png "")

### 启动调试

在终端执行 `npm run start` 命令启动 Koa 项目的调试服务，命令会分为 `npm run client` 和 `npm run server` 两部分执行，也可以分别执行这两条命令来启动调试。

![](https://img.alicdn.com/tfs/TB1br6NjNjaK1RjSZFAXXbdLFXa-982-712.png "")

客户端的调试服务的默认端口是 `4444`，服务端的默认端口是 `3000`，客户端的启动端口可以通过 `ice dev --project-type=node --port=端口号` 命令更改，服务端的启动端口可以在项目目录下的 `server/app.js` 文件修改。

```jsx
const Koa = require('koa');

const app = new Koa();
const port = 3000;

app.listen(port);
```

## 简单示例

这部分将以一个简单的示例介绍如何开发一个基于 Koa 框架的前后端分离项目。

### 配置环境

本节的环境配置步骤在项目模板中已经为我们配置完毕，如果需要对参数进行修改，可以参考以下步骤

在 `package.json` 中配置代理，允许客户端跨域访问服务端的 API 端口。

```jsx
"proxyConfig": {
  "/api": {
    "enable": true,
    "target": "http://127.0.0.1:3000"
  }
}
```

> 注意：此处 target 的端口应与你 server 调试服务启动的端口保持一致。

在 `server/app.js` 中配置访问客户端的入口文件

```jsx
const serve = require('koa-static');
const path = require('path');

const app = new Koa();

app.use(serve(path.join(__dirname, '..', 'build')));
```

### 添加依赖

在项目中添加 axios 依赖，用来向服务端发送 http 请求。

![](https://img.alicdn.com/tfs/TB1jovwjHvpK1RjSZPiXXbmwXXa-982-712.png "")

### 提供接口

接下来让我们在服务端编写接口提供给客户端调用，Node 项目模板的 server 目录已经为我们提供了一些简单的接口示例，用户可以查看项目目录下的 `server/controller/user.js` 文件查看这些示例接口的具体内容，在 `server/router.js` 文件中定义接口的路由和请求方式.

我们使用已经写好的 `profile` 接口，实现在控制台输出用户信息的简单示例。

### 调用接口

之后我们只要在客户端调用这些提供好的接口就可以了，我们打开项目目录下的 `client/components/Header/index.js` 文件，在用户的下拉列表中增加一项 `用户信息`。

```jsx
<li
	className="user-profile-menu-item"
	onClick={this.getUserProfile}
>
	<FoundationSymbol type="home2" size="small" />
	用户信息
</li>
```

在用户信息的 `onClick` 事件中，用 axios 向服务端发送 get 请求。

```jsx
getUserProfile = () => {
  axios
    .get('/api/profile')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
```

最后点击用户信息，实现的效果如下图所示。

![](https://img.alicdn.com/tfs/TB1g8zQiwHqK1RjSZFkXXX.WFXa-209-244.png "")

![](https://img.alicdn.com/tfs/TB1fvrQipzqK1RjSZFoXXbfcXXa-1506-143.png "")
