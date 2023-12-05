---
title: 页面
order: 4.1
---

每一张页面，都可以由 `路由组件` 和 `零或多个布局组件` 组装而成。路由组件和布局组件的开发规范基本一致，可以包含以下内容：

- 默认导出是组件的具体实现，必选。
- 导出 `dataLoader`，约定页面的数据请求，可选。
- 导出 `pageConfig`，约定页面的 `Title`、`Meta` 等信息，可选。

## 组件

对应路由组件或布局组件在页面中需要渲染的内容。

```tsx title="src/pages/index.tsx"
import { useData } from 'ice';

export default function Home() {
  const data = useData();
  return (
    <>
      <div>Hello ICE</div>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}
```

## 获取页面初始数据

详见[数据加载](./data-loader.md)。

## 配置页面运行时属性

页面主体内容之外的、其他需要通用 HTML 模板上差异化显示的内容，可以通过导出 `pageConfig` 来声明。

支持的页面级配置包含：

### title

标题会显示在文档上，可以通过 `title` 属性来设置。 示例：

```tsx
import { definePageConfig } from 'ice';

export const pageConfig = definePageConfig(() => ({
  title: 'Home',
}));
```

### metas

Meta 信息会显示在文档上，可以通过 `metas` 属性来设置。 示例：

```tsx
import { definePageConfig } from 'ice';

export const pageConfig = definePageConfig(() => ({
  meta: [
    { charset: 'utf-8' },
    {
      name: 'title',
      value: 'Something cool',
    },
    {
      name: 'description',
      value: 'This becomes the nice preview on search results.',
    },
  ],
}));
```

### links

页面级需要额外插入的 `<link />` 标签，会被插入 `<head>` 标签内，先于页面自身的 Bundle 加载，是阻塞型的。

> 框架提供了这个能力，但不推荐使用，除非确有需要前置加载。

```tsx
import { definePageConfig } from 'ice';

export const pageConfig = definePageConfig(() => ({
  links: [
    {
      rel: 'icon',
      href: '/favicon.png',
      type: 'image/png',
    },
    {
      rel: 'stylesheet',
      href: 'https://example.com/some/styles.css',
    },
  ]
}));
```

推荐，在页面组件内延迟加载，以达到更好的性能体验。

```tsx
// src/pages/index.tsx
export default function Home() {
  return (
    <>
      <div>Hello ICE</div>
      <link rel="stylesheet" href="https://example.com/some/styles.css" />
    </>
  );
}
```

### scripts

页面级需要前置加载的脚本资源，会被插入在主 Bundle 前，但是会阻塞渲染。通常用于加载全局 JS SDK 或 Polyfill。

```tsx

import { definePageConfig } from 'ice';

export const pageConfig = definePageConfig(() => ({
  scripts: [
    {
      src: 'https://example.com/some/index.js',
    },
  ],
}));
```

推荐在页面组件内按需异步加载，以达到更好的性能体验。

### 小程序页面配置

小程序端不支持上述 title/metas/links/scripts 等配置。但是，通过导出 `pageConfig` 能够声明该页面的小程序页面配置。以阿里小程序为例，[阿里小程序-页面配置](https://opendocs.alipay.com/mini/framework/page-json)的内容均可通过该方式声明：

```jsx title=src/pages/index.tsx
import { definePageConfig } from 'ice';

export const pageConfig = definePageConfig(() => ({
  "defaultTitle": "",
  "allowsBounceVertical": "NO",
  "transparentTitle": "auto",
  "titleBarColor": "#262833",
  "optionMenu": {
    "icon": "https://img.alicdn.com/tps/i3/T1OjaVFl4dXXa.JOZB-114-114.png"
  },
  "titlePenetrate": "YES",
  "barButtonTheme": "light"
}));
```
