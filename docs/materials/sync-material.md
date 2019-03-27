---
title: 物料数据托管
order: 5
---

在项目根目录运行 `npm run generate` 之后，会生成一个静态 json 数据，接下来我们需要将这份数据进行托管使用，目前提供两种方式：

| 特性             |   fusion.design   |   unpkg       |
|-----------------|-------------------|---------------|
|  官方推荐        |   是              |    一般        |
|  生成门户网站     |   能              |    不能        |
|在 Iceworks 中使用 |   能              |    能         |
|  需要登录注册帐号  |   需要            |    不需要       |

以上是两种方案的对比，可以根据自身的需求选择，以下为两种方案的操作方式：


## 托管在 fusion.design

首先在 [fusion.design](https://fusion.design) 上注册账号，然后根据[文档](https://fusion.design/help.html#dev-create-site)新建站点，接着执行命令：

```bash
# 根据提示填写帐号 token -> 选择同步的站点
$ npm run sync
```

同步完成后，一方面可以在 fusion.design 上看到站点的物料，另一方面可以在 Iceworks 里将对应物料数据 url 添加到自定义物料源里使用。

## 托管在 unpkg

```bash
$ npm run sync-unpkg
```

本质上是将 `build` 目录发布为一个 npm 包，然后通过 unpkg 里访问这个包里的 json 文件。

## 使用物料

`npm run sync` 命令运行完成以后，会返回如下内容:

> 物料同步完成
> 物料源地址: https://fusion.design/api/v1/sites/xxxx/materials
> 请在 Iceworks 设置面板中添加自定义物料源

把物料源地址`https://fusion.design/api/v1/sites/xxxx/materials`， 添加到 Iceworks 自定义物料源就可以使用。

![](https://img.alicdn.com/tfs/TB1o4AyxXzqK1RjSZFCXXbbxVXa-1740-1200.png)
