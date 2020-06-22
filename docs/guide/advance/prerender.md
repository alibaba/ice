---
title: 构建时预渲染 Prerender
order: 5
---

在某些业务场景下，需要更好的 SEO，提高首页加载速度等等，基于此 icejs 提供了构建时预渲染（Prerender）方案。

## 安装插件

```bash
$ npm install build-plugin-prerender --save-dev
```

## 工程配置

### 在 SPA 中

项目目录结构

```markdown
├── src
|  ├── app.ts
|  ├── pages
|  |  ├── About         # About 页面
|  |  ├── Dashboard     # Dashboard 页面
|  |  └── Home          # Home 页面
|  └── routes.ts
```

在 build.json 中引入 `build-plugin-prerender` 并配置, 其中 `routes` 为需要渲染的路由。

```json
{
  "plugins": [
    [
      "build-plugin-prerender",
      {
        "routes": [
          "/",
          "/about",
          "/dashboard"
        ]
      }
    ]
  ]
}
```

运行 `npm run build`，得到的构建产物如下：

```markdown
├── build
|  ├── about
|  |  └── index.html   # 预渲染得到的 HTML
|  ├── dashboard
|  |  └── index.html   # 预渲染得到的 HTML
|  ├── favicon.png
|  ├── index.html
|  └── js
|     └── index.js
```

通过静态服务启动，通过预渲染后的 HTML 截图如下：

![prerender-html](https://img.alicdn.com/tfs/TB1kihJJYj1gK0jSZFOXXc7GpXa-1364-738.png)

### 在 MPA 中

项目目录结构

```markdown
├── public
|  ├── dashboard.html
|  └── index.html
├── src
|  └── pages
|     ├── Dashboard    # Dashboard 页面
|     └── Home         # Home 页面
```

首先确保在 `build.json` 中开启 MPA 应用配置，`build-plugin-prerender` 配置字段同上

```json
{
  "mpa": true,
  "plugins": [
    [
      "build-plugin-prerender",
      {
        "routes": [
          "/about",
          "/dashboard"
        ]
      }
    ]
  ]
}
```

运行 `npm run build`，得到的构建产物如下：

```markdown
├── build
|  ├── dashboard
|  |  └── index.html
|  ├── home
|  |  └── index.html
|  └── js
|     ├── dashboard.js
|     ├── home.js
|     └── vendor.js
```

## 插件参数

- routes: `string[]`，需要预渲染的路由。默认是 `['/']`。

## 部署到 Nginx

前端项目部署到 Nginx 时，可以在 Nginx 配置下加入以下内容，使得访问预渲染的路由时，可以获取到经过预渲染后的 HTML。

```nginx
location / {
    root   www/web;
    index  index.html index.htm;
  + try_files $uri $uri/ /index.html;
}
```

该功能为实验性功能，如遇到问题可通过飞冰钉钉群与我们反馈。