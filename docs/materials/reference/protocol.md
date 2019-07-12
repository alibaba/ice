---
title: 物料数据协议
order: 2
---

ICE 物料数据协议是一套通用的描述物料元数据的标准格式，协议约定了物料的类型、名称、物料数据、存储位置等信息，通过这套数据协议，用户可以将自己开发的物料接入 iceworks 方便使用。目前基于 ICE 物料数据协议实现了 react-materials 和 vue-materials 两个官方物料。

## 物料数据结构

生成物料数据可通过 `idev generate` 命令生成，具体过程可参考[《物料数据生成》](/docs/materials/guide/generate.md)。生成的数据将被存储到 `build/materials.json` 文件中，该文件包含以下字段的数据：

- type `{string}`：（必选）指定物料类型，来源自 `package.json` 中的 `materialConfig`，例如： react、vue、angular、bootstrap 等
- name `{string}`：（必选）物料名称，来源自 `package.json` 中的 `name` 字段
- components `{Array[ComponentMetaData]}`：（必选）包含所有组件元数据的数组
- blocks `{Array[BlockMetaData]}`：（必选）包含所有区块信息的数组
- scaffolds `{Array[ScaffoldMetaData]}`：（必选）包含所有项目模版信息的数组
- description `{string}`：（可选）物料描述，来源自 `package.json` 中的 `description` 字段
- logo `{string}`：（可选）物料品牌 logo，来源自 `package.json` 中的 `materialConfig` 字段
- homepage `{string}`：（可选）物料主页，来源自 `package.json` 中的 `homepage` 字段
- author `{object}`：（可选）物料作者，来源自 `package.json` 中的 `author` 字段
- en-US `{object}`：（可选）物料国际化文案，根据 `package.json` 中的 `description` 字段生成国际化文案

## ComponentMetaData 组件元数据

```javascript
{
  // （必选）英文名称
  name: "balloon-confirm",
  // （必选）中文名称
  title: "ICE 气泡确认框",
  //（必选）描述
  description: "ICE 气泡确认框",
  //（必选）预览地址
  homepage: "https://unpkg.com/@icedesign/balloon-confirm@1.0.4/build/index.html",
  //（必选）分类
  category: "Information",
  //（必选）源码地址
  repository: "https://github.com/ice-lab/react-materials/tree/master/components/balloon-confirm",
  //（必选）描述安装方式
  source: {
    //（必选）安装方式 npm
    type: "npm",
    //（必选）npm package name
    npm: "@icedesign/balloon-confirm",
    //（必选）版本号
    version: "1.0.4",
    //（必选）npm 源
    registry: "http://registry.npmjs.com"
  },
  // （必选）依赖关系
  dependencies: {
    @alifd/next: "^1.x",
    prop-types: "^15.5.8"
  },
  // （必选）发布时间
  publishTime: "2018-09-06T16:23:58.708Z",
  // （必选）最后更新时间
  updateTime: "2019-05-25T05:54:33.164Z",
  // （可选）国际化文案
  'en-US': {
    // （可选）英文标题
    title: 'ice balloon confirm',
    // （可选）英文描述
    description: 'ice balloon confirm',
  }
}
```

## BlockMetaData 区块元数据

```javascript
{
  // （必选）英文名称
  name: "ability-introduction",
  // （必选）名称
  title: "产品能力介绍",
  //（必选）描述
  description: "产品能力介绍",
  //（必选）预览地址
  homepage: "https://unpkg.com/@icedesign/ability-introduction-block/build/index.html",
  //（必选）分类
  category: "Information",
  //（必选）源码地址
  repository: "https://github.com/ice-lab/react-materials/tree/master/blocks/AbilityIntroduction",
  //（必选）描述安装方式
  source: {
    //（必选）安装方式 npm
    type: "npm",
    //（必选）npm package name
    npm: "@icedesign/ability-introduction-block",
    //（必选）版本号
    version: "1.0.0",
    //（必选）npm 源
    registry: "http://registry.npmjs.com",
    //（必选）源码目录
    sourceCodeDirectory: "src/"
  },
  // （必选）依赖关系
  dependencies: {
    prop-types: "^15.5.8",
    react: "^16.2.0",
    @alifd/next: "^1.x"
  },
  // （必选）截图
  screenshot: "https://unpkg.com/@icedesign/ability-introduction-block/screenshot.png",
  // （可选）多张截图
  screenshots: [
    "https://unpkg.com/@icedesign/ability-introduction-block/screenshot.png"
  ],
  // （必选）发布时间
  publishTime: "2018-12-13T08:48:27.377Z",
  // （必选）最后更新时间
  updateTime: "2019-04-26T13:52:36.487Z",
  // （可选）国际化文案
  'en-US': {
    // （可选）英文标题
    title: 'ability introduction',
    // （可选）英文描述
    description: 'ability introduction',
  }
}
```

