---
title: 应用间通信
order: 3
---

## @ice/stark-data

核心两个 API：store (全局变量管理中心) 和 event（全局事件管理中心）。

### store

#### api

- get(key) **从 store 中获取变量**
- set(key, value) **设置/初始化 store 中的变量**
- on(key, callback, force) **注册变量监听事件，其中 force 为 bollean 类型，true 则表示初始化注册过程中，会强制执行一次**
- off(key, callback) **删除已经注册的变量监听事件**

#### 示例

1. 中英文切换，切换按钮在框架应用，监听事件在子应用
2. 登录信息前端互通，子应用确认框架应用登录后，前端不再重复发起登录请求相关逻辑；登录用户信息保存在框架应用中，子应用获取用户数据

```
// 框架应用
import { store } from '@ice/stark-data';

const userInfo = { name: 'Tom', age: 18 };
store.set('language', 'CH'); // 设置语言
store.set('user', userInfo); // 设置登录后当前用户信息

setTimeout(() => {
  store.set('language', 'EN');
}, 3000);

// 子应用
import { store } from '@ice/stark-data';

// 监听语言回调
function showLang(lang) {
  console.log(`current language is ${lang}`);
  if (!lang) {
    // 兜底逻辑
  } else if (lang === 'CH') {
    // 切换成中文回调
  }
  // ...
}

// store.on 支持第三个参数 force, bollean 类型，true 则表示初始化注册过程中，会强制执行一次
// 场景：如果框架应用的设置语言是异步操作，可能存在 set 在 on 之后执行，此时子应用内部可以做兜底逻辑
store.on('language', showLang, true);

// store.off('language', showLang); // 移除语言回调

// 获取当前用户
const userInfo = store.get('user');
```

### event

#### api

- on(key, callback) **注册回调函数，回调函数的入参通过 emit 注入，如 ...rest**
- off(key, callback) **删除已经注册的回调函数**
- emit(key, ...rest) **触发已经注册的函数，支持入参**

#### 示例

框架应用顶部有 ”消息“ 展示入口，子应用内有阅读消息的能力，阅读完消息后需要通知框架应用刷新“消息”展示信息

```js
// 框架应用
import { event } from '@ice/stark-data';

function fresh(needFresh) {
  if (!needFresh) return;

  fetch('/api/fresh/message').then(res => {
    // ...
  });
}

event.on('freshMessage', fresh);

// 子应用
import { event } from '@ice/stark-data';

event.emit('freshMessage', false);
// ...
event.emit('freshMessage', true);
```

## 其他方案
icestark 将应用进行了拆分（框架应用和子应用），正常情况下各个应用是独立的，应该尽量避免应用间通信，但如果有一些必须通信的场景可以参考本文档。

对于框架应用和子应用，运行时都共享了当前页面的 location、Cookie、LocalStorage、window 等全局信息，因此应用间的通信，可以通过这些方案很简单的实现。