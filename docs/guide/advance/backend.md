---
title: 后端应用集成
order: 1
---

> 如果是阿里内部同学，请参考 [文档](https://yuque.alibaba-inc.com/ice/rdy99p/rpivf3)

本文讲解如何在后端应用集成前端资源。

## Node.js 应用

### 初始化 Koa 应用

新建项目名 `ice-node-koa`，可自由指定

```bash
$ mkdir ice-node-koa && cd ice-node-koa
$ npm init
$ npm i ejs koa koa-logger koa-views --save
```

### 定义视图

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

### 渲染视图

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

### 运行示例

```bash
$ node app.js
```

浏览器中打开 http://localhost:3000

### 注意事项

- 示例应用只部署了 html，兼容 `BrowserRouter` 做了 `fallback` 处理 (默认所有请求路径返回同一份html)
- Node.js 前后端一体应用，需要进行路由配置

## Java 应用

以 Spring Boot 为例。

### resources

新建 `/velocity/layout/index.vm`：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1" />
    <meta name="viewport" content="width=device-width" />
    <title>ICE Design Lite</title>
    <link rel="shortcut icon" href="$!publicPath/favicon.png" />
    <link href="$!publicPath/css/index.css" rel="stylesheet" />
  </head>

  <body>
    <div id="ice-container"></div>
    <script type="text/javascript" src="$!publicPath/js/index.js"></script>
  </body>
</html>
```

### Controller

```java
@GetMapping("/")
@VelocityLayout("/velocity/layout/index.vm")
public String index(Model model) {
  model.addAttribute(publicPath, jsConfig.get(publicPath));
  return "index";
}
```

> 示例展示的是 `HashRouter` 路由，如果为 `BrowserRouter`，建议改为 `@GetMapping(value = { "/**" })` 实现前端 fallback

## HTML 托管服务

本章节讲解如何在 HTML 托管服务中集成前端资源，我们以 [surge](http://surge.sh/) 为例。

### 全局安装 surge

```bash
npm install --global surge
```

### 运行 surge

以 `ice-demo` 项目名，ice 项目默认构建目录 `build` 为例：

```bash
cd ice-demo/build
surge
```

> 依次确认账户， `project path`， `domain` 等信息，等待上传生效即可，详见 [surge](https://surge.sh/) 官方说明

### 其他同类产品

- [surge](http://surge.sh/)
- [github pages](https://pages.github.com/)
- [netlify](https://www.netlify.com/)
