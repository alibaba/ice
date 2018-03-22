---
title: 修改主题配色
order: 3
---

## 为什么要修改

ICE Design 为 ICE 体系内的组件和物料提供了指导性规范，但是我们也支持在一定程度内对样式风格进行个性化定制。

## 开放的定制能力

- 皮肤风格 (theme)
  - 由 `Layout` 提供能力支持，当前可传入 `dark` 或者 `light`
- 主品牌色 (primaryColor)
  - 支持 CSS 提供的颜色格式规范
    - Hex: 如 `#ff0000`, `#f00`
    - RGB: 如 `rgb(255, 0, 0)`
    - 颜色常量: 如 `red`, `yellow`
- 副品牌色 (secondaryColor)
  - 同上

我们也在考虑开放更多可供定制的变量，如果以上变量不能满足你的需求，可以给我们提 issue 进行讨论。

## 如何修改

请先确保您的 `ice-scripts` 已经升级到 `1.0.8` 及以上版本。

修改项目目录下的 `package.json` 文件如下所示：

```json
{
  "themeConfig": {
    "theme": "dark",
    "primaryColor": "red",
    "secondaryColor": "grey"
  }
}
```

