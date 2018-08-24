---
title: 自定义 Vue 物料
order: 4
category: 物料
---

## 基础规范

- 区块名称: 大驼峰写法, 如 `ExampleBlock`, 遵循简练能表达组件含义的原则
- 基础编码码规范: [JavaScript Style Guide](https://github.com/airbnb/javascript)
- CSS 规范: [CSS-in-JS](https://github.com/MicheleBertoli/css-in-js)

## 安装物料开发工具

执行 `npm install ice-devtools -g`

## 初始 Vue 物料项目

使用 `ice-devtools init` 开始进入环境生成操作，按照提示依次输入初始信息：

```
$ ice-devtools init ice-materials-template app
? 选择初始类型
  ◯ React
❯ ◯ Vue
? 项目名称
? 项目描述
```

创建完成后会生成如下目录结构，包含区块、布局、脚手架模板三个目录，在对应的目录下面默认内置一个相对应的示例：

```
ice-materials-template
├── vue-materials
│   ├── blocks             // 区块
│   │   └── ExampleBlock
│   ├── layouts            // 布局
│   │   └── ExampleLayout
│   └── scaffolds          // 脚手架模板
│   │   └── ice-app
├── .editorconfig
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .prettierignore
├── .prettierrc
├── LICENSE
├── README.md
├── lerna.json
└── package.json
```

## 启动本地服务

初始化完成后，可以通过 `ice-devtools start` 启动本地服务，可以看到初始的区块，布局列表：

```
$ ice-devtools start
```

**预览界面（todo 目前 beta 阶段只有简版）**
![ice-materials-preview](https://img.alicdn.com/tfs/TB15cl2lSBYBeNjy0FeXXbnmFXa-2786-1524.png)

## 自定义区块

### 区块分类

区块主要按照中后台业务常见的功能类型进行分类，不同的分类对应不同的区块，分类如下：

- 登录页
- 欢迎页
- 表格
- 列表
- 表单
- 图表
- 异常
- 筛选
- 视频
- 模态框
- 数据展示
- 信息展示

### 添加区块

进入初始化的项目，使用 `ice-devtools add` 添加区块，添加流程的规则如下：

- 初始项目选择 react 类型，默认添加到 react 对应的 react-materials/blocks 物料目录下
- 初始项目选择 vue 类型，默认添加到 vue 对应的 vue-materials/blocks 物料目录下
- 初始项目同时选择 react、vue，添加物料的时候将会询问添加物料的类型，同时生成到对应的物料目录下

```
➜ cd your-project
➜ ice-devtools add
? 选择添加类型 (Use arrow keys)
❯ 区块
  布局
  模板
```

根据提示输入对应的区块信息，添加完成后会在 `your-project/vue-materials/blocks/` 目录下新增一个区块，目录结构如下：

```
.
└── ExampleBlock
    ├── README.md               // 说明文档
    ├── package.json            // pkg.json
    └── src                     // source 源码目录
        ├── ExampleBlock.vue
        └── index.js            // 模块入口
```

### 目录文件说明

**src/ExampleBlock.vue**

`ExampleBlock.vue` 文件提供了基础的区块模板代码规范，方便快速开发一个区块：

```
<template>
  <div className="example-block">
    <h1>ExampleBlock</h1>
  </div>
</template>

<script>
export default {
  name: 'ExampleBlock',

  data() {
    return {}
  },

  created() {},

  methods: {}
}
</script>

<style>
  .example-block {
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
```

**src/index.js**

区块的入口文件，导出当前区块

```
import ExampleBlock from './ExampleBlock';

export default ExampleBlock;
```

**package.json**

`package.json` 的 `blockConfig` 字段描述了区块的名称，截图，标题，分类等信息，主要用于 Iceworks 展示使用，在创建区块时自动生成，但截图需要在区块开发完成后录入。

```
{
  "name": "example-block",  // npm 包名
  "version": "1.0.0",
  "description": "",        // 区块描述
  "author": "",
  "files": [
    "src/",
    "lib/"
  ],
  "dependencies": {
    "vue": "^2.5.16"
  },
  "blockConfig": {            // 区块的相关配置，用于 Iceworks 和站点的展示
    "name": "example-block",  // 名称
    "screenshot": "",         // 截图（如果没有截图则不在 Iceworks 中显示图片）
    "title": "示例区块",       // 标题
    "categories": "[]"        // 分类
  }
}
```

**README.md**
说明文档主要包含区块名，区块简介，以及区块截图三个字段信息

```
# example-block

简介：示例区块

![截图]()
```

### 开发调试

新增一个区块后，可以看到通过 `ice-devtools start` 启动的开发者界面刷新看到新增的区块，支持实时编译和监听改动。

## 自定义布局

布局与区块在开发模式上基本保持相同，不同点在于布局没有分类的概念，可以根据业务需求和设计规范自定义不同的布局。

## 自定义脚手架

### 添加模板

在生成的项目中默认内置了一个模板示例，你可以基于该模板进行开发，也可以通过命令 `ice-devtools add` 时选择模板进行添加：

```
$ ice-devtools add
? 选择添加类型 (Use arrow keys)
  区块
  布局
❯ 模板
```

初始化完成会生成如下目录结构：

```
.
├── README.md
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── HelloWorld.vue
│   ├── layouts
│   │   └── BlankLayout
│   │       └── index.vue
│   ├── main.js
│   ├── pages
│   │   ├── About
│   │   │   ├── About.vue
│   │   │   └── index.js
│   │   └── Home
│   │       ├── Home.vue
│   │       └── index.js
│   └── router.js
└── vue.config.js
```

### 开发调试

脚手架就是用户生成到项目中的初始文件、目录，脚手架的开发调试与常规项目开发模式相同：

```
$ cd your-scaffold
$ npm run start  // 启动服务
$ npm run build  // 构建项目
```

Iceworks 对于脚手架会将其直接下载解压到目录中。

## 发布

当物料开发完成时，发布需要几个步骤：

1.  清理无用代码。默认生成的 example-block 等需要删除，因为它们的 package name 已经被占用无法发布。
2.  将物料以 npm 包的形式发布。Iceworks 将通过 npm 下载物料解压使用。
3.  生成物料源 db.json。根据你当前的物料生成 db 的数据，提供给 iceworks 使用。
4.  部署 db.json 到 http 静态服务器，将 url 发送给使用者填入 iceworks 即可开始使用。

> 建议：模板 + 布局 + 模块 为一套完整的工程物料，建议发布之前保证每一类都有一个物料。

相关命令如下：

1. 发布 npm 包

```
$ npm publish // 进入到当前区块或者脚手架目录下执行
```

2. 生成 DB 数据

```
$ npm run db       // 在项目根目录下执行

或者

$ ice-devtools generate
```

此时将会在当前物料源下面新建 `build` 目录，并生成 json 文件。

创建一个 http 静态服务器托管这个 db.json。你可以使用 https://browsersync.io/ 或者 python SimpleHTTPServer 等启动静态服务，并可以通过类似 `http://localhost:3000/vue-materials.json` 这样的方式获取到物料数据。

至此，物料源开发完成，可以在 Iceworks 中试用。

## 接入 Iceworks

目前还在 beta 版本，支持多物料源的 Iceworks 并没有正式发布，详情请参见群里。

在设置面板中填入当前物料源 db url：

![](https://img.alicdn.com/tfs/TB1qYBFnMmTBuNjy1XbXXaMrVXa-1736-1150.png)

之后在创建项目界面即可看到你的自定义物料：

![](https://img.alicdn.com/tfs/TB10ONGnQOWBuNjSsppXXXPgpXa-1740-1152.png)
