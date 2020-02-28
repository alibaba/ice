---
title: 业务组件开发
order: 2
---

物料仓库初始化后，可以通过通过命令新增组件：

```bash
$ iceworks add component
```

在完成组件的初始化后，在 `components/` 目录下会生成新的组件目录

## 组件目录

```
├── demo                  # 组件 demo
│      └── usage.md
├── src                   # 组件源码
│      ├── index.scss
│      └── index.js
├── build.json            # 构建配置
├── lib/                  # 构建生成，编译为 ES5 的代码，一般情况无需关心
├── es/                   # 构建生成，编译为 es module 规范的代码，一般情况无需关心
├── build/                # 构建生成，用于组件文档/demo 预览，一般情况无需关心
├── README.md
└── package.json
```

## 编写组件

组件入口文件为 `src/index.js`，代码中应默认导出组件：

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

> 文件中添加跟当前组件相关样式，无需在组件入口单独引入

## 编写 DEMO

组件的 DEMO 演示文件，位于 `demo` 目录下，使用 `yaml-markdown` 语法。

可以修改默认的 `usage.md` ，来调整组件 DEMO，或通过增加 *.md 文件，来创建多个 DEMO。

每个 DEMO 的形式如下：

```
---
title: Simple Usage
order: 1
---

本 Demo 演示一行文字的用法。

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

​````css
.test {
    background: #CCC;
}

```

> demo 中推荐通过组件的包名进行导入

## 组件调试

通过 `npm start` 启动调试服务，浏览器默认将打开 `http://localhost:3333` 地址 ，可以根据编写的 demo 对业务组件功能进行调试。

## 组件构建

通过 `npm run build` 构建组件，默认将生成 lib 和 es 两个目录，分别对应 CommonJS 模块规范和 es module 规范。

### UMD 打包

通过设置工程上的 UMD 的相关配置，可以将业务组件以 UMD 模块方式打包，比如对上述示例组件进行设置：

```json
{
  "plugins": [
    [
      "build-plugin-component",
      {
        "library": "ExampleComponent",
        "libraryTarget": "umd"
      }
    ],
    ...
  ]
}
```

构建结果将在 es 和 lib 目录的基础上，生成 dist 目录，包含标准的umd规范格式 的 index.js 和 index.css。

### 组件构建配置

配置项均由 build-plugin-component 插件支持

#### filename

- 类型： string
- 默认值：无

如果打包 library 到 dist 目录，用来配置打包文件的名字

#### library

- 类型： string
- 默认值：空

如果打包 library 到 dist 目录，用来配置 library 名字

#### libraryExport

- 类型： string
- 默认值：空

如果打包 library 到 dist 目录，用来配置 library 出口配型，如可配置 default，对应的组件出口为 export default MyComponent

#### libraryTarget

- 类型： string
- 默认值：空

如果打包 library 到 dist 目录，用来配置 library 的类型，如 umd、amd 等

#### sourceMap

- 类型： boolean
- 默认值：false

如果打包 library 到 dist 目录，用来配置是否产出 sourceMap 文件

#### externals

- 类型： plain object
- 默认值：

如果打包 library 到 dist 目录，用来配置是否需要外部 externals，用来避免三方包被打包

#### basicComponents

- 类型： array
- 默认值：[]

如果业务组件开发依赖了非 antd 或者 @alifd/next 的基础 UI 库，可以通过 basicComponents 进行设置，组件构建时将默认设置 babel-plugin-import 进行分包加载，并在生成的 `style.js` 中引入相应的样式资源
