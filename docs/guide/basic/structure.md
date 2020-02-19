---
title: 目录结构
order: 1
---

icejs 的默认应用目录架构提供了良好的代码分层结构，适用于开发或大或小的应用，约定的目录结构如下：

```md
├── build/                         # 构建产物目录
├── mock/                          # 本地模拟数据
│   ├── index.[j,t]s
├── public/
│   ├── index.html                 # 应用入口 HTML
│   └── favicon.png                # Favicon
├── src/                           # 源码路径
│   ├── components/                # 自定义业务组件
│   │   └── Guide/
│   │       ├── index.[j,t]sx
│   │       ├── index.module.scss
│   │       └── __tests__          # [可选] 就近测试用例
│   ├── layouts/                   # 布局组件
│   │   └── BasicLayout/
│   │       ├── index.[j,t]sx
│   │       └── index.module.scss
│   ├── pages/                     # 页面
│   │   └── Home/                  # home 页面，约定路由转成小写
│   │       ├── components/        # 页面级自定义业务组件
│   │       ├── models.[j,t]sx     # 页面级数据状态
│   │       ├── index.[j,t]sx      # 页面入口
│   │       └── index.module.scss  # 页面样式文件
│   ├── configs/                   # [可选] 配置文件
│   │   └── menu.[j,t]s            # [可选] 菜单配置
│   ├── models/                    # [可选] 应用级数据状态
│   │   └── user.[j,t]s
│   ├── locales/                   # [可选] 国际化资源
│   │   ├── en-US
│   │   └── zh-CN
│   ├── utils/                     # [可选] 工具库
│   ├── global.scss                # 全局样式
│   ├── routes.[j,t]s              # 路由配置
│   └── app.[j,t]s[x]                # 应用入口脚本
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
