---
title: 打包发布
order: 10
category: ICE Design Pro
---

点击项目面板上的构建项目按钮，将开发的构建出最终的  `js` 、 `css` 、 `images`  等资源。

![](https://cdn.yuque.com/lark/0/2018/png/71071/1530782919320-e60c5f7d-bbab-40fc-8531-3e5e589fc420.png)

构建完成后，会在项目目录下生成  build  文件夹，里面存在了  `index.html`、`index.js`、 `index.css`  文件。使用您熟悉的方式，上传到对应的 cdn 服务器。

## 部署上线

上线过程即发布 HTML 文件的过程，`index.html`  文件存在在  `build`  目录中，将  index.html  文件复制到对应的服务服务器，并修改 html 源码中的  /build/index.css  和  /build/index.js 地址，是上一步中得到的 cdn 地址以及站点标题。

一个基本的的 HTML 结构如下所示：

```HTML
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
  <link rel="icon" type="image/png" href="favicon.png">
  <meta name="viewport" content="width=device-width">
  <title>ICE Design Pro</title>
</head>

<body>
  <div id="ice-container"></div>
</body>

</html>
```

到这里你已经学会使用 Iceworks 创建一个项目并发布：）
