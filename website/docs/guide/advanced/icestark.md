---
title: 微前端
order: 0101
---

[icestark](https://micro-frontends.ice.work/) 是飞冰团队针对大型系统提供的微前端解决方案，我们提供了独立插件 `@ice/plugin-icestark` 帮助 ice.js 应用快速接入微前端解决方案。

## 初始化应用

### 框架应用

通过模板快速创建一个微前端的框架应用（主应用）：

```bash
$ npm init ice icestark-framework @icedesign/stark-layout
$ cd icestark-framework
$ npm install
$ npm start
```

### 微应用

通过模板快速创建一个微应用（子应用）：

```bash
$ npm init ice icestark-child @icedesign/stark-child
$ cd icestark-child
$ npm install
$ npm start
```

## 应用改造

如果不是通过模板创建，则需要按照下面的步骤进行改造：

### 安装插件

```bash
$ npm i --save-dev @ice/plugin-icestark
```

### 框架应用改造

在应用配置文件中添加插件：

```ts title="ice.config.mts"

import { defineConfig } from '@ice/app';
import icestark from '@ice/plugin-icestark';

export default defineConfig(() => ({
  plugins: [
    // 设置应用类型为框架应用 framework
    icestark({ type: 'framework' }),
  ],
}));
```

应用入口配置微应用相关信息：

```ts title="src/app.ts"
import { defineFrameworkConfig } from '@ice/plugin-icestark/types';
import FrameworkLayout from '@/components/FrameworkLayout';

export const icestark = defineFrameworkConfig(() => ({
  // 用于微应用全局的 Layout
  layout: FrameworkLayout,
  // 配置微应用信息，可为异步方法
  getApps: () => ([
    {
      path: '/seller',
      title: '商家平台',
      loadScriptMode: 'import',
      entry: 'https://iceworks.oss-cn-hangzhou.aliyuncs.com/icestark/child-seller-ice-vite/index.html',
    },
  ]),
  // icestark 提供的 AppRouter 组件的配置参数
  appRouter: {},
}));
```

### 微应用改造

在应用配置文件中添加插件：

```ts title="ice.config.mts"

import { defineConfig } from '@ice/app';
import icestark from '@ice/plugin-icestark';

export default defineConfig(() => ({
  plugins: [
    // 设置应用类型为微应用 child
    icestark({ type: 'child' }),
  ],
}));
```

但如果你的主应用是ice2，微应用是ice3，记得在ice3微应用的入口文件，通常是 app.tsx 文件中，调用 @ice/stark-app 中的 `setLibraryName` 方法，设置子应用模块的全局变量名称，通常是 package.json 中的 `name`。
```ts
import {setLibraryName} from '@ice/stark-app';

setLibraryName('microName');

// ...其他app.tsx的代码，如export mount, export unmount等等

```

应用入口可以配置相关生命周期执行行为（可选）：

```ts title="ice.config.mts"
import { defineChildConfig } from '@ice/plugin-icestark/types';

export const icestark = defineChildConfig(() => ({
  mount: () => {
    // 在微应用挂载前执行
  },
  unmount: () => {
    // 在微应用卸载后执行
  },
}));
```

## 附录

### 框架应用配置

#### getApp

- 类型：`Function`
- 默认值：() => []

用于获取微应用列表，单个微应用的完整配置字段请参考 [AppConfig](https://micro-frontends.ice.work/docs/api/ice-stark/#appconfig)。

### layout

- 类型：`Component`

框架应用对应的布局组件，必须渲染 `children` 用于渲染微前端相关应用结构：

```tsx
export default function FrameworkLayout({ children }) {
  return (
    <>
      <div>
        {/* 必须渲染 layout 用来渲染微前端的结构 */}
        {children}
      </div>
    </>
  );
}
```

完成 layout 的开发后，配置在入口 `src/app.ts` 中：


```ts title="src/app.ts"
import { defineFrameworkConfig } from '@ice/plugin-icestark/types';
import FrameworkLayout from '@/components/FrameworkLayout';

export const icestark = defineFrameworkConfig(() => ({
  layout: FrameworkLayout,
}));
```

### appRouter

可传入 icestark 运行时的钩子函数和可选配置。主要有：

- NotFoundComponent，匹配不到任何微应用路由时的状态。
- LoadingComponent，加载过程中的 Loading 状态。
- ErrorComponent，加载出现错误时的状态。

更多配置[详见文档](https://micro-frontends.ice.work/docs/api/ice-stark/#approuter)。

### 微应用配置

#### mount

- 类型：`Function`

在微应用挂载前，将执行该函数。

#### unmout

- 类型：`Function`

在微应用卸载后，将执行该函数。
