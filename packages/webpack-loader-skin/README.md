# ice-skin-loader

定制 ICE 主题：

- 根据 `themeFile` 获取对应的 sass 变量覆盖默认的组件变量
- 根据 `themeConfig` 自定义变量
  - 根据 `primary-color` `secondary-color` 计算出相关的品牌色
  - 根据 `icon-font-path`, `icon-font-name`, `font-custom-path` 实现图标和字体本件的本地化
  - 根据 nextPrefix 实现更改 next 1.x 的 css 前缀
  - 其他单个变量覆盖

## 使用

```js
{
  loader: require.resolve('ice-skin-loader'),
  options: {
    themeFile: path.join(appName, `variables.scss`),
    themeConfig: {
      nextPrefix: 'nextfd-',
      primaryColor: 'green',
      secondaryColor: 'green',
      // 原始 scss 变量
      'font-size-body-1': '14px'
    }
  }
};
```