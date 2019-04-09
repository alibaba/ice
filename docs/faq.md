---
title: 常见问题
order: 3
---

> 持续更新...
> 如有问题可以到 <https://github.com/alibaba/ice/issues/new> 反馈

## 使用飞冰（ICE）是否需要懂一些前端知识？

毫无疑问是需要的，我们在努力降低前端开发的门槛，但一些基础的前端知识还是需要具备的，比如 JavaScript 的基础预发、前后端如何通信等。

为了便于快速入门前端知识，我们整理了一份 [前端基础知识列表](https://github.com/alibaba/ice/wiki/fed-basic-knowledge)，希望能帮助到开发者。

## 常用的组件有哪些推荐？

参考 wiki [社区组件推荐](https://www.yuque.com/ice-team/wiki/oiweqt)

## 飞冰（ICE）的浏览器兼容策略是怎样的？

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
