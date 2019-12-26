---
title: 工程配置
order: 2
---

工程能力依赖 build-scripts 这个工具，同时通过 build-plugin-ice-app 这个基础插件提供了一些命令行参数以及基础配置能力。

## 工程构建配置

### entry

- 类型： `string`  | `object`  | `array` 
- 默认值：src/index.js

默认会以 `src/index.js` 文件作为项目入口文件，如果需要改变默认的入口文件，可以自行修改 `build.json` 即可：

```json
{
	"entry": "src/app.js"
}
```

如果你的项目是多页应用，希望有多个入口文件，那么可以这样配置：

```javascript
{
  "entry": {
    "dashboard": "src/pages/dashboard/index.js",
    "about": "src/pages/about/index.js"
  }
}
```

多 entry 的情况构建时默认会额外生成 vendor.js/css，需要自行在 html 里引入（public 目录会自动引入），也可以通过设置 `vendor` 配置禁止生成 vendor 文件。

### alias

- 类型： `object` 
- 默认值： `{}` 

创建 `import` 或 `require` 的别名，使模块应用变得更加简单。 配置 webpack 的 [resolve.alias](https://webpack.js.org/configuration/resolve/#resolve-alias) 属性，默认以相对项目根目录进行配置

```json
{
	"alias": {
  	"@components": "./src/components/"
  }
}
```

替换「在导入时使用相对路径」这种方式 :

```javascript
-import CustomTips from '../../../components/CustomTips';
+import CustomTips from '@components/CustomTips';
```

### publicPath

- 类型： `string` 
- 默认值： `/` 

配置 webpack 的 [output.publicPath](https://webpack.js.org/configuration/output/#output-publicpath) 属性。 仅在运行 `build-scripts build` 时生效。

```json
{
	"publicPath": "https://cdn.example.com/assets/"
}
```

### devPublicPath

- 类型： `string` 
- 默认值： `/` 

同 `publicPath` 仅在执行 `build-scripts start` 时生效

```json
{
	"devPublicPath": "http://127.0.0.1/"
}
```

### devServer

- 类型： `object` 
- 默认值： `{}` 

### externals

- 类型：`object`
- 默认值：`{}`

将某些 `import` 的包排除在 bundle 之外，在运行时再去外部获取这些依赖。 比如，从 CDN 引入 React 资源，而不是将它打包<br />详细配置同 webpack 的 [externals](https://webpack.js.org/configuration/externals/#externals)<br />例如通过配置 `externals` 减少图表资源大小：<br />在使用到图表（Bizcharts）的时候，会发现打包后的文件特别大。是由于图表库本身比较大，这样会影响页面的加载效率。可以通过 CDN 的方式加载图表库，在打包时排除掉对应的图标库。

```json
{
  "externals": {
    "bizcharts": "BizCharts",
  }
}
```

说明：key 表示依赖包名，如： `bizcharts`。 value 表示引用 CDN 后的全局变量名，如: `BizCharts`
> 参考：[https://github.com/alibaba/BizCharts](https://github.com/alibaba/BizCharts)


将 CDN 文件添加到

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
  <meta name="viewport" content="width=device-width">
  <title>ICE Design Lite</title>
</head>

<body>
  <div id="root"></div>
+  <script src="https://cdn.jsdelivr.net/npm/bizcharts/umd/BizCharts.min.js"></script>
</body>

</html>
```

### hash

- 类型：`boolean` | `string`
- 默认值：`false`

如果希望构建后的资源带 hash 版本，可以将 `hash` 设置为 `true`

```json
{
	"hash": true
}
```

可以设置为 contenthash 的方式：

```json
{
	"hash": "contenthash"
}
```

### injectBabel

- 类型：`string`
- 默认值：`polyfill`

默认情况下会注入 core-js/stable 和 regenerator-runtime/runtime，根据 `targets` 配置的兼容浏览器进行 polyfill，实现按需添加。 开发类库项目，可以将配置设置为 `runtime`。 如果想手动 polyfill，可以将配置设置为 `false`，工程将不会进行自动的 polyfill。

```json
{
	"injectBabel": false
}
```

### minify

- 类型：`boolean`
- 默认值：`true`

构建后的资源将进行压缩，如果不希望资源被压缩可以修改为 `false`

```json
{
	"minify": false
}
```

### outputAssetsPath

- 类型：`object`
- 默认值：`{ js: 'js', css: 'css' }`

修改构建后的 css/js 文件目录，默认情况下 css 在 `build/css/` 下，js 在 `build/js/` 下，可以通过 `outputAssetsPath` 配置修改：

```json
{
	"outputAssetsPath": {
  	"js": "js-dist",
    "css": "css-dist"
  }
}
```

### outputDir

- 类型：`string`
- 默认值：`build`

修改构建后的文件目录

```json
{
	"outputDir": "dist"
}
```

### proxy

- 类型：`object`
- 默认值：`{}`

配置 webpack 的 [devServer.proxy](https://webpack.js.org/configuration/dev-server/#devserverproxy) 属性。
> 建议使用 `proxy` 来设置代理而不要修改 webpack 的 `devServer.proxy`


```json
{
  "proxy": {
    "/**": {
      "enable": true,
      "target": "http://127.0.0.1:6001"
    }
  }
}
```

> 代理的每一项配置都可以通过 enable 字段来快速开关代理配置

### targets

- 类型： `string` | `object` 
- 默认值：`last 2 versions, Firefox ESR, > 1%, ie >= 9, iOS >= 8, Android >= 4`

配置 @babel/preset-env 的 [targets](https://babeljs.io/docs/en/babel-preset-env#targets)，配置浏览器最低版本，新配置的 `targets` 会覆盖默认值。

```json
{
  "targets": {
    "chrome": 49,
    "ie": 11,
  }
}
```

### vendor

- 类型：`boolean`
- 默认值：`true`

配置是否生成 vendor，如果希望禁用：

```json
{
	"vendor": false
}
```

### libraryTarget

- 类型：`string`
- 默认值：`''`

配置 webpack 的 [output.libraryTarget](https://webpack.js.org/configuration/output/#outputlibrarytarget) 属性。

### library

- 类型：`string`
- 默认值：`''`

配置 webpack 的 [output.library](https://webpack.js.org/configuration/output/#outputlibrary) 属性。
  
### libraryExport
  
- 类型：`string`
- 默认值：`''`

配置 webpack 的 [output.libraryExport](https://webpack.js.org/configuration/output/#outputlibraryexport) 属性。

## 根据环境区分配置

通过 build-plugin-env-config 插件可以根据不同环境配置不同的参数。

### 区分 start/build

直接通过 build-scripts 内置的 `NODE_ENV` 环境变量即可区分：

```json
{
  "entry": "src/index.jsx",
  // ...
  "plugins": [
    "build-plugin-ice-app",
    ["build-plugin-env-config", {
      "envKey": "NODE_ENV",
      // 对应 start
      "development": {

      },
      // 对应 build
      "production": {
        "entry": "src/index.tsx",
      }
    }]
  ]
}
```

### 区分多个 build 环境

在 package.json 中指定多个 build scripts 并通过环境变量区分：

```json
{
  "scripts": {
    "build:local": "BUILD_ENV=local build-scripts build",
    "build:test": "BUILD_ENV=test build-scripts build",
    "build:daily": "BUILD_ENV=daily build-scripts build",
  }
}
```

在 build.json 根据指定的环境变量区分配置：

```json
{
  "entry": "src/index.jsx",
  // ...
  "plugins": [
    "build-plugin-rax-app",
    ["build-plugin-env-config", {
      "envKey": "BUILD_ENV",
      "local": {

      },
      "test": {
        "entry": "src/index.tsx",
      },
      "test": {
        "daily": "src/index.tsx",
      }
    }]
  ]
}
```