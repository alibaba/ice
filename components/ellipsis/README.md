---
title: Ellipsis
category: Components
chinese: 多行文字控制
---

多行文字控制展示组件。

**注意：由于控制每行显示字符数需要获取宽度，因此当前组件外层包裹的元素必须是 div、p 等块级元素，如果包裹 a、span 等需要通过 CSS 控制外层元素为 `display: inline-block;` 或者 `display: block` 类型。如果你很难理解这句话，就直接用 div 包裹就对了。**

## 参数（props）

| 参数名 | 说明 | 必填 | 类型 | 默认值 | 可选值 | 备注 |
|-------|-----|-----|-----|-------|--------|-----|
| lineLimit | 限制文字只显示几行。 | false | number | 1 | 数字 | |
| text | 要处理的文字。 | true | string | '' | | |
| style | 内联的样式 | false | object | | | |
| className | 自定义的 className | false | string | '' | | |
| showTooltip | 是否显示 tooltip 信息，相比 title 提示性更强。 | false | boolean | false | | |

文字的最大宽度和外框的最大宽度一致，必须填写文本数据，不支持非文本、富文本数据。
