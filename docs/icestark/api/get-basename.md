---
title: getBasename
order: 10
---

配置子应用 `React Router` 中的 `basename` 参数的方法，此方法根据 `AppRoute` 中的 `basename` 或者 `path` 配置生成最终结果。

- 类型：`function`
- 默认返回值：`/`
- 使用规则：`basename || (Array.isArray(path) ? path[0] : path)) || "/"`
- 代码示例参考 ![renderNotFound](/docs/icestark/api/render-not-found)