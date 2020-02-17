---
title: 目录结构
order: 1
---

icejs 的默认应用目录架构提供了良好的代码分层结构，适用于开发或大或小的应用，约定的目录结构如下：

```md
├── build/                         # 构建产物目录
│   ├── index.js
├── mock/                          # 本地模拟数据
│   ├── index.[j,t]s
├── public/
│   ├── index.html                 # [可选]应用入口 HTML
│   └── favicon.png                # Favicon
├── src/                           # 源码路径
│   ├── components/                # 自定义业务组件
│   │   └── Guide/
│   │       ├── index.[j,t]sx
│   │       ├── index.module.scss
│   │       └── __tests__          # [可选] 就近测试用例
│   ├── layouts/                   # 布局组件
│   │   └── Default/
│   │       ├── index.[j,t]sx
│   │       └── index.module.scss
│   ├── pages/                     # 页面
│   │   └── Home/                  # home 页面，约定路由转成小写
│   │       ├── components/        # 页面级自定义业务组件
│   │       ├── index.[j,t]sx      # 页面入口
│   │       ├── service.[j,t]sx    # 服务
│   │       ├── models.[j,t]sx      # 模型
│   │       └── index.module.scss  # css module 样式
│   ├── configs/                   # [可选] 应用配置 
│   ├── models/                    # [可选] 全局状态管理
│   │   └── user.[j,t]s
│   ├── service/                   # [可选] 全局接口定义
│   │   └── user.[j,t]s
│   ├── locales/                   # [可选] 国际化资源
│   │   ├── en-US
│   │   └── zh-CN
│   ├── utils/                     # [可选] 工具库
│   ├── global.scss                # [可选] 全局样式
│   └── app.[j,t]sx                # [可选] 应用入口脚本 
├── tests/                         # 测试文件夹
├── build.json                     # 工程配置
├── README.md
├── package.json
├── .editorconfig
├── .eslintignore
├── .eslintrc.[j,t]s
├── .gitignore
├── .stylelintignore
├── .stylelintrc.[j,t]s
├── .prettierrc.[j,t]s
├── .gitignore
└── [j,t]sconfig.json
```

如上，由框架约定的目录：

* `build/`: 用于构建产物的目录
* `mock/`: 用于本地模拟数据的目录
* `public/`: 用于存放项目的静态文件
* `src/`: 用于项目开发的源码目录
