---
title: 常见问题 QA
category: 其它
order: 1
---

> 持续更新中...
> 如有问题可以到 <https://github.com/alibaba/ice/issues/new> 反馈

## ICE 的浏览器兼容策略是什么

由于 ICE 优先使用 React 16+，其需要的最低 IE 版本为 11，如果您需要在以下的版本使用，您可能需要引入一些 polyfill 来支持 `Map`, `Set` 等特性。参考[React 官网说明](https://reactjs.org/blog/2017/09/26/react-v16.0.html#javascript-environment-requirements)。

以下代码可以帮助你在低版本 IE 下自动跳转到我们提供的提示浏览器升级页面。当然您也可以使用自定义的浏览器升级页面。

```
<!--[if lt IE 11]>
<script>location.href = "//www.taobao.com/markets/tbhome/ali-page-updater"; </script>
<![endif]-->
```

添加如上代码后，如果使用 IE11 及以下浏览器访问页面，则会自动跳转到统一引导升级浏览器的页面。

## WebStorm/IDEA 编辑器卡顿现象

由于项目在安装依赖后，产生文件夹 `node_modules` 含有较多的碎小文件，编辑器在索引文件引起的卡顿。
WebStorm 中尤为明显，可通过 exclude `node_modules` 目录，不需要检索该文件夹下的内容。

## 如何设置网页在浏览器 Tab 上面的 Icon (favicon)

细心的同学可能会看到页面在浏览器 Tab 上面会有自定义的 Icon：

![](//img.alicdn.com/tfs/TB1ct6bPpXXXXXYXFXXXXXXXXXX-484-82.png)

如果你想要在自己站点上面加上这个 Icon 可以按照如下步骤添加：

1.  准备一个 Icon，文件格式可以为 `.png` 或者 `.ico`，正方形，分辨率可以是 32x32px 或者 64x64px 文件体积要求尽可能小。
2.  上传 CDN 拿到一个 url 或者在自己服务器配置静态资源服务
3.  在 HTML 页面 `<head>` 标签里面添加如下代码：`<link rel="shortcut icon" href="your-icon-url">`
    ![](//img.alicdn.com/tfs/TB1IC53PpXXXXbmXVXXXXXXXXXX-1834-774.png)

这样就添加成功啦！

## 如何在页面显示原始的 HTML 内容

出于安全方面的考虑，React 默认会将节点中 html 代码进行转义，比如：

```jsx
class Demo extends Component {
  render() {
    const content = 'hello <span>world</span>';
    return <div>{content}</div>;
  }
}

// 输出 hello <span>world</span>
```

如上，`<span>` 标签并不会在页面上被解析，而是被当成字符串输出了。React 提供了 `dangerouslySetInnerHTML` 属性帮助我们进行类似 `innerHTML` 的操作：

```jsx
class Demo extends Component {
  render() {
    const content = 'hello <span>world</span>';
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
}

// 输出 hello world
```

更多内容请参考 [Dangerously Set innerHTML](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)

## 出现端口已占用启动失败应该如何处理？

当你出现类似 `Something is already running on port 4444.` 或类似的报错时，可能是由于 Hosts 配置缺少 `localhost` 等相关配置。

详细修复方法请参见：https://github.com/alibaba/ice/issues/233
