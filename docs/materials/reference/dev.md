---
title: 开发独立业务组件
order: 4
---

在某些特殊情况下，我们可能只想开发一个独立的业务组件，而非完整的物料集合，这种情况下，可使用 `ice-devtools` 开发基于指定物料模版的独立业务组件。

## 初始化

```bash
# 新建组件文件夹
$ mkdir my-component & cd my-component

# 初始化
$ idev init --type component
```

根据提示选择物料模版及输入组件信息，ice-devtools 会生成初始化代码。以官方 React 物料模版为例，生成的代码结构如下：

```bash
.
├── README.md        // 组件文档
├── _gitignore
├── build            // 预览服务的构建产物
├── demo             // 组件的示例
│   └── usage.md     // 每个示例一个 md 文件
├── ice.config.js    // ice-scripts 配置，请勿随意更改（react）
├── lib              // 构建产物
├── package.json
└── src              // 源码
    ├── index.js
    └── main.scss
```

## 开发

进入当前组件目录，开发过程与单个物料开发是类似的。执行以下命令启动 dev server：

```bash
$ npm install

$ npm start
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

## 发布

发布组件的流程实际上也就是发布一个 npm 包的过程。

> 注：如果你还没有发过 npm 包或者对 npm 包的发布流程不了解，需要先简单了解下 npm 的相关知识，这里推荐 [npm 官网](https://www.npmjs.com/)  和阮一峰写的 [npm 模块管理器](http://javascript.ruanyifeng.com/nodejs/npm.html)。


```bash
# 在组件根目录下
$ npm publish
```
