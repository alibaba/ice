---
title: 单个物料开发
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
- categories：选择分类，用于快速索引

完成后，在 `blocks/` 目录下生成了新的区块目录，其目录结构如下：

```bash
.
├── README.md        // 区块文档
├── _gitignore
├── build            // 构建产物
│   ├── index.css
│   ├── index.html
│   └── index.js
├── demo             // 区块的示例
│   ├── index.html
│   └── index.js     // 示例入口文件
├── ice.config.js    // ice-scripts 配置，请勿随意更改（react）
├── package.json
├── screenshot.png   // 截图
└── src              // 源码
    ├── index.js
    └── main.scss
```

根据提示进入区块文件夹，安装依赖并开始开发：

```bash
$ cd blocks/ProfileCard
$ npm install
$ npm start
```

区块的主要代码在 `src/` 和 `demo/` 连个目录中，src 顾名思义，是区块源码目录，所有源码在这个目录下完成，而 demo 目录由 `index.html` 和 `index.js` 组成，他们为物料提供预览服务，`index.html` 即标准的 html 模版文件，`index.js` 是预览的入口文件，大部分情况下无需更改。

每个物料开发完成后，都需要先发布到 npm 才能使用，我们在当前路径执行 `npm publish` 发布 ProfileCard 区块：

```bash
npm publish
```

发布需要 npm 账号，如果没有，先到 [npm](https://www.npmjs.com/) 注册账号，注册完成后，在终端执行 `npm login` 登录后再发布。

执行 publish 命令的时会自动执行 `npm run build` 和 `npm run screenshot`。build 命令完成区块的构建任务，而 screenshot 命令作用是生成区块截图，截图被用于 iceworks 展示。当然，你也可以手动截图图片作为截图，只需要截图以 `screenshot.png` 保存在当前目录即可。

至此，区块的开发已经结束。

## 组件开发

组件的开发流程和区块相似，在完成组件的初始化后，在 `components/` 目录下生成了新的组件目录，其目录结构如下：

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

和区块不同的地方在于，demo 目录下不再是 `html` 和 `js` 文件，而是一个个的 `md` 文件。这些 `md` 是该组件的示例代码及描述，每个示例一个文件，这些 `md` 会在启动开发服务时自动渲染，为组件提供开发预览及文档能力。示例如下：

```markdown
---
title: Simple Usage
order: 1
---

本 Demo 演示一行文字的用法。

````jsx
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
````
```

另一个区别在于组件的构建产物多个一个 `lib/` 目录，这个目录存放组件 ES5 风格的代码。

## 项目开发

项目初始化的代码则更加复杂：

```bash
.
├── README.md               // 文档
├── _gitignore
├── build                   // 构建产物
│   ├── css
│   ├── favicon.png
│   ├── index.html
│   └── js
├── ice.config.js           // ice-scripts 配置，请勿随意更改（react）
├── package.json
├── public                  // 公共文件：favicon、html 模版等
│   ├── favicon.png
│   └── index.html
├── screenshot.png          // 截图
├── src                     // 项目源码
│   ├── components          // 公共组件
│   │   └── Greeting
│   ├── index.js            // 入口文件
│   ├── layouts             // 布局
│   │   └── BasicLayout
│   ├── menuConfig.js       // 菜单配置
│   ├── pages               // 页面
│   │   ├── About
│   │   └── Home
│   ├── router.jsx          // 路由入口文件
│   └── routerConfig.js     // 路由配置
└── tests
```

其生成的代码和普通前端项目没有太多区别，唯一需要注意的是 `menuConfig.js` 和 `routerConfig.js`，这两个文件作用是配置菜单项和路由项，请按照物料协议标准进行修改，否则**无法在 icework 中使用**，关于这两个文件的更多信息，可参考[《物料数据协议》](/docs/materials/reference/protocol.md)和[《项目模版规范》](/docs/materials/template/scaffold.md)

而其他流程则和区块没有太多区别，开发完成后需要补充项目截图，完成后正常发布即可。
