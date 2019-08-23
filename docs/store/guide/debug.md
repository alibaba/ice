---
title: 如何调试
order: 4
---

基于 icestore 的中间件机制，官方提供了 logger 能力，可以方便地跟踪触发 action 名以及 action 触发前后 state 的 diff 信息，提升调试效率。

## 安装

```bash
npm install @ice/store-logger --save
```

## 使用方式

在注册 store 之前，使用 `applyMiddleware` 方法将 logger 中间件加入到中间件队列中。

```javascript
import todos from './todos';
import Icestore from '@ice/store';
import logger from '@ice/store-logger';

const icestore = new Icestore();

const middlewares = [];

// 线上环境不开启调试中间件
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

icestore.applyMiddleware(middlewares);
icestore.registerStore('todos', todos);
```

注册成功后，当 `store` 中的 action 被调用时，在浏览器的 DevTools 中将能看到实时的日志：

<img src="https://user-images.githubusercontent.com/5419233/63344463-13184300-c383-11e9-96da-2de3b41f6e9b.png"  width="250" />

日志中包含以下几个部分：

* Store Name: 当前子 store 对应的 namespace
* Action Name: 当前触发的 action 名
* Added / Deleted / Updated: state 变化的 diff
* Old state: 更新前的 state
* New state: 更新后的 state

