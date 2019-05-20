# ice-plugin-css-assets-local

 ice-scripts plugin for localize CSS assets

## Features

将 CSS 中依赖的资源本地化，例如字体文件等。

## Options

- `outputPath`: 默认值： `assets` 提取后的文件目录前缀
- `relativeCssPath`: 默认值： `../` 提取的文件后相对于 CSS 的路径

## Usage

Install npm:

```bash
$ npm i --save-dev ice-plugin-css-assets-local
```

Add config to `ice.config.js`:

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-plugin-css-assets-local', {
      outputPath: 'assets',
      relativeCssPath: '../'
    }]
  ]
}
```
