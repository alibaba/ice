---
title: 源码概述
order: 2
---

本篇文档将对 iceworks 的源码目录进行概述。

如果你想参与 iceworks 的开发，希望这份指南可以帮助你更加轻松的进行修改，我们非常欢迎来自社区的贡献。

## 源码目录

在 iceworks 的源码架构中，主要基于以下三个目录进行设计，其作用分别如下：

* iceworks-client：前端工程代码，主要承担 iceworks UI 部分的职责，基于 React 进行开发。
* iceworks-server：后端工程代码，主要承担 iceworks APIs 部分的职责，基于 Node 进行开发。
* iceworks-cli：命令行工具，主要承担 iceworks 用户端的职责，提供基础命令用于快速启动 iceworks 应用。

## 前端工程

前端工程 iceworks-client 源码主要承担了 iceworks UI 部分的职责，也是直接面向用户端的，包含了 iceworks UI 的所有功能和核心逻辑。

### 目录结构

当克隆 [alibaba/ice](https://github.com/alibaba/ice) 仓库后，进入到 iceworks-client 目录，可以看到目录结构如下：

```
.
├─ public/              ---- 静态资源
├─ src/
│  ├─ components/       ---- 静态资源
│  ├─ hooks/            ---- 通用 hooks
│  ├─ layouts/          ---- 项目布局
│  ├─ locales/          ---- 多语言配置文件
│  ├─ pages/            ---- 项目页面
│  ├─ stores/           ---- 状态管理
│  ├─ utils/            ---- 工具函数
│  ├─ appConfig.js      ---- 全局配置
│  ├─ global.scss       ---- 全局样式
│  ├─ variables.scss    ---- 主题变量
│  ├─ index.js          ---- 应用入口
│  ├─ menuConfig.js     ---- 导航配置
│  ├─ routerConfig.js   ---- 路由配置
│  └─ socket.js         ---- socket 配置
├─ .editorconfig
├─ .eslintignore
├─ .eslintrc
├─ .gitignore
├─ ice.config.js
├─ package.json
└─ README.md
```

### 技术栈

iceworks 前端 UI 是一个典型的 SPA 应用，主要基于 react 以及 react hooks 编写 UI 代码；使用 icestore 管理应用的数据流，它本质上也是基于 react-hooks 实现；以及基于 socket 的通信机制，其用到的主要技术栈如下：

- [React](https://github.com/facebook/react), [JSX](https://reactjs.org/docs/introducing-jsx.html) and [Hooks](https://reactjs.org/docs/hooks-intro.html) syntax support.
- [react-router-dom@5.x](https://github.com/ReactTraining/react-router)
- [ES6+](http://es6-features.org)
- [react-intl](https://github.com/formatjs/react-intl)
- [socket.io-client](https://github.com/socketio/socket.io-client)
- [icestore](https://github.com/ice-lab/icestore)
- [CSS Modules](https://github.com/css-modules/css-modules)

## 后端工程

后端工程 iceworks-server 源码主要承担了 iceworks APIs 的职责，为 UI 提供接口；其次，在后端工程中，我们也实现了基于 adapter 的动态扩展机制，以此配合前端 UI 实现定制 iceworks 工作台的能力。

### 目录结构

当克隆 [alibaba/ice](https://github.com/alibaba/ice) 仓库后，进入到 iceworks-server 目录，可以看到目录结构如下：

```
.
├── README.md
├── README.zh-CN.md
├── dist                                ---- 编译后目录
├── logs                                ---- 本地日志目录
├── package.json
├── src                                 ---- 源码目录
│   ├── app/                            ---- web 层目录
│   │   ├── controller/                 ---- web 层 controller 目录
│   │   ├── middleware/                 ---- web 层中间件目录
│   │   ├── view/                       ---- web 层模板
│   │   │
│   │   ├── io/                         ---- socket 层目录 
│   │   │   ├── controller/             ---- socket 层 controller 目录
│   │   │   └── middleware/             ---- socket 层 controller 目录
│   │   | 
│   │   ├── router.ts                   ---- 路由定义     
│   │   │             
│   ├── config/
│   │   ├── config.default.ts
│   │   ├── config.local.ts
│   │   └── plugin.ts
│   │
│   └── lib/                            ---- 业务逻辑
│   │   └── adapter                     ---- 业务逻辑
│   │   └── plugin                      ---- 业务插件
│   │
│   └── interface/                      ---- 接口定义
├── test
├── tsconfig.json
└── tslint.json
```

## 技术栈

iceworks 后端使用 Midway 作为开发框架，Midway 是淘宝技术部前端部门研发的一款基于 Node.js 的全栈开发解决方案，其主要基于 ts 进行开发。在 iceworks 后端开发中，我们主要基于 socket 进行封装提供接口，其用到的主要技术栈如下：

- [Midway](https://github.com/midwayjs/midway)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [egg-socket.io](https://github.com/eggjs/egg-socket.io)

## 命令行工具

iceworks 命令行工具，主要承担 iceworks 用户端的职责，提供基础命令用于快速启动 iceworks 应用。

### 目录结构

当克隆 [alibaba/ice](https://github.com/alibaba/ice) 仓库后，进入到 iceworks-cli 目录，可以看到目录结构如下：

```
.
├── README.md
├── bin/                ---- 命令入口
│   └── iceworks.js
|
├── command/            ---- 命令接口
│   ├── add.js
│   ├── init.js
│   └── start.js
|
├── lib/                ---- 通用工具库
|
└── package.json
```

### 技术栈

iceworks cli 一个简单的命令行工具，与社区大多数命令行工具一样，开发相对比较简单，主要基于 [commander.js](https://github.com/tj/commander.js)、[Inquirer.js](https://github.com/SBoudrias/Inquirer.js) 等库进行开发。
