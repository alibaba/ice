---
title: 使用本地图片
order: 1
---

项目打包基于 [webpack](https://webpack.js.org/) 所有项目内的资源都可理解为 Module 通过依赖关系最后打包出项目资源。

## 在 jsx 中依赖图片的写法

```javascript
// 本地图片填写相对路径
<img src={require('../../img.jpg')} />
```

```javascript
// 网络图片常规写法即可
<img src={require('http://example.com/img.jpg')} />
```

## 在样式文件中依赖图片的写法

```css
// 网络图片常规写法即可
.header {
  backround-image: url('http://example.com/img.jpg');
}
```

```css
// 本地图片填写相对路径
.header {
  backround-image: url('../../img.jpg');
}
```
