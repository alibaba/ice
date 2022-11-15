---
title: 应用配置
order: 2
---

### 全局配置

开发者可在 `src/app.ts` 中通过导出 `miniappManifest` 对小程序的 `window`、`tabBar` 等字段进行配置：

```js title=src/app.ts
export const miniappManifest = {
  window: {
    defaultTitle: 'miniapp test'
  },
  routes: [
    'index',
    'about',
    'second/profile',
    'third/index',
    'third/test',
  ],
};
```

注意，路由请使用 `routes` 字段进行配置，参考[小程序-路由](./router)。

### 页面配置

小程序端不支持[配置页面运行时属性](../basic/page#获取页面初始数据) 中的 title/metas/links/scripts 等配置。但是，通过导出 `pageConfig` 能够声明该页面的小程序页面配置。以阿里小程序为例，[阿里小程序-页面配置](https://opendocs.alipay.com/mini/framework/page-json)的内容均可通过该方式声明：

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

## 待支持能力

- [ ] 配置小程序原生应用生命周期及事件
- [ ] 配置小程序原生页面生命周期及事件
- [ ] 配置原生小程序 project.config.json
- [ ] 与原生页面、组件、插件混用
- [ ] 分包加载
