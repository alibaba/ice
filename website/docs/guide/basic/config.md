---
title: 构建配置
order: 14
---

ice.js 支持常用的构建配置项，所有的配置项在 `ice.config.mts` 中设置。

## 配置文件

### 构建配置文件

为了获取良好的类型提示，ice.js 推荐以 `ice.config.mts` 作为配置文件：

```js
import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  publicPath: '/',
}));
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

在 ice.js 默认内置常用的 alias 规则，因此项目大多数时候不需要配置即可更加简单的导入模块了：

```diff
-import CustomTips from '../../../components/CustomTips';
+import CustomTips from '@/components/CustomTips';
```

如果需要配置别名对 import 路径进行映射：

```js
import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  alias: {
    pages: './src/pages',
  },
}));
```

### crossOriginLoading

:::caution
小程序端不支持该配置。
:::

- 类型：`false | 'anonymous' | 'use-credentials'`
- 默认值：`false`

配置

```js
import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  crossOriginLoading: 'anonymous'
}));
```

指定 webpack 启用 [cross-origin](https://webpack.js.org/configuration/output/#outputcrossoriginloading) 去加载 chunk。

### define

- 类型：`Record<string, string | boolean>`
- 默认值：`{}`

配置运行时变量。

```js
import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  define: {
    ASSETS_VERSION: '0.1.0',
    'process.env.TEST': true,
  },
}));
```

在代码中直接使用对应定义的变量：

```js
console.log(ASSETS_VERSION);
console.log(process.env.TEST);
```

对于运行时变量，ice.js 更加推荐通过[环境变量](./env.md)的方式注入。

### dataLoader

- 类型： `boolean | { fetcher: { packageName: string; method: string } }`
- 默认值 `true`

是否启用内置的数据预加载能力以及自定义发送者（fetcher）。

### publicPath

:::caution
小程序端不支持该配置。
:::

- 类型：`string`
- 默认值：`/`

配置 Webpack 的 [output.publicPath](https://webpack.js.org/configuration/output/#output-publicpath) 属性，仅在运行 build 命令时生效。

### devPublicPath

- 类型：`string`
- 默认值：`/`

同 publicPath 仅在执行 start 时生效。

### hash

:::caution
小程序端不支持该配置。
:::

- 类型：`boolean | string`
- 默认值：`false`

如果希望构建后的资源带 hash 版本，可以将 hash 设置为 `true`，也可以设置为 `contenthash` 按文件内容生成 hash 值：

```js
import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  hash: 'contenthash',
}));
```

### externals

:::caution
小程序端不支持该配置。
:::

- 类型：`Record<string, string>`
- 默认值：`{}`

设置哪些模块不打包，转而通过 `<script>` 或其他方式引入，比如：

```js
import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  externals: {
    react: 'React',
  },
}));
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

- 类型：`string`
- 默认值：`build`

构建产物输出目录，默认为 `build` 目录

### proxy

:::caution
小程序端不支持该配置。
:::

- 类型：`object`
- 默认值：`{}`

配置 dev 开发阶段的代理功能

```js
import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  proxy: {
    '/api': {
      target: 'http://jsonplaceholder.typicode.com/',
      changeOrigin: true,
      pathRewrite: { '^/api' : '' },
    },
  },
}));
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

export default defineConfig(() => ({
  compileDependencies: true,
}));
```

如果明确知道哪些依赖需要进行编译也可以通过正则方式进行设置：

```js
import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  compileDependencies: [/@alifd\/next/, /need-compile/],
}));
```

### postcss

- 类型：`ProcessOptions & { plugins?: (string | [string, Record<string, any>?])[] };`
- 默认值：`{}`

用于添加 postcss 自定义配置。示例如下：

```ts
import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  postcss: {
    plugins: [
      'postcss-px-to-viewport-8-plugin',
      {
        // ...
      },
    ],
    syntax: 'sugarss',
  }
}));
```

ice.js 内置的 postcss 配置是：

```json
{
  "plugins": [
    ["postcss-nested"],
    ["postcss-preset-env", {
      "stage": 3,
      "autoprefixer": {
        "flexbox": "no-2009",
      },
      "features": {
        "custom-properties": false,
      },
    }],
    ["postcss-plugin-rpx2vw"],
  ],
}
```

如果需要完全重写 postcss 配置或修改内置的 postcss 配置，需要在项目根目录下新增 `postcss.config.js` 文件并加入配置，工程上会清空内置的 postcss 配置。

