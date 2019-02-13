---
title: 物料开发规范
order: 6
category: 物料
---

## 飞冰设计思路

在了解飞冰物料数据规范之前，我们先来大概了解一下飞冰的设计思路；在飞冰使用过程中，大多数开发者只需要下载 GUI 工具 Iceworks，然后按照文档教程进行项目开发即可。目前飞冰提供的物料数据源有 React 和 Vue 版本，然而，在飞冰开发群里常见的问题是有没有计划支持 AngularJS 版本，有没有移动端的支持计划等等。实际上，对飞冰来说，本质上一套通用的模式，只需要按照相应的数据规范生产物料、生成数据源，最后通过 Iceworks 接入即可。如果你计划接入一套新的框架物料，可以参考下面的步骤进行：

1. 选定物料类型和开发规范
2. 物料初始化模板
3. 物料开发
4. 生成物料数据
5. 接入 Iceworks

## 物料类型和开发规范

前面讲到，对飞冰来讲本质上是通过一套通用的数据规范结合 Iceworks 运作的，因此，选定物料类型你可以基于 React、Vue、Angular 甚至是 Bootstrap 等进行开发。

开发规范主要是指开发物料时的编码规范，比如  `HTML`、`CSS`、 `JavaScript`  等基础规范。

## 物料初始化模板

物料主要包括组件、区块、布局、模板等，在开发物料时，我们需要按照一定的初始化模板进行开发，因此需要先规划好物料类型以及通用的初始化模板。

## 物料开发

物料开发即根据实际的业务场景进行组件、区块、模板的抽象进行沉淀，开发一套基于业务的专属物料。

同时我们为开发物料提供了配套的物料开发工具，物料开发工具提供的能力主要是根据预设好的物料脚手架模板进行初始化，生成模板文件方便开发，同时提供预览，热加载等服务。详细可参考  [飞冰物料开发工具 ice-devtools](https://github.com/alibaba/ice/tree/master/tools/ice-devtools)

## 生成物料数据源

在物料开发完成时，需要生成对应的物料元数据，为 Iceworks 提供数据源。数据源本质上是一份 JSON 文件。如:

> 飞冰官网物料源地址： [http://ice.alicdn.com/assets/react-materials.json](http://ice.alicdn.com/assets/react-materials.json)
> Fusion.design 物料源地址：[https://fusion.design/api/v1/sites/1/materials](https://fusion.design/api/v1/sites/1/materials)

## 接入 Iceworks

生成好物料数据源，只需要对应的数据源地址提供给 Iceworks, 在设置面板中添加即完成了完整链路的闭环。

## 物料数据规范

飞冰`物料数据规范`是一套通用的描述物料的元数据的标准格式，规范约定了物料的类型、名称、物料数据、存储位置等信息。目前基于飞冰物料数据规范实现了 react-materials 和 vue-materials 两个版本的物料数据源。

#### 数据规范

```json
{
  "name": "react-materials",        // 名称
  "type": "react",                  // 类型(vue、react、angular、bootstrap、etc）
  "components": [<ComponetDesc>],   // 组件数据
  "blocks": [<BlockDesc>],          // 区块数据
  "layouts": [<LayoutDesc>],        // 布局数据
  "pages": [<PageDesc>],            // 页面数据
  "scaffolds": [<ScaffoldDesc>]     // 模板脚手架数据
}
```

#### 区块数据规范

```json
{
  // (必)英文名
  "name": "foo-block",

  // (必)中文描述
  "title": "示例区块",

  // (可)区块详细说明
  "description": "",

  // (必) 区块的预览地址
  "homepage": ""

  // (必) 区块代码地址
  repository: ""

  // (必) source 字段描述区块下载方式
  "source": {
    "type": "npm",
    "npm": "@icedesign/foo-block",
    "registry": "http://registry.npmjs.com"
    "version": "0.1.0",
    "sourceCodeDirectory": "src",
  },

  // (必) 分类
  "categories": [""],

  // (必) 截图
  "screenshot": "https://img.alicdn.com/tfs/TB1I67ih3vD8KJjy0FlXXagBFXa-947-929.png",

  // (必) 发布时间
  "publishTime": "2018-03-13 22:19",

  // (必) 最后修改时间
  "updateTime": "2018-03-13 22:19",

  // (必) 用于说明组件依赖关系
  "components": {
    "@alifd/next": "^x.x.x",
  },

  // (必) features
  "features": {
    // 分词, 用于搜索
    "participle": { /* ... */ },

    // 区块使用的组件
    "useComponents": [{
        "basePackage": "@alifd/next",
        "className": "Grid"
    },{
        "basePackage": "@icedesign/container",
        "className": "Container"
    }]
  }
}

```

#### 模板数据规范

模板数据规范相对区块数据规范不同的是不需要指定 `sourceCodeDirectory` 字段：

```json
{
  // (必)英文名
  "name": "ice-design-pro",

  // (必)中文描述
  "title": "pro 模板",

  // (可)区块详细说明
  "description": "",

  // (可)模板预览地址
  "homepage": "https://alibaba.github.io/ice/scaffold-preview/ice-design-pro.html"

  // (必) source 字段描述下载方式
  "source": {
    "type": "npm",
    "npm": "@icedesign/pro",
    "version": "0.1.0"
  },

  // (必) 分类
  "categories": [],

  // (必) 截图
  "screenshot": "https://img.alicdn.com/tfs/TB1I67ih3vD8KJjy0FlXXagBFXa-947-929.png",

  // (必) 发布时间
  "publishTime": "2018-03-13 22:19",

  // (必) 最后修改时间
  "updateTime": "2018-03-13 22:19",

  // (必) 用于说明组件依赖关系 (dependencies 字段)
  "features": {},

  // (可) features
  "features": {}
}
```

至此，我们对飞冰的设计思想和物料数据规范有了大概的了解，如何自定义一套物料接入 Iceworks 的流程。如果你看完还是不知道如何开始动手，可以通过飞冰钉钉群联系我们。
