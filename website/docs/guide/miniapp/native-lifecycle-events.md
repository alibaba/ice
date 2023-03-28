---
title: 原生生命周期事件使用
order: 8
---

## 原生应用生命周期事件注册

你可以在 `src/app.tsx` 中使用 `defineMiniappConfig` 导出 `miniappLifecycles` 来进行原生应用的生命周期事件注册：

```js title=src/app.tsx
import { defineMiniappConfig } from '@ice/plugin-miniapp/runtime';

export const miniappLifecycles = defineMiniappConfig(() => {
  return {
    onLaunch(options) {
      console.log('on launch', options);
    },
    onShow(options) {
      console.log('on show', options);
    }
});
```

## 原生页面生命周期事件注册

1.在 pageConfig 中通过 `nativeEvents` 声明需要注册的生命周期事件。目前仅 onPageScroll/onShareAppMessage/onShareTimeline 三个会带来副作用的事件需要注册，其他事件可直接跳过该步骤。

```js title=src/pages/index.tsx
export function pageConfig() {
  return {
    title: 'Home',
    nativeEvents: [
      'onShareAppMessage',
    ],
  };
}
```

2.在组件中通过 `usePageLifecycle` hooks 监听事件：

:::caution
Web 应用中该方法不会生效。
:::

```js title=src/pages/index.tsx
import { usePageLifecycle } from 'ice';
export default function Home() {
  usePageLifecycle('onShareAppMessage', (options) => {
    console.log('[Second] onShareAppMessage', options);
    return {
      title: '123',
      path: 'pages/index',
    };
  });  return (
    <view>1</view>
  );
}
```
