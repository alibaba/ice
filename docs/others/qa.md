---
title: 常见问题 QA
category: 其它
order: 1
---

> 持续更新

## ICE 的浏览器兼容策略是什么

因为 IE8 及以下浏览器存在各种兼容性问题以及安全漏洞，ICE 默认兼容 IE9 及以上的浏览器。对于面向商家、达人、内部小二的系统已经没有必要再去花费很大的成本兼容这些低版本浏览器，目前天猫多数站点已经不再支持 IE8, 可参考文章 [天猫即将不支持 IE8](https://zhuanlan.zhihu.com/p/24091492)。

面对还在使用 IE8 及以下浏览器的用户，我们只需按照下面的方法进行正确引导即可。开发者只需要在 vm/html 的 head 区域添加以下代码：

```
<!--[if lt IE 9]>
<script>location.href = "//www.taobao.com/markets/tbhome/ali-page-updater"; </script>
<![endif]-->
```

添加如上代码后，如果使用 IE8 及以下浏览器访问页面，则会自动跳转到统一引导升级浏览器的页面。

## 编辑器卡顿现象

由于项目在安装依赖后，产生文件夹 `node_modules` 含有较多的碎小文件，编辑器在索引文件引起的卡顿。
IDEA 尤为明显，可通过 exclude `node_modules` 目录，不需要检索该文件夹下的内容。

## 如何设置网页在浏览器 Tab 上面的 Icon (favicon) ？

细心的同学可能会看到页面在浏览器 Tab 上面会有自定义的 Icon：

![](//img.alicdn.com/tfs/TB1ct6bPpXXXXXYXFXXXXXXXXXX-484-82.png)

如果你想要在自己站点上面加上这个 Icon 可以按照如下步骤添加：

1. 准备一个 Icon，文件格式可以为 `.png` 或者 `.ico`，正方形，分辨率可以是 32x32px 或者 64x64px 文件体积要求尽可能小。
2. 上传 CDN 拿到一个 url 或者在自己服务器配置静态资源服务
3. 在 HTML 页面 `<head>` 标签里面添加如下代码：`<link rel="shortcut icon" href="your-icon-url">`
   ![](//img.alicdn.com/tfs/TB1IC53PpXXXXbmXVXXXXXXXXXX-1834-774.png)

这样就添加成功啦！

## 如何在页面显示原始的 html 代码内容？

出于安全方面的考虑，React 默认会将节点中 html 代码进行转义，比如：

```jsx
class Demo extends Component {
  render() {
    const content = 'hello <span>world</span>';
    return <div>{content}</div>;
  }
}

// 输出 hello world
```

如上，`<span>` 标签并不会输出在页面上，怎么解决这个问题呢，React 给我们提供了一个 `dangerouslySetInnerHTML` 属性：

```jsx
class Demo extends Component {
  render() {
    const content = 'hello <span>world</span>';
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
}

// 输出 hello <span>world</span>
```

更多内容请参考 [Dangerously Set innerHTML](http://reactjs.cn/react/tips/dangerously-set-inner-html.html)