```js title="postcss.config.js"
module.exports = {
  plugins: [
    [
      'postcss-preset-env',
      // 修改 postcss-preset-env 的选项
      {
        stage: 2,
      }
    ]
  ],
}
```

### polyfill

- 类型：`'usage' | 'entry' | false`
- 默认值：`false`

框架提供了多种 polyfill 的方式，开发者可以按实际情况选择对应的设置：

- `usage` 按开发者使用的语法自动引入对应的 `polyfill`，适用于 `node_modules` 也进行编译的场景（一定程度上影响编译效率以及三方依赖二次编译造成的代码冗余）
- `entry` 自动引入 browser（浏览器）需要兼容的 `polyfill`，适用于 `node_modules` 依赖不进行编译的场景（可能存在大量未被使用的 `polyfill` 被引入）

> 如果面向现代浏览器进行开发，大量 ES 语法均不需要引入 Polyfill，我们推荐不开启 `polyfill` 配置。如果你的代码或者三方依赖要求兼容到 IE 11 等浏览器，可以选择主动引入指定语法的 polyfill 或者开启 `polyfill` 配置。

### transform

- 类型：`(code:string, id: string) => string | {code: string; map?: SourceMap | null;}`
- 默认值：`undefined`

通过 `transform` 配置实现代码的转化：

```js
import { defineConfig } from '@ice/app';
import { transformSync } from '@babel/core';

export default defineConfig(() => ({
  transform: (originalCode, id) => {
    if (!id.includes('node_modules')) {
      // 借助 babel 编译
      const { code, map } = transformSync(originalCode, {
        plugins: ['transform-decorators-legacy'],
      });
      return { code, map };
    }
  },
}));
```

> ice.js 内置通过 `swc` 提升编译体验，如果在 `transform` 配置上过多依赖 babel 等工具将可以能造成编译性能瓶颈

### ssr

:::caution
小程序端不支持该配置。
:::

- 类型：`boolean`
- 默认值：`false`

是否开启 SSR 能力，更多 SSR 相关内容参考 [SSR 文档](./ssr)。

### ssg

:::caution
小程序端不支持该配置。
:::

- 类型：`boolean`
- 默认值：`true`

是否开启 SSG 能力，更多 SSG 相关内容参考 [SSG 文档](./ssg)。

### server

:::caution
小程序端不支持该配置。
:::

- 类型：`{ format: 'esm' | 'cjs'; bundle: boolean; ignores: IgnorePattern[]; externals: string[]; onDemand: boolean; }`
- 默认值：`{ format: 'esm', bundle: false, ignores: [], externals: [], onDemand: false }`

SSR / SSG 产物标准，推荐以 ESM 标准进行执行，如果希望打包成一个 cjs 模块，可以进行如下设置：

```js
import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  server: {
    format: 'cjs',
    bundle: true,
  },
}));
```

可以通过 `ignores` 参数，为 SSR / SSG 产物过滤指定文件：

```js
import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  server: {
    ignores: [{
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }]
  },
}));
```

其中：

- resourceRegExp 对应文件的匹配路径
- contextRegExp （可选）对应文件内容的匹配规则

通过 `externals` 参数，可以在构建 Server 端产物时 external 指定内容：

```js
import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  server: {
    externals: ['react', 'react-dom']
  },
}));
```

通过 `onDemand` 参数，可以在执行 Server 端产物时，按需构建所需的问题，并且提供体验良好的模块热更新服务：

```js
import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  server: {
    onDemand: true,
    format: 'esm',
  },
}));
```

### routes

:::caution
小程序端不支持该配置。
:::

- 类型：`{ ignoreFiles: string[]; defineRoutes: (route: DefineRouteFunction) => void }`
- 默认值：`{}`

#### ignoreFiles

