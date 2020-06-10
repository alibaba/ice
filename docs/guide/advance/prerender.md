---
title: 构建时预渲染 Prerender
order: 5
---

在某些业务场景下，我们常常需要更好的 SEO ，提高首页加载速度等等。我们封装 `build-plugin-prerender` 插件，方便在 icejs 中使用构建时预渲染（Prerender）。

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
        ]
      }
    ]
  ]
}
```

项目目录结构

```
├── build.json
├── package.json
├── public
|  ├── favicon.png
|  └── index.html
├── src
|  ├── app.ts
|  ├── pages
|  |  ├── About
|  |  |  └── index.tsx
|  |  ├── Dashboard
|  |  |  └── index.tsx
|  |  └── Home
|  |     └── index.tsx
|  └── routes.ts
```

运行 `npm run build`，得到的构建产物如下：

```
├── build
|  ├── about
|  |  └── index.html
|  ├── dashboard
|  |  └── index.html
|  ├── favicon.png
|  ├── index.html
|  └── js
|     └── index.js
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
        ]
      }
    ]
  ]
}
```

项目目录结构

```
├── build.json
├── package.json
├── public
|  ├── dashboard.html
|  └── index.html
├── src
|  └── pages
|     ├── Dashboard
|     |  ├── app.ts
|     |  ├── index.tsx
|     |  ├── models
|     |  └── routes.ts
|     └── Home
|        ├── app.ts
|        └── index.tsx
```

运行 `npm run build`，得到的构建产物如下：

```
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
- minify: `object`, 压缩生成的 HTML 文件。默认是 `{ collapseBooleanAttributes: true,collapseWhitespace : true}`。
- render: `object`, renderer 字段配置。目前默认使用 [PuppeteerRenderer](https://github.com/JoshTheDerf/prerenderer/tree/master/renderers/renderer-puppeteer)。默认是 `{}`。

## 进阶用法

压缩生成的 HTML

```json
{
  "plugins": [
    [
      "build-plugin-prerender",
      {
        "routes": [
			"/"
        ],
        "minify": {
        	"collapseBooleanAttributes": true,
        	"collapseWhitespace": true,
        	"decodeEntities": true,
        	"keepClosingSlash": true,
        	"sortAttributes": true
        }
      }
    ]
  ]
}
```

增加限制并行渲染的路由数量：

```json
{
  "plugins": [
    [
      "build-plugin-prerender",
      {
        "routes": [
			"/"
        ],
        "renderer": {
            "maxConcurrentRoutes": 4,
        }  
      }
    ]
  ]
}
```

更多的参数配置可参考 [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin)