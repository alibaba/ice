# ice-skin-loader

定制 ICE 主题：

- 根据 `themeFile` 参数获取对应的 sass 变量覆盖默认的变量
- 根据项目目录的 `package.json` 里的 theme 字段定制自定义 sass 变量
  - 根据 `primary-color` `secondary-color` 计算出相关的品牌色
  - 根据 `icon-font-path`, `icon-font-name`, `font-custom-path` 实现图标和字体本件的本地化
  - 其他变量自定义


## 使用

- 通过 `themeFile` 参数传入变量文件
- 在项目目录下 package.json 的 `themeConfig` 中定义相关 sass 变量

```js
loaders.push({
  loader: require.resolve('ice-skin-loader'),
  options: {
    themeFile: path.join(__diranme, `variables.scss`),
  }
});
```