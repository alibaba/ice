---
title: 构建时预渲染 Prerender
order: 17
---

在 ToC 的业务场景下，我们常常需要更好的 seo，提高首页加载速度等等。但在某些业务场景下，使用 SSR 比较重，比如：

- 静态站点类应用
- 静态营销类页面
- ...

我们基于 [prerender-spa-plugin](https://www.npmjs.com/package/prerender-spa-plugin/v/3.4.0), 封装 `build-plugin-prerender` 插件，方便在 icejs 中使用构建时预渲染（Prerender）。

## 安装插件

```bash
$ npm install build-plugin-prerender --save-dev
```

## 工程配置

### 在 SPA 中使用 Prerender

在 build.json 中引入 `build-plugin-prerender` 并配置

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
        ],
        "minify": {
          "collapseBooleanAttributes": true,
          "collapseWhitespace": true,
          "decodeEntities": true,
          "keepClosingSlash": true,
          "sortAttributes": true
        },
        "renderer": {
          "headless": false
        }
      }
    ]
  ]
}
```

- routes: string[]，需要预渲染的路由。默认是 `['/']`。

- minify: object, 压缩生成的 HTML 文件。默认是 `{}`。
- render: object, renderer 字段配置。目前默认使用 [PuppeteerRenderer](https://github.com/JoshTheDerf/prerenderer/tree/master/renderers/renderer-puppeteer)。默认是 `{}`。

具体的配置可参考 https://www.npmjs.com/package/prerender-spa-plugin/v/3.4.0

运行 `npm run build`，得到的构建产物如下：

```
├── about
|  └── index.html
├── dashboard
|  └── index.html
├── favicon.png
├── index.html
└── js
   └── index.js
```

使用 [http-server](https://www.npmjs.com/package/http-server) 访问 http://localhost:8080/dashboard， 可在本地预览构建后的效果。

### 在 MPA 中使用 Prerender

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
        ],
        "minify": {
          ...
        },
        "renderer": {
          ...
        }
      }
    ]
  ]
}
```

运行 `npm run build`，得到的构建产物如下：

```
├── dashboard
|  └── index.html
├── home
|  └── index.html
└── js
   ├── dashboard.js
   ├── home.js
   └── vendor.js
```

