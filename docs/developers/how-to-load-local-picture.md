---
title: 如何加载本地资源图片
category: 项目开发手册
order: 8
---

# 如何加载本地资源图片

项目打包基于 [webpack](https://webpack.js.org/) 所有项目内的资源都可理解为 Module 通过依赖关系最后打包出项目资源。

![](https://img.alicdn.com/tfs/TB1fo2xx3mTBuNjy1XbXXaMrVXa-2228-986.png)

## 在 `jsx` 中依赖图片的写法

```js
// 本地图片填写相对路径
<img src={require('../../img.jpg')} />
```

```js
// 网络图片常规写法即可
<img src={require('http://example.com/img.jpg')} />
```

## 在 `css` `less` `scss` 中依赖图片的写法

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

## 总结

通过 `require` 描述资源的依赖关系，打包后可构建出相应的资源文件，其他文件类型如 `.png` `.eot` `.tff` `.svg` 同理。
