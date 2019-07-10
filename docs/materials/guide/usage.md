---
title: 使用物料
order: 5
---

物料数据托管同步之后，都会获得唯一的 URL 地址，此时只需将物料源地址配置到 iceworks 中即可使用。

打开 iceworks，进入设置面板，在设置中新增自定义物料源，填写物料名称和物料源 URL，就可以在初始化项目或者添加页面时使用这份物料了。

![](https://img.alicdn.com/tfs/TB1VY.ybwFY.1VjSZFqXXadbXXa-2790-1532.png)

关于 iceworks 使用，请查看 [iceworks 文档](https://ice.work/docs/iceworks/about)。

> 不管是将物料数据托管到 fusign.design 还是 unpkg，本质上都是通过 HTTP GET 请求获取物料数据，因此，除了以上方式，你也可以将物料数据的 JSON 文件放到你的 CDN 或某个后端接口上使用。

ice-devtools 生成的物料数据是一份不包含物料源码的元数据，当用户在 iceworks 中添加物料 URL 后，iceworks 会向该 URL 请求物料数据，根据物料数据在页面中展示当前物料集合包含的组件、区块和项目。当用户选择使用物料时，iceworks 再通过 npm 下载源码。