## ScaffoldMetaData 项目元数据

```javascript
{
  // （必选）前端框架类型
  type: "react",
  // （必选）英文名称
  name: "ice-design-pro",
  // （必选）名称
  title: "ICE Design Pro",
  //（必选）描述
  description: "该模板提供了 Redux、Mock、国际化、权限管理、注册登录等完整的方案，且内置了丰富的区块，主要用于展示现有区块的分类以及区块组合的效果，使用时需要根据需求进行删除和添加",
  //（必选）预览地址
  homepage: "https://unpkg.com/@icedesign/pro-scaffold@latest/build/index.html",
  //（可选）分类
  category: "Information",
  //（必选）源码地址
  repository: "https://github.com/ice-lab/react-materials/tree/master/scaffolds/ice-design-pro",
  //（必选）描述安装方式
  source: {
    //（必选）安装方式 npm
    type: "npm",
    //（必选）npm package name
    npm: "@icedesign/pro-scaffold",
    //（必选）版本号
    version: "2.0.17",
    //（必选）npm 源
    registry: "http://registry.npmjs.com"
  },
  // （必选）依赖关系
  dependencies: {
    react: "^16.2.0",
    react-document-title: "^2.0.3",
    react-dom: "^16.4.1",
    react-intl: "^2.8.0",
    react-redux: "^5.0.7",
    react-router-dom: "^4.2.2",
    react-router-redux: "5.0.0-alpha.6",
    redux: "3.6.0",
    redux-thunk: "^2.3.0"
  },
  // （必选）截图
  screenshot: "https://img.alicdn.com/tfs/TB1bqV5JwTqK1RjSZPhXXXfOFXa-2860-1580.png",
  // （必选）多张截图
  screenshots: [
    "https://img.alicdn.com/tfs/TB1bqV5JwTqK1RjSZPhXXXfOFXa-2860-1580.png",
    "https://img.alicdn.com/tfs/TB1n_CXJwHqK1RjSZFgXXa7JXXa-2862-1580.png",
    "https://img.alicdn.com/tfs/TB1Qll_JrvpK1RjSZFqXXcXUVXa-2860-1580.png"
  ],
  // （必选）构建方式
  builder: "ice-scripts",
  // （必选）发布时间
  publishTime: "2018-05-04T08:55:23.677Z",
  // （必选）最后更新时间
  updateTime: "2019-06-12T03:24:10.435Z",
  // （可选）国际化文案
  'en-US': {
    // （可选）英文标题
    title: 'ICE Design Pro',
    // （可选）英文描述
    description: 'a sample scaffold',
  }
}
```

## 物料数据国际化

根据以上协议可发现，在物料数据生成阶段会自动生成 `title` 和 `description` 的国际化文案，这些文案在初始化物料时根据用户输入的物料 title 和 description 自动生成，如有国际化需求，可根据 `[语言A标识符]文案[语言B标识符]文案[语言C标识符]文案` 的规则编辑物料 package.json 下的 `description` 字段和 `xxxConfig.title` 字段，其中语言标识符规则按照 `language-REGION` 的方式标示，即小写语言+中划线+大写地域标示，例如： `zh-CN`、`en-US`、`ja-JP`、`zh-TW` 等。ice-devtools 将按照从后往前（从右往左）方向的进行匹配，直到匹配到第一组 `[语言标识符]文案`，如果多次标示了同一种语言，则以最后匹配到的文案为准，最终未匹配到以上格式，则判段文案是否包含中文，如果包含则视为中文文案（zh-CN）否则视为英文文案（en-US）。例如：

```
'[zh-CN]描述信息[en-US]hello description'
->
zh-CN: '描述信息'
en-US: 'hello description'

[zh-CN]描述信息[en-US]
->
zh-CN: '描述信息'
en-US: ''

[zh-CN]hello description[en-US]other description
->
zh-CN: 'hello description'
en-US: 'other description'

'描述信息[en-US]hello description'
->
zh-CN: '描述信息'
en-US: 'hello description'

'hello[en-US]other description'
->
zh-CN: ''
en-US: 'hello'

'hello description[zh-CN]描述信息'
->
zh-CN: '描述信息'
en-US: 'hello description'

'描述信息'
->
zh-CN: '描述信息'

'hello description'
->
en-US: 'hello description'
```

eg:

```json
//  package.json
{
  "name": "custom-material-button",
  "description": "一个基本按钮[en-US]a sample button",
  "compoentConfig": {
    "title": "按钮[en-US]Button",
    // others property...
  }
  // others property...
}
```