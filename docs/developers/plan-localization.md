---
title: 离线化项目构建方案
category: 项目开发手册
order: 11
---

# 离线化项目构建方案

默认的样式中存在网络资源，例如：字体、图片等。按照以下步骤修改，即可：

## 1. 修改 `package.json` 里的依赖版本

将 `dependencies` 里的依赖里添加如下内容

```diff
{
  "dependencies": {
+    "react": "^16.0.0",
+    "react-dom": "^16.0.0",
+    "prop-types": "^15.0.0"
  }
}
```

将 `devDependencies` 里的依赖 `ice-scripts` 版本修改为 `"ice-scripts": "^1.6.1"`

```diff
{
  "devDependencies": {
    "babel-eslint": "^8.0.3",
    "eslint": "^4.13.1",
    "eslint-config-airbnb": "^16.1.0",
    "eslint-plugin-babel": "^5.1.0",
    "eslint-plugin-import": "^2.8.0",
    "eslint-plugin-jsx-a11y": "^6.0.3",
    "eslint-plugin-react": "^7.5.1",
-   "ice-scripts": "^1.0.0"
+   "ice-scripts": "^1.6.1"
  },
}
```

## 2. 修改 `package.json` 里的 `buildConfig`

增加 `"publicURL": "./"` 本地化构建声明

```diff
{
  "buildConfig": {
    "theme": "@icedesign/skin",
-   "entry": "src/index.js"
+   "entry": "src/index.js",
+   "publicURL": "./"
  },
}
```

## 修改 html 模板

替换掉原有项目 `public/index.html` 文件, 可复制以下内容替换即可。

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
  <meta name="viewport" content="width=device-width">
  <title>网站标题</title>
</head>

<body>
  <div id="ice-container"></div>
</body>

</html>
```

并在 `public/` 目录下创建一个 `favicon.png` 图片文件，推荐大小 `64x64` 用于展示网站图标。（没有可忽略）

## 4. 检查是否存在其他声明了 `publicPath` 的地方

- `package.json` 是否存在 `buildConfig.publicPath` 字段，有则删除
- `.webpackrc.js` 文件内容是否存在 `output.publicPath` 字段，有则删除

> 都没有则跳过此步骤

## END

完成以上步骤的修改后，重装项目依赖后执行构建，构建出来的项目就可以离线访问了。如果有任何问题，可提交 <https://github.com/alibaba/ice/issues/new> 反馈。

如果有其他 `.jsx` `.js` 里加载了网络图片，可按照 [如何加载本地图片](如何加载本地图片) 修改。

构建完成后，可通过 `file://` 协议头方式打开预览，则表示成功。

![](https://img.alicdn.com/tfs/TB122wezeuSBuNjy1XcXXcYjFXa-1106-843.png)
