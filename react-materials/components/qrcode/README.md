---
title: Qrcode
category: Components
chinese: 二维码
---

二维码组件

## 参数（Props）

|  参数名  |    说明    |   必填    |    类型   |  默认值  |  可选值  |
|-------|-----------|----------|---------|---------| -------- |
| value | 二维码的展示内容 | 是 | `string` | 无 |  |
| size | 二维码的尺寸  | 否 | `number` | `128` |  |
| bgColor | 二维码背景色 | 否 | `string` | `#ffffff` |  |
| fgColor | 二维码前景色 | 否 | `string` | `#000000` |  |
| level | 二维码的纠错等级 | 否 | `string` | `L` | [`L`, `M`, `Q`, `H`] |
| text | 二维码下方文案 | 否 | `string` | 无 |  |
| align | 二维码展示位置 | 否 | `string` | `left`| [`left`, `right`, `top`, `bottom`]|
| triggerSize | 触发器 icon 的大小 | 否 | `string` | `medium`| 可选 `xxs`, `xs`, `small`, `medium`, `large`, `xl`, `xxl` |
| triggerStyle | 触发器 icon 的 inline-style | 否 | `object` | `{}`| |

## 子组件

### Qrcode.Panel

直接展示的二维码组件

### 参数（Props）

|  参数  |    说明    |   必填    |   类型   |  默认值  |  可选值  |
|-------|-----------|----------|---------|---------| -------- |
| value | 二维码的展示内容 | 是  | `string` | 无 |  |
| size | 二维码的尺寸 | 否  | `number` | `128` |  |
| bgColor | 二维码背景色 | 否  | `string` | `#ffffff` |  |
| fgColor | 二维码前景色 | 否  | `string` | `#000000` |  |
| level | 二维码的纠错等级 | 否  | `string` | `L` | [`L`, `M`, `Q`, `H`] |
| text | 二维码下方文案 | 否  | `string` | 无 |  |
