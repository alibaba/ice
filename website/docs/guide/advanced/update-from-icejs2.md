---
title: 从 ice.js 2.x 升级
order: 0902
---
# 从 ice.js 2.x 升级

## 前言

升级 ice.js 3.x 可以带来构建速度和页面性能的提升，并且带来更多移动端功能，比如开箱即用的 PHA、Weex 和小程序方案等。

## 升级指南

### 依赖修改

#### 框架依赖

```diff
{
  "devDependencies": {
-    "ice.js": "^2.0.0",
+    "@ice/app": "^3.0.0",
+    "@ice/runtime": "^1.0.0",
  }
}
```

#### 插件依赖
##### @ali/build-plugin-ice-def
插件替换为 `@ali/ice-plugin-def`，使用版本 1.2.4+，使用方式：

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';
import def from '@ali/ice-plugin-def';

export default defineConfig(() => ({
  plugins: [
    def(),
  ],
}));
```

##### build-plugin-moment-locales

插件替换为 `@ice/plugin-moment-locales`，使用版本 1.0.2+，使用方式：

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';
import moment from '@ice/plugin-moment-locales';

export default defineConfig(() => ({
  plugins: [
    moment({
      locales: ['zh-CN'],
    }),
  ],
}));
```

##### build-plugin-fusion
替换为 `@ice/plugin-fusion`，使用版本 1.1.0+，使用方式：

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';
import fusion from '@ice/plugin-fusion';

export default defineConfig(() => ({
  plugins: [fusion({
    importStyle: true,
    themePackage: '@alifd/theme-design-pro',
    theme: {
      'primary-color': '#fff',
    },
  })],
}));
```

fusion 插件文档：[链接](../plugins/plugin-fusion.md)

> ice3 下的 fusion 插件不再支持多主题能力，仅支持配置 importStyle、themePackage 和 theme 三个配置项

##### build-plugin-antd

插件替换为 `@ice/plugin-antd`，使用版本 1.0.2+，使用方式：

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';
import antd from '@ice/plugin-antd';

export default defineConfig(() => ({
  plugins: [antd({
    dark: true,
    compact: true,
    theme: {
      'primary-color': '#fd8',
    },
  })],
}));
```

antd 插件文档：[链接](../advanced/antd.md)

##### build-plugin-css-assets-local

插件替换为 `@ice/plugin-css-assets-local`，使用版本 1.0.2+，使用方式：

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';
import cssAssetsLocal from '@ice/plugin-css-assets-local';

export default defineConfig(() => ({
  plugins: [
    cssAssetsLocal(),
  ],
}));
```

css-assets-local 插件文档：[链接](../advanced/css-assets-local.md)

##### build-plugin-jsx-plus

插件替换为 `@ice/plugin-jsx-plus`，使用版本 1.0.4+，使用方式：

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';
import jsxplus from '@ice/plugin-jsx-plus';

export default defineConfig(() => ({
  plugins: [
    jsxplus({
      // options
    }),
  ],
}));
```

jsx-plus 插件文档：[链接](../advanced/jsx-plus.md)

##### build-plugin-keep-alive

ice 3 不再支持插件形式的 keep-alive 方案。由框架内置提供的 `<KeepAliveOutlet />` 组件替代。
keep-alive 插件文档：[链接](../advanced/keep-alive.md)

> 完成依赖升级后推荐重新安装依赖，即执行 npm update

### 工程配置文件升级

为了获取更好的类型提示，ice 新版本中推荐使用 ts 文件进行配置，即在项目目录下新增 `ice.config.mts` 文件，原 json 中的能力支持情况如下：

#### 命令行参数

|  ice 2.x  | ice 3.0  | 备注  |
|  ----  | ----  | ----  |
| --port  | --port | - |
| --host  | --host | - |
| --config  | --config | - |
| --disable-open  | --no-open | - |
| --disable-mock  | --no-mock | - |
| --https  | --https | - |
| --analyzer  | --analyzer | - |
| --disable-assets  | ❌ | 不常用通过环境变量控制日志输出详细程度 |
| --disable-reload  | ❌ | 配置禁止 fastRefresh |

#### 配置项

