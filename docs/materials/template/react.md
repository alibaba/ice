---
title: 官方 React 物料模板
order: 2
---

ICE 提供了标准化的 React 物料模版，在使用 `ice-devtools init` 时选择 React 官方模版即可。官方 React 模版包含以下功能：

- 包含 component、block、scaffold 三种物料
- 基于 ice-scripts 作为 React 工程工具
- 内置 Fusion 基础组件

> ice-scripts 是由 ICE 团队提供的 React 工程工具，通过插件的方式为用户提供灵活的工程配置能力，可参考 [《ice-scripts 文档》](https://ice.work/docs/cli/about)。

## 如何使用官方 React 物料

初始化时选择 React 标准模版即可

```bash
$ idev init
```

添加组件：

```bash
$ idev add
```

以组件为例，按照提示补充组件信息后，ice-devtools 会自动生成相关代码，保存在 `components/` 目录下，更多细节可参考[《单个物料开发》](/docs/materials/guide/dev.md)。

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

React 官方物料模版中，自动集成了 Fusion 相关依赖，开发基于 Fusion 组件库的业务组件非常容易。进入 `src/index.js` 引入所需的基础组件：

```javascript
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Card } from '@alifd/next';

class CustomCard extends Component {
  render() {
    const { children, color } = this.props;
    return (
      <Card className="custom-card" style={{ color: color }}>
        <p>card content</p>
        { children }
      </Card>
    );
  }
}

export default CustomCard;
```

如果需要引入 Fusion 的主题变量，可在 `main.scss` 中引入 Fusion scss 文件：

```scss
// 如果需要使用主题变量请引入该文件
@import "~@alifd/next/variables.scss";

.custom-card {
  color: $color-brand1-6;
}
```

## 编写文档

组件的基本描述及 API 在 `README.md` 中编写，而 demo 示例则位于 `demo/` 目录下，使用 `yaml-markdown` 语法。

demo 不仅将作为开发模式的预览服务，在构建时，还会和 `README.md` 一起生成一份精美的静态文档。可以修改默认的 `demo/usage.md`，来调整组件 demo，或通过增加 `*.md` 文件，来创建多个 demo。

每个 demo 的形式如下：

```
---
order: {文档的排序，数字，0最小，从小到大排序}
---

# 设置文字颜色

可通过 `color` prop 设置 Card 的文字颜色。

​````jsx
import Button from '@icedesign/title';

// 默认渲染到 mountNode
ReactDOM.render(<div className="test">
  <CustomCard color="#f00">content..</CustomCard>
</div>, mountNode);
​````
```

对于区块和项目也是类似的开发过程。

## 基于 Antd 的物料开发

Antd 是 React 热门组件库之一，使用在物料中使用 Antd 需要以下步骤：

1. 移除 @alifd/next 和 ice-plugin-fusion 依赖；
2. 添加 andt 和 [ice-plugin-antd](https://ice.work/docs/cli/plugin-list/antd) 依赖；
3. 修改 `ice.config.js` 文件，移除 `ice-plugin-fusion` 后添加 `ice-plugin-antd` 配置，具体配置可查看 [ice-plugin-antd 文档](https://ice.work/docs/cli/plugin-list/antd)。
