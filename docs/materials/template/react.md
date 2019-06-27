---
title: 官方 React 物料模板
order: 1
---

ICE 提供了标准化的 React 物料模版，在使用 `ice-devtools init` 时选择 React 官方模版即可。作为基础模版，它并不依赖任何基础组件库，但大部分情况下，物料都会基于基础组件库进行开发，如 Fusion、antd 等。下面将介绍如何基于基础组件库开发物料。

> 这套基础模版基于 ice-scripts 进行物料开发， ice-scripts 是由 ICE 团队提供的 React 工程工具，通过插件的方式为用户提供灵活的工程配置能力，可参考 [《ice-scripts 文档》](https://ice.work/docs/cli/about)。

## 基于 Fusion 的物料开发

### 初始化

首先，初始化物料项目，可参考[《物料初始化》](/docs/material/guide/init.md)，完成后添加组件：

```bash
$ idev add
```

以组件为例，按照提示补充组件信息后，ice-devtools 会自动生成相关代码，保存在 `components/` 目录下，更多细节可参考[《单个物料开发》](/docs/material/guide/dev.md)。

### 开发

我们进入该目录，执行以下命令：

```bash
# 进入组件目录
cd components/ExampleComponent

# 安装依赖
$ npm install

# 启动服务
$ npm start
```

此时组件仅展示了一行文本，我们需要开发基于 Fusion 的组件，则需要先安装组件库依赖：

```bash
$ npm install @alifd/next --save
```

安装完组件库依赖后已经可以进入开发，但这样有个问题，必须每次手动引入组件样式，组件也无法做到按需加载，因此我们还需要配置 ice-scripts，这些配置相对麻烦，好在 ice-scripts 提供的 `ice-plugin-fusion` 插件替我们解决了这些问题，我们直接使用 fusion 插件即可：

```bash
$ npm i --save-dev ice-plugin-fusion
```

> `ice-plugin-fusion` 是由 ice-scripts 提供的官方插件之一，使用这个插件，可为用户提供组件按需加载，样式自动引入，主题定制等能力，相关文档可参考 [ice-plugin-fusion](https://ice.work/docs/cli/plugin-list/fusion)。

安装完成后，我们需要在 `ice.config.js` 中添加相关配置，**请勿随意删改其他配置**：

```javascript
// ice.config.js
module.exports = {
  injectBabel: 'runtime',
  publicPath: './',
  plugins: [
    ['ice-plugin-fusion', {}],   // 添加 fusion 插件
    'ice-plugin-component',
  ],
};
```

完成后，打开 `src/index.js` 即可进入开发：

```javascript
import React, { Component } from 'react';
import { Card } from '@alifd/next';   // 直接引入 Fusion 组件库

export default class ExampleComponent extends Component {
  static displayName = 'ExampleComponent';

  render() {
    return (
      <Card title="Simple Card" subTitle="sub title">
        <div className="custom-content">
          {this.props.children}
        </div>
      </Card>
    );
  }
}
```

如果需要引入 Fusion 的主题变量，可在 `main.scss` 中引入 Fusion scss 文件：

```scss
// 如果需要使用主题变量请引入该文件
@import "~@alifd/next/variables.scss";

.custom-content {
  color: $color-brand1-6;
}
```

对于区块和项目也是类似的开发过程。

## 基于 Antd 的物料开发

Antd 是 React 热门组件库之一，ICE 也提供了对 Antd 的支持。开发基于 Antd 的物料步骤和 Fusion 类似，唯一区别在于我们不再使用 `ice-plugin-fusion`，而是使用  [`ice-plugin-antd`](https://ice.work/docs/cli/plugin-list/antd) 插件。
