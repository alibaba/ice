---
title: 目录结构
order: 1
---

# 目录结构

基于 CLI 工具初始化的项目，目录结构如下所示： 

```md
.
├── .ice/                          # 运行时生成的临时目录
├── build/                         # 构建产物目录
├── src/                           # 源码目录
│    ├── components                # 应用的公共组件
│    │     └── Logo             
│    │       ├── index.module.scss # Logo 组件的样式文件
│    │       └── index.jsx         # Logo 组件 JSX 源码           
│    └── pages                     # 页面
│    │     └── Home                # home 页面
│    │         └── index.jsx
│    ├── app.js                    # 应用入口文件
│    └── app.json                  # 应用配置，包括路由配置，小程序 window 配置等
├── README.md                      # 项目说明
├── build.json                     # 项目构建配置
├── package.json
└── tsconfig.json
```

## .ice/

运行小程序项目时默认生成的临时目录，该目录不需要进行 git 提交。

## build/

运行 `npm run build` 后的构建产物目录。

## src/

源码目录

### components/

`components` 目录存放当前项目级的公共组件，供其他页面或其他组件使用。

### pages/

`pages` 目录对应应用的具体页面，通过 `app.json` 中的 `routes` 配置管理，每个页面导出一个 React 组件。

```jsx
// src/pages/Home/index.jsx
import React, { Component } from 'React';

export default class extends Component {
  render() {
    return (
      <div>Hello World</div>
    );
  }
}
```

### app.js

用于应用的启动和动态配置，包括生命周期等配置。[详见](/docs/guide/basic/app)


### app.json

用于应用的静态配置，包括路由、小程序 window 等配置等。[详见](/docs/guide/basic/app)

### global.scss

用于全局的样式配置，框架默认会引入该文件。[详见](/docs/guide/basic/style)

## build.json

用于应用的工程配置文件。[详见](/docs/guide/basic/build)

## package.json

应用所需要的各种模块，以及配置信息（比如名称、版本、许可证等元数据）。

## tsconfig.json

TypeScript 编译所需的配置文件。


