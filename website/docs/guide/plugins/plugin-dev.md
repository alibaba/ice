---
title: 开发插件
order: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

ice.js 提供了插件机制，在提供丰富的框架能力的基础上也可以让开发者可以在框架能力不满足诉求的情况下进行定制：

- 定制修改框架构建配置
- 支持在整个构建生命周期定制行为，比如项目启动前拉取某些资源
- 支持扩展运行时能力，比如统一为路由组件增加鉴权逻辑（添加高阶组件）

## 插件规范

ice.js 插件本质是一个 JS 模块，官方推荐以 TS 进行开发以获得良好的类型提示：

```ts
import type { Plugin } from '@ice/types';

interface PluginOptions {
  id: string;
}

const plugin: Plugin<PluginOptions> = (options) => ({
  // name 可选，插件名称
  name: 'plugin-name',
  // setup 必选，用于定制工程构建配置
  setup: (pluginAPI) => { console.log(options.id) },
  // runtime 可选，用于定制运行时配置
  runtime: '/path/to/runtime',
});

export default plugin;
```

### 开发本地插件

假设在项目根目录下有一个自定义插件 `my-plugin`：

```ts title="my-plugin.ts"
import type { Plugin } from '@ice/types';

const plugin: Plugin = () => ({
  name: 'my-plugin',
  setup: (pluginAPI) => {},
  // runtime 为可选，用于定制运行时配置。runtime 的值必须是一个绝对路径
  runtime: '/my-project/runtime.tsx',
});

export default plugin;
```

开发完成后，我们需要把插件添加到构建配置中：

```diff title="ice.config.mts"
import { defineConfig } from '@ice/app';
+ import myPlugin from './my-plugin';

export default defineConfig({
  plugins: [
+   myPlugin(),
  ]
})
```

### 发布插件到 npm 

假设现在需要开发一个插件（包括修改工程配置和运行时配置），并发布到 npm 上。插件的文件目录如下：

```md
/xxx/@ice/my-plugin
├── package.json
├── src
|  ├── index.ts       // 插件入口
|  └── runtime.tsx    // 定制运行时能力
```

