---
title: ice-plugin-smart-debug
order: 9
---

用于 debug 调试，常见于线上环境加载本地 assets 资源进行调试的场景

## 功能

 - 开启调试后，可以指定页面加载本地 assets 资源

## 如何使用

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

访问链接中开启 debug 调试，设置 `debug=true` 进行开启

```
http://example.com/?debug=true
```

开启后页面将默认加载本地入口脚本 `127.0.0.1:3333/build/js/index.js`，`__webpack_public_path__` 将会变为 `127.0.0.1:3333/build/`。

> 默认加载的脚本地址，将会受 `ice.config.js` 中的 `outputDir` 和 `outputAssetPath.js` 配置影响，即默认入口文件路径规则 `${outputDir}/${outputAssetPath.js}/index.js`。
> 对应入口 css 文件的规则为 `${outputDir}/${outputAssetPath.css}/index.css`，`ice-plugin-smart-debug` 插件会自动通过 js 路径按规则替换并推导出 css 路径地址并进行自动加载。

支持定制的参数包括：

* 调试端口：`debugPort`，例如设置调试 8080 端口，`debugPort=8080`，默认端口为：3333
* 入口脚本路径：`debugPath`，`debugPath=/build/index.js`，页面将加载 `127.0.0.1:8080/build/index.js`
* 资源输出路径：`outputPath`，`outputPath=dist`，即 runtime 的 publicPath 将会变成 `127.0.0.1:8080/dist/`

如想加载的入口地址为 `127.0.0.1:8080/dist/index.js`， `__webpack_public_path__`路径为 `127.0.0.1:8080/dist/`，则可以在 url 中进行如下设置：

```
http://example.com/?debug=true&debugPort=8080&debugPath=/dist/index.js&outputPath=dist
```