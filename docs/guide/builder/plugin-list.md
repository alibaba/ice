---
title: 工程插件列表
order: 0
---

ice-scripts 提供了丰富的插件用于提升项目的开发体验。

## plugin-fusion

- 组件按需加载
- 组件（包含业务组件）样式自动引入
- 主题定制能力
- 多个不同包名的基础组件统一

Install:

```bash
$ npm i --save-dev ice-plugin-fusion
```

Options:

- `themePackage`: 主题包，如何新建主题包请参考文档 [主题配置](/docs/guide/dev/theme.md)。
- `themeConfig`: 主题配置
- `uniteBaseComponent`: 如果项目里依赖了多个不同名称的基础包，可以通过 uniteBaseComponent 来统一基础包，减少重复的代码（社区用户无需关心该问题）

注意：themePackage 与 themeConfig 中的变量配置是冲突的，两种方式只能选择一个，[原因](https://github.com/alibaba/ice/pull/1435#issuecomment-460055905)

### 基础用法

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-plugin-fusion', {
      // 主题包
      themePackage: '@icedesign/theme',
      themeConfig: {
        // 自定义 css prefix，需要配合 ConfigProvider 更改 js 的 prefix
        nextPrefix: 'nextfd-',
        // 根据配置推导主品牌色
        primaryColor: '#f60',
        // 覆盖 scss 原始变量
        'font-size-body-1': '14px',
      },
      // @icedesign/base | @alife/next | @ali/ice -> @alife/next
      uniteBaseComponent: '@alife/next'
    }]
  ]
}
```

### 字体变量配置

> 如果希望将 css 中的网络资源本地化，推荐使用 [ice-plugin-css-assets-local](/docs/cli/plugin-list/local.md)

`@alifd/next` 组件库默认引用两类字体，包括图标字体和 robot 基础字体，如果希望定制这些字体的路径，可以参照如下配置：

```js
module.exports = {
  plugins: [
    ['ice-plugin-fusion', {
      // 主题包
      themePackage: '@icedesign/theme',
      themeConfig: {
        // 替换表示图标字体文件路径的变量，路径下应有对应4个 iconfont 文件
        'icon-font-path': '"/font/icon-font-path"',
        // 替换表示 Roboto 字体文件路径的变量，路径下应有对应20个 roboto 字体文件
        'font-custom-path': '"/font/font-path/"',
      },
    }]
  ]
}
```

`/font/icon-font-path` 路径下对应的4个图标字体文件分别为：icon-font.eot、icon-font.woff、icon-font.ttf 和 icon-font.svg。
`/font/font-path/` 路径下对应的20个字体文件可查看打包下载地址：[robot-font.zip](https://files.alicdn.com/tpsservice/31b61ac0c41fac383a1bffd154674347.zip?spm=a1zcb.12289995.0.0.697e5ab2ioi9Of&file=31b61ac0c41fac383a1bffd154674347.zip)

### 多主题配置

> 多主题能力在版本 0.1.7 及更高版本中支持。

多主题常规的实现思路可以分为两步：

1. 准备不同主题的 css
2. 通过 js 动态加载对应的主题 css

而前端工程化的如今，很多基本依赖的组件库本身带有可配置的主题变量,比如 `fusion`，生成多份主题意味着需要提前打包出多份不同的主题文件，对于前端工程的调试和构建都带来极大的处理成本。

`ice-plugin-fusion` 结合 fusion 自身可以配置主题包的能力，支持多个主题包的配置，大大简化多主题切换的成本，通过 css 变量能力实现动态主题的切换，核心实现思路如下：

1. 提取主题包中的 scss 变量（色值变量）
2. 将 scss 变量具体内容转换为 css 变量，即 `$color-brand1-1: #E2EDFF; => $color-brand1-1: var(--color-brand-1);`
3. 注入新的 scss 变量值（如 `$color-brand1-1: var(--color-brand-1)` ）进行编译
4. 在 `window` 下注入 `__changeTheme__` 方法，实现不同主题包全局 css 变量声明的切换

