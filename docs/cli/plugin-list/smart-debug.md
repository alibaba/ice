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
http://example.com/?debug=true&debugPort=8080&debugPath=/build/index.js&outputPath=dist#nose
```

支持定制的参数包括：

* 调试端口：`debugPort`，例如设置调试 8080 端口，`debugPort=8080`，默认端口为：3333
* 入口脚本路径：`debugPath`，`debugPath=/build/index.js`，页面将加载 `127.0.0.1:8080/build/index.js`
* 资源输出路径：`outputPath`，`outputPath=dist`，即 runtime 的 publicPath 将会变成 `127.0.0.1:8080/dist/`