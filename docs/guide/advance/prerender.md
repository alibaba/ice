---
title: 构建时预渲染 Prerender
order: 5
---

在某些业务场景下，需要更好的 SEO，提高首页加载速度等等，因此，我们封装 `build-plugin-prerender` 插件，方便在 icejs 中使用构建时预渲染（Prerender）。

## 安装插件

```bash
$ npm install build-plugin-prerender --save-dev
```

如果在安装依赖时遇到下载 Chromium 过慢时，可修改 npm 的 puppeteer_download_host 为淘宝源，具体方法如下：

```bash
npm config set puppeteer_download_host=https://npm.taobao.org/mirrors
```
## 工程配置

### 在 SPA 中

项目目录结构

```markdown
├── build.json
├── package.json
├── public
|  ├── favicon.png
|  └── index.html
├── src
|  ├── app.ts
|  ├── pages
|  |  ├── About         # About 页面
|  |  ├── Dashboard     # Dashboard 页面
|  |  └── Home          # Home 页面
|  └── routes.ts
```

在 build.json 中引入 `build-plugin-prerender` 并配置, 其中 `routes` 为需要渲染的路由

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
├── build.json
├── package.json
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
- minify: `object`, 压缩生成的 HTML 文件。默认是 `{ collapseBooleanAttributes: true,collapseWhitespace : true}`。
- render: `object`, renderer 字段配置。目前默认使用 [PuppeteerRenderer](https://github.com/JoshTheDerf/prerenderer/tree/master/renderers/renderer-puppeteer)。默认是 `{}`。

## 进阶用法

### 压缩生成的 HTML
- collapseBooleanAttributes: `boolean`, 是否省略节点上的 `Boolean` 属性
- collapseWhitespace: `boolean`, 是否折叠有助于文档树中文本节点的空白

### 渲染配置
- maxConcurrentRoute: `number`, 并行渲染的路由数量
- headless: `boolean`, 当构建时预渲染是否显示浏览器进行调试

示例: 
```json
{
  "mpa": true,
  "plugins": [
    [
      "build-plugin-prerender",
      {
        "routes": [
          "/home",
          "/dashboard"
        ],
        "minify": {
          "collapseBooleanAttributes": false,
          "collapseWhitespace": false,
        },
        "renderer": {
          "maxConcurrentRoutes": 4
        }
      }
    ]
  ]
}
```

更多的参数配置可参考 [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin)
