---
title: 目录结构
order: 1
---

ICE 的默认应用目录提供了良好的代码分层结构，约定的目录结构如下：

```bash
├── build            // 构建产物目录
├── mock             // 本地模拟数据
│ ├── index.ts
├── public           // 静态资源目录
│ └── favicon.ico    // Favicon 图标
├── src              // 源码目录
│ ├── components     // 自定义业务组件
│ ├── pages          // 路由页面组件
|  |  ├── about.tsx
|  |  ├── home.tsx
|  |  └── layout.tsx // 全局布局组件
│ ├── global.css     // 全局样式
│ ├── document.tsx   // HTML 模板
│ └── app.ts         // 应用入口
├── .env             // 环境变量配置文件
├── ice.config.mts   // 构建配置
├── package.json
└── tsconfig.json    // TypeScript 配置文件
```

## package.json

声明应用所需要的各种依赖或者插件，以及配置信息（比如名称、版本、许可证等元数据）。

## ice.config.mts

应用的构建配置文件。详见 [构建配置](./config)。

## .env

配置环境变量。详见 [环境变量](./env)。

## tsconfig.json

TypeScript 编译所需的配置文件。

## mock 目录

存放 mock 文件，用于本地模拟请求数据服务。详见 [Mock](./mock)。

## public 目录

用于存放静态资源（如 `favicon.ico`）的目录，此目录下所有的文件会被复制到构建产物目录中。

## src 目录

用于存放源码的目录

### app.ts

项目的入口文件，用于对应用进行全局运行时配置，包括路由、添加 Provider 等。详见[应用入口](./app)。

### document.tsx

HTML 模板，使用 JSX 语法来描述，与 `index.html` 类似用于生成 HTML 产物。详见 [Document](./document)。

### global.[css|scss|less]

全局的样式配置，框架默认会引入该文件。详见[样式方案](./style)

### pages 目录

存放路由组件的目录。ICE 使用约定式路由，会自动根据文件生成路由规则，详见[路由](./router)。

### components 目录

项目通用的组件目录，推荐的目录形式如下：

```bash
src
├── components
|  └── Guide
|     ├── index.module.css
|     └── index.tsx
```

组件通常会在路由组件中被引入。

## 其它

- build 目录
  - 运行 `npm build` 后的构建产物目录，可修改构建配置修改输出路径。
- .ice 目录
  - 运行 ICE 项目时默认生成的临时目录，该目录不需要进行 `git` 提交。
