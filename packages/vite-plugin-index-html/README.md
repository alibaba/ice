# vite-plugin-index-html

快速创建 Vite 应用的 HTML 文件。功能类似于 [webpack-html-plugin](https://github.com/jantimon/html-webpack-plugin)。

## Motivation

Vite 应用默认使用根目录下的 [index.html](https://vitejs.dev/guide/#index-html-and-project-root) 作为入口文件，通过解析 `index.html` 的 `<script />` 并生成一个 “虚拟的” 脚本资源入口文件，形如：

```js
import 'polyfill';
import './src/main.ts';
```

在某些非 [LibraryMode](https://vitejs.dev/guide/build.html#library-mode)，需要明确脚本入口文件为 `./src/main.j|ts`。该插件实现了类似于 [webpack-html-plugin](https://github.com/jantimon/html-webpack-plugin) 的能力。


## Features

- [x] 修改应用入口
- [x] 支持 Minify
- [x] 支持导出入口文件签名
- [ ] 支持模板
- [ ] 支持 MPA


## 用法

### npm/yarn

```shell
npm i --save-dev vite-plugin-index-html

# or

yarn add --dev vite-plugin-index-html
```

### 使用

在 `vite.config.ts` 中引入：

```ts
import htmlPlugin from 'vite-plugin-index-html';

// vite.config.ts
export default defineConfig({
  plugins: [vue(), htmlPlugin({
    entry: './src/main.ts'
  })]
})
```

## 参数

- `entry`

应用入口，默认为 `.src/main.j|ts?x`。

- `template`

template 地址，默认为 `./src/index.html`。

- `filename`

生成的 HTML 文件名，默认为 `index.html`。

- `publicPath`

公共基础路径。默认为 [base](https://vitejs.dev/guide/build.html#public-base-path)。

- `minify`

是否压缩 html 代码。默认为 `auto`，development 下默认不压缩，production 下默认压缩。

类型：boolean | 'auto' | object

object 详细配置参考 [html-minifier-terser](https://www.npmjs.com/package/html-minifier-terser)

- `preserveEntrySignatures`

是否保留入口文件签名。

类型："strict" | "allow-extension" | "exports-only" | false

更详细介绍参考 [rollup preserveEntrySignatures](https://rollupjs.org/guide/en/#preserveentrysignatures)。

## License

MIT
