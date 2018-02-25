---
title: 如何开发单页面应用
category: 进阶指南
order: 6
---

传统模式下，一个站点会有多个页面，每个页面对应一个 html/vm, 这种模式有几个缺点：

- 后端同学每个页面都要维护一个 vm/html, 比较麻烦
- 页面间跳转时，需要重新请求服务器并加载静态资源，体验比较差

因此，前端出现了单页面应用这个概念，所谓单页面，即每个站点只有一个页面（html/vm），这个 html 同时对应一个 index.js 和 index.css, 页面间的跳转以及路由全部由前端来管理，后端只负责提供一个入口页面的 html 即可。本文就来介绍使用 ICE 如何开发单页面的应用。

## 使用流程

### 1. 执行 `def init ice` 初始化项目，并选择「单页面应用」的模板：

  ![](https://img.alicdn.com/tfs/TB10UChRXXXXXXJXXXXXXXXXXXX-818-228.png)

### 2. 基于生成的目录结构以及 react-router 开发页面

- react-router: [文档](https://github.com/ReactTraining/react-router/blob/v3/docs/Introduction.md)，react-router 的最新版本是 4.x, 但是出于易用性考虑，推荐使用 3.x 的版本。
- 目录结构：

  ```
  .
  ├── README.md
  ├── abc.json
  ├── package.json
  └── src
      ├── components
      │   └── Layout
      ├── pages
      │   ├── Home
      │   └── NotFound
      ├── index.html
      ├── index.jsx
      └── routes.jsx
  ```

### 3. 在服务器端新增 vm/html

单页面应用只需要一个 html 即可：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <title>ICE 单页面应用示例</title>
  <!--[if lt IE 9]>
  <script>location.href = "//www.taobao.com/markets/tbhome/ali-page-updater"; </script>
  <![endif]-->
  <link rel="stylesheet" type="text/css" charset="utf-8" href="${assetsPath}/index.css">
</head>
<body>
  <div id="ice_container"></div>
  <script type="text/javascript" charset="utf-8" src="${assetsPath}/index.js" id="ice-script"></script>
</body>
</html>
```

### 5. 在服务端新增路由配置

单页面应用中所有的页面相关路由都在前端（react-router）处理，不需要每个路由都在后端单独配置，因此我们只需要把后端没有配置的路由全部交给前端处理就可以了。

##### Nodejs(Midway)

```js
// app/router.js
// 异步接口相关
app.get('/api/xxx', () => {});
// 登录跳转之类的接口
app.get('/login', () => {});
// 剩余的其他路由全部交给前端 react-router 处理
app.get('*', () => {
  this.render('index.html');
});
```

#### Java(SpringMVC)

```java
// src/main/java/com/taobao/appName/controller/IndexController.java

// import deps

/**
 * 控制器：为了方便说明问题，此处只引入一个 controller, 实际业务中需要拆分多个 controller
 */
@Controller
public class IndexController {

  /**
   * api 接口1
   */
  @RequestMapping("/api/books")
  public JSONResponse getBooks(HttpServletRequest request) {
    return new JSONResponse();
  }

  /**
   * api 接口2
   */
  @RequestMapping("/api/list")
  public JSONResponse getList(HttpServletRequest request) {
    return new JSONResponse();
  }

  /**
   * 剩余的其他路由全部交给前端 react-router 处理
   * @return index.vm
   */
  @RequestMapping("/**")
  public String handlerNotFound() {
    return "/index";
  }
}
```

经过上面几个步骤之后，一个基础的单页面应用就搭建完成了，最后再回顾下单页面应用的优势：

1. 页面跳转无需重新加载资源，体验更好
2. 整个站点只需要一个 html, 静态资源以及版本号维护起来更加方便简单，后端可专注于提供接口

当然，使用过程中你可能会遇到一些其他问题，欢迎在「ICE 万能群」里反馈。

该方案详细讨论，请参考 [gitlab issue](http://gitlab.alibaba-inc.com/ice/notes/issues/480)。