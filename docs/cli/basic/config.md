---
title: 基础配置
order: 2
---

## alias

* 类型：`object`
* 默认值：`{}`

创建 `import` 或 `require` 的别名，使模块应用变得更加简单。
配置webpack的[resolve.alias](https://webpack.js.org/configuration/resolve/#resolve-alias)属性。

```js
// ice.config.js
const path = require('path');

module.exports = {
  alias: {
    '@components': path.resolve(__dirname, 'src/components/')
  }
}
```

现在，替换「在导入时使用相对路径」这种方式，就像这样：

```diff
-import CustomTips from '../../../components/CustomTips';
+import CustomTips from '@components/CustomTips';
```

## define

* 类型：`object`
* 默认值：`{}`

创建一个在编译是可以配置的全局变量，针对开发环境和发布环境的构建配置不同的行为非常有用。

用法：

```js
module.exports = {
  define: {
    // 此处不能省略 JSON.stringify，否则构建过程会出现语法问题
    ASSETS_VERSION: JSON.stringify('0.0.1'),
  }
}
```

在代码里使用该变量（当做全局变量使用）：

```javascript
console.log(ASSETS_VERSION);
```

## publicPath

* 类型：`string`
* 默认值：`/`

配置webpack的[output.publicPath](https://webpack.js.org/configuration/output/#output-publicpath)属性。
仅在运行 `ice-scripts build` 时生效。

```js
// ice.config.js
module.exports = {
  publicPath: 'https://cdn.example.com/assets/'
}
```

## devPublicPath

* 类型：`string`
* 默认值：`/`

同 `publicPath` 仅在运行 `ice-scripts dev` 时生效。

```js
// ice.config.js
module.exports = {
  devPublicPath: 'http://127.0.0.1/'
}
```

## devServer

* 类型：`object`

配置webpack的[devServer](https://webpack.js.org/configuration/dev-server/#devserver)属性。

```js
// ice.config.js
module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: false,
  }
}
```

## proxy

* 类型：`object`
* 默认值：`{}`

配置webpack的[devServer.proxy](https://webpack.js.org/configuration/dev-server/#devserverproxy)属性。

> 建议使用 `proxy` 来设置代理而不要修改webpack的 `devServer.proxy`

```js
// ice.config.js
module.exports = {
  proxy: {
    '/**': {
      // 通过 enable 字段快速开关代理配置
      enable: true,
      target: 'http://127.0.0.1:6001'
    }
  }
}
```

更多接口代理，详见[接口代理](/docs/cli/advanced/proxy)

## entry

* 类型：`string`
* 默认值：`src/index.js`

默认会以 `src/index.js` 文件作为入口文件，如果你需要改变默认的入口文件，可以自行修改 `ice.config.js` 即可生效。

```js
// ice.config.js
module.exports = {
  entry: 'src/index.js'
}
```

如果你的项目是多页应用，希望把 `src/pages` 的文件作为入口，那么可以这样配置：

```js
// ice.config.js
module.exports = {
  entry: {
    dashboard: 'src/pages/dashboard/index.js',
    about: 'src/pages/about/index.js',
  }
}
```

多 entry 的情况构建时会额外生成 vendor.js/css，需要自行在 html 里引入（public 目录会自动引入），也可以通过设置下面的 `vendor` 禁止生成 vendor 文件。

## externals

* 类型：`object`
* 默认值：`{}`

将某些 `import` 的包排除在bundle之外，在运行时再去外部获取这些依赖。
比如，从CDN引入React资源，而不是将它打包

index.html中添加：

```html
<script src="https://unpkg.com/react@16.7.0/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16.7.0/umd/react-dom.production.min.js"></script>
```

ice.config.js中添加：

```js
// ice.config.js
module.exports = {
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
  }
}
```

详细配置同webpack的[externals](https://webpack.js.org/configuration/externals/#externals)

## hash

* 类型：`boolean`
* 默认值：`false`

如果希望构建后的资源带 hash 版本，可以将 `hash` 设置为 `true`

```js
// ice.config.js
module.exports = {
  hash: true
}
```

## injectBabel

* 类型：`string`
* 默认值：`polyfill`
* Enum: `polyfill|runtime`

注入 babel 运行环境，默认情况下会注入 @babel/polyfill 适合业务项目开发，如果开发类库项目，可以修改为 `runtime`

```js
// ice.config.js
module.exports = {
  injectBabel: 'runtime'
}
```

## minify

* 类型：`boolean`
* 默认值：`true`

构建后的资源将进行压缩，如果不希望资源被压缩可以修改为 `false`

```js
// ice.config.js
module.exports = {
  minify: false
}
```

## outputAssetsPath

* 类型：`object`
* 默认值：`{ js: 'js', css: 'css' }`

修改构建后的 css/js 文件目录，默认情况下 css 在 `build/css/` 下，js 在 `build/js/` 下，可以通过 `outputAssetsPath` 配置修改：

```js
// ice.config.js
module.exports = {
  outputAssetsPath: {
    // 示例1：修改为 build/css-dist/ build/js-dist/
    js: 'js-dist',
    css: 'css-dist',
  }
}
```

## outputDir

* 类型：`string`
* 默认值：`build`

修改构建后的文件目录

```js
// ice.config.js
module.exports = {
  // 构建后输出到dist目录
  outputDir: 'dist'
}
```

## targets

* 类型：`object`
* 默认值：`last 2 versions, Firefox ESR, > 1%, ie >= 9, iOS >= 8, Android >= 4`

配置 @babel/preset-env 的 [targets](https://babeljs.io/docs/en/babel-preset-env#targets)，配置浏览器最低版本，新配置的 `targets` 会覆盖默认值。

```js
// ice.config.js
module.exports = {
  targets: {
    chrome: 49,
    ie: 11,
  }
}
```

## vendor

* 类型：`boolean`
* 默认值：`true`

配置是否生成 vendor，如果希望禁用：

```js
// ice.config.js
module.exports = {
  vendor: false
}
```