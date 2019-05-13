---
title: 在 Java 应用中集成
order: 2
---

本文讲解如何在 Java 服务中集成前端资源，我们以 Spring Boot 为例。

## resources

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

## Controller

```java
@GetMapping("/")
@VelocityLayout("/velocity/layout/index.vm")
public String index(Model model) {
    model.addAttribute(publicPath, jsConfig.get(publicPath));
    fillUser(model);
    return "index";
}
```

> 示例展示的是 `HashRouter` 路由，如果为 `BrowserRouter`，建议改为 `@GetMapping(value = { "/**" })` 实现前端 fallback