|  ice 2.x  | ice 3.0  | 备注  |
|  ----  | ----  | ----  |
| plugins  | ✅ | - |
| alias  | ✅ | - |
| publicPath  | ✅ | - |
| devPublicPath  | ✅ | - |
| sourceMap  | ✅ | - |
| externals  | ✅ | - |
| hash  | ✅ | - |
| outputDir | ✅ | - |
| proxy | ✅ | - |
| define | ✅ | - |
| ssr | ✅ | - |
| dropLogLevel  | ✅ | - |
| minify | ✅ | 简化配置（true/false） |
| compileDependencies | ✅ | 配合现有的 compileIncludes 能力 |
| eslint | ✅ | - |
| tsChecker | ✅ | - |
| postcssOptions / postcssrc | ✅ | - |
| polyfill | ✅ | 需要主动开启 |
| remoteRuntime | ❌ | - |
| terser | ❌ | 内置方案 |
| outputAssetsPath | ❌ | 后续输出最佳目录实践 |
| devServer | ❌ | 不支持全量配置 devServer，按需开启 server 相关能力 |
| browserslist | ❌ | 统一走 browserlist 文件 |
| vendor | ❌ | 内置的分包实践，可以通过 splitChunks 关闭 |
| libraryTarget / library / libraryExport | ❌ | - |
| cssLoaderOptions / lessLoaderOptions / sassLoaderOptions  | ❌ | 不支持 webpack loader 相关，内置配置 |
| ignoreHtmlTemplate | ❌ | - |
| entry | ❌ | 自定义场景走 client.entry.tsx |
| vite / vitePlugins | ❌ | - |
| swc | ❌ | - |
| store / auth / request / pwa / router | ❌ | 通过定制的插件支持 |
| disableRuntime | ❌ | - |
| babelPlugins / babelPresets / webpackPlugins / webpackLoaders | ❌ | 不推荐直接配置，如果有定制需求通过 webpack 配置进行迁移 |

ice.js 3 新版本中不再支持 vite 模式，并且 webpack 相关的快捷配置也不再支持。我们将会将内置的逻辑做到最优。如果存在 webpack 定制需求，可以参考如下自定义方式定制：

```js title="ice.config.mts"
import { defineConfig } from '@ice/app';
import { modifyLoader } from '@ice/webpack-modify';

export default defineConfig(() => ({
  // Set your configs here.
  // ...
  webpack: (webpackConfig) => {
    if (typeof webpackConfig.devServer?.client === 'object') {
      // 修改 webpack 配置
      webpackConfig.devServer.client.overlay = false;
    }

    // 修改内置的 webpack 规则，借助官方工具可以更便捷的修改
    // 修改 css 样式规则下的 postcss-loader 配置项
    return modifyLoader(webpackConfig, {
      rule: '.css',
      loader: 'postcss-loader',
      options: (originOptions) => ({}),
    });
  },
}));
```

其他新版配置参考：[链接](../basic/config.md)
新版插件规范：[链接](../plugins/plugin-dev.md)

> 新版的 webpack 配置不再依赖 webpack-chain，如果有定制 webpack 的诉求可以直接通过 webpack-merge 的方式合并配置

### 常见配置迁移

新版框架对于大量配置进行了收敛，如果迁移时涉及到负责的定制场景，可以参考以下配置进行迁移

#### cssLoaderOptions

```js title="ice.config.mts"
import { defineConfig } from '@ice/app';
import { modifyLoader } from '@ice/webpack-modify';

export default defineConfig(() => ({
  // Set your configs here.
  // ...
  webpack: (webpackConfig) => {
    return ['css', 'less', 'sass'].reduce((acc, cur) => {
      return modifyLoader(acc, {
        rule: `.${cur}`,
        loader: 'css-loader',
        options: (originOptions) => ({}),
      });
    }, webpackConfig);
  },
}));
```

#### lessLoaderOptions

```js title="ice.config.mts"
import { defineConfig } from '@ice/app';
import { modifyLoader } from '@ice/webpack-modify';

export default defineConfig(() => ({
  // Set your configs here.
  // ...
  webpack: (webpackConfig) => {
    return modifyLoader(webpackConfig, {
      rule: '.less',
      loader: 'less-loader',
      options: (originOptions) => ({}),
    });
  },
}));
```

#### sassLoaderOptions


```js title="ice.config.mts"
import { defineConfig } from '@ice/app';
import { modifyLoader } from '@ice/webpack-modify';

export default defineConfig(() => ({
  // Set your configs here.
  ...
  webpack: (webpackConfig) => {
    return modifyLoader(webpackConfig, {
      rule: '.sass',
      loader: 'sass-loader',
      options: (originOptions) => ({}),
    });
  }
}));
```

#### postcssOptions / postcssrc

```js title="ice.config.mts"
import { defineConfig } from '@ice/app';
import { modifyLoader } from '@ice/webpack-modify';

export default defineConfig(() => ({
  // Set your configs here.
  // ...
  webpack: (webpackConfig) => {
    return ['css', 'less', 'sass'].reduce((acc, cur) => {
      return modifyLoader(acc, {
        rule: `.${cur}`,
        loader: 'postcss-loader',
        options: (originOptions) => ({}),
      });
    }, webpackConfig);
  },
}));
```

> 如果希望使用 postcssrc 能力，将 options 配置成如上空对象即可

#### webpackPlugins

