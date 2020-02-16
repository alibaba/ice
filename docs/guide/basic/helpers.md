---
title: Helpers
order: 7
---

Helpers 用来提供一些实用的 utility 函数。它的作用在于我们可以将一些使用的工具默认内置在框架中，并挂载到 helpers 对象上，在应用的任何位置中我们都可以快速的访问到这些工具函数以及统一管理，避免逻辑分散各处和不必要的引用；同时也可以基于框架提供的插件机制机进行自定义工具函数的扩展。

## 使用

框架默认内置了 [cookie](https://www.npmjs.com/package/cookie) 和 [urlParse](https://www.npmjs.com/package/url-parse
) 两个工具函数：

```ts
import { helpers } from 'ice';

const { cookie, urlParse } = helpers;
```
