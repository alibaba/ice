---
title: 物料托管与使用
order: 3
---

### 物料数据托管

物料数据的托管我们目前支持两种方式，业务可以根据自身的特性选择：

| 特性             |   fusion.design   |   unpkg       |
|-----------------|-------------------|---------------|
|  官方推荐        |   是              |    一般        |
|  门户网站     |   能                 |    不能        |
|在 Iceworks 中使用 |   能             |    能         |
|  需要登录注册帐号  |   需要            |    不需要       |
|  线上管理物料      |  能               |    不能        |
|  支持的物料体系     | 仅支持 React 物料 |   不限制       |

#### 托管在 fusion.design

首先在 [fusion.design](https://fusion.design) 上注册账号，然后根据[文档](https://fusion.design/help.html#dev-create-site)新建站点，接着在物料仓库下执行命令：

```bash
# 根据提示填写帐号 token -> 选择同步的站点
$ npm run sync
```

#### 托管在 unpkg

通过 `sync-unpkg` 命令发布 npm 包：

```bash
$ npm run sync-unpkg
```

本质上是将 `build` 目录发布为一个 npm 包，然后通过 unpkg 服务可以访问这个包里的 json 文件。

### 使用物料

`npm run sync` 命令运行完成以后，会返回如下内容:

> 物料同步完成
> 物料源地址: https://fusion.design/api/v1/sites/xxxx/materials
> 请在 Iceworks 设置面板中添加自定义物料源

此时只需要将物料源地址 `https://fusion.design/api/v1/sites/xxxx/materials` 添加到 Iceworks 自定义物料源里，就可以在初始化项目或者添加页面时使用这份物料了。

![](https://img.alicdn.com/tfs/TB1o4AyxXzqK1RjSZFCXXbbxVXa-1740-1200.png)