---
title: 主应用开发与接入
order: 3
---

`@ice/stark` 2.0.0 开始推荐使用 API `registerMicroApps` 的方式注册子应用，该方式不再限制主应用所使用的框架，因此主应用可以使用 React/Vue/... 等不同框架编写。

## 管理与注册子应用

### 基础示例

安装依赖：

```bash
$ npm i --save @ice/stark
```

通过 `registerMicroApps` 来注册微应用：

```js
import { registerMicroApps, start } from '@ice/stark';

registerMicroApps([
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

### 示例：React 场景

TODO

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

### 示例：Vue 场景

TODO

## 常见问题

TODO