```js
module.exports = {
  plugins: [
    ['ice-plugin-fusion', {
      // 通过数组方式配置多主题包
      themePackage: [{
        name: '@icedesign/theme',
        // 设置默认加载主题，如果不进行设置，默认以最后添加主题包作为默认主题
        default: true,
        // 设置自定义主题颜色，可以在 scss 文件中直接使用该变量，比如： .bg-color { background: $custom-color; }
        themeConfig: {
          'custom-color': '#000',
        },
      }, {
        name: '@alifd/theme-ice-purple',
        themeConfig: {
          'custom-color': '#fff',
        },
      }],
    }]
  ]
}
```

`ice.config.js` 中完成多主题包配置后，业务代码中可以直接调用 `__changeTheme__` 方法在多个主题包之间进行切换：

```js
// 可以在设置的主题包 @icedesign/theme 和 @alifd/theme-ice-purple 之间切换
window.__changeTheme__('@alifd/theme-ice-purple');
```

## plugin-antd

按需构建 antd 组件和以及主题定制的能力。

Install:

```bash
$ npm i --save-dev ice-plugin-antd
```

Options:

- `themeConfig`: 设置替换主题颜色
- `libraryName`: 默认 antd，可设置为 `antd-mobile`

Usage:

```js
module.exports = {
  plugins: [
    ['ice-plugin-antd', {
      themeConfig: {
        'primary-color': '#1DA57A',
        'link-color': '#1DA57A',
        'border-radius-base': '2px',
      }
    }]
  ]
}
```

## plugin-component

- 支持组件模块开发 dev & build
- 支持接入 Fusion Cool & 设计板块的组件构建

Install:

```bash
$ npm i --save-dev ice-plugin-component
```

Options:

- `type`: 默认值 `fusion` ，如无需生成接入 Fusion 相关样式文件，可设置为 `component`

Usage:

```js
module.exports = {
  plugins: [
    ['ice-plugin-component', { type: 'fusion' }]
  ]
}
```

更多组件开发相关内容，详见[业务组件开发规范](/docs/materials/react.md)。

## plugin-modular-import

用于快捷增加 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 的配置。

Install:

```bash
$ npm i --save-dev ice-plugin-modular-import
```

Usage:

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-plugin-modular-import', [{
      'libraryName': 'lodash',
      'libraryDirectory': '',
      'camel2DashComponentName': false,
    }, {
      'libraryName': '@material-ui/core',
      'libraryDirectory': 'components',
      'camel2DashComponentName': false,
    }]]
  ]
}
```

## plugin-css-assets-local

提供将 css 中的网络资源本地化能力，例如字体文件等。

Install:

```bash
$ npm i --save-dev ice-plugin-css-assets-local
```

Options:

- `outputPath`: 默认值： `assets` 提取后的文件目录前缀
- `relativeCssPath`: 默认值： `../` 提取的文件后相对于 CSS 的路径

Usage:

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-plugin-css-assets-local', {
      outputPath: 'assets',
      relativeCssPath: '../'
    }]
  ]
}
```

## plugin-multi-pages

支持解析 `src/pages/*/index.js` 生成多 entry 的配置，构建传统的多页应用，默认会将 `src/pages/*/index.js` 作为 entry，每个 page 都会作为一个 entry，以 pageName 构建多个同名 HTML 文件。

Install:

```bash
$ npm i --save-dev ice-plugin-multi-pages
```

Options:

- `getEntryName{function}`: 自定义 entry name，默认取小写的 `src/pages/*/index.js` 文件夹名称。

