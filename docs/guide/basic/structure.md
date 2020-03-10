---
title: 目录结构
order: 1
---

icejs 的默认应用目录架构提供了良好的代码分层结构，适用于开发或大或小的应用，约定的目录结构如下：

```md
├── .ice/                          # 运行时生成的临时目录
├── build/                         # 构建产物目录
├── mock/                          # 本地模拟数据
│   ├── index.js
├── public/
│   ├── index.html                 # 应用入口 HTML
│   └── favicon.png                # Favicon
├── src/                           # 源码
│   ├── components/                # 自定义业务组件
│   ├── layouts/                   # 布局组件
│   ├── pages/                     # 页面
│   ├── models/                    # 应用级数据状态
│   ├── global.scss                # 全局样式
│   ├── config.ts                  # 环境配置
│   ├── routes.ts                  # 路由配置
│   └── app.ts                     # 应用入口
│
├── build.json
├── package.json
└── tsconfig.json
```

## .ice/

运行 icejs 项目时默认生成的临时目录，该目录不需要进行 git 提交。

## build/

运行 `npm run build` 后的构建产物目录。

## mock/

本地模拟数据的目录。[详见](https://ice.work/docs/guide/advance/mock)

## public/

静态资源目录，默认包含 `index.html` 和 `favicon.png`。

## src/

源码目录

### components/

项目通用的组件目录，推荐的目录形式如下：

```md
Guide/
  ├── index.tsx
  ├── index.module.scss
  └── __tests__          # 就近测试用例
```

### layouts/

项目的布局文件目录，布局通常包含导航配置，布局组件，样式三部分，推荐的目录形式如下：

```md
BasicLayout/
  ├── menuConfig.ts      # 布局对应的菜单配置
  ├── index.tsx
  └── index.module.scss
```

### models/

项目的全局数据模型目录，通常包含多个 model 文件，推荐的目录形式如下。[详见](https://ice.work/docs/guide/basic/store)

```md
models/
  ├── foo.ts
  └── bar.ts
```


### pages/

项目的页面文件目录，页面通常包含数据模型，页面组件、样式三部分，推荐的目录形式如下。

```md
Home/                    # Home 页面
  ├── model.ts           # 页面级数据状态
  ├── index.tsx          # 页面入口
  └── index.module.scss  # 页面样式文件
```

### app.ts

项目的入口文件，用于对应用进行全局配置，包括路由、运行环境、请求、日志等。[详见](https://ice.alibaba-inc.com/docs/guide/basic/app)

### config.ts 

项目的环境配置，用于根据不同环境进行区分配置。[详见](https://ice.alibaba-inc.com/docs/guide/basic/config#%E6%A0%B9%E6%8D%AE%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE)

### global.scss

全局的样式配置，框架默认会引入该文件。[详见](https://ice.alibaba-inc.com/docs/guide/basic/style)

### routes.ts 

应用的路由配置文件。[详见](https://ice.alibaba-inc.com/docs/guide/basic/router)

## build.json

应用的工程配置文件。[详见](https://ice.work/docs/guide/basic/build)

## package.json

应用所需要的各种模块，以及配置信息（比如名称、版本、许可证等元数据）。

## tsconfig.json

TypeScript 编译所需的配置文件。