推荐以 [ES Module](https://nodejs.org/api/packages.html) 的方式编写插件，并使用 `exports` 字段导出插件入口和运行时配置：

```json title="package.json"
{
  "name": "@ice/my-plugin",
  "type": "module",
  "exports": {
    ".": {
      "types": "./esm/index.d.ts",
      "import": "./esm/index.js",
      "default": "./esm/index.js"
    },
    "./runtime": {
      "types": "./esm/runtime/index.d.ts",
      "import": "./esm/runtime/index.js",
      "default": "./esm/runtime/index.js"
    }
  },
  "main": "./esm/index.js",
  "types": "./esm/index.d.ts",
  "files": [
    "esm",
    "!esm/**/*.map"
  ],
}
```
<Tabs>

<TabItem value="index.ts" label="src/index.ts">

```ts
import type { Plugin } from '@ice/types';

const plugin: Plugin = () => ({
  name: '@ice/my-plugin',
  setup: (pluginAPI) => {},
  // runtime 的值需要配置为「模块引入路径」，对应上面 package.json 中 exports 里的 "./runtime" 导出
  runtime: '@ice/my-plugin/runtime',
});

export default plugin;
```

</TabItem>

<TabItem value="runtime.tsx" label="src/runtime.tsx">

```tsx
import type { RuntimePlugin } from '@ice/types';

const runtime: RuntimePlugin = async ({ appContext }) => {
  console.log(appContext);
}

export default runtime;
```

</TabItem>

</Tabs>


把插件发布到 npm 后，需要把插件添加到构建配置中：

```diff title="ice.config.mts"
import { defineConfig } from '@ice/app';
+ import myPlugin from '@ice/my-plugin';

export default defineConfig({
  plugins: [
+   myPlugin(),
  ]
})
```

## 工程能力定制

框架为定制工程能力提供了插件 API，方便开发者扩展和自定义能力。

### `context`

`context` 包含构建时的上下文信息：

- `command` 当前运行命令，start/build/test
- `commandArgs` script 命令执行时接受到的参数
- `rootDir` 项目根目录
- `userConfig` 用户在构建配置文件 ice.config.mts 中配置的内容
- `pkg` 项目 package.json 中的内容
- `webpack` webpack 实例，工程不建议安装多个 webpack 版本，可以从 `context.webpack` 上获取内置的 webpack 实例

```ts
const plugin = () => ({
  setup: ({ context }) => {
    console.log('context: ', context);
  },
})
```
### `onGetConfig`

通过 `onGetConfig` 获取框架的工程配置，并可通过该 API 对配置进行自定义修改：

```ts
const plugin = () => ({
  name: 'plugin-test',
  setup: ({ onGetConfig }) => {
    onGetConfig((config) => {
      config.alias = {
        '@': './src/',
      }
    });
  },
})
```

为了简化开发者的配置，通过 `onGetConfig` 修改配置项是基于底层工程工具的抽象，包括以下配置项：

- `mode` 配置 `'none' | 'development' | 'production'` 以确定构建环境
- `entry` 配置应用入口文件
- `define` 注入到运行时的变量
- `experimental` 实验性能力，同 [webpack.experiments](https://webpack.js.org/configuration/experiments/#experiments)
- `outputDir` 构建输出目录
- `externals` 同 [webpack.externals](https://webpack.js.org/configuration/externals/)
- `outputAssetsPath` 静态资源输出目录，可以分别配置 js 和 css
- `sourceMap` 源码调试映射，同 [webpack.devtool](https://webpack.js.org/configuration/devtool/)
- `publicPath` 同 [webpack.output.publicPath](https://webpack.js.org/guides/public-path/#root)
- `alias` 同 [webpack.resolve.alias](https://webpack.js.org/configuration/resolve/#resolvealias)
- `hash` 配置资源输出文件名是否带 hash
- `transformPlugins` [unplugin 标准](https://github.com/unjs/unplugin) 插件，该插件对于服务端和浏览器端产物同时生效
- `transforms` 配置源码转化，支持对源码进行定制转化
- `middlewares` development 开发阶段配置中间件
- `proxy` 配置代理服务
- `compileIncludes` 配置需要进行编译的三方依赖
- `minify` 是否进行压缩
- `minimizerOptions` 压缩配置项，基于 [minify-options](https://github.com/terser/terser#minify-options)
- `analyzer` 开启产物分析
- `https` 配置 https 服务
- `port` 配置调试端口
- `cacheDir` 配置构建缓存目录
- `tsCheckerOptions` ts 类型检查 [配置项](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin)
- `eslintOptions` eslint 检查 [配置项](https://www.npmjs.com/package/eslint-webpack-plugin)
- `splitChunks` 是否分包
- `assetsManifest` 是否生成资源 manifest
- `devServer` 配置 webpack dev server [配置](https://webpack.js.org/configuration/dev-server/)
- `fastRefresh` 是否开启 fast-refresh 能力
- `configureWebpack` 如果上述快捷配置项不满足定制需求，可以通过 configureWebpack 进行自定义

```ts
export default () => ({
  name: 'plugin-test',
  setup: ({ onGetConfig }) => {
    onGetConfig((config) => {
      config.configureWebpack.push((webpackConfig) => {
        webpackConfig.mode = 'development';
        return webpackConfig;
      })
    });
  },
})
```

### `onHook`

通过 `onHook` 监听命令构建时事件，`onHook` 注册的函数执行完成后才会执行后续操作，可以用于在命令运行中途插入插件想做的操作：

```ts
export default () => ({
  name: 'plugin-test',
  setup: ({ onHook }) => {
    onHook('before.build.load', () => {
      // do something before build
    });
    onHook('after.build.compile', (stats) => {
      // do something after build
    });
  },
})
```

目前支持的生命周期如下：

- `before.start.run` 构建命令 start 执行前，该阶段可以获取各项构建任务最终配置
- `before.build.run` 构建命令 build 执行前，同 start
- `after.start.compile` 构建命令 start 执行结束，该阶段可以获取构建的执行结果
- `after.build.compile` 构建命令 build 执行结束，同 start
- `after.start.devServer` dev 阶段的 server 服务启动后，该阶段可以获取相关 dev server 启动的 url 等信息

> 每个周期可以获取的具体的参数类型可以参考 [TS 类型](https://github.com/ice-lab/ice-next/blob/master/packages/types/src/plugin.ts)

### `registerUserConfig`

为用户配置文件 `ice.config.mts` 中添加自定义字段：

```ts
export default () => ({
  name: 'plugin-test',
  setup: ({ registerUserConfig }) => {
    registerUserConfig({
      name: 'custom-key',
      validation: 'boolean' // 可选，支持类型有 string, number, array, object, boolean
      setConfig: () => {
        // 该字段对于配置的影响，通过 onGetConfig 设置
      },
    });
  },
});
```

### `registerCliOption`

为命令行启动添加自定义参数：

```ts
export default () => ({
  name: 'plugin-test',
  setup: ({ registerCliOption }) => {
    registerCliOption({
      name: 'custom-option',
      commands: ['start'], // 支持的扩展的命令
      setConfig: () => {
        // 该字段对于配置的影响，通过 onGetConfig 设置
      },
    });
  },
});
```

### `modifyUserConfig`

为命令行启动添加自定义参数：

```ts
export default () => ({
  name: 'plugin-test',
  setup: ({ modifyUserConfig }) => {
    modifyUserConfig(key, value); // key, value 分别为用户配置文件键值对
  },
});
```

### `registerTask`

添加自定义任务：

```ts
export default () => ({
  name: 'plugin-test',
  setup: ({ registerTask }) => {
    registerTask(name, config); // name: Task名, config: 对于任务配置同 onGetConfig 配置项
  },
});
```

### `getAllTask`

获取所有任务名称，内置主要任务名为 `web`：

```ts
export default () => ({
  name: 'plugin-test',
  setup: ({ getAllTask }) => {
    const tasks = getAllTask();
  },
});
```

### `generator`

支持生成或者修改模版，支持的 API 如下：

#### `addRenderTemplate`

添加模块生成目录：

```ts
export default () => ({
  name: 'plugin-test',
  setup: ({ generator }) => {
    generator.addRenderTemplate({
      template: '/path/to/template/dir',
      targetDir: 'router',
    }, {});
  },
});
```

#### `addRenderFile`

添加模块生成文件：

```ts
export default () => ({
  name: 'plugin-test',
  setup: ({ generator }) => {
    generator.addRenderFile('/path/to/file.ts.ejs', 'folder/file.ts', {});
  },
});
```

#### `addExport`

向 ice.js 里注册模块，实现 `import { request } from 'ice';` 的能力：

```ts
export default () => ({
  name: 'plugin-test',
  setup: ({ generator }) => {
    generator.addExport({
      source: './request/request',
      exportName: 'request',
    });
  },
});
```

#### `addExportTypes`

向 ice.js 里注册类型，实现 `import type { Request } from 'ice';` 的能力：

```ts
export default () => ({
  name: 'plugin-test',
  setup: ({ generator }) => {
    generator.addExportTypes({
      source: './request/types',
      specifier: '{ Request }'
      exportName: 'Request',
    });
  },
});
```

### `watch`

支持统一的 watch 服务

#### addEvent

添加 watch 事件：

```ts
export default () => ({
  name: 'plugin-test',
  setup: ({ watch }) => {
    watch.addEvent([
      /src\/global.(scss|less|css)/,
      (event: string, filePath: string) => {},
      'cssWatch',
    ]);
  },
});
```

#### removeEvent

移除 watch 事件：

```ts
export default () => ({
  name: 'plugin-test',
  setup: ({ watch }) => {
    watch.removeEvent('cssWatch');
  },
});
```

## 运行时能力定制

插件运行时可以定制框架的运行时能力：

```ts
import type { Plugin } from '@ice/types';
const plugin: Plugin = () => ({
  name: 'plugin-name'
  runtime: '/absolute/path/to/runtime',
});

export default plugin;
```

框架运行时指向的文件地址为一个 JS 模块，源码阶段推荐用 TS 进行开发：

```ts
import type { RuntimePlugin } from '@ice/types';

const runtime: RuntimePlugin = () => {};
export default runtime;
```

### `appContext`

appContext 上包含框架相关上下文配置信息，主要包括：

- `appConfig`：应用配置，详细内容可以参考 [应用入口](../basic/app)
- `assetsManifest`：应用资讯配置信息
- `routesData`：路由信息

```ts
const runtime = ({ appContext }) => {
  console.log(appContext);
}
export default runtime;
```

### `addProvider`

为应用统一添加 Provider：

```ts
export default ({ addProvider }) => {
  const StoreProvider = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  addProvider(StoreProvider);
};
```

### `addWrapper`

为所有路由组件做一层包裹：

```ts
import { useEffect } from 'react';

export default ({ addWrapper }) => {
  const PageWrapper = (PageComponent) => {
    const { title } = PageComponent.pageConfig || {};

    if (!title) {
      return PageComponent;
    }
    const TitleWrapperedComponent = () => {
      useEffect(() => {
        document.title = title;
      }, []);

      return <PageComponent />;
    };
    return TitleWrapperedComponent;
  };
  addWrapper(PageWrapper);

  // 如果希望同样为 layout 组件添加可以添加第二个参数
  addWrapper(PageWrapper, true);
};
```

#### setAppRouter

定制 Router 渲染方式

```ts
export default ({ setAppRouter }) => {
  // setAppRouter 入参为路由数组
  const renderRouter = (routes) => () => {
    return <div>route</div>;
  };
  setAppRouter(renderRouter);
};
```

### `setRender`

自定义渲染，默认使用 `react-dom` 进行渲染

```ts
import ReactDOM from 'react-dom';

export default ({ addDOMRender }) => {
  // App: React 组件
  // appMountNode: App 挂载点
  const DOMRender = ({ App, appMountNode }) => {
    ReactDOM.render(<App />, appMountNode);
  };
  addDOMRender(DOMRender);
};
```

### `useData`

获取页面组件的数据，一般配合 addWrapper 进行使用：

```ts
import { useEffect } from 'react';

export default ({ addWrapper, useData }) => {
  const PageWrapper = (PageComponent) => {
    const pageData = useData();
    return PageComponent;
  };
  addWrapper(PageWrapper);
};
```

### `useConfig`

获取页面组件的配置，一般配合 `addWrapper` 进行使用：

```ts
import { useEffect } from 'react';

export default ({ addWrapper, useConfig }) => {
  const PageWrapper = (PageComponent) => {
    const pageConfig = useConfig();
    return PageComponent;
  };
  addWrapper(PageWrapper);
};
```
