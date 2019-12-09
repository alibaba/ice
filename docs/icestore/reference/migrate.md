---
title: 版本升级
order: 2
---

icestore 目前共发布了 4 个大版本，为便于演示不同版本之间的差异，首先我们假定某个项目的目录结构如下：

```bash
├── src/
│   ├── pages/
│   │   └── Home
│   │        └── index.jsx
│   ├── stores/
│   │   ├── foo.js
│   │   └── index.js
```

对于 foo.js 这个 store 的定义如下：

```javascript
// foo.js
export default {
  a: 1,
  b: 2,
  updateA(value) {
    this.a = value;
    return value;
  }
};
```

## 0.1.x
 
* useStore 返回 state 的拷贝值，防止用户在 action 之外直接修改 state
* 通过每个 action 的执行值拿到更新后的 state

```javascript
// home/index.jsx

const fooStore = stores.useStore('foo');

useEffect(() => {
  const value = fooStore.updateA(3);
  console.log(value); // 打印出 { a: 3, b: 2 }，而不是 3
  console.log(fooStore.a); // 打印出 a 的值仍然是未更新前的 1
});
```

该方式对于函数返回值的处理有以下两个缺点，有点不符合用户对于返回值的理解：  

1. 会覆盖掉用户定义 action 中的返回值
2. 当 action 无返回值时也能通过 action 执行结果拿到 state 的全部值

## 0.2.x

* useStore 直接返回 state 的引用，同时框架内部通过给 state 对象递归包裹 Proxy 的方式来监听 state 的修改，用户在 action 外部修改 state 时 throw error
* 在 action 执行后可以直接从 useStore 的引用中获取最新 state 值

```javascript
// home/index.jsx

const fooStore = stores.useStore('foo');

useEffect(() => {
  fooStore.updateA(3);
  console.log(fooStore.a); // 打印出更新后的值 3
});
```

该方式的缺点是：

1. useStore 的返回值不是普通对象，通过 console 打印出来是一个 Proxy 对象不利于调试
2. 由于第 1 点存在，如果直接将 Proxy 化的 state 传入一个复杂组件，复杂组件内部可能会直接修改这个对象，导致 throw error
3. IE 所有版本均不支持 Proxy，且 Proxy 无法被完全 polyfill，导致 icestore 的浏览器兼容性不佳 

## 0.3.x

* useStore 返回 state 的拷贝值，防止用户在 action 之外直接修改 state
* 能直接拿到 action 执行后的返回值
* store 实例上提供 getState API，用于获取最新的 state 值

```javascript
// home/index.jsx

const fooStore = stores.useStore('foo');

useEffect(() => {
  const value = fooStore.updateA(3);
  console.log(value); // 打印出 3
  const state = stores.getState('foo');
  console.log(state); // 打印出最新的 state 值 { a: 3, b: 2 }
});
```

## 0.4.x

* 提供了对 Typescript 的支持，新增 registerStores API，一次性注册多个 Store
* 由于 Typescript 支持的需要，useStore/useStores/getState API 通过 registerStores 返回值来取，同时 useStores 的返回值从数组变成对象
* 考虑到向下兼容，原 icestore 实例上的 useStore/useStores/getState 这几个 API 设为 deprecated，在下个版本中将删除

```
// stores/index.ts

const stores = icestore.registerStores({todos});
export default stores;

// home/index.tsx
import stores from './stores';
const {todos} = stores.useStores(['todos']);
```

## 升级指南

由于上面所述的非兼容性变更，请按以下方式升级到最新版本：

### 0.1.x -> 0.3.x

检查代码中是否存在 action 执行后直接从 action 拿 state 的情况，如有替换成通过 getState API 拿 state 的方式。

```javascript
// 变更前
const state = fooStore.updateA(3); // 通过 action 返回值拿最新的 state 值

// 变更后
fooStore.updateA(3);
const state = stores.getState('foo'); // 通过 getState API 拿最新的 state 值
```

### 0.2.x -> 0.3.x

检查代码中是否存在 action 执行后通过 useStore 引用拿 state 最新值的情况，如有替换成给 action 加返回值或者通过 getState API 拿 state 的方式。

```javascript
// 变更前
fooStore.updateA(3);
const newA = fooStore.a; // 获取更新后的 a 值

// 变更后
const newA = fooStore.updateA(3); // 通过 action 返回值拿最新的 a 值
const { a } = stores.getState('foo'); // 通过 getState API 拿最新的 a 值

```

### 0.3.x -> 0.4.x

可平滑升级，代码不需要改动，但是为了 Typescript 编程体验与未来版本考虑，建议使用新的 registerStores API 来注册与 useStore，升级方式如下：

1. 使用 registerStores 来替代原来的 registerStore API 注册 store，同时将 registerStores 的返回值 export 出去而不是 export icestore 实例

```javascript
// 变更前
// stores/index.ts
icestore.registerStore('todos', todos);
icestore.registerStore('foo', foo);
export default icestore;

// 变更后
// stores/index.ts

const stores = icestore.registerStores({
  todos,
  foo,
});
export default stores;
```

2. 检查是否使用到 useStores API，如果有用到，将返回值从数组改成对象

```javascript
// 变更前
// home/index.tsx
import stores from './stores';

const [todos, foo] = stores.useStores();

// 变更后
// home/index.tsx
import stores from './stores';

const {todos, foo} = stores.useStores();
```
