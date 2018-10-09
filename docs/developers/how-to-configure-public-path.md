---
title: 如何设置资源加载路径
category: 项目开发手册
order: 4
---

# 如何设置资源加载路径

publicPath 指定在浏览器中所引用的「此输出目录对应的公开 URL」。相对 URL(relative URL) 会被相对于 HTML 页面（或 `<base>` 标签）解析。相对于服务的 URL(Server-relative URL)，相对于协议的 URL(protocol-relative URL) 或绝对 URL(absolute URL) 也可是可能用到的，或者有时必须用到，例如：当将资源托管到 CDN 时。

该选项的值是以 runtime(运行时) 或 loader(载入时) 所创建的每个 URL 为前缀。因此，在多数情况下，此选项的值都会以 `/` 结束。

在 Iceworks 中的 publicPath 默认值是是 `/`。

例如构建后的内容是

```
./build
  + index.html
  + index.js
  + index.css
```

如果访问的地址是 `http://example.com/index.html`，并且 js css 文件存放地址与 html 一样，那么此时不需要调整。

## 场景 1

如果访问的地址是 `http://example.com/admin/index.html` 并且 js css 文件存放地址与 html 一样，此时需要设置 `publicPath` 为 `/admin/`

修改项目根目录下 `.webpackrc.js` 文件

```js
module.exports = {
  // 其他配置
  output: {
    publicPath: '/admin/',
  },
};
```

## 场景 2

如果访问的地址是 `http://example.com/admin/index.html` 但 js css 文件存放地址与 html 不一样，比如：`http://cdn.com/index.js` 此时需要设置 `publicPath` 为 `http://cdn.com/`

修改项目根目录下 `.webpackrc.js` 文件

```js
module.exports = {
  // 其他配置
  output: {
    publicPath: 'http://cdn.com/',
  },
};
```
