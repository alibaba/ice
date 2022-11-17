---
title: 部署
---

前端代码开发完成后，我们会执行 `npm build` 命令进行项目构建。构建完成后，我们需要把 js/css/html 等静态资源部署到服务器或者发布到 CDN 上。

## 资源发布

如果是博客、官网等静态应用，推荐使用以下的方式进行部署：

### CDN 发布

推荐通过 [阿里云 OSS](https://www.aliyun.com/product/oss) 服务进行非覆盖式发布，每个版本建一个 `x.y.z` 的文件夹，然后将整个 `build` 目录复制进去，接着就可以通过 url 访问这些 CDN 资源了。

### Nginx

把构建好的 `build` 资源复制到服务器对应目录下，添加以下的 Nginx 配置，然后就可以启动 [Nginx](https://www.nginx.com/) 静态文件服务器。

```nginx
location / {
  root   /www/build;
  # 访问 localhost:3000/a 依次查找 /www/build/a、/www/build/a/index.html、/www/build/404.html
  try_files $uri $uri/ 404.html;
}
```

## 静态资源托管服务

我们以 [surge](https://surge.sh/) 为例。

#### 全局安装 surge

```bash
npm install --global surge
```

#### 运行 surge

以 `ice-demo` 项目名，ice.js 项目默认构建目录 `build` 为例：

```bash
$ cd ice-demo/build
# 启动 surge 服务
$ surge
```

依次确认账户， projectPath， domain 等信息，等待上传生效即可，详见 [surge](https://surge.sh/) 官方说明

其他同类产品有：

- [github pages](https://pages.github.com/)
- [netlify](https://www.netlify.com/)

## 后端应用集成

### Node.js 应用

#### 初始化 Koa 应用

新建项目名 `ice-node-koa`：

```bash
$ mkdir ice-node-koa && cd ice-node-koa
$ npm init
$ npm i ejs koa koa-logger koa-views --save
```

#### 定义视图

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

#### 渲染视图

新建 `app.js`：

```js
const views = require('koa-views');
const path = require('path');
const Koa = require('koa');

const app = (module.exports = new Koa());

app.use(views(path.join(__dirname, '/views'), { extension: 'ejs' }));

app.use(async function (ctx) {
  await ctx.render('index', { publicPath: 'http://localhost:3000/' });
});

const port = 3000;
app.listen(port).then(() => console.log(`Listening on http:localhost:${port}`));
```

示例兼容单页应用的 HashRouter 和 BrowserRouter，如多页应用可参考 <https://github.com/koajs/examples> 中 blog 示例配置路由

#### 运行示例

```bash
$ node app.js
Listening on http:localhost:3000
```

浏览器中打开 <http://localhost:3000>

### Java 应用

#### resources

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

#### Controller

```java
@GetMapping("/")
@VelocityLayout("/velocity/layout/index.vm")
public String index(Model model) {
  model.addAttribute(publicPath, jsConfig.get(publicPath));
  return "index";
}
```

> 示例展示的是 HashRouter 路由，如果为 BrowserRouter，建议改为 @GetMapping(value = { "/**" }) 实现前端 fallback

## 小程序发布

执行 `npm run build` 命令完成构建后，按照命令行提示使用对应的小程序开发者工具打开产物目录。在小程序开发者工具项目页面找到『上传』按钮即可上传小程序。然后进入对应的小程序管理后台进行小程序的提交审核及发布即可。

> 参考文档：
>
> - [微信小程序代码协同工作和发布](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/release.html#%E5%8D%8F%E5%90%8C%E5%B7%A5%E4%BD%9C)
> - [阿里小程序提审、发布与运营](https://opendocs.alipay.com/mini/introduce/release)

## FAQ

### 静态资源在非根目录或 CDN

如果你的 js、css、图片、字体等资源不在，这时需要配置 [publicPath](../basic/config#publicpath) 的值为你的静态资源所在的路径。

### 部署的 HTML 在非根目录

假设你本地开发的时候有一个路由是 `/home`，生产环境下你把应用部署到 `/abc/` 下，然后访问 `/abc/home`，就会出现路由不匹配，显示空白页面的情况。

这时你需要配置 [basename](../basic/app#basename) 解决。

```ts title="./src/app.ts"
import { defineAppConfig } from 'ice';

export default defineAppConfig(() => ({
  router: {
    basename: '/abc',
  },
}));
```
