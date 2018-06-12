# extract-css-assets-webpack-plugin

提取 css 文件中网络资源，将其本地化。

## Options

- `outputPath` 提取后的文件目录前缀

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
      filename: '[name].css',
      chunkFileName: '[id].css',
    }),
    new ExtractCssAssetsPlugin({
      outputPath: 'assets/',
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
  background-image: url('/assets/TB1zSOZrFGWBuNjy0FbXXb4sXXa-1024-1024.png');
}

.b {
  background-image: url(/assets/fcaa0cae8fcd6ecf465971d57fdeff85.jpg);
}

@font-face {
  font-family: 'iconfont'; /* project id 377048 */
  src: url('/assets/font_377048_kjcjjyweu4sra4i.eot');
  src: url('/assets/font_377048_kjcjjyweu4sra4i.eot?#iefix') format('embedded-opentype'),
    url('/assets/font_377048_kjcjjyweu4sra4i.woff') format('woff'),
    url('/assets/font_377048_kjcjjyweu4sra4i.ttf') format('truetype'), url('/assets/font_377048_kjcjjyweu4sra4i.svg#iconfont')
      format('svg');
}
```
