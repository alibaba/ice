---
title: 工程能力
order: 4
---

icejs 基于 build-scripts，因此工程使用方式与 build-scripts 完全一致。

## 开发调试

默认情况下，项目的 package.json 会配置以下命令：

```json
{
  "scripts": {
    "start": "icejs start",
    "build": "icejs build"
  }
}
```

执行 `npm start` 即可进行项目开发，正常情况下执行命令后自动打开浏览器 `http://localhost:3333` 进行页面预览，修改源码后浏览器会自动刷新页面。执行 `npm run build` 进行项目构建，构建产物默认输出到 `./build` 目录下。

## 命令行介绍

icejs 提供了 start/build 两个核心命令供开发者使用。

> 在使用 `npm run start` 命令时，如需传入参数请按照这个格式 `npm run start -- --https`

### start

```bash
$ icejs start --help

Usage: icejs start [options]

Options:
	-p, --port <port>      服务端口号
  -h, --host <host>      服务主机名
  --https								 支持开启 https
  --analyzer             支持开启构建分析
  --analyzer-port
  --disable-reload
  --disable-mock
```

### build

```bash
$ icejs build --help

Usage: icejs build [options]

Options:
	--analyzer             同 start
  --analyzer-port        同 start
  --config <config>      同 start
```

## 工程构建配置

工程构建相关的配置都收敛在项目根目录的 `build.json` 文件中，`build.json` 中包含基础配置和插件配置两部分，当下支持的基础配置项如下：

#### entry

- 类型： `string`  | `object`  | `array` 
- 默认值：src/app.[t|j]s

icejs 中一般不允许修改该配置。

#### alias

- 类型： `object` 
- 默认值： `` 

在 icejs 默认配置了 `{ "@": "./src/" }` 的规则，因此项目大多数时候不需要配置，配置完成后则可以更加简单的导入模块了：

```javascript
-import CustomTips from '../../../components/CustomTips';
+import CustomTips from '@/components/CustomTips';
```

#### publicPath

- 类型： `string` 
- 默认值： `/` 

配置 webpack 的 [output.publicPath](https://webpack.js.org/configuration/output/#output-publicpath) 属性。 仅在运行 `build` 命令时生效。

```json
{
	"publicPath": "https://cdn.example.com/assets/"
}
```

#### devPublicPath

- 类型： `string` 
- 默认值： `/` 

同 `publicPath` 仅在执行 `start` 时生效

```json
{
	"devPublicPath": "http://127.0.0.1/"
}
```

#### sourcemap

- 类型： `boolean` 
- 默认值： `false` 

#### externals

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


将 CDN 文件添加到 `public/index.html` 中：

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

#### hash

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

#### injectBabel

- 类型：`string`
- 默认值：`polyfill`

默认情况下会注入 core-js/stable 和 regenerator-runtime/runtime，根据 `targets` 配置的兼容浏览器进行 polyfill，实现按需添加。 开发类库项目，可以将配置设置为 `runtime`。 如果想手动 polyfill，可以将配置设置为 `false`，工程将不会进行自动的 polyfill。

```json
{
	"injectBabel": false
}
```

#### minify

- 类型：`boolean`
- 默认值：`true`

构建后的资源将进行压缩，如果不希望资源被压缩可以修改为 `false`

```json
{
	"minify": false
}
```

#### outputAssetsPath

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

#### outputDir

- 类型：`string`
- 默认值：`build`

修改构建后的文件目录

```json
{
	"outputDir": "dist"
}
```

#### proxy

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

#### devServer

- 类型： `object` 
- 默认值： `{}` 

注意，devServer 不支持 port 属性配置，如需改变端口，请通过命令行参数传入。

#### targets

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

#### vendor

- 类型：`boolean`
- 默认值：`true`

配置是否生成 vendor，如果希望禁用：

```json
{
	"vendor": false
}
```

#### libraryTarget

- 类型：`string`
- 默认值：`''`

#### library

- 类型：`string`
- 默认值：`''`


#### libraryExport

- 类型：`string`
- 默认值：`''`

上面这些选项即当下支持的所有基础配置，如果不能满足需求可以选择使用插件或者自定义配置能力，具体请参考「工程方案」相关章节。
