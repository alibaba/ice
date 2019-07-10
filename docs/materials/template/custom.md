---
title: 自定义物料模版
order: 4
---

ice-devtools 默认集成了三种物料模版：

- [React 标准模版](https://github.com/alibaba/ice/tree/master/templates/ice-react-material-template)
- [Vue 标准模版](https://github.com/alibaba/ice/tree/master/templates/ice-vue-material-template)
- [Angular 标准模版](https://github.com/alibaba/ice/tree/master/templates/ice-angular-material-template)

在 `idev init` 时供开发者选择。

当基础物料模版不满足开发者需求时，可根据[《物料模版规范》](/docs/materials/template/standard.md)开发自己的物料模版。

**对于 React、Vue、Angular 项目，强烈建议在官方标准模版的基础上自定义。**

## 物料模版的目录结构

一套物料都包含组件、区块和项目三种不同类型的物料，因此物料模版的物料结构应该按以下规则设置：

```bash
.
├── README.md       // 物料模版文档
├── package.json
└── template        // 模版目录
    ├── block       // 区块模版
    ├── component   // 组件模版
    └── scaffold    // 项目模版
```

## package.json

物料模版的 `package.json` 里包含一个新的字段——`materialConfig`，它与物料的 `materialConfig` 有些类似，在这里的 `materialConfig` 中，定义了该模版的以下属性：

- type: 字符串，指定当前物料模版的前端框架类型 eg: 'react', 'vue', 'angular'

## 模版文件

物料模版 `template/` 目录下包含 `block`、`component` 和 `scaffold` 三个子目录，它们即物料的模版文件，ice-devtools 获取到物料模版后，也是根据这三个文件生成对应的区块、组件和项目代码。

### 模版语法

在 ice-devtools 执行 `init` 或 `add` 命令时，ice-devtools 会根据用户输入生成初始代码。这是因为在物料模版中，我们使用了 [ejs](https://ejs.co/) 语法将用户输入注入到模版中，再渲染生成初始代码。以官方 React 模版为例，以下是组件模版的模版代码：

```javascript
// https://github.com/alibaba/ice/blob/master/templates/ice-react-material-template/template/component/src/index.js
import React, { Component } from 'react';

export default class <%= className %> extends Component {
  static displayName = '<%= className %>';

  render() {
    return (
      <div className="<%= name %>">Hello <%= className %></div>
    );
  }
}
```

ice-devtools 下载物料模版后，会遍历模版文件，按 ejs 语法重新生成初始代码，这意味着开发者可以在模版的任意文件中使用 ejs 语法编写物料模版（markdown、js、scss etc）。

ice-devtools 根据用户输入，提供了以下变量供物料模版开发者使用：

- `title`：用户输入的 title，一般用于 README 标题
- `className`：首字母大写的驼峰式组件名，eg：ProfileCard
- `name`：kebab case 模式的组件名称，eg：profile-card
- `npmName`：scope + 物料名 + 组件名，eg：custom-material-profile-card
- `description`：用户输入的描述
- `version`：用户输入的版本号
- `adaptor`：用户输入的 adaptor（true or false）
- `category`：用户输入的分类
- `registry`：npm 源地址
- `materialConfig`：物料模版的 `package.json` 中定义的配置

### _package.json 与 _gitignore

在 `block`、`component` 和 `scaffold` 三个目录下，是没有 `package.json` 的，但有一个 `_package.json` 文件，这个 `_package.json` 即物料的 `package.json` 的模版，在文件内部同样使用以上 ejs 语法。使用下划线前缀的主要目的是与 npm package.json 区分，以免安装时被 npm 解析。

而另一个 `_gitignore` 则在物料被使用时被解析为 `.gitignore` 文件，在 ice-devtools 中并不处理。

## 物料模版规范

物料模版除了以上介绍的需要遵循的规则外，每种物料都有特定的规范需要遵守，如果无法满足，可能导致物料模版无法正常使用：

- [《物料模版规范》](/docs/materials/template/standard.md)

当物料模版创建成功后，还需要关注基于该模版开发的物料在发布时是否满足物料数据协议标准：

- 关于物料数据生成与使用可参考[《物料数据生成》](/docs/materials/guide/generate.md)、[《物料数据托管》](/docs/materials/guide/sync.md)、[《使用物料》](/docs/materials/guide/sync.md)
- 关于物料数据协议标准可参考[《物料数据协议》](/docs/materials/reference/protocol.md)

## 如何使用物料模版

物料模版开发完成后，需要发布到 npm 之后才可使用。发布后，执行 init 命令时通过 `--tempalte [xxx]` 指定物料模版即可。

```bash
$ idev init --template my-material-template
```
