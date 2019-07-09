---
title: 目录结构
order: 1
---

一个基本的 Kit 项目目录结构如下：

```markdown
├── mock/                    # 本地模拟数据
│   ├── index.js
├── src/
│   ├── components/
│     ├── NotFound/
│     │   ├── index.jsx     
│     │   └── index.module.scss
│   ├── layouts/             # 布局组件
│     ├── BasicLayout
│     │   ├── index.jsx
│     │   └── index.module.scss  
│   ├── pages/               # 业务页面
│     ├── Home/                  # Home 页面
│     │   ├── components/        # 页面级自定义业务组件
│     │   ├── index.jsx          # 入口文件
│     │   └── index.module.scss  # css module样式
│   ├── config/              # 配置信息
│   │   ├── dataSource.js    # 数据源配置
│   │   ├── routes.js        # 路由配置
│   │   └── menu.js          # 导航菜单配置
│   ├── stores/              # 全局状态管理
│       ├── user.js
│   ├── locales/             # 国际化资源
│       ├── en-US
│       ├── zh-CN
│   ├── utils/               # 工具库
│   │   └── request.js       # 通用的数据源请求方法
│   ├── global.scss          # 全局样式
│   ├── router.jsx           # 路由渲染组件，依赖 config/routes.js
│   └── index.jsx            # 入口脚本
├── tests/
├── ice.config.js
├── README.md
└── package.json
└── .editorconfig
└── .eslintignore
└── .eslintrc.js
└── .gitignore
└── .stylelintignore
└── .stylelintrc.js
```

## 根目录

#### package.json

包含项目基本信息。

#### ice.config.js

项目工程配置，包含插件配置及自定义 `webpack` 配置等。

#### .editorconfig

`.editorconfig` 帮助用户在不同的代码编辑器中为同一项目工作的多个开发人员维护一致的编码样式。

#### .eslintignore

`.eslintignore` 文件告诉 `ESLint` 去忽略特定的文件和目录。

#### .eslintrc.js

`.eslintrc.js` 文件中定义了 `ESLint` 的规则。

#### .gitignore

`.gitignore` 文件中定义了不被提交到 `Git` 上的文件和目录。

#### .stylelintignore

`.stylelintignore` 文件告诉 `StyleLint` 去忽略特定的文件和目录。

#### .stylelintrc.js

`.stylelintrc.js` 文件中定义了 `StyleLint` 的规则。

## `/src` 目录

#### `/components` 目录

项目的自定义组件，每个页面都可以使用这里的组件。

#### `/layouts` 目录

如果要共享多个页面的一个或多个布局，可以在此目录下创建组件。

#### `/pages` 目录

所有的页面都在此目录下创建，每个页面都会对应一个路由。

#### `/config` 目录

配置目录，诸如菜单、路由以及数据源配置都会放在这个目录下。

#### `/stores` 目录

项目状态管理目录，如项目使用了 `icestore`，在此目录下创建模块状态。

#### `/locales` 目录

国际化配置都会放在此目录下。

#### `/utils` 目录

项目工具库目录，如 `request` 方法放在此目录下。

#### `global.scss`

全局样式文件，项目中有重置样式的代码可以在这里写。

#### `router.jsx`

路由解析文件，解析路由配置文件 `src/config/routes.js`。

#### `index.jsx`

项目入口文件。

## 目录别名

在代码中，会出现多次访问 `src/components` 或者 `src/config` 的情况，如果使用相对路径，嵌套较深的话可能会出现类似 `import NotFound from '../../../components/NotFound';` 这样的代码，可读性较差，使用 ICE 的模板，可以使用别名 `@` 关联 `/src` 目录，那么上面的代码就可以这样写 `import NotFound from '@/components/NotFound;`。