```js title="ice.config.mts"
import { defineConfig } from '@ice/app';
import { removePlugin } from '@ice/webpack-modify';

export default defineConfig(() => ({
  // Set your configs here.
  // ...
  webpack: (webpackConfig) => {
    let modifiedConfig = webpackConfig;
    // 添加插件
    webpackConfig.plugins.push(new WebpackPlugin());
    // webpack 插件修改，先删除插件在重新添加
    modifiedConfig = removePlugin(webpackConfig, {
      pluginName: 'AssetsManifestPlugin',
    });
    webpackConfig.plugins.push(new AssetsManifestPlugin());
  }
}));
```

#### webpackLoaders

```js title="ice.config.mts"
import { defineConfig } from '@ice/app';
import { addLoader, modifyLoader, removeLoader } from '@ice/webpack-modify';

export default defineConfig(() => ({
  // Set your configs here.
  //...
  webpack: (webpackConfig) => {
    let modifiedConfig = webpackConfig;
    // 为 css 规则添加 loader
    modifiedConfig = addLoader(modifiedConfig, {
      rule: '.css',
      before: 'css-loader',
      useItem: {
        loader: 'style-loader',
      },
    });
    // 移除 loader
    modifiedConfig = removeLoader(modifiedConfig, {
      rule: '.css',
      loader: 'css-loader',
    });
    // 修改 loader
    modifiedConfig = modifyLoader(getWebpackConfig(), {
      rule: '.css',
      loader: 'css-loader',
      options: () => ({ module: true }),
    });
    return modifiedConfig;
  },
}));
```

#### babelPlugins / babelPresets

框架内置不再支持 babel 转换，一些常见语法转化逻辑已内置，如果存在定制 babel 插件的情况下，推荐以下方式转化

```js title="ice.config.mts"
import { defineConfig } from '@ice/app';
import { transformSync } from '@babel/core';

export default defineConfig(() => ({
  // Set your configs here.
  // ...
  transform: async (source, id) => {
    // 过滤条件
    if (id.match(/\.(j|t)s(x)?$/) && !id.includes('node_modules')) {
    // 借助 babel 编译
      const { code, map } = transformSync(source, {
        plugins: ['transform-decorators-legacy'],
      });
      return { code, map };
    }
  },
}));
```

### 运行时修改

#### 应用入口修改

```diff
- import { runApp } from 'ice';

const appConfing = {};

- runApp(appConfig);
+ export default appConfig;
```

为了获得良好类型提示，推荐写法为：

```ts
import { defineAppConfig } from 'ice';

export default defineAppConfig(() => ({
  app: {
    strict: false,
  },
}));
```

原 appConfig 上大部分能力均通过不同的插件进行承载，目前应用入口能力，请参考[文档](../basic/app.md#%E9%85%8D%E7%BD%AE%E9%A1%B9)


#### 路由修改

为了提供更好的框架能力，新版 ice 默认提供的路由规则为[约定式路由](../basic/router.md)

原配置式路由推荐通过上述的规则重新组织目录结构，如果路由过于复杂，推荐如下方式进行迁移：

```js title="ice.config.mts"
import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  routes: {
    // 忽略所有约定式规则
    ignoreFiles: ['**'],
    defineRoutes: (route) => {
      // 指定根路由页面为 home/index.ts
      route('/', 'home/index.tsx');
      // 为 /product 路由添加 layout.tsx 作为 layout，并渲染 products.tsx 内容
      route('/', 'layout.tsx', () => {
        route('/product', 'products.tsx');
      });
    },
  },
}));
```

### 进阶方案迁移

#### 状态管理

使用状态管理方案需主动安装 `@ice/plugin-store`：

```bash
$ npm i @ice/plugin-store -D
```

在 `ice.config.mts` 中添加插件：

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';
import store from '@ice/plugin-store';

export default defineConfig(() => ({
  plugins: [
    store({ resetPageState: true }),
  ],
}));
```

更多用法参考[状态管理](./store.md)

#### 数据请求

使用数据请求方案需主动安装 `@ice/plugin-request`：

```bash
$ npm i @ice/plugin-request -D
```

在 `ice.config.mts` 中添加插件：

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';
import request from '@ice/plugin-request';

export default defineConfig(() => ({
  plugins: [
    request(),
  ],
}));
```

在 `src/app.ts` 中导出统一的请求配置：

```ts title="src/app.ts"
export const requestConfig = {
  ...
};
```

更多配置和用法参考[网络请求](./request.md)

#### 权限方案

使用权限方案需主动安装 `@ice/plugin-auth`：

```bash
$ npm i @ice/plugin-auth -D
```

在 `ice.config.mts` 中添加插件：

```ts title="ice.config.mts"
import { defineConfig } from '@ice/app';
import auth from '@ice/plugin-auth';

export default defineConfig(() => ({
  plugins: [
    auth(),
  ],
}));
```

在 `src/app.ts` 中导出的权限配置：

```ts title="src/app.ts"
export const authConfig = {
  ...
};
```

更多配置和用法参考[权限管理](./auth.md)
