---
title: 项目模版规范
order: 6
---

项目的文件结构如下所示，其中，`build/` 目录为构建生成。区块需满足如下文件及构建产物。

```bash
scaffold
  ├── build                   // 【必选】项目预览服务的静态资源，构建后生成
  │   └── index.html
  │   └── indes.js
  │   └── indes.css
  ├── public                  // 【必选】放置公共资源
  │   └── index.html          //  项目的 html
  │   └── favicon             //  favicon
  ├── src                     // 【必选】项目源码
  │   ├── components          // 【可选】公共组件
  │   │   └── Greeting
  │   ├── layouts             // 【必选】布局
  │   │   └── BasicLayout
  │   ├── pages               // 【必选】页面
  │   │   ├── About
  │   │   └── Home
  │   ├── index.js            // 【必选】入口文件
  │   ├── router.jsx          // 【必选】路由生成文件
  │   ├── menuConfig.js       // 【必选】菜单配置
  │   └── routerConfig.js     // 【必选】路由配置
  ├── README.md               // 【必选】项目说明文档
  ├── ice.config.js           // 【可选】ice-scripts 工程配置，根据区块的 React 工程工具不同而有所区别
  └── package.json            // 【必选】
```

**强烈建议 React 组件使用 ice-scripts 工具进行开发**，官方 React 基础物料已提供了针对项目开发的 ice config，使用 ice-scripts 参考以下配置即可：

```javascript
module.exports = {
  entry: 'src/index.js',
  publicPath: './',
  plugins: [
    ['ice-plugin-fusion', {               // 基于 fusion 体系的项目需要使用 fusion 插件
      themePackage: '@icedesign/theme',
    }],
    ['ice-plugin-moment-locales', {       // mement 国际化插件
      locales: ['zh-cn'],
    }],
  ],
};
```

若使用其他 React 工程工具，则需满足以下特点：

- 支持 devServer 预览服务，构建时支持将项目构建为静态 html、js、css 文件存放于 `build/` 目录

### 目录结构说明

与组件、区块不同，由于项目物料使用时可由 iceworks 动态插入代码，因此**项目 `src/` 目录必须保持严谨固定的组织方式**，当然，这样的源码组织方式也是 ICE 所推荐的最佳实践。

- `components/`：存放项目级的公共组件
- `layout`：存放项目的全局布局组件，在一些项目中，可能包含多种布局，例如登录页和详情页布局可能不同
- `pages`：存放项目中的页面，每个页面一个目录，目录名规范则是首字母大写的驼峰式
- `index.js`：项目入口文件
- `router.jsx`：项目路由生成文件，在这个文件中，会引入 routeConfig.js，然后根据 routeConfig.js 生成路由
- `routerConfig.js`：项目路由配置，由 iceworks 写入，**无需用户更改**，需模版开发者在 `router.jsx` 中引入
- `menuConfig.js`：项目菜单配置，由 iceworks 写入，**无需用户更改**，需模版开发者在使用时手动引入

### routerConfig.js

在项目中，路由是按照一定的约定进行配置，用来描述路由的结构关系。路由主要分为【路由配置】和【路由生成】两部分：

- 路由配置：在 `src/routerConfig.js` 中配置路由
- 路由生成：在 `src/router.js` 中生成路由

这样设计的目的主要是分离路由配置信息和路由生成部分，配置和生成进行解耦，有利于在新增路由时只需要关注路由配置，除了顶层路由，其余路由列表都是自动生成，其中关键的就是中心化配置文件 `src/routerConfig.js`，它的主要作用是：

- 配置路由相关信息，可以配置对应路由的路径，渲染组件，权限，布局等字段
- 根据路由配置生成路由数据，并将路由数据挂载到每条路由对应的组件上
- 约定后的路由数据结构本质上是一份固定的数据协议，在 iceworks 新增页面时，也会按照约定的格式写入路由信息

一般情况下，`routerConfig.js` 内容由 iceworks 生成，用户无需关心，**也不建议开发者直接编辑该文件**。

### menuConfig.js

与 `routerConfig.js` 类似，在项目中，菜单也按照一定的约定进行配置，用来描述菜单栏的结构关系。菜单信息配置在 `src/menuConfig.js` 中，这样设计的目的主要有以下几点：

- 菜单配置包含 `headerMenuConfig` 和 `asideMenuConfig` 两种形式，`headerMenuConfig` 用于顶部导航的渲染，`asideMenuConfig` 用于侧边栏导航的渲染，这样方便在统一的位置管理应用的导航信息
- 约定后的菜单数据结构本质上是一份固定的数据协议，在 Iceworks 新增页面时，也会按照约定的格式写入菜单信息

同样的，`menuConfig.js` 内容由 iceworks 生成，用户无需关心，**也不建议开发者直接编辑该文件**。

### package.json

组件的 package.json 模版（即组件的 `_package.json` 文件）需满足以下功能：

- 模版化 `name`、`version`、`description`、`componentConfig` 字段，以便 ice-devtools 动态写入
- files 至少包含 `build/`、`src/`、`public/` 目录及 `screenshot.png`、`_gitignore` 文件
- 至少包含 `start` 、`build` 和 `screenshot` 三个命令，screenshot 能力由 ice-devtools 提供
- 包含 `scaffoldConfig` 字段，描述区块的 name、title、构建方式及 categories

```json
{
  "name": "<%= npmName %>",
  "version": "<%= version %>",
  "description": "<%= description %>",
  "files": [
    "src/",
    "build/",
    "public/",
    "tests/",
    "_gitignore",
    ".editorconfig",
    ".eslintignore",
    ".eslintrc",
    ".eslintrc",
    "screenshot.png"
  ],
  "scripts": {
    "start": "ice-scripts dev",
    "build": "ice-scripts build",
    "screenshot": "ice-devtools screenshot",
    "prepublishOnly": "npm run build && npm run screenshot"
  },
  "dependencies": {
    // more dependencies...
  },
  "scaffoldConfig": {
    "builder": "ice-scripts",
    "name": "<%= name %>",
    "title": "<%= title %>",
    "categories": <%- JSON.stringify(Object.keys(categories)) %>
  }
}
```