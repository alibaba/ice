---
title: 迁移到 3.0 版本
order: 3
---

## 3.0 带来了什么

* 更强大的项目管理功能，新增了导航管理、路由管理、Git仓库管理功能
* 国际化工作台，支持一键切换中英文
* 支持主题切换，新增深色主题

## 项目迁移方式

如果旧项目根目录**不存在**`ice.config.js`文件，则在`package.json`中增加如下配置

```json
{
  "iceworks": {
    "adapter": "adapter-react-v1"
  }
}
```

如果项目根目录**存在**`ice.config.js`文件，则在`package.json`中增加如下配置

```json
{
  "iceworks": {
    "adapter": "adapter-react-v2"
  }
}
```

*注意：使用iceworks 3.0创建的新项目，adapter版本为`adapter-react-v3`*
