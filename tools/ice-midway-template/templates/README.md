## 简介

基于 Iceworks 能够一键生成 ice 和 Node 的前后端分离的项目；前端使用 React 技术栈，后端使用 midway 作为服务端开发框架。

## 特性

- 【一期】一键生成项目
- 【一期】基于飞冰海量物料快速组装页面
- 【一期】可视化工程管理
- 【二期】Sequelize + MySQL 插件化配置 https://github.com/sequelize/sequelize
- 【二期】GraphQL 插件化配置 https://github.com/chentsulin/koa-graphql
- 【二期】API 接口可视化(Iceworks 插件面板支持)

## Midway

### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
$ npm stop
```

### 测试

- [midway-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [midway 文档 - 应用测试](https://midwayjs.org/midway/guide.html#%E5%BA%94%E7%94%A8%E6%B5%8B%E8%AF%95)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。


如需进一步了解，参见 [midway 文档](https://midwayjs.org/midway/)。


## 整体目录结构

```
.
├── README.md
├── README.zh-CN.md
├── README.md                           ---- 项目说明
├── .gitignore                          ---- git 忽略目录配置
├── .editorconfig                       ---- 代码风格配置
├── .eslintignore                       ---- eslint 忽略目录配置
├── .eslintrc                           ---- eslint 配置
├── .webpackrc.js                       ---- 自定义 webpack 配置
├── package.json                        ---- package.json
├── dist                                ---- 编译后后端代码目录
│
│   // 客户端代码
├── assert
│   ├── components                      ---- 公共组件
│   ├── layouts                         ---- 通用布局
│   ├── pages                           ---- 页面
│   ├── menuConfig.js                   ---- 导航配置
│   ├── routerConfig.js                 ---- 路由配置
│   ├── router.js                       ---- 路由入口
│   ├── index.html
│   ├── favicon.png
│   └── index.js                        ---- 入口文件
│
│   // 服务端代码
├── src                                 ---- 源码目录
│   ├── app                             ---- web 层目录
│   │   ├── controller                  ---- web 层 controller 目录
│   │   │   ├── home.ts
│   │   │   └── user.ts
│   │   ├── middleware (可选)            ---- web 层中间件目录
│   │   │   └── trace.ts
│   │   ├── public (可选)                ---- web 层静态文件目录，可以配置
│   │   ├── view (可选)
│   │   |   └── home.tpl                ---- web 层模板
│   ├── config
│   │   ├── config.default.ts
│   │   ├── config.local.ts
│   │   ├── config.prod.ts
│   │   ├── config.unittest.ts
│   │   └── plugin.ts
│   └── lib                             ---- 业务逻辑层目录
│   │   ├── interface.ts                ---- 接口定义文件
│   │   └── service                     ---- 业务逻辑层，目录根据业务自己定义
│   │       └── user.ts   
│   ├── app.ts                          ---- 应用扩展文件，可选
│   └── agent.ts                        ---- agent 扩展文件，可选
├── test
│   └── app
│       └── controller
│           └── home.test.ts
├── logs                                ---- 本地日志目录
│   └── midway6-test                    ---- 日志应用名开头
│       ├── common-error.log            ---- 错误日志
│       ├── midway-agent.log            ---- agent 输出的日志
│       ├── midway-core.log             ---- 框架输出的日志
│       ├── midway-web.log              ---- koa 输出的日志
│       └── midway6-test-web.log
├── tsconfig.json
└── tslint.json
```

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
