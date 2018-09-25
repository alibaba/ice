---
title: List
category: Components
chinese: 列表
npm: \@icedesign/list
---

列表组件

## 安装和升级

```bash
npm install @icedesign/list
```

### 何时使用

- 当有数组类型的数据需要进行平铺展示时使用
- 该组件允许调整每行显示的个数，以及每个单元之间的间距

## 参数（Props）

|  参数名  |    说明    |   必填    |    类型   |  默认值  |  可选值  |
|-------|-----------|----------|---------|---------| -------- |
| column | 一行展示的列数 | 是 | `number` | 无 |  |
| spacing | Item组件之间的间距 | 否 | `number` | 10 |  |
| style | 样式 | 否 | `object` | 无 |  |

## 子组件

### Item

```js
const { Item } from '@icedesign/list'
```

列表的每个单元

### 参数（Props）

|  参数  |    说明    |   必填    |   类型   |  默认值  |  可选值  |
|-------|-----------|----------|---------|---------| -------- |
| style | 样式 | 否 | `object` | 无 |  |


