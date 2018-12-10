---
title: 如何减少图表资源文件大小
category: 项目开发手册
order: 10
---

# 如何减少图表资源文件大小

在使用到图表的时候，会发现打包后的文件特别大。是由于图表库本身比较大，这样会影响页面的加载效率。

可以通过 CDN 的方式加载图表库，在打包时排除掉对应的图标库。

## 步骤 1. 配置 webpack 打包排除项

在 `package.json` 里添加 externals 配置：

```json
// package.json

{
  "buildConfig": {
    "externals": {
      "bizcharts": "BizCharts"
    }
  }
}
```

说明：key 表示依赖包名，如： `bizcharts`。 value 表示引用 CDN 后的全局变量名，如: `BizCharts`.

> 参考： https://github.com/alibaba/BizCharts

## 步骤 2. 将 CDN 文件添加到 `public/index.html` 模板中

推进使用 `<script src="https://cdn.jsdelivr.net/npm/bizcharts/umd/BizCharts.min.js"></script>`

修改后的 html 文件如下：

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
  <meta name="viewport" content="width=device-width">
  <title>网站标题</title>
</head>

<body>
  <div id="ice-container"></div>
  <script src="https://cdn.jsdelivr.net/npm/bizcharts/umd/BizCharts.min.js"></script>
</body>

</html>
```
