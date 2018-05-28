---
title: 物料数据规范
order: 6
category: 物料
---

## 飞冰设计思路

在了解飞冰物料数据规范之前，我们先来大概了解一下飞冰的设计思路；在飞冰使用过程中，大多数开发者只需要下载 GUI 工具 Iceworks，然后按照文档教程进行项目开发即可。目前飞冰提供的物料数据源有 React 和 Vue 版本，然而，在飞冰开发群里常见的问题是有没有计划支持 AngularJS 版本，有没有移动端的支持计划等等。实际上，对飞冰来说，本质上一套通用的模式，只需要按照相应的数据规范生产物料、生成数据源，最后通过 Iceworks 接入即可。如果你计划接入一套新的框架物料，可以参考下面的步骤进行：

![material-flow](https://img.alicdn.com/tfs/TB1KgToqN9YBuNjy0FfXXXIsVXa-2014-1326.png)

**选定物料类型和开发规范**

前面讲到，对飞冰来讲本质上是通过一套通用的数据协议结合 Iceworks 运作的，因此，选定物料类型你可以基于 React、Vue、Angular 甚至是 Bootstrap 进行开发。

开发规范主要是指开发物料时的编码规范，比如 `HTML`、`CSS`、 `JavaScript` 等基础规范。

**物料脚手架**

物料主要包括组件、区块、布局、模板，在开发物料时，我们需要按照一定的模板代码进行开发，因此需要先规划好物料类型以及对应的物料脚手架。详细可参考 [React 和 Vue 物料脚手架](https://github.com/alibaba/ice/tree/master/templates)

**开发者工具**

开发者工具主要包含`项目构建工具`和`物料开发工具`，项目构建工具故名思议是用来启动，构建项目的，比如我们为飞冰项目提供的项目构建工具 [ice-scripts](https://github.com/alibaba/ice/tree/master/tools/ice-scripts)。大家在使用 Iceworks 时，会经常用到 Iceworks 项目面板的 **启动调试服务**、**构建项目** 等功能，其背后的原理本质上是通过 GUI 的形式去调用了 CLI 的命令.

项目是可以脱离 Iceworks 单独运行的，`package.json` 里声明 `scripts` 命令，必须存在 `start` `build`. 通过 `npm run start` 与 `npm run build` 即可启动调试服务与构建。

Iceworks 会识别项目中定义的 `scripts` 脚本，**启动调试服务**、**构建项目** 分别对应 `npm run start` `npm run build`。当然，你不一定要自己去实现一个完整的 CLI 工具，Vue 社区已经有了很完善的工具 [vue-cli](https://github.com/vuejs/vue-cli)，AngularJs 也有对应的 [angular-cli](https://github.com/angular/angular-cli)。

物料开发工具即为开发物料提供的配套工具，物料开发工具提供的能力主要是根据预设好的物料脚手架进行初始化，生成模板文件方便开发，同时提供预览，热加载等服务。详细可参考 [飞冰物料开发工具 ice-devtools](https://github.com/alibaba/ice/tree/master/tools/ice-devtools)

**生成物料数据**

在物料开发完成时，需要生成对应的物料元数据，为 Iceworks 提供数据源。数据源为一份 JSON 文件。

> 可参考 <http://ice.alicdn.com/assets/react-materials.json>

**接入 Iceworks**

生成好物料数据源，只需要将物料数据源发布 CDN 提供给 Iceworks, 在设置面板中添加即完成了完整链路的闭环。

## 物料数据规范

飞冰`物料数据规范`是一套通用的描述物料的元数据的标准格式，规范约定了物料的类型、名称、版本、数据源、存储位置等信息。目前基于飞冰物料数据规范实现了 [vue-materials](https://g.alicdn.com/ice-assets/ice-design/databases/vue-materials.json) 和 [react-materials](https://g.alicdn.com/ice-assets/ice-design/databases/react-materials.json) 两个版本的物料数据源。

**数据规范**

```
{
  "name": "react-materials",       // 名称
  "type": "react",                 // 类型(vue、react、angular、bootstrap、etc）
  "blocks": [<BlockDesc>],         // 区块元数据
  "layouts": [<LayoutDesc>],       // 布局元数据
  "scaffolds": [<ScaffoldDesc>]    // 模板脚手架元数据
}
```

**区块规范说明**

```
{
  // (必)英文名
  "name": "application-progress",

  // (必)中文描述
  "title": "申请进度信息展示",

  // (可)区块详细说明
  "description": "",

  // (必) source 字段描述区块下载方式
  "source": {
    "type": "npm",
    "npm": "@icedesign/foo-block",
    "version": "0.1.0",
    "sourceCodeDirectory": "src",
  },

  // (必) 分类
  "categories": ["信息展示"],

  // (必) 截图
  "screenshot": "https://img.alicdn.com/tfs/TB1I67ih3vD8KJjy0FlXXagBFXa-947-929.png",

  // (必) 发布时间
  "publishTime": "2018-03-13 22:19",

  // (必) 最后修改时间
  "updateTime": "2018-03-13 22:19",

  // (必) 用于说明组件依赖关系
  "components": {
    "@icedesign/base": "^x.x.x",
  },

  // (可) 保留字段
  "features": {
    // 分词, 用于搜索
    "participle": { /* ... */ },
  }
}
```

**区块规范说明**

布局规范与区块类似，但需要增加一个 `thumbnail` 用来指定抽象缩略图，用在 iceworks 的新建页面流程中，用来选择布局

```
...
"thumbnail": "https://gw.alicdn.com/tfs/TB172QmlsLJ8KJjy0FnXXcFDpXa-976-974.png"
...
```

**模板规范说明**

```
{
  // (必)英文名
  "name": "ice-design-pro",

  // (必)中文描述
  "title": "pro 模板",

  // (可)区块详细说明
  "description": "",

  // (可)模板预览地址
  "homepage": "https://alibaba.github.io/ice/scaffold-preview/ice-design-pro.html"

  // (必) source 字段描述下载方式, 下详
  "source": {
    "type": "npm",
    "npm": "@icedesign/foo-block",
    "version": "0.1.5",
    "sourceCodeDirectory": "src",
  },

  // (可) 分类
  "categories": [],

  // (必) 截图
  "screenshot": "https://img.alicdn.com/tfs/TB1I67ih3vD8KJjy0FlXXagBFXa-947-929.png",

  // (必) 发布时间
  "publishTime": "2018-03-13 22:19",

  // (必) 最后修改时间
  "updateTime": "2018-03-13 22:19",

  // (必) 用于说明组件依赖关系 (dependencies 字段)
  "components": {
    "@icedesign/base": "^x.x.x",
  },

  // (可) 保留字段
  "features": {
    // 分词, 用于搜索
    "participle": { /* ... */ },
  }
}
```

至此，我们对飞冰的设计思想和物料数据规范有了大概的了解，如何自定义一套物料接入 Iceworks 的流程。如果你看完还是不知道如何开始动手，可以通过飞冰钉钉群联系我们。
