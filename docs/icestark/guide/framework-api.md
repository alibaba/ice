---
title: 基于 API 初始化框架应用
order: 4
---

`icestark` 除了提供以 React 组件方式快速创建框架应用之外，同时也支持以 API 的方式在基于不同技术架构的应用中接入微前端方案

## 在框架应用中注册微应用

安装依赖：

```bash
$ npm i --save @ice/stark
```

通过 `regsiterMicroApps` 来注册微应用：

```jsx
import { regsiterMicroApps, start } from '@ice/stark';

regsiterMicroApps([
  {
    name: 'app1',
    activePath: ['/', '/message', '/about'],
    exact: true,
    title: '通用页面',
    container: document.getElementById('icestarkNode'),
    url: ['//unpkg.com/icestark-child-common/build/js/index.js'],
  },
  {
    name: 'app2',
    activePath: '/seller',
    title: '商家平台',
    container: document.getElementById('icestarkNode'),
    url: [
      '//unpkg.com/icestark-child-seller/build/js/index.js',
      '//unpkg.com/icestark-child-seller/build/css/index.css',
    ],
  },
]);

start();
```

微应用完成注册后，由 `start` 完成路由的监听，一旦浏览器的 url 发生变化，icestark 将根据微应用注册的激活规则挂载/卸载对应的微应用。

## 手动加载微应用

如果微应用并不耦合具体的路由，可以通过 icestark 提供的 createMicroApp 手动进行挂载

```js
import { createMicroApp } from '@ice/stark';

createMicroApp({
  name: 'app',
  url: [
    '//ice.alicdn.com/icestark/child-seller-react/index.js',
  ],
  container: document.getElementById('icestark-container'),
});
```

### 结合 React 使用场景

```js
import { createMicroApp, unmountMicroApp } from '@ice/stark';

const MicroApp = () => {
  const appContainer = useRef(null);
  useEffect(() => {
    createMicroApp({ name: 'app2', url: [], container: appContainer.current });
    return () => {
      unmountMicroApp('app2');
    }
  }, []);
  return <div ref={appContainer}></div>
};

export default MicroApp;
```
