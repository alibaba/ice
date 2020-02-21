---
title: 应用间通信
order: 6
---

通过 `@ice/stark-data` 这个包可以很简单的实现应用间通信，比如全局切换语言子应用响应的场景。`@ice/stark-data` 支持状态共享和事件监听响应两种方式。

## store

### API

- `get(key)` **从 store 中获取变量**
- `set(key, value)` **设置/初始化 store 中的变量**
- `on(key, callback, force)` **注册变量监听事件，其中 force 为 boolean 类型，true 则表示初始化注册过程中，会强制执行一次**
- `off(key, callback)` **删除已经注册的变量监听事件**

### 示例

使用场景：

1. 中英文切换，切换按钮在框架应用，监听事件在子应用
2. 获取全局的登录用户信息

在框架应用存储/设置信息：

```js
// 框架应用
import { store } from '@ice/stark-data';

const userInfo = { name: 'Tom', age: 18 };
store.set('language', 'CH'); // 设置语言
store.set('user', userInfo); // 设置登录后当前用户信息

setTimeout(() => {
  store.set('language', 'EN');
}, 3000);
```

在子应用中响应/获取数据：

```js
// 子应用
import { store } from '@ice/stark-data';

// 监听语言变化
store.on('language', (lang) => {
  console.log(`current language is ${lang}`);
}, true);

// 获取当前用户
const userInfo = store.get('user');
```

## event

### api

- `on(key, callback)` **注册回调函数，回调函数的入参通过 emit 注入，如 ...rest**
- `off(key, callback)` **删除已经注册的回调函数**
- `emit(key, ...rest)` **触发已经注册的函数，支持入参**

### 示例

框架应用顶部有**消息**展示入口，子应用内有阅读消息的能力，阅读完消息后需要通知框架应用刷新**消息**展示信息。

在框架应用中监听事件：

```js
// 框架应用
import { event } from '@ice/stark-data';

event.on('freshMessage', () => {
  // 重新获取消息数
});
```

在子应用中触发事件：

```js
// 子应用
import { event } from '@ice/stark-data';

event.emit('freshMessage');
```

## 其他

对于框架应用和子应用，运行时都共享了当前页面的 location、Cookie、LocalStorage、window 等全局信息，因此应用间的通信，也可以通过这些方案很简单的实现。