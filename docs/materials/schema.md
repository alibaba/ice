---
title: 物料数据协议
order: 4
---

飞冰（ICE）`物料数据规范`是一套通用的描述物料的元数据的标准格式，规范约定了物料的类型、名称、物料数据、存储位置等信息。目前基于飞冰物料数据规范实现了 react-materials 和 vue-materials 两个版本的物料数据源。

## 数据规范

```json
{
  "name": "react-materials",        // 名称
  "type": "react",                  // 类型(vue、react、angular、bootstrap、etc）
  "components": [<ComponetDesc>],   // 组件数据
  "blocks": [<BlockDesc>],          // 区块数据
  "layouts": [<LayoutDesc>],        // 布局数据
  "pages": [<PageDesc>],            // 页面数据
  "scaffolds": [<ScaffoldDesc>]     // 模板脚手架数据
}
```

## 区块数据规范

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

## 模板数据规范

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

至此，我们对飞冰的设计思想和物料数据规范有了大概的了解，如何自定义一套物料接入 iceworks 的流程。如果你看完还是不知道如何开始动手，可以通过飞冰钉钉群联系我们。
