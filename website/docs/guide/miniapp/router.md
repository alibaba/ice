---
title: 路由
order: 3
---

小程序端路由相关概念基本与[指南-路由](../basic/router)章节保持一致（不支持[布局组件](../basic/router#布局组件)、[动态路由](../basic/router#动态路由)），以下仅列出小程序端路由的注意点。

## 路由规则

[指南-路由](../basic/router)章节提到，ice.js 采用约定式路由。但是对于小程序来说，使用约定式路由会带来无法确定首页的问题（在原生小程序中，`app.json` 中 `pages` 数组的第一项即被指定为首页）。因此 ice.js 开发小程序时，用户需要在 src/app.tsx 中通过导出 `miniappManifest` 进行路由的指定，示例如下：

```
export const miniappManifest = {
  routes: [
    'index',
    'about',
    'repo/index',
    'repo/preview',
  ],
};
```

注意，`routes` 中的每一项应该与文件在 `pages` 目录下的实际路径保持一致，且其第一项将作为小程序的首页被加载。

## 路由跳转

### Link 组件

ice.js 小程序通过 Link 组件（底层即小程序原生 navigator 组件），来提供路由间的跳转能力。其接受的 `to` 参数与 Web 端约定式路由产生的 `url` 保持一致。

```tsx title="src/pages/index.tsx"
import { Link } from 'ice';

export default function Home() {
  return (
    <>
      <div>Hello ICE</div>
      <Link to="/about">about ice</Link>
    </>
  );
}
```

### API 形式

1. 通过 ice.js 提供的 [history](../basic/api) 能力，你可以实现小程序端的路由跳转：

```ts
import { history } from 'ice';

export function historyPush (link: string) {
  history.push(link);
}
```

:::caution

在应用入口 `src/app.ts` 导入使用时，由于 history 还未完成初始化创建，不能以立即执行的方式使用。推荐以上述方式封装后在必要的时候进行调用。
:::

2. 小程序原生的路由相关 API 也可以正常使用。以阿里小程序为例：

```js
my.navigateTo({ url: '/pages/repo/index' });
```

注意，`url` 参数必须与页面实际路径保持一致。

## 路由参数获取

对应小程序原生页面 `onLoad` 方法的参数，可以使用 `useSearchParams` 获取：

```jsx
import { useParams } from 'ice';

// 路由规则  /home?uid=1234
export default function Home() {
  const [searchParams] = useSearchParams();
  // searchParams 输出内容为 { uid: '1234'}
  
  return (
    <>
      <h2>Home Page</h2>
    </>
  );
}
```
