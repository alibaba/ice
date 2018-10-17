---
title: Richtext
category: Components
chinese: 富文本组件
npm: \@icedesign/richtext
---

富文本组件

## 安装和升级

```bash
npm install @icedesign/richtext
```

### 何时使用

- 基于[Slate](https://github.com/ianstormtaylor/slate)开发的富文本组件，包含以下常用富文本功能
    - 粗体
    - 斜体
    - 下划线
    - 删除线
    - 字体颜色
    - 背景颜色
    - 字体大小
    - 行间距
    - 对齐
    - 标题
    - 列表
- 其他功能未来持续迭代增加

## 参数（Props）

|  参数名  |    说明    |   必填    |    类型   |  默认值  |  可选值  |
|-------|-----------|----------|---------|---------| -------- |
| value | 富文本HTML字符串 | 是 | `string` | 无 |  |
| onChange | 编辑器change回调 | 否 | `function` | 无 |  |
