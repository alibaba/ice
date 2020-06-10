---
title: CSS 网络资源本地化
order: 11
---

组件代码里有可能会依赖一些远程 CDN 的字体文件等，某些网络可能访问不了，出现这个问题有几种情况：

1. 构建部署时网络正常，网站运行时网络请求不到 CDN 文件
2. 构建部署和网站运行时都请求不到 CDN 文件
3. 构建部署时网络请求不到 CDN 地址，网站运行时可以请求到

第 3 种情况一般不需要做什么事情就能正常工作，以下是主要针对 1/2 两种场景的方案。

## 场景 1：网站运行时请求不到 CDN 文件

通过插件 `build-plugin-css-assets-local` 在构建时将网络资源下载到源码里。

安装依赖：

```bash
$ npm i --save-dev build-plugin-css-assets-local
```

插件参数:

- `outputPath`: 默认值 `assets`，提取后的文件目录前缀
- `relativeCssPath`: 默认值 `../`，提取的文件后相对于 CSS 的路径
- `activeInDev`：默认值 `false`，本地调试时是否启用

在 `build.json` 中引入：

```json
{
  "plugins": [
    ["build-plugin-css-assets-local", {
      "outputPath": "assets",
      "relativeCssPath": "../"
    }]
  ]
}
```

## 场景 2：构建部署和网站运行时都请求不到 CDN 文件

> 手动将对应资源下载到源代码中，仅针对 `@alifd/next` 组件里的字体文件

@alifd/next 组件库默认引用两类字体，包括图标字体和 robot 基础字体，因此分别需要把对应的文件下载到本地目录里：

- [图标字体文件](https://alifd.oss-cn-hangzhou.aliyuncs.com/fonts/icon-font.zip) ，下载到 `public/` 目录下
- [robot 字体文件](https://files.alicdn.com/tpsservice/31b61ac0c41fac383a1bffd154674347.zip) ，下载到 `public/` 目录

![image](https://user-images.githubusercontent.com/2505411/76869396-35cff300-68a3-11ea-98eb-8a77d6703861.png)

接着在 `build.json` 里加入以下配置：

```json
{
  "plugins": [
    ["build-plugin-fusion", {
      "themeConfig": {
        "icon-font-path": "'/icon-font/icon'",
        "font-custom-path": "'/font/'"
      }
    }]
  ]
}
```
