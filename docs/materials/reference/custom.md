---
title: 自定义物料模版
order: 5
---

iceworks 初始化物料项目时可以选择一些内置的模板，同样也可以使用/开发自定义的模板。

## 已支持模板

目前，基于 iceworks 可以使用的物料模板列表如下：

|        模板 npm 包名        | 是否内置|   说明   |   备注  |
|----------------------------|-------|----------|--------|
|@icedesign/ice-react-material-template|是|  React  |     |
|@icedesign/ice-vue-material-template|是|  Vue  | 暂不支持业务组件    |
|@icedesign/ice-react-ts-material-template|是| React+TypeScript   |     |
|rax-template                             |是| 无线 | beta 阶段，不支持区块   |
|@icedesign/material-chart-template|否| React+图表   | 仅支持业务组件开发    |

对于没有内置的模板，可以通过 `iceworks init material @icedesign/material-chart-template` 的方式自定义模板名称。

## 开发自定义模板

当以上这些物料模版不满足开发者需求时，可以开发自定义的物料模版。**但是我们非常不推荐开发者自定义模板**，因为这会带来非常严重的碎片化版本的问题，因此如果有此需求的话一定要跟飞冰团队沟通，一方面确认自定义的必要性，另一方面我们希望模板能统一维护与迭代，尽量将自定义模板贡献到官方模板列表里，我们非常欢迎社区共建。

### 物料模版的目录结构

一套物料包含组件、区块和项目三种不同类型的物料，因此物料模版的物料结构应该按以下规则设置：

```bash
.
├── README.md       // 物料模版文档
├── package.json
└── template        // 模版目录
    ├── block       // 区块模版
    ├── component   // 组件模版
    └── scaffold    // 项目模版
```

### package.json

物料模版的 `package.json` 里包含一个新的字段 `materialConfig`，这里需要指定一个 `type` 字段：

- type: 字符串，指定当前物料模版的前端框架类型 eg: 'react', 'vue', 'angular'

### 模板文件

物料模版 `template/` 目录下包含 `block`、`component` 和 `scaffold` 三个子目录，它们即物料的模版文件，iceworks 获取到物料模版后，也是根据这三个文件生成对应的区块、组件和项目代码。

### 模板语法

在 iceworks 执行 `init` 命令时，iceworks 会根据用户输入生成初始代码。这是因为在物料模版中，我们使用了 [ejs](https://ejs.co/) 语法将用户输入注入到模版中，再渲染生成初始代码。以官方 React 模版为例，以下是组件模版的模版代码：

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

iceworks 下载物料模版后，会遍历模版文件，按 ejs 语法重新生成初始代码，这意味着开发者可以在模版的任意文件中使用 ejs 语法编写物料模版（markdown、js、scss etc）。

iceworks 根据用户输入，提供了以下变量供物料模版开发者使用：

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

### 特殊文件名称约定

在 `block`、`component` 和 `scaffold` 三个目录下，是没有 `package.json` 的，但有一个 `_package.json` 文件，这个 `_package.json` 即物料的 `package.json` 的模版，在文件内部同样使用以上 ejs 语法。使用下划线前缀的主要目的是与 npm package.json 区分，以免安装时被 npm 解析。

而另一个 `_gitignore` 则在物料被使用时被解析为 `.gitignore` 文件，在 iceworks 中并不处理。

## 如何使用物料模版

物料模版开发完成后，需要发布到 npm 之后才可使用。发布后，执行 init 命令时通过参数指定物料模版即可。

```bash
# 通过 npm 包
$ iceworks init material my-material-template
# 通过相对路径
$ iceworks init material ../ice-chart-template
```