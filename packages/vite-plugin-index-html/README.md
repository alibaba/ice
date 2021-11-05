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
- [ ] 支持 Minify
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
    input: './src/main.ts'
  })]
})
```

## 参数

- `input`

应用入口，默认为 `.src/main.j|ts?x`。

- `template`

template 地址，默认为 `./src/index.html`。

- `filename`

生成的 HTML 文件名，默认为 `index.html`。

- `publicPath`

公共基础路径。默认为 [base](https://vitejs.dev/guide/build.html#public-base-path)。


## License

MIT
