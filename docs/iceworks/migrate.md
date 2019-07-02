---
title: 迁移到 3.0 版本
order: 3
---

## 为什么要做 3.0 版本

iceworks 3.0相对于2.x提供了以下新功能:

* 更强大的项目管理功能，新增了导航管理、路由管理、Git仓库管理功能
* 国际化，一键切换中英文
* 主题切换，新增了深色主题

同时我们对以下React工程中的最佳实践作了优化并集成到了iceworks 3.0的模板中
* 路由管理
* 状态管理
* 权限管理


## 迁移方式

对于旧项目，要迁移到3.0请在package.json中增加如下配置

```json
{
  "iceworks": {
    "adapter": "adapter-react-v1", // 或者adapter-react-v2
  }
}
```
上面的adapter-react后面的版本号选择v1还是v2根据下面来判断：
查找项目根目录是否存在ice.config.js文件，如果存在使用v2，否则使用v1。

注意：使用iceworks 3.0创建的新项目，adapter版本为v3，对应最新的工程最佳实践。