Usage:

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-plugin-multi-pages', {
      // customize entry name
      // BasicCharts => basic_charts
      getEntryName: (pageName) => _.snakeCase(pageName),
    }]
  ]
}
```

## plugin-moment-locales

对 moment 语言依赖进行优化，根据配置加载对应的语言包，减少 bundle 大小。

Install:

```bash
$ npm i --save-dev ice-plugin-moment-locales
```

Options:

- `locales`：类型 `String | Array`，需要加载的多语言包

Usage:

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-plugin-moment-locales', {
      locales: ['zh-cn', 'en-au']
    }]
  ]
}
```

## plugin-load-assets

- 页面渲染前将自动加载配置的 assets 资源，资源类型包括 js 和 css
- 根据不同的执行命令，加载不同的 assets 资源

Install:

```bash
$ npm i --save-dev ice-plugin-load-assets
```

Usage:

```js
// 基础用法
module.exports = {
  plugins: [
    ['ice-plugin-load-assets', {
      // dev 命令和 build 命令 加载相同 assets 资源
      assets: ['https://unpkg.com/lodash@4.17.11/index.js', 'https://url/global.css'],
    }],
  ]
};
```

```js
// 配合 external 自动加载 react, react-dom 的资源
module.exports = {
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
  },
  plugins: [
    ['ice-plugin-load-assets', {
      assets: {
        dev: ['https://unpkg.com/react@16.7.0/umd/react.development.js', 'https://unpkg.com/react-dom@16.7.0/umd/react-dom.development.js'],
        build: ['https://unpkg.com/react@16.7.0/umd/react.production.min.js', 'https://unpkg.com/react-dom@16.7.0/umd/react-dom.production.min.js'],
      },
    }],
  ]
};
```

## plugin-smart-debug

用于 debug 调试，常见于线上环境加载本地 assets 资源进行调试的场景。

Install:

```bash
$ npm i -save-dev ice-plugin-smart-debug
```

Usage:

```js
module.exports = {
  plugins: [
    'ice-plugin-smart-debug'
  ]
}
```

访问链接中开启 debug 调试，设置 `smartDebug=true` 进行开启

```
http://example.com/?smartDebug=true
```

开启后页面将默认加载本地入口脚本 `127.0.0.1:3333/build/js/index.js`，`__webpack_public_path__` 将会变为 `127.0.0.1:3333/build/`。

> 默认加载的脚本地址，将会受 `ice.config.js` 中的 `outputDir` 和 `outputAssetPath.js` 配置影响，即默认入口文件路径规则 `${outputDir}/${outputAssetPath.js}/index.js`。
> 对应入口 css 文件的规则为 `${outputDir}/${outputAssetPath.css}/index.css`，`ice-plugin-smart-debug` 插件会自动通过 js 路径按规则替换并推导出 css 路径地址并进行自动加载。

支持定制的参数包括：

* 调试端口：`debugPort`，例如设置调试 8080 端口，`debugPort=8080`，默认端口为：3333
* 入口脚本路径：`debugPath`，`debugPath=/build/index.js`，页面将加载 `127.0.0.1:8080/build/index.js`
* 资源输出路径：`outputPath`，`outputPath=dist`，即 runtime 的 publicPath 将会变成 `127.0.0.1:8080/dist/`，`outputPath` 默认读取 `ice.config.js` 中的 `outputDir`，如果不需要可以设置为 `outputPath=`

如想加载的入口地址为 `127.0.0.1:8080/dist/index.js`， `__webpack_public_path__`路径为 `127.0.0.1:8080/dist/`，则可以在 url 中进行如下设置：

```
http://example.com/?smartDebug=true&debugPort=8080&debugPath=/dist/index.js&outputPath=dist
```

## plugin-dll

- 通过 webpack 的 dllPlugin 打包一份 dll 文件来达到项目二次启动的编译速度
- 启动时分析项目的依赖 `dependencies` 信息，发生变化后将后重新打包 dll 文件

Install:

```bash
$ npm i -save-dev ice-plugin-dll
```

Usage:

```js
module.exports = {
  plugins: [
    'ice-plugin-dll'
  ]
}
```

> 注意：`ice-plugin-dll` 仅在 `dev` 命令下生效