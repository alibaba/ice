# extract-css-assets-webpack-plugin

提取 css 文件中网络资源，将其本地化。

## Required

- webpack >= 4.0

## Options

- `outputPath` 默认值： `""` 提取后的文件目录前缀
- `relativeCssPath` 默认值： `""` 提取的文件后相对于 css 的路径

## Usage

```js
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ExtractCssAssetsPlugin from 'extract-css-assets-webpack-plugin';

module.exports = {
  entry: './index',
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFileName: 'css/[id].css',
    }),
    new ExtractCssAssetsPlugin({
      outputPath: 'assets/',
      relativeCssPath: '../', // 由于创建了 css 目录 则生成的图片相对于 css 目录则为 `'../'`
    }),
  ],
};
```

input:

```css
body {
  color: red;
  background-image: url(//img.alicdn.com/tfs/TB1zSOZrFGWBuNjy0FbXXb4sXXa-1024-1024.png);
}

.b {
  background-image: url('./img.jpg');
}

@font-face {
  font-family: 'iconfont'; /* project id 377048 */
  src: url('//at.alicdn.com/t/font_377048_kjcjjyweu4sra4i.eot');
  src: url('//at.alicdn.com/t/font_377048_kjcjjyweu4sra4i.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_377048_kjcjjyweu4sra4i.woff') format('woff'),
    url('//at.alicdn.com/t/font_377048_kjcjjyweu4sra4i.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_377048_kjcjjyweu4sra4i.svg#iconfont') format('svg');
}
```

output:

```css
body {
  color: red;
  background-image: url('/assets/cd7e3c88d4211a9b0b2335d1e417bb12.png');
}

.b {
  background-image: url(/assets/fcaa0cae8fcd6ecf465971d57fdeff85.jpg);
}

@font-face {
  font-family: 'iconfont'; /* project id 377048 */
  src: url('/assets/34032f039a2b3b449235ba9d307409ec.eot');
  src: url('/assets/34032f039a2b3b449235ba9d307409ec.eot?#iefix') format('embedded-opentype'),
    url('/assets/f7efc431f760b9e8a6125054c5f4a502.woff') format('woff'),
    url('/assets/3a70f449494ab666efaf24b72d563431.ttf') format('truetype'), url('/assets/b1b72dfa538406f3897c40ab412b4183.svg#iconfont')
      format('svg');
}
```

## 注意事项

- 当 `output.publicPath` 设置为 http 网络路径时，插件不工作。
