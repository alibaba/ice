## 简介

基于 Iceworks 能够一键生成 ice 和 Node 的前后端分离的项目；前端使用 React 技术栈，后端使用 Koa 2.x 作为服务端开发框架。

## 特性

- 【一期】一键生成项目
- 【一期】基于飞冰海量物料快速组装页面
- 【一期】可视化工程管理
- 【二期】Sequelize + MySQL 插件化配置 https://github.com/sequelize/sequelize
- 【二期】GraphQL 插件化配置 https://github.com/chentsulin/koa-graphql
- 【二期】API 接口可视化(Iceworks 插件面板支持)

## 目录结构

目录结构采用分层设计，主体分为 client 和 server 两部分，即 client 对应前端工程，server 对应服务端工程，提供 RESTful API 和 client 端进行数据通信；脚手架默认只提供最简的的 RESTful API 接口，因为在实际场景中，Node 层可能只是用来作为微服务架构中的 API 转发层，并不需要 ORM、数据库等功能。但可以通过插件化来进行支持，在创建项目的时候进行自定义选择生成项目的类型。

在实际项目中，你也可以根据实际需求自定义自己的目录规范，但需要符合 Iceworks 的 基本规范，以确保能使用 Iceworks 新建页面和启动服务。如在一些工程中会有 client、admin、server 三个目录，client 对应客户端系统，admin 对应后台管理系统，server 作为服务端的 API 分发。

```
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

#### 公共配置

公共配置包含代码风格、eslint 等基础配置，在整个应用中，前后端共用一套公共的基础配置。

## TODO

- [x] 通过一个命令同时启动 `npm run server` 和 `npm run client`
- [x] API 示例（model/service/controller/router）
- [x] 目录规范说明
- [x] 代理配置
- [x] 构建配置(自定义 webpackrc 配置，默认输出到 build)
- [x] 静态文件启动
- [ ] eslint 共享配置
- [ ] 前端和后端开发方式文档
- [ ] 数据库配置和 sequeslize 配置说明
- [ ] 部署说明
- [ ] 在 Iceworks 创建项目时添加 node 选项
