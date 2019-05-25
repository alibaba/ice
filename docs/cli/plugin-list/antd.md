---
title: ice-plugin-antd
order: 2
---

`ice-plugin-antd` 插件为项目中使用 antd 组件提供按需加载和主题定制的能力。

## 功能

- antd组件按需加载
- 主题定制能力

## 如何使用

```bash
$ npm i --save-dev ice-plugin-antd
```

Options：
- `themeConfig`: 设置替换主题颜色


```js
module.exports = {
  plugins: [
    ['ice-plugin-antd', {
      themeConfig: {
        'primary-color': '#1DA57A',
        'link-color': '#1DA57A',
        'border-radius-base': '2px',
      }
    }]
  ]
}
```