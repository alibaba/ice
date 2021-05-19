---
title: 业务组件开发
order: 2
---

## 创建组件

### 物料集合项目

> 项目中包含多个业务组件、区块以及模板

物料集合项目初始化后，在根目录通过命令即可新增组件：

```bash
$ cd my-materials
$ iceworks add component
```

### 单独的业务组件项目

> 项目中只包含一个业务组件

#### 通过命令行方式初始化

```bash
# 新建组件文件夹
$ mkdir my-component & cd my-component

# 初始化
$ iceworks init component
```

#### 通过 DEF 初始化

> 如果是阿里内部的同学并且想接入 DEF 发布 npm 包，可以参考文档 [组件开发接入 DEF](https://yuque.alibaba-inc.com/ice/rdy99p/gbekwv)

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
│      ├── simple.md
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

> src/index.js 中无需主动引入 src/index.scss，因为这会引起样式重复打包的问题

## 编写 demo

组件的 demo 演示文件，位于 `demo` 目录下，使用 `yaml-markdown` 语法。可以通过修改默认的 `usage.md` 来调整组件 demo，或通过增加 example.md 文件来创建多个 demo。

每个 demo 的形式如下：

````
---
title: Simple Usage
order: 1
---

本 demo 演示一行文字的用法。

```jsx
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
```

// 书写 demo 样式
```css
.ttt {
  background: red;
}
```
````

如果开发者希望在 js 或者 ts 文件中维护 Demo 中的代码，可以通过约定的组件引入外部的代码：

````
---
title: Simple Usage
order: 1
---

本 demo 演示一行文字的用法。

```jsx
<DemoCode src="path/to/code.js" />
```
````

工程上将自动将路径中的源码获取，并展示在 Demo 预览页面中。通过上述的方式开发 Demo 可以享受编辑器带来的代码提示、语法高亮等便捷功能。

## 组件文档

在执行 `npm run build` 时，会通过 `demo/` 以及 `README.md` 生成 `build/index.html`，将 html 进行托管即可完整预览组件的文档。

以 `qrcode` 组件的文档为例，[文档地址](https://unpkg.com/@icedesign/qrcode@1.0.5/build/index.html) ：

![](https://img.alicdn.com/tfs/TB1VIZ9ZEY1gK0jSZFCXXcwqXXa-1441-738.png)

默认情况下，`demo/` 目录里的文件都是扁平的，适合展示单个组件的文档，比如：

```bash
demo/
├── simple.md                          
├── size.md
├── type.md
```

但是某些情况下，我们的业务组件可能会导出多个组件，此时可以通过目录嵌套来展示多个组件的文档：

```
├── demo/                           
│   ├── ComponentA/              
│   │  ├── simple.md
│   │  └── simple2.md
│   ├── ComponentB/                
│   │  ├── simple.md
│   └──└── simple2.md
```

最终效果如下，其中每个目录对应一个组件，即左侧的一个导航：

![](https://img.alicdn.com/tfs/TB1nQrZk5DsXe8jSZR0XXXK6FXa-1426-700.png)

## 组件工程配置

默认组件开发工程需要在 `build.json` 中引入 `build-plugin-component`：

```json
{
  "plugins": [
    ["build-plugin-component", {
      // ...options
    }]
  ]
}
```

插件支持的配置参数如下：

### alias `>1.0.0`

- 类型：object
- 默认值：{}

```
{
  "alias": {
    "@": "./src"
  }
}
```

### basicComponents

- 类型： array
- 默认值：[]

如果业务组件开发依赖了非 antd 或者 @alifd/next 的基础 UI 库，可以通过 basicComponents 进行设置，组件构建时将默认设置 babel-plugin-import 进行分包加载，并在生成的 `style.js` 中引入相应的样式资源。

### babelPlugins

- 类型：array
- 默认值：[]

业务组件通过 babel 进行编译时需要增加额外的 babel plugin 处理，可以通过 babelPlugins 进行设置。

通过配置 babel-plugin-add-module-exports 增加组件 default 的导出：

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

### babelOptions

- 类型：array
- 默认值：[]

比如修改 preset-env 的配置：

```json
{
  "babelOptions": [
    { "name": "@babel/preset-env", "options": { "module": false } }
  ]
}
```

> 注意 babelOptions 仅影响 es/lib 目录构建产物，如需要修改 demo 预览时的 babel 配置，请通过 webpack-chain 形式进行自定义

### devServer

- 类型：object
- 默认值：`{ hot: true, disableHostCheck: true, clientLogLevel: 'silent' }`

同 [webpack devServer 配置](https://webpack.js.org/configuration/dev-server/)，自定义配置将会与默认配置合并。

### filename

- 类型： string
- 默认值：无

如果打包 library 到 dist 目录，用来配置打包文件的名字。

### library

- 类型： string
- 默认值：空

如果打包 library 到 dist 目录，用来配置 library 名字。

### libraryExport

- 类型： string
- 默认值：空

如果打包 library 到 dist 目录，用来配置 library 出口配型，如可配置 default，对应的组件出口为 export default MyComponent。

### libraryTarget

- 类型： string
- 默认值：空

如果打包 library 到 dist 目录，用来配置 library 的类型，如 umd、amd 等。

### sourceMap

- 类型： boolean
- 默认值：false

如果打包 library 到 dist 目录，用来配置是否产出 sourceMap 文件。

### minify

- 类型：boolean
- 默认：false

如果打包 library 到 dist 目录，配置打包文件是否压缩。

### externals

- 类型： plain object
- 默认值：

如果打包 library 到 dist 目录，用来配置是否需要外部 externals，用来避免三方包被打包。

### subComponents

- 类型：Boolean
- 默认值：false

是否包含子组件，一般用于开发类似 fusion/antd 这种大包，开启该选项之后，会为每个组件生成对应的 `style.js` 文件。

### demoTemplate

- 类型：array | string
- 默认值：`template-component-demo`

插件内置了 npm 包 `template-component-demo` 作为组件开发及构建时的 demo 预览，可以通过指定 `demoTemplate` 对进行自定义。

demo 预览组件默认接受如下参数：
- `readmeData`：readme.md 文件中的解析数据
- `demoData`：demo 文件夹下 markdowm 内容解析的数据
- `env`：当前运行环境 `development|production`
- `templateProps`：模版自定义参数，可以通过设置 `"demoTemplate": ["template-component-demo", { "platform": "h5" }]` 的方式为模版定义参数

### htmlInjection

- 类型：object
- 默认值：`{}`

向 demo 预览的 html 里注入内容，比如插入一些静态脚本等：

```
{
  "htmlInjection": {
    "headAppend": [
      "<script src='http://foo.com/a.js' />",
      "<link href='http://foo.com/a.css' />"
    ],
    "headPrepend": [],
    "bodyAppend": [],
    "bodyPrepend": [],
  }
}
```

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

项目中我们通过内置插件会自动引入组件对应的 style.js，如果没有用 ICE 的工程工具则需要手动引入对应的 style.js 文件。
