---
title: 开启动态加载后如何部署
category: 项目开发手册
order: 7
---

# 开启动态加载后如何部署

[公共路径(public path)](https://webpack.docschina.org/guides/public-path/#src/components/Sidebar/Sidebar.jsx)

webpack 提供一个非常有用的配置，该配置能帮助你为项目中的所有资源指定一个基础路径。它被称为公共路径(publicPath)。

当开启动态加载后，就需要指定一个基础路径，让程序从什么地方加载资源。

## 示例

项目看起动态加载后，构建的资源如下：

```bash
# 构建结果片段

               Asset       Size  Chunks                    Chunk Names
           css/0.css    6.8 KiB       0  [emitted]
             js/0.js    130 KiB       0  [emitted]         vendor
           css/1.css   22.5 KiB       1  [emitted]
             js/1.js   9.56 KiB       1  [emitted]
       css/index.css   6.12 KiB   index  [emitted]
         js/index.js   18.8 KiB   index  [emitted]
```

程序的主入口文件是 `index.js` 也就是会直接在 HTML 模板里引用的。由 `index.js` 动态去加载 `0.js` `1.js`

假设需要将构建后的资源发布到 `http://example.com/static/`， 请求路径为:

- `http://example.com/static/css/0.css`
- `http://example.com/static/js/0.js`
- `http://example.com/static/css/1.css`
- `http://example.com/static/js/1.js`
- `http://example.com/static/css/index.css`
- `http://example.com/static/js/index.js`

那么就需要指定 `publicPath` 的值为 `http://example.com/static/`

## 修改 `.webpackrc.js`

该文件位于项目根目录下 _如不存在可手动创建_，设置如下：

```js
module.exports = {
  output: {
    publicPath: 'http://example.com/static/',
  },
};
```

修改完成后重新构建即可 **务必重新构建，否则不生效**
