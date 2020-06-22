---
title: 业务组件开发
order: 2
---

物料仓库初始化后，在根目录通过命令即可新增组件：

```bash
$ cd my-materials
$ iceworks add component
```

同时你也可以在单个仓库中开发业务组件，按照下面的方式初始化即可：

```bash
$ mkdir my-component && cd my-component
$ iceworks init component
```

## 组件开发调试

```bash
$ cd my-component
$ npm install
$ npm start

# 实时将 src 编译到 lib&es 目录
$ npm start -- --watch
```

## 组件目录

```
├── demo                  # 组件 demo
│      └── usage.md
├── src                   # 组件源码
│      ├── index.scss
│      └── index.js
├── build.json            # 构建配置
├── lib/                  # 构建产物，编译为 ES5 的代码
├── es/                   # 构建产物，编译为 es module 规范的代码
├── build/                # 构建产物，用于组件文档/demo 预览
├── README.md
└── package.json
```

## 组件入口

组件入口文件为 `src/index.js`：

```js
import React from 'react';

export default function ExampleComponent(props) {
  const { type, ...others } = props;

  return (
    <div className="ExampleComponent" {...others}>Hello ExampleComponent</div>
  );
}
```

## 样式文件

默认生成样式文件为 `src/index.scss`，根据组件开发需求可以调整为 `index.css` 或 `index.less`。

> 对于业务组件自身依赖的组件，样式无需手动引入，我们会通过工程工具自动引入

## 编写 demo

组件的 demo 演示文件，位于 `demo` 目录下，使用 `yaml-markdown` 语法。可以通过修改默认的 `usage.md` 来调整组件 demo，或通过增加 *.md 文件，来创建多个 demo。

每个 demo 的形式如下：

`````
---
title: Simple Usage
order: 1
---

本 demo 演示一行文字的用法。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ExampleComponent from '@ali/example-component';

class App extends Component {
  render() {
    return (
      <div>
        <ExampleComponent />
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````

// 书写 demo 样式
````css
.ttt {
  background: red;
}
````
`````

如果开发者希望在 js 或者 ts 文件中维护 Demo 中的代码，可以通过约定的组件引入外部的代码：

`````
---
title: Simple Usage
order: 1
---

本 demo 演示一行文字的用法。

````jsx
<DemoCode src="path/to/code.js" />
````
`````

工程上将自动将路径中的源码获取，并展示在 Demo 预览页面中。通过上述的方式开发 Demo 可以享受编辑器带来的代码提示、语法高亮等便捷功能。

## 组件工程配置

build-plugin-component 支持多个参数的配置。

默认组件开发工程需要在 `build.json` 中引入 `build-plugin-component`:
```json
{
  "plugins": [
    "build-plugin-component"
  ]
}
```


### basicComponents

- 类型： array
- 默认值：[]

如果业务组件开发依赖了非 antd 或者 @alifd/next 的基础 UI 库，可以通过 basicComponents 进行设置，组件构建时将默认设置 babel-plugin-import 进行分包加载，并在生成的 `style.js` 中引入相应的样式资源

### babelPlugins

- 类型：array
- 默认值：[]

业务组件通过 babel 进行编译时需要增加额外的 babel plugin 处理，可以通过 babelPlugins 进行设置

#### 示例

```json
{
  "babelPlugins": [
    ["babel-plugin-add-module-exports", { "addDefaultProperty": true }]
  ],
  "plugins": [
    "build-plugin-component"
  ]
}
```

> 注意 babelPlugins 仅影响 es/lib 目录构建产物，如需要修改 demo 预览时的 babel 配置，请通过 webpack-chain 形式进行自定义

### demoTemplate

- 类型：array | string
- 默认值：`template-component-demo`

插件内置了 npm 包 `template-component-demo` 作为组件开发及构建时的 demo 预览，可以通过指定 `demoTemplate` 对进行自定义。

demo 预览组件默认接受如下参数：
- `readmeData`：readme.md 文件中的解析数据
- `demoData`：demo 文件夹下 markdowm 内容解析的数据
- `env`：当前运行环境 `development|production`
- `templateProps`：模版自定义参数，可以通过设置 `"demoTemplate": ["template-component-demo", { "platform": "h5" }]` 的方式为模版定义参数

### devServer

- 类型：object
- 默认值：`{ hot: true, disableHostCheck: true, clientLogLevel: 'silent' }`

同 [webpack devServer 配置](https://webpack.js.org/configuration/dev-server/)，自定义配置将会与默认配置合并

### filename

- 类型： string
- 默认值：无

如果打包 library 到 dist 目录，用来配置打包文件的名字

### library

- 类型： string
- 默认值：空

如果打包 library 到 dist 目录，用来配置 library 名字

### libraryExport

- 类型： string
- 默认值：空

如果打包 library 到 dist 目录，用来配置 library 出口配型，如可配置 default，对应的组件出口为 export default MyComponent

### libraryTarget

- 类型： string
- 默认值：空

如果打包 library 到 dist 目录，用来配置 library 的类型，如 umd、amd 等

### sourceMap

- 类型： boolean
- 默认值：false

如果打包 library 到 dist 目录，用来配置是否产出 sourceMap 文件

### minify

- 类型：boolean
- 默认：false

如果打包 library 到 dist 目录，配置打包文件是否压缩

### externals

- 类型： plain object
- 默认值：

如果打包 library 到 dist 目录，用来配置是否需要外部 externals，用来避免三方包被打包

## 常见问题

### 打包 umd 文件

通过 `npm run build` 构建组件，默认将生成 lib 和 es 两个目录，分别对应 CommonJS 模块规范和 es module 规范。通过设置工程上的 UMD 的相关配置，可以将业务组件以 UMD 模块方式打包，比如对上述示例组件进行设置：

```json
{
  "library": "ExampleComponent",
  "libraryTarget": "umd",
  "plugins": [
    "build-plugin-component"
  ]
}
```

构建结果将在 es 和 lib 目录的基础上，生成 dist 目录，包含标准的 umd 规范格式的 index.js 和 index.css。

### build 目录说明

构建生成的 `build/index.html` 是将组件 demo 以及 README 构建到一个页面里，借助 unpkg 等服务可以作为组件的文档使用，[示例](https://unpkg.alibaba-inc.com/browse/@icedesign/balloon-confirm@1.0.6/build/index.html) 。

注意：构建 `build` 会加长 `npm run build` 的时间，如不需要可通过 `--skip-demo` 的命令行参数关闭。

### style.js 文件说明

为了解决组件的样式加载问题，同时为了隔离脚本和样式，因此针对组件自身以及依赖的样式我们会单独构建一个 style.js 的文件：

```js
require('@alifd/next/lib/form/style');
require('@alifd/next/lib/button/style');
require('@icedesign/balloon-confirm/lib/style');
require('./index.scss');
```

项目中我们通过内置插件会自动引入该 style.js，如果没有用 ICE 的工程工具则需要手动引入对应的 style.js 文件。