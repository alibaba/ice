---
title: 官方 React 物料
order: 1
---

为了提高项目的开发效率，飞冰提供了一批高质量的 React 物料，这些物料包括组件、模板、区块。

## 组件

### 基础组件

使用由阿里巴巴 [Fusion 团队](https://fusion.design) 开源的 [Next 组件](/component/affix)，包括按钮、弹窗、下拉等组件。Next 组件足够丰富且稳定，同时在国际化、无障碍方面做了较多沉淀，另外 Next 组件最大的特性是具有非常强大灵活的主题定制能力，使其可以满足更多的业务场景，具体可参考文档 [配置主题](/docs/cli/theme.md)。

安装组件依赖：

```bash
# 所有的基础组件都在 @alifd/next 这一个 npm 包中
$ npm i --save @alifd/next
```

在代码中引入并使用组件：

```jsx
import React from 'react';
import ReactDOM from 'react';
import { Button, Dialog, Select } from '@alifd/next';

ReactDOM.render((
  <div>
    <Button>主要按钮<Button>
  </div>
), mountNode);
```

### 业务组件

除了基础组件，我们针对不同业务场景封装了很多 [业务组件](/component/balloonconfirm)，每个业务组件对应一个 npm 包。

安装组件依赖：

```bash
# 安装两个业务组件
$ npm i --save @icedesign/balloon-confirm @icedesign/img
```

在代码中引入并使用组件：

```jsx
import React from 'react';
import ReactDOM from 'react';
import BalloonConfirm from '@icedesign/balloon-confirm';
import Img from '@icedesign/img';

ReactDOM.render((
  <div>
    <Img src="" />
  </div>
), mountNode);
```

## 模板

![模板列表](https://img.alicdn.com/tfs/TB1N8X4UOrpK1RjSZFhXXXSdXXa-2404-1630.png)

针对不同的业务场景我们沉淀了 40+ 官方模板，这些模板能帮助开发者降低很多开发成本，所有的模板都可以在 [这里](/scaffold) 浏览与使用。

模板一般用于初始化项目，初始化项目一般有两种方式：

- 使用 Iceworks 创建项目
- 使用 ice-scripts 通过 init 命令创建项目：`ice init -t ${npmName}`

## 区块

![区块列表](https://img.alicdn.com/tfs/TB1EDTobLc3T1VjSZPfXXcWHXXa-2398-1426.png)

区块是一些可复用的代码片段，开发者可以快速把某个区块的代码添加到自身项目里，然后再做改动或二次加工，我们针对展现形态的差异抽象了大量的 [区块](/block)，包括但不限于富文本、图表展示、代码编辑器等等。

将区块添加到项目里同样也有两种方式：

- 在 Iceworks 中点击添加区块
- 使用 ice-scripts 通过 `add block` 命令添加：

  ```bash
  $ cd src/pages/home/components
  $ ice add block -t @icedesign/document-list-block
  ```

## 相关链接

- [模板列表](/scaffold)
- [区块列表](/block)
- [组件列表](/component)
- [物料代码](https://github.com/ice-lab/react-materials)
- [Next 组件代码](https://github.com/alibaba-fusion/next)