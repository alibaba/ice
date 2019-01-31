---
title: 物料托管
order: 8
category: 物料
---

## 物料托管

在项目根目录，运行`npm run generate`之后。可以完成物料源静态数据的生成。
关于物料的元数据描述，本质上是一份JSON数据， 可以放在任何可以提供http服务的地方。

实际中，我们发现，提供公网可访问的物料源对于许多用户都是一个难题，为此我们和[Fusion Design](https://fusion.design)合作. 集成[Fusion Design](https://fusion.design)的能力到官方开发工具。


运行`npm run generate`之后，可以在根目录运行 `npm run sync`， 第一次使用需要到[Fusion Design](https://fusion.design)注册账号并建立站点。具体操作步骤见
[Fusion Design 建站文档](https://fusion.design/help.html#dev-create-site)

此后这些信息会缓存下来，想要清理这些缓存数据，可以使用`idev clear`。

## 使用物料
 `npm run sync` 命令运行完成以后，会返回如下内容:
 
> 物料同步完成
> 物料源地址: https://fusion.design/api/v1/sites/xxxx/materials
> 请在 Iceworks 设置面板中添加自定义物料源 

把物料源地址`https://fusion.design/api/v1/sites/xxxx/materials`， 添加到 Iceworks 自定义物料源就可以使用。

![](https://img.alicdn.com/tfs/TB1o4AyxXzqK1RjSZFCXXbbxVXa-1740-1200.png)
