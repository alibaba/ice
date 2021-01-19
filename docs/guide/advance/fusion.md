---
title: 使用 fusion 组件
order: 14
---

项目开发中如果使用 `@alifd/next` 作为基础 UI 组件，可以通过 `build-plugin-fusion` 插件实现组件按需加载和样式主题等相关能力，飞冰官方的模板都是基于 Fusion 组件的，因此一般不需要开发者再手动引入。

## 安装插件

```bash
$ npm install build-plugin-fusion --save-dev
```

## 插件配置

* `themePackage` Fusion 组件主题包配置，如果设置为数组则启动多主题能力
* `themeConfig` 主题配置，通过设置 sass 变量对现有主题进行覆盖
* `uniteBaseComponent` 如果项目里依赖了多个不同名称的基础包，可以通过 uniteBaseComponent 来统一基础包，减少重复的代码
* `importOptions` 同 `babel-plugin-import` 参数，默认为 `{ style: true, libraryDirectory: 'es'}` 根据用户设置项将进行合并
* `externalNext` 配合 `externals` 配置，将 Next 组件作为外部依赖引入
* `usePx2Vw` 配合 postcss 插件，将 css 样式单位 px 转化为 vw ，默认为 false 不开启， true 为开启
* `px2vwOptions` 传递参数给postcss插件，默认为`{ viewportWidth: 750 }` 根据用户设置项将进行合并
* `componentOptions` 值为对象，修改业务组件的引入路径，推荐用在 PC 跨 H5 的项目中，给业务组件指定 H5 的渲染组件
* `enableColorNames` 默认为 `false`，如果开启默认将提取 `transparent`、`red`、`blue` 等色值名称
* `nextPrefix` 仅修改 `@alifd/next` 里的 css-prefix，一般用于 0.x&1.x 共存的场景

## 基础用法

配置主题包：

```json
{
  "plugins": [
    ["build-plugin-fusion", {}]
  ]
}
```

修改主题变量：

> 注意：不能跟主题包功能同时使用，[原因](https://github.com/alibaba/ice/pull/1435#issuecomment-460055905)

```json
{
  "plugins": [
    ["build-plugin-fusion", {
      "themeConfig": {
        "font-size-body-1": "14px"
      }
    }]
  ]
}
```

## 修改 prefix

fusion 组件的默认 class 前缀是 `next-`，在微前端等场景下可能需要修改 prefix：

```json
{
  "plugins": [
    ["build-plugin-fusion", {
      "themeConfig": {
        "css-prefix": "next-icestark-"
      }
    }]
  ]
}
```

上面只是修改了 CSS 产物里的 prefix，同时还需要修改 js 里的 prefix 才能保证最终的一致性：

```diff
import { runApp } from 'ice'
+import { ConfigProvider } from '@alifd/next';

const appConfig = {
  app: {
+    addProvider: ({ children }) => (
+      <ConfigProvider prefix="next-icestark-">{children}</ConfigProvider>
+    ),
  },
  },
};

runApp(appConfig);
```

## 使用主题包

Fusion 组件默认的主题是蓝色系，无法满足所有项目的需求，因此我们通过工程方式支持一键换肤的能力。

### 选择主题包

主题包即一个 npm 包，包里面对应的是一堆主题变量。ICE 官方提供了几套不同颜色的主题包，分别是：

- 默认的蓝色主题：`@alifd/theme-design-pro`
- 橙色主题：`@alifd/theme-ice-orange`
- 绿色主题：`@alifd/theme-ice-green`
- 紫色主题：`@alifd/theme-ice-purple`

如果这几个不能满足需求，可以在 ICE 群里反馈由官方来支持，也可以通过更自由的方式自行配置：[配置组件主题样式](https://fusion.design/help.html#/design-config-component)。注意：如果需要自行配置主题，推荐让专业的设计师同学来做。

![](https://img.alicdn.com/tfs/TB1y78lECzqK1RjSZPxXXc4tVXa-1768-702.png)

### 使用主题包里的自定义 Icon

在配置主题时，可以通过 iconfont 导入一些自定义的 icon，这些 icon 在项目代码里通过基础组件 Icon 即可使用：

```jsx
import { Icon } from '@alifd/next';

<Icon type="xxxx" />
```

### 使用主题变量

在项目中也可以使用主题包的变量，这样未来如果需要更换主题，业务代码就不需要做任何改动了，可以使用的变量列表请参考 [fusion.design Design Tokens](https://fusion.design/component/tokens)，使用方式如下：

```scss
// 引入主题变量
@import "~@alifd/next/variables.scss";

// 使用主题变量
.title {
  color: $color-brand1-6;
}
```

## 配置 externals

项目开发中希望将 `@alifd/next` 作为外部扩展不打包到 bundle 中，除了需要配置 `externals` 外，还需要将通过插件能力分析业务组件依赖中按需加载的 Next 组件：

```json
{
  "externals": {
    "@alifd/next": "Next"
  },
  "plugins": [
    ["build-plugin-fusion", {
      "externalNext": true
    }]
  ]
}
```

## 动态切换主题

build-plugin-fusion 结合 fusion 自身可以配置主题包的能力，支持多个主题包的配置，大大简化多主题切换的成本，通过 css 变量能力实现动态主题的切换，核心实现思路如下：
1. 提取主题包中的 scss 变量（色值变量）
2. 将 scss 变量具体内容转换为 css 变量，即 `$color-brand1-1: #E2EDFF; => $color-brand1-1: var(--color-brand-1);`
3. 注入新的 scss 变量值（如 `$color-brand1-1: var(--color-brand-1)` ）进行编译
4. 在 window 下注入 `__changeTheme__` 方法，实现不同主题包全局 css 变量声明的切换

```json
{
  "plugins": [
    ["build-plugin-fusion", {
      "themePackage": [{
        "name": "@icedesign/theme",
        "default": true,
        "themeConfig": {
          "custom-color": "#000"
        }
      }, {
        "name": "@alifd/theme-ice-purple",
        "themeConfig": {
          "custom-color": "#fff"
        }
      }]
    }]
  ]
}
```

通过数组的方式配置多个主题，实现多主题内容的注入。
build.json 中完成多主题包配置后，业务代码中可以直接调用 `__changeTheme__` 方法在多个主题包之间进行切换：

```js
// 可以在设置的主题包 @icedesign/theme 和 @alifd/theme-ice-purple 之间切换
window.__changeTheme__('@alifd/theme-ice-purple');
```

## 跨端用法

### API
- 增加 `componentOptions` API，该接口值为对象，可接受 `bizComponent` `customPath` `componentMap` 等参数
- 增加 `usePx2Vw` API，跨端模式下请开启

```js
module.exports = {
  plugins: [
    ['build-plugin-fusion', {
      usePx2Vw: true,                                       // 开启r?px => vw 的单位转换
      importOptions: {
        libraryDirectory: 'lib',
        customName: (name) => {                             // 自定义「基础组件」的 H5 的引入路径，注意对 @alifd/next 的版本要求
          if(['config-provider'].indexOf(name) !== -1) {
            return `@alifd/next/lib/${name}`;
          }
          return `@alifd/next/lib/${name}/mobile`;          // mobile 是在 1.21.7-alpha 版本开始支持的
        },
        customStyleName: (name) => {
          // 引入没有Mobile版本的PC组件的样式
          return `@alifd/next/lib/${name}/style.js`;
        }
      },
      componentOptions: {                                            // 自定义「业务组件」的H5的引入路径
        bizComponent: ['@alifd/anchor', '@alifd/pro-components'],    // 业务组件列表
        customPath: '/es/mobile',                                    // 默认值为''
        componentMap: {
          '@alifd/pro-components2': '@alifd/pro-components2-mobile'
        }
      },
    }]
  ],
}
```

### componentOptions 详解
用来自定义业务组件的引用路径及入口

#### bizComponent 需要自定义路径的组件
类型为数组，与 `customPath` 共同作用生效
bizComponent: ['@alifd/anchor', '@alifd/pro-components']
customPath: '/es/mobile'

```js
import Anchor from '@alifd/anchor';
ReactDOM.render(<Anchor>xxxx</Anchor>);
      ↓ ↓ ↓ ↓ ↓ ↓
var _anchor = require('@alifd/anchor/es/mobile');   // 差别在这里 多了一层 es 和 mobile 
ReactDOM.render(<_anchor>xxxx</_anchor>);
```
#### customPath 自定义的路径
结合 `bizComponent` 一起生效，用法参考 `bizComponent` 文档。

#### componentMap 组件路径映射
类型为对象，表示路径映射的 mapping ，若与 `bizComponent` 冲突，则以 `componentMap` 为优先
```js
componentMap: {
  '@alifd/pro-components': '@alifd/pro-components/lib/mobile',
  '@alifd/pro-components2': '@alifd/pro-components2/es/mobile',
  '@alifd/pro-components': '@alifd/pro-components-mobile'
}
```
