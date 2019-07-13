## 简介

基于 Iceworks 能够一键生成 ice 和 Node 的前后端分离的项目；前端使用 React 技术栈，后端使用 Koa 2.x 作为服务端开发框架。

## 目录结构

目录结构采用分层设计，主体分为 client 和 server 两部分，即 client 对应前端工程，server 对应服务端工程，提供 RESTful API 和 client 端进行数据通信；脚手架默认只提供最简的的 RESTful API 接口，因为在实际场景中，Node 层可能只是用来作为微服务架构中的 API 转发层，并不需要 ORM、数据库等功能。但可以通过插件化来进行支持，在创建项目的时候进行自定义选择生成项目的类型。

在实际项目中，你也可以根据实际需求自定义自己的目录规范，但需要符合 Iceworks 的 基本规范，以确保能使用 Iceworks 新建页面和启动服务。如在一些工程中会有 client、admin、server 三个目录，client 对应客户端系统，admin 对应后台管理系统，server 作为服务端的 API 分发。


```
project
├── client
│     ├── build     // 构建后的前端静态资源，Node 服务器启动的时候，该目录下的文件会映射至应用的根路径 / 下。
│     │    ├── index.html
│     │    ├── css
│     │    └── js
│     ├── src       // 资源目录
│     │    ├── components       // 公共组件
│     │    ├── layouts          // 通用布局
│     │    ├── pages            // 页面
│     │    ├── menuConfig.js    // 导航配置
│     │    ├── routerConfig.js  // 路由配置
│     │    ├── router.js        // 路由入口
│     │    ├── index.html
│     │    ├── favicon.png
│     │    └── index.js         // 入口文件
|     ├── package.json          // 前端 package.json
|     ├── .gitignore            // git 忽略目录配置
|     ├── .editorconfig         // 代码风格配置
|     ├── .eslintignore         // eslint 忽略目录配置
|     ├── .eslintrc             // eslint 配置
|     └── .webpackrc.js         // 自定义 webpack 配置
|
├── server
|     ├── package.json          // 服务端 package.json
|     ├── .gitignore            
|     ├── .editorconfig         
|     ├── .eslintignore         
|     ├── .eslintrc             
|     └── src
|          ├── config           // 配置文件
|          ├── controller       // 用于解析用户的输入，处理后返回相应的结果
|          ├── middleware       // 用于编写中间件
|          ├── model            // 用于放置模型
|          ├── router           // 用于路由文件
|          └── app.js           // 入口文件
|
├── package.json           // package.json
└── README.md              // 项目说明
```

### client

client 用于组织前端工程资源，包括 HTML、CSS、JavaScript 等和 UI 相关的代码。

### server

server 用于组织服务端的相关的代码，即常见的 MVC 的组织方式。

#### 配置

公共配置包含代码风格、eslint 等基础配置，在整个应用中，前后端各自使用一套基础配置。
