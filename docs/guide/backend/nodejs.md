---
title: 在 Node.js 应用中集成
order: 1
---

本文讲解如何在 Node.js 应用中集成前端资源，我们以 Koa 框架为例，首先根据 Koa 官方文档初始化一个标准的 MVC 应用。

## 初始化 Koa 应用

新建项目名 `ice-node-koa`，可自由指定

```bash
$ mkdir ice-node-koa && cd ice-node-koa
$ npm init
$ npm i ejs koa koa-logger koa-views --save
```

## 定义视图

新建 `views/index.ejs`：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1" />
    <meta name="viewport" content="width=device-width" />
    <title>ICE Design Lite</title>
    <link rel="shortcut icon" href="<%= publicPath %>/favicon.png" />
    <link href="<%= publicPath %>/css/index.css" rel="stylesheet" />
  </head>

  <body>
    <div id="ice-container"></div>
    <script type="text/javascript" src="<%= publicPath %>/js/index.js"></script>
  </body>
</html>
```

## 渲染视图

新建 `app.js`：

```javascript
const views = require('koa-views');
const path = require('path');
const Koa = require('koa');

const app = (module.exports = new Koa());

app.use(views(path.join(__dirname, '/views'), { extension: 'ejs' }));

app.use(async function(ctx) {
  await ctx.render('index', { publicPath: 'http://localhost:4444/' });
});

app.listen(3000);
```

> 示例兼容单页应用的 `HashRouter` 和 `BrowserRouter`，如多页应用可参考 [https://github.com/koajs/examples](https://github.com/koajs/examples) 中 blog 示例配置路由

## 运行示例

```bash
$ node app.js
```

浏览器中打开 http://localhost:3000

## 注意事项

- 示例应用只部署了 html，兼容 `BrowserRouter` 做了 `fallback` 处理 (默认所有请求路径返回同一份html)
- Node.js 前后端一体应用，需要进行路由配置