用于忽略 `src/pages` 下的文件被处理成路由模块，使用 glob 表达式([minimatch](https://github.com/isaacs/minimatch))对文件路径匹配。

```ts
import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  routes: {
    // 忽略 src/pages 下所有 components 目录
    ignoreFiles: ['**/components/**'],
  },
}));
```

#### defineRoutes

对于约定式路由不满足的场景，可以通过以下方式自定义路由地址。

```ts
import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  routes: {
    defineRoutes: (route) => {
      // 将 /about-me 路由访问内容指定为 about.tsx
      // 第一个参数是路由地址
      // 第二个参数是页面组件的相对地址（前面不能带 `/`），相对于 `src/pages` 目录
      route('/about-me', 'about.tsx');

      // 嵌套路由的场景需要使用第三个 callback 参数来定义嵌套路由
      route('/', 'layout.tsx', () => {
        route('/product', 'products.tsx');
      });
    },
  },
}));
```

:::caution
同一个路由组件只能分配一条路由规则，即同时执行以下语句时，仅生效后执行的逻辑。

```ts
route('/about-me', 'about.tsx');
route('/about-you', 'about.tsx');
```
:::

#### config

对于简单的自定义场景，通过 `defineRoutes` 可以快速在约定式路由的基础上进行自定义。但对于大量自定义或者原配置式路由的升级项目，支持以 `config` 的字段指定路由信息：

```ts
import { defineConfig } from '@ice/app';

export default defineConfig({
  routes: {
    config: [
      {
        path: 'rewrite',
        // 从 src/page 开始计算路径，并且需要写后缀。
        component: 'sales/layout.tsx',
        children: [
          {
            path: '/favorites',
            component: 'sales/favorites.tsx',
          },
          {
            path: 'overview',
            component: 'sales/overview.tsx',
          },
          {
            path: 'recommends',
            component: 'sales/recommends.tsx',
          },
        ],
      },
      {
        path: '/',
        component: 'index.tsx',
      },
    ],
  },
});
```

### sourceMap

- 类型：`boolean | string`
- 默认值：`development` 模式：默认为 'cheap-module-source-map'，支持通过 `false` 关闭，不支持设置为其他枚举值。`production` 模式：默认 `false`。

### splitChunks @deprecated

:::caution
不再建议使用，能力由 codeSplitting 替代。
小程序端不支持该配置。
:::

默认会根据模块体积自动拆分 chunks，有可能会出现多个 bundle。如果不希望打包产物出现过多 bundle ，可设置成 `false`。

### codeSplitting

- 类型：`boolean | 'vendors' | 'page' | 'chunks'`
- 默认值：`true`

框架内置了三种分包策略分别为 `chunks`（默认策略，无需额外设置），`page` 和 `vendors`。

- `vendors` 策略：将异步 chunks 里的三方依赖统一打入到 vendor.js 中，避免重复，在依赖不变的情况下有效利用缓存。缺陷是如果项目过大会导致单文件尺寸过大。
- `page` 策略：所有路由级别组件按需加载，如果需保留原 `splitChunks: false` 的效果，配置该策略 。
- `chunks` 策略：在路由级别组件按需加载的基础上，根据模块体积大小自动拆分 chunks，为框架默认推荐策略。

如果存在特殊场景期望关闭分包能力，可以设置成 `false`。

### syntaxFeatures

- 类型：`{ exportDefaultFrom: boolean; functionBind: boolean; }`
- 默认值：`undefined`

ice.js 内置了大量 ES 语法支持，便于开发者进行编码。对于 [proposal-export-default-from](https://github.com/tc39/proposal-export-default-from) 和 [proposal-bind-operator](https://github.com/tc39/proposal-bind-operator) 由于其提案进度较慢，我们并不推荐使用。如果希望支持该语法，可以主动配置 `syntaxFeatures` 进行启用。

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

:::caution
小程序端不支持该配置。
:::

- 类型：`{ exclude: string[] }`
- 默认值：`{}`

配置忽略 mock 的文件。

```js
import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  mock: {
    // 忽略 mock 目录中 custom 目录下的文件以及 api.ts 文件
    exclude: ["custom/**", "api.ts"]
  },
}));
```

### plugins

- 类型：`PluginList<Config, OverwritePluginAPI>`
- 默认值：`[]`

添加插件

```js
import { defineConfig } from '@ice/app';
import customPlugin from './custom-plugin';
import myPlugin from '@ice/my-plugin';

export default defineConfig(() => ({
  plugins: [
    customPlugin(),
    myPlugin(),
  ],
}));
```

### webpack

:::tip
ice.js 对 webpack 构建配置进行了定制，并借助 esbuild 等工具提升用户开发体验，直接修改 webpack 配置的方式并不推荐。
:::

- 类型：`(config: WebpackConfig, taskConfig: TaskConfig) => WebpackConfig`
- 默认值：`true`

ice.js 默认基于 webpack 5 进行构建，在上述提供的构建配置无法满足的情况下，用户可以定制 webpack 配置：

```js
import { defineConfig } from '@ice/app';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';

export default defineConfig(() => ({
  webpack: (webpackConfig) => {
    if (process.env.NODE_ENV !== 'test') {
      // 添加 webpack 插件
      webpackConfig.plugins?.push(new SpeedMeasurePlugin());
    }
    return webpackConfig;
  },
}));
```

> 如有定制需求欢迎👏 PR 或反馈：<https://github.com/alibaba/ice/issues>
