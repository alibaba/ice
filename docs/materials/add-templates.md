---
title: 开发模板
order: 5
category: 物料
---

## 简介

在飞冰中，模板处于物料的最上层，通过区块、布局、页面可组合成模板，使用者可以直接基于模板进行项目开发；因此，模板开发的背后本质上是指开发一套基础的脚手架模板，提供给使用者作为基础工程进行项目初始化。

![templates](https://cdn.nlark.com/lark/0/2018/png/71071/1543805991182-68f85b6d-c26a-4793-b4c4-b5565292e9b0.png)

## 模板开发规则

模板开发遵循模开发规则，上面讲到这里的模板本质上是指开发一套基础的脚手架模板，提供给使用者作为基础工程进行项目初始化，因此，模板开发还需要遵循以下规则：

- 脚本配置：通过 `start` 和 `build` 脚本启动调试服务、构建应用
- 导航配置：通过 `src/menuConfig.js` 配置导航
- 路由配置：通过 `src/routerConfig.js` 配置路由
- 页面配置：通过 `src/pages` 配置页面

### 配置**脚本**

脚手架模板约定 `package.json`  里需要声明  `scripts`  字段，且必须存在  `start:npm start`  和 `build:npm run build` 脚本，通过  `npm run start`  与  `npm run build`  可启动项目调试服务与应用构建功能。大家在使用 Iceworks 时，会经常用到 Iceworks 项目面板顶部的   启动调试服务、构建项目\_\_ \_\_等功能，其背后的原理则是通过 GUI 的形式去调用了 CLI 的命令。比如我们为飞冰项目提供的  [ice-scripts](https://github.com/alibaba/ice/tree/master/tools/ice-scripts)。

Iceworks 会识别模板中定义的  `scripts`  字段中的 `start` 和 `build` 脚本启动调试服务、构建应用。在自定义模板中，我们推荐你使用 ice-scripts，  当然，你也可以自己去实现一个完整的项目构建工具，或者使用社区开源的构建工具，比如 Vue 社区大多数用户使用的 [vue-cli](https://github.com/vuejs/vue-cli) ，AngularJs 也有对应的  [angular-cli](https://github.com/angular/angular-cli) 等。

```json
// 比如基于 ice-scripts 工程的配置
"scripts": {
  "start": "ice dev",
  "build": "ice build"
},

// 比如基于 vue-cli 工程的配置
"scripts": {
  "start": "vue dev",
  "build": "vue build"
},
```

### 配置导航

脚手架模板约定必须要有 `src/menuConfig.js`  文件，用于配置应用的导航信息，在 Iceworks 创建页面时，输入的页面导航名会写入该文件：

**menuConfig 格式：**

```javascript
const asideMenuConfig = [
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'home2',
]

export default asideMenuConfig;
```

**Iceworks 配置效果图：**

![template](https://cdn.nlark.com/lark/0/2018/png/71071/1543817452170-0d63bc07-4bb8-481b-8226-3b1b6efe089d.png)

### 路由配置

脚手架模板约定必须要有 `src/routerConfig.js`  文件，用于配置应用的路由信息，在 Iceworks 创建页面时，输入的路由路径会写入该文件：

![template](https://cdn.nlark.com/lark/0/2018/png/71071/1543818100357-a885fa26-4b9c-4019-b243-af522d5d8c71.png)

### 页面配置

脚手架模板约定必须要有 `src/pages`  目录，用于在新建页面时添加页面到该目录下，在 Iceworks 创建页面时，输入的页面目录名会写入该目录下：

![template](https://cdn.nlark.com/lark/0/2018/png/71071/1543818162318-63fb9c44-7228-4928-bbbf-d963b20c966c.png)

## 目录结构

在上面的介绍中，大家对模板开发应该有了初步的印象，接下来我们简单了解下模板开发的目录约定。

```makedown
template
├── src
│   ├── components
│   |   └── Container
│   ├── layouts
│   |   └── BasicLayout
│   ├── pages (必须)
│   |   └── Dashboard
│   ├── routerConfig.js (必须)
│   ├── menuConfig.js (必须)
│   └── index.js
├── package.json
├── public
|   ├── favicon.png
|   └── index.html
├── test
├── package.json
└── README.md
```

如上只约定了模板开发的最简目录结构，只需要确保有必须的文件既可以，其他完全可以自定义约定和按需实现，比如如何根据 menuConfig 映射到对应的 UI，如果将 routerConfig 映射到对应的路由表等等。
