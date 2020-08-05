---
title: 工程配置
order: 6
---

`build.json` 用于应用的工程构建配置。

## 开发调试

默认情况下，项目的 package.json 会配置以下命令：

```json
{
  "scripts": {
    "start": "icejs start",
    "build": "icejs build"
  }
}
```

## 构建配置

**`targets`**

指定构建产物的类型。

默认值：`["web"]`

可选值：`["miniapp", "wechat-miniprogram]`


其他更多配置详见 [工程构建配置](https://ice.work/docs/guide/basic/build#%E5%B7%A5%E7%A8%8B%E6%9E%84%E5%BB%BA%E9%85%8D%E7%BD%AE)
