---
title: 中间件
order: 5
---

## 背景

如果你有使用过服务端的框架如 Express 或者 koa，应该已经熟悉了中间件的概念，在这些框架中，中间件用于在框架 `接收请求` 与 `产生响应` 间插入自定义逻辑，这类中间件的功能包含在请求未被响应之前对数据进行加工、鉴权，以及在请求被响应之后添加响应头、打印 log 等功能。

在状态管理领域，Redux 同样实现了中间件的机制，用于在 `action 调用` 与 `到达 reducer` 之间插入自定义逻辑，中间件包含的功能有打印 log、提供 thunk 与 promise 异步机制、日志上报等。

icestore 支持中间件的目的与 Redux 类似，也是为了在 action 调用前后增加一种扩展机制，增加诸如打印 log、埋点上报、异步请求封装等一系列能力，不同的是 icestore 已支持异步机制，因此不需要额外通过中间件方式支持。

## 中间件 API

在中间件 API 的设计上，icestore 借鉴了 koa 的 API，见如下：

```javascript
async (ctx, next) =>  {
  // action 调用前逻辑

  const result = await next();

  // action 调用后逻辑

  return result;
}
```

如果用户定义的 action 中有返回值，中间件函数必须将下一个中间件的执行结果返回，以保证中间件链式调用完成后能拿到 action 的返回值。

### ctx API

对于中间件函数的第一个 ctx 参数，从上面能拿到当前的 store 与当前调用 action 的信息，ctx 对象中包含的详细参数如下：

* ctx.action - 当前调用的 action 对象
  * 类型：{object}
  * 默认值：无
* ctx.action.name - 当前调用的 action 方法名
  * 类型：{string}
  * 默认值：无
* ctx.action.arguments - 当前调用的 action 方法参数数组
  * 类型：{array}
  * 默认值：无
* ctx.store - 当前 store 对象
  * 类型：{object}
  * 默认值：无
* ctx.store.namespace - 当前 store 的 namespace
  * 类型：{string}
  * 默认值：无
* ctx.store.getState - 获取当前 store 最新 state 的方法
  * 类型：{function}
  * 参数：无

调用方式如下：

```javascript
const {
  action, // 当前调用的 action 对象
  store, // 当前 store 对象
} = ctx;

const {
  name, // 当前调用的 action 方法名
  arguments, // 当前调用的 action 方法参数数组
} = action;

const { 
  namespace,  // 当前 store namespace
  getState, // 获取当前 store state 方法
} = store;
```

### 注册方式

由于 icestore 的多 store 设计，支持给不同的 store 单独注册 middleware，方式如下：

1. 全局注册 middleware  
  *  全局注册的 middleware 对所有 store 生效

	```javascript
	import Icestore from '@ice/store';
	const stores = new Icestore();
	stores.applyMiddleware([a, b]);
	```

2. 指定 store 注册 middleware  
  * store 上最终注册的 middleware 将与全局注册 middleware 做合并

	```javascript
	stores.applyMiddleware([a, b]); 
	stores.applyMiddleware([c, d], 'foo'); // store foo 中间件为 [a, b, c, d]
	stores.applyMiddleware([d, c], 'bar'); // store bar 中间件为 [a, b, d, c]
	```
