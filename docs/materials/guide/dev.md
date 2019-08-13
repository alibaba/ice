---
title: 物料开发
order: 2
---

物料仓库初始化时会自动生成一些示例的物料，但这些示例一般没有什么实用价值，我们需要添加自己的物料：

```bash
$ idev add
```

选择你想开发的物料并填写相关信息，完成后 ice-devtools 会初始化好物料的基础代码。

## 区块开发

我们以区块开发为例：

![](https://img.alicdn.com/tfs/TB14nyLcwKG3KVjSZFLXXaMvXXa-1470-960.png)

在这里，我们需要填写：

- block name：区块名称（命名规范为大驼峰式）
- title：可随意填写，用于填充示例代码
- version：版本号，默认 1.0.0
- description：区块描述
- category：选择分类，用于快速索引

完成后，在 `blocks/` 目录下生成了新的区块目录。

根据提示进入区块文件夹，安装依赖并开始开发：

```bash
$ cd blocks/ProfileCard
$ npm install
$ npm start
```

区块的主要代码在 `src/`，src 顾名思义，是区块源码目录，所有源码在这个目录下完成。

每个物料开发完成后，都需要先发布到 npm 才能使用，我们在当前路径执行 `npm publish` 发布 ProfileCard 区块：

```bash
npm publish
```

执行 publish 命令的时会自动执行 `npm run build` 和 `npm run screenshot`。build 命令完成区块的构建任务，而 screenshot 命令作用是生成区块截图，截图被用于 iceworks 展示。当然，你也可以手动截图图片作为截图，只需要截图以 `screenshot.png` 保存在当前目录即可。

> 你可以使用你喜欢的截图工具截图，但我们建议使用 [@ice/screenshot](https://github.com/alibaba/ice/tree/master/packages/ice-screenshot) 工具自动截图。

至此，区块的开发已经结束。

## 组件开发

组件的开发流程和区块相似，在完成组件的初始化后，在 `components/` 目录下生成了新的组件目录。

组件目录中的 `demo` 目录由一个个的 `md` 文件组成。这些 `md` 是该组件的示例代码及描述，每个示例一个文件，这些 `md` 会在启动开发服务时自动渲染，为组件提供开发预览及文档能力。示例如下：

````
---
title: Simple Usage
order: 1
---

本 Demo 演示一行文字的用法。

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ExampleComponent from 'custom-material-example-component';

class App extends Component {
  render() {
    return (
      <div>
        <ExampleComponent>content</ExampleComponent>
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
```
````

组件构建后，组件 ES 风格代码将生成在 `lib/` 目录中。

## 项目开发

项目初始化将会生成项目开发所需的基础代码骨架，

项目模版内容请按照物料协议标准进行修改，否则**无法在 icework 中使用**，关于这两个文件的更多信息，可参考[《物料数据协议》](/docs/materials/reference/protocol.md)和[《模版规范》](/docs/materials/template/standard.md)。

而其他流程则和区块没有太多区别，开发完成后需要补充项目截图，完成后正常发布即可。
