---
title: 样式和脚本隔离
order: 9
---

# 微模块文档

本文介绍如何从零开发和使用一个微模块。

## 创建微模块

### 通过命令行方式初始化

```shell
# 创建文件夹
$ mkdir micro-module & cd micro-module

# 初始化
$ iceworks init component

# 安装依赖
$ npm install
$ npm start
```

### 通过 DEF 初始化

> 如果是阿里内部的同学，参考文档 [微模块开发接入 DEF](https://yuque.alibaba-inc.com/ice/rdy99p/mmhh1b)。

## 模块开发

```shell
$ cd my-component
$ npm install
$ npm start
```

### 模块目录

```
.
├── demo									# 模块 demo
│   └── usage.md
├── src          					# 模块源码
│   ├── index.scss
│   └── index.tsx
├── lib/                  # 构建产物，编译为 ES5 的代码
├── es/                   # 构建产物，编译为 es module 规范的代码
├── dist/                 # 构建产物，编译为 umd 规范的代码
├── jest.config.js
├── build.json	 					# 构建配置
├── README.md
├── abc.json
├── package.json
└── tsconfig.json
```

### 模块入口

模块入口文件为 `src/index.js` 。

```javascript
import React from 'react';

export default function ExampleComponent(props) {
  const { type, ...others } = props;

  return (
    <div className="ExampleComponent" {...others}>Hello ExampleComponent</div>
  );
}
```

### 样式文件

默认生成样式文件为 `src/index.scss`，根据组件开发需求可以调整为 `index.css` 或 `index.less`。

### 模块配置

模块开发工程需要在 `build.json` 中引入， `build-plugin-component` 和 `build-plugin-icestark-module` 。

```json
// build.json
{
  "plugins": [
    "build-plugin-component",
    ["build-plugin-icestark-module", {
      // ...options
    }]
  ]
}
```

`build-plugin-component` 配置请参考 [组件工程配置](https://ice.work/docs/materials/guide/component#%E7%BB%84%E4%BB%B6%E5%B7%A5%E7%A8%8B%E9%85%8D%E7%BD%AE)。 `build-plugin-icestark-module` 的工程配置如下：

#### outputDir

构建结果目录。

- 类型： String
- 默认值： 'dist'
```json
// build.json
{
  "plugins": [
    ["build-plugin-icestark-module", {
      "outputDir": 'build' // umd 构建结果打包至项目 build 目录
    }]
  ]
}
```
#### modules

配置多微模块入口。正常情况下，插件默认使用 `src/index.js` 作为微模块入口。


- 类型： object
- 默认值： {}

```json
// build.json
{
  "plugins": [
    ["build-plugin-icestark-module", {
      "modules": {
        "branch-detail": "./src/branch-detail/index.tsx",
        "edit-info": "./src/edit-info/index.tsx"
      }
    }]
  ]
}
```

如上配置后，会在构建目录打包两个微模块资源。

```
.
├── branch-detail
│   ├── index.css
│   └── index.js
├── edit-info
	  ├── index.css
	  └── index.js
```

#### externals

构建时移除三方依赖。详见 性能优化。

- 类型：object
- 默认值： {}

```json
{
  "plugins": [
    ...
    ["build-plugin-icestark-module", {
      "externals": {
        "react": {
          "root": "React",
          "url": "https://g.alicdn.com/code/lib/react/16.14.0/umd/react.production.min.js",
        },
        "react-dom": {
          "root": "ReactDOM",
          "url": "https://g.alicdn.com/code/lib/react-dom/16.14.0/umd/react-dom.production.min.js"
        }
      }
    }],
  ...
  ]
}

```

## 如何使用

### React 项目中使用

在 React 项目中使用微模块，我们推荐使用 `<MicroModule />` 组件快速接入。

```jsx
import { MicroModule } from '@ice/stark-module';

const App = () => {
  const moduleInfo = {
    name: 'moduleName',
    url: 'https://localhost/module.js',
  }
  return <MicroModule moduleInfo={moduleInfo} />;
}
```

也可以通过 mountModule/unmountModule 等 API 的方式接入。

```javascript
import { mountModule, unmoutModule } from '@ice/stark-module';
import { useRef } from 'useRef';

const moduleInfo = {
  name: 'moduleName',
  url: 'https://localhost/module.js',
};

const ModuleComponent = () => {
  const renderNode = useRef(null);
  useEffect(() => {
    mountModule(moduleInfo, renderNode.current, {});
    return unmoutModule(moduleInfo, renderNode.current);
  }, []);
  return (<div ref={renderNode}></div>);
};
```

### Vue 项目中使用

Vue 项目中需要使用 mountModule/unmountModule 的方式接入。

```html
<template>
  <div ref="mountNode"></div>
</template>

<script>
import { mountModule, unmoutModule } from '@ice/stark-module';

const moduleInfo = {
  name: 'moduleName',
  url: 'https://localhost/module.js',
};

export default {
  const mountNode = this.$refs.mountNode.$el;
	mounted () {
  	mountModule(moduleInfo, mountNode);
  },
  destroyed () {
  	unmoutModule(moduleInfo, mountNode)
  }
}
</script>
```

## 使用进阶

### 微模块中心化注册

如果需要前置中心化注册微模块，可以使用 `registerModules` 方法。
```jsx
import { MicroModule, registerModules, getModules } from '@ice/stark-module';

registerModules([
  {
    url: 'https://localhost/module-a.js',
    name: 'module-a',
  },
  {
    url: 'https://localhost/module-b.js',
    name: 'module-b',
  },
]);

const App = () => {
  // 中心化注册过，可以通过模块名直接指定要加载的微模块
  return (
    <div>
      <MicroModule moduleName="module-a" />
      <MicroModule moduleName="module-b" />
    </div>
  );
}
```

### 自定义生命周期

可以在微模块不导出 `mount` 和 `unmount` 的情况下，自定义生命周期。

```jsx
import { MicroModule } from '@ice/stark-module';
import ReactDOM from 'react-dom';

const App = () => {
  const moduleInfo = {
    name: 'moduleName',
    url: 'https://localhost/module.js',
    mount: (ModuleComponent, mountNode, props) => {
      console.log('custom mount');
      ReactDOM.render(<ModuleComponent />, mountNode, props);
    },
  }
  return <MicroModule moduleInfo={moduleInfo} />;
}
```

值得注意的是，若微模块导出了生命周期，其优先级高于自定义生命周期。

### 性能优化

通常情况下，为了减少模块体积，希望抽离一些公共的三方库。

**首先，微模块需要在构建时移除依赖的三方库。**

```javascript
// webpack.config.js
export default {
  ...
	externals: {
   react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    }
  }
}
```

**然后，在应用项目中，声明微模块的依赖**。

```javascript
import { MicroModule } from '@ice/stark-module';
import ReactDOM from 'react-dom';

const App = () => {
  const moduleInfo = {
    name: 'moduleName',
    url: 'https://localhost/module.js',
    // 声明模块 moduleName 所需的三方依赖
    runtime: [
      {
        id: "react@16",
        url: [
          "https://g.alicdn.com/code/lib/react/16.14.0/umd/react.production.min.js"
        ]
      },
      {
        id: "react-dom@16",
        url: [
          "https://g.alicdn.com/code/lib/react-dom/16.14.0/umd/react-dom.production.min.js"
        ]
      },
    ]
  }
  return <MicroModule moduleInfo={moduleInfo} />;
}
```

如果使用官方 `build-plugin-icestark-module` 插件来构建的微模块，只需要在 build.json 中配置：

```javascript
{
  "plugins": [
    ...
    ["build-plugin-icestark-module", {
      "externals": {
        "react": {
          "root": "React",
          "url": "https://g.alicdn.com/code/lib/react/16.14.0/umd/react.production.min.js",
        },
        "react-dom": {
          "root": "ReactDOM",
          "url": "https://g.alicdn.com/code/lib/react-dom/16.14.0/umd/react-dom.production.min.js"
        }
      }
    }],
	...
  ]
}

```

该插件会在三方依赖从模块中移除，并在产物目录生成一份依赖信息 `runtime.json`，模块发布时，需要将 `runtime.json` 一起发布。这样，在应用项目总，可以使用 `runtime.json` 作为依赖信息。

```javascript
import { MicroModule } from '@ice/stark-module';
import ReactDOM from 'react-dom';

const App = () => {
  const moduleInfo = {
    name: 'moduleName',
    url: 'https://localhost/module.js',
    // 声明模块 moduleName 需要的依赖文件地址
    runtime: 'https://xxx.com/moduleName.runtime.json'
  }
  return <MicroModule moduleInfo={moduleInfo} />;
}
```
