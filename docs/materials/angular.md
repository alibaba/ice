---
title: Angular 物料开发指南
order: 8
---

> 工程统一使用 Angular CLI

## 开发业务组件

**暂时不支持，需要确定组件开发及构建规范。**

## 使用 ngx-bootstrap

### 1. 将 ngx-bootstrap 作为 npm 依赖

在物料跟目录添加依赖，执行命令：

```bash
npm install ngx-bootstrap --save
```

### 2. 在 html 模版里引入 style 样式

- 区块：`demo/index.html`
- 模板：`src/index.html`

```diff
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>ice-test-example-scaffold</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
+ <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div id="mountNode">
    <app-root></app-root>
  </div>
</body>
</html>

```

然后在代码里即可使用 ngx-bootstrap 的组件库了。

### 3. 其他

其他配置可参考 [ngx-bootstrap](https://valor-software.com/ngx-bootstrap/#/)
