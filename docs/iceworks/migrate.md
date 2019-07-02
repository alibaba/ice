---
title: 迁移到 3.0 版本
order: 3
---

## 迁移方式

对于旧项目，要迁移到3.0请在`package.json`中增加如下配置

```json
{
  "iceworks": {
    "adapter": "adapter-react-v1", // 或者adapter-react-v2
  }
}
```
上面的 adapter-react 后面的版本号选择v1还是v2根据下面来判断：
查找项目根目录是否存在`ice.config.js`文件，如果存在使用 adapter-react-v2，否则使用 adapter-react-v1。

注意：使用iceworks 3.0创建的新项目，adapter版本为 adapter-react-v3。


