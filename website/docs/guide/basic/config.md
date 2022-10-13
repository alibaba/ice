---
title: 构建配置
order: 13
---

ICE 支持常用的构建配置项，所有的配置项在 `ice.config.mts` 中设置。

## 配置文件

### 构建配置文件

为了获取良好的类型提示，ICE 推荐以 `ice.config.mts` 作为配置文件：

```js
import { defineConfig } from '@ice/app';

export default defineConfig({
  publicPath: '/',
});
```

### 兼容性配置

构建的兼容性配置推荐配置在 `.browserslistrc` 文件中：

```js
chrome 55
```

更多配置请参考 [browserslist 文档](https://github.com/browserslist/browserslist#readme)

## 配置项

### alias

- 类型：`Record<string, string | false>`
- 默认值：`{ "@": "./src/" }`

在 icejs 默认内置常用的 alias 规则，因此项目大多数时候不需要配置即可更加简单的导入模块了：

```diff
-import CustomTips from '../../../components/CustomTips';
+import CustomTips from '@/components/CustomTips';
```

如果需要配置别名对 import 路径进行映射：

```js
import { defineConfig } from '@ice/app';

export default defineConfig({
  alias: {
    pages: './src/pages',
  },
});
```

### define

- 类型：`Record<string, string | boolean>`
- 默认值：`{}`

配置运行时变量。

```js
import { defineConfig } from '@ice/app';

export default defineConfig({
  define: {
    ASSETS_VERSION: '0.1.0',
    'process.env.TEST': true,
  },
});
```

在代码中直接使用对应定义的变量：

```js
console.log(ASSETS_VERSION);
console.log(process.env.TEST);
```

对于运行时变量，ICE 更加推荐通过[环境变量](./env.md)的方式注入。

#### dataLoader

是否启用内置的数据预加载能力

- 类型 `boolean`
- 默认值 `true`

### publicPath

- 类型：`string`
- 默认值：`/`

配置 Webpack 的 [output.publicPath](https://webpack.js.org/configuration/output/#output-publicpath) 属性，仅在运行 build 命令时生效。

### devPublicPath

- 类型：`string`
- 默认值：`/`

同 publicPath 仅在执行 start 时生效。

### hash

类型：`boolean | string`
默认值：`false`

如果希望构建后的资源带 hash 版本，可以将 hash 设置为 `true`，也可以设置为 `contenthash` 按文件内容生成 hash 值：

```js
import { defineConfig } from '@ice/app';

export default defineConfig({
  hash: 'contenthash',
});
```

### externals

类型：`Record<string, string>`
默认值：`{}`

设置哪些模块不打包，转而通过 `<script>` 或其他方式引入，比如：

```js
import { defineConfig } from '@ice/app';

export default defineConfig({
  externals: {
    react: 'React',
  },
});
```

对应在 `document.ts` 或者页面模版里添加 CDN 文件：

```diff
import { Main, Scripts } from 'ice';

function Document() {
  return (
    <html lang="en">
      <body>        
        <Main />
+    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/17.0.1/cjs/react.production.min.js"></script>
        <Scripts />
      </body>
    </html>
  );
}

export default Document;
```

### outputDir

类型：`string`
默认值：`build`

构建产物输出目录，默认为 `build` 目录

### proxy

- 类型：`object`
- 默认值：`{}`

配置 dev 开发阶段的代理功能

```js
import { defineConfig } from '@ice/app';

export default defineConfig({
  proxy: {
    '/api': {
      target: 'http://jsonplaceholder.typicode.com/',
      changeOrigin: true,
      pathRewrite: { '^/api' : '' },
    },
  },
});
```

### minify

- 类型：`boolean`
- 默认值：`true`

压缩产物，目前默认仅在 build 阶段生效

### dropLogLevel

- 类型：`'trace' | 'debug' | 'log' | 'warn' | 'error'`
- 默认值：`null`，不移除任何 console 代码

压缩代码时移除 console.* 相关代码，比如配置了 log 则会移除 console.trace
、console.debug、console.log 代码。

### compileDependencies

- 类型：`array | boolean`
- 默认值：`[]`

默认情况下为了保证 dev 开发阶段的体验，`node_modules` 下文件不会进行编译，而考虑到 build 阶段对代码体积的极致优化以及兼容性保证，将会对 `node_modules` 下内容也进行编译。
如果希望修正默认行为可以进行如下配置，设置为 `true`，不管 dev 还是 build 阶段均编译 `node_modules`：

```js
import { defineConfig } from '@ice/app';

export default defineConfig({
  compileDependencies: true,
});
```

如果明确知道哪些依赖需要进行编译也可以通过正则方式进行设置：

```js
import { defineConfig } from '@ice/app';

export default defineConfig({
  compileDependencies: [/@alifd\/next/, /need-compile/],
});
```

### transform

- 类型：`(code:string, id: string) => string | {code: string; map?: SourceMap | null;}`
- 默认值：`undefined`

通过 `transform` 配置实现代码的转化：

```js
import { defineConfig } from '@ice/app';
import { transformSync } from '@babel/core';

export default defineConfig({
  transform: (originalCode, id) => {
    if (!id.includes('node_modules')) {
      // 借助 babel 编译
      const { code, map } = transformSync(originalCode, {
        plugins: ['transform-decorators-legacy'],
      });
      return { code, map };
    }
  },
});
```

> ICE 内置通过 `swc` 提升编译体验，如果在 `transform` 配置上过多依赖 babel 等工具将可以能造成编译性能瓶颈

### ssr

- 类型：`boolean`
- 默认值：`false`

是否开启 SSR 能力，更多 SSR 相关内容参考 [SSR 文档](./ssr)。

### ssg

- 类型：`boolean`
- 默认值：`true`

是否开启 SSG 能力，更多 SSG 相关内容参考 [SSG 文档](./ssg)。

### server

- 类型：`{ format: 'esm' | 'cjs'; bundle: boolean; ignores: IgnorePattern[] }`
- 默认值：`{ format: 'esm', bundle: false, ignores: [] }`

SSR / SSG 产物标准，推荐以 ESM 标准进行执行，如果希望打包成一个 cjs 模块，可以进行如下设置：

```js
import { defineConfig } from '@ice/app';

export default defineConfig({
  server: {
    format: 'cjs',
    bundle: true,
  },
});
```

可以通过 `ignores` 参数，为 SSR / SSG 产物过滤指定文件：

```js
import { defineConfig } from '@ice/app';

export default defineConfig({
  server: {
    ignores: [{
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }]
  },
});
```

其中：
* resourceRegExp 对应文件的匹配路径
* contextRegExp （可选）对应文件内容的匹配规则

### routes

- 类型：`{ignoreFiles: string[]; defineRoutes: (route) => void}`
- 默认值：`{}`

定制路由地址，对于约定式路由不满足的场景，可以通过 `routes` 方式进行自定义：

```js
import { defineConfig } from '@ice/app';

export default defineConfig({
  routes: {
    // 忽略 pages 下的 components 目录
    ignoreFiles: ['**/components/**'],
    defineRoutes: (route) => {
      // 将 /about-me 路由访问内容指定为 about.tsx
      route('/about-me', 'about.tsx');

      // 为 /product 路由添加 layout.tsx 作为 layout，并渲染 products.tsx 内容
      route('/', 'layout.tsx', () => {
        route('/product', 'products.tsx');
      });
    },
  },
});
```

### sourceMap

- 类型：`boolean | string`
- 默认值：`development` 模式：默认为 'cheap-module-source-map'，支持通过 `false` 关闭，不支持设置为其他枚举值。`production` 模式：默认 `false`。

### splitChunks

- 类型：`boolean`
- 默认值：`true`

默认会根据模块体积自动拆分 chunks，有可能会出现多个 bundle。如果不希望打包产物出现过多 bundle ，可设置成 `false`。

### syntaxFeatures

- 类型：`{ exportDefaultFrom: boolean; functionBind: boolean; }`
- 默认值：`undefined`

ICE 内置了大量 ES 语法，便于开发者进行编码。对于 [proposal-export-default-from](https://github.com/tc39/proposal-export-default-from) 和 [proposal-bind-operator](https://github.com/tc39/proposal-bind-operator) 由于其提案进度较慢，我们并不推荐使用。如果希望支持该语法，可以主动配置 `syntaxFeatures` 进行启用。

### tsChecker

- 类型：`boolean`
- 默认值：`false`

默认关闭 TypeScript 类型检测，如需开启配置为 `true` 即可。

### eslint

- 类型：`boolean | object`
- 默认值：`undefined`

配置说明：

- `false`：不检测 eslint 错误
- `true`：将 eslint 错误展示在预览页面上
- `object`: 仅 Webpack 模式支持，表现等同于 true，支持配置 [eslint-webpack-plugin](https://github.com/webpack-contrib/eslint-webpack-plugin) 的更多参数

### mock

- 类型：`{ exclude: string[] }`
- 默认值：`{}`

配置忽略 mock 的文件。

```js
import { defineConfig } from '@ice/app';

export default defineConfig({
  mock: {
    // 忽略 mock 目录中 custom 目录下的文件以及 api.ts 文件
    exclude: ["custom/**", "api.ts"]
  },
});
```

### plugins

- 类型：`PluginList<Config, OverwritePluginAPI>`
- 默认值：`[]`

添加插件

```js
import { defineConfig } from '@ice/app';
import customPlugin from './custom-plugin';
import myPlugin from '@ice/my-plugin';

export default defineConfig({
  plugins: [
    customPlugin(),
    myPlugin(),
  ],
});
```

### webpack

- 类型：`(config: WebpackConfig, taskConfig: TaskConfig) => WebpackConfig`
- 默认值：`true`

ICE 默认基于 webpack 进行构建，在上述提供的构建配置无法满足的情况下，用户可以定制 webpack 配置：

```js
import { defineConfig } from '@ice/app';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';

export default defineConfig({
  webpack: (webpackConfig) => {
    if (process.env.NODE_ENV !== 'test') {
      // 添加 webpack 插件
      webpackConfig.plugins?.push(new SpeedMeasurePlugin());
    }
    return webpackConfig;
  },
});
```

> ICE 对 webpack 构建配置进行了定制，并借助 esbuild 等工具提升用户开发体验，直接修改 webpack 配置的方式并不推荐。
> 如有定制需求欢迎👏 PR 或反馈：<https://github.com/alibaba/ice/issues>
