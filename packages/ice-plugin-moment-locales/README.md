# ice-plugin-moment-locales

## 功能

- 优化 moment 语言包加载
- 根据设置自动加载对应语言包

## options

- `locales`：类型 `String | Array`，需要加载的多语言包

## 用法

```js
module.exports = {
  plugins: [
    ['ice-plugin-moment-locales', { locales: ['zh-cn', 'en-au'] }],
  ],
}
```