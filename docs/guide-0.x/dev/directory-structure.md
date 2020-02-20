---
title: 目录结构
order: 0
---

飞冰将前端开发领域的最佳实践集成在 icekit pro 模板中，pro 模板目录结构如下：


```markdown
├── mock/                          # 本地模拟数据
│   ├── index.js
├── public/                        # 静态文件，构建时会 copy 到 build/ 目录
│   ├── index.html                 # 应用入口 HTML
│   └── favicon.png                # Favicon
├── src/
│   ├── components/                # 自定义业务组件
│   │   └── Guide/
│   │       ├── index.jsx
│   │       └── index.module.scss
│   ├── layouts/                   # 布局组件
│   │   └── BasicLayout
│   │       ├── index.jsx
│   │       └── index.module.scss
│   ├── pages/                     # 页面
│   │   └── Home/                  # Home 页面
│   │       ├── components/        # 页面级自定义业务组件
│   │       ├── index.jsx          # 页面入口
│   │       └── index.module.scss  # css module 样式
│   ├── config/                    # 配置信息
│   │   ├── dataSource.js          # 数据源配置
│   │   ├── routes.js              # 路由配置
│   │   └── menu.js                # 导航菜单配置
│   ├── stores/                    # [可选]全局状态管理
│   │   └── user.js
│   ├── locales/                   # [可选]国际化资源
│   │   ├── en-US
│   │   └── zh-CN
│   ├── utils/                     # 工具库
│   │   └── request.js             # 通用的数据源请求方法
│   ├── global.scss                # 全局样式
│   ├── router.jsx                 # 路由渲染组件，依赖 config/routes.js
│   └── index.jsx                  # 应用入口脚本
├── ice.config.js                  # 项目工程配置，包含插件配置及自定义 `webpack` 配置等
├── README.md
├── package.json
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .stylelintignore
└── .stylelintrc.js
```


## public

我们约定 public 目录下的文件会在 dev 和 build 时被自动 copy 到输出目录（默认是 ./build）下。所以可以在这里存放 favicon, index.html 等静态文件。