# @ice/runtime

runtime dependencies for ice plugin

## compile

该包是一个包集合，因此推荐的使用方式如下：

```js
import { axios } from '@ice/runtime/axios';
```

大致的思路:

1. 使用 `exports` 语法（由于此包由 webpack5 加载，不存在兼容性问题）

```json
"exports": {
  ".": "./lib/index.js",
  "./axios": "./lib/axios.js",
  "./axiosUtils": "./lib/axiosUtils.js",
  "./createAppShared": "./lib/createAppShared.js",
  "./history": "./lib/history.js",
  "./iceStore": "./lib/iceStore.js",
  "./loadable": "./lib/loadable.js",
  "./pathToRegexp": "./lib/pathToRegexp.js",
  "./queryString": "./lib/queryString.js",
  "./reactAppRenderer": "./lib/reactAppRenderer.js",
  "./useRequest": "./lib/useRequest.js"
}
```

但是 [类型问题暂时不好解决](https://www.typescriptlang.org/docs/handbook/esm-node.html)。

2. 所以目前的办法是把所有文件打包至与 package.json 同级的目录，则可以使用上面的用法，类型也没有问题


## reslove

对于存在多实例会有错误的 Package，比如场景：运行时 runtime 依赖 `reactRouterDOM` 安装在 `@ice/runtime` 下，若用户需要自定义 `reactRouterDOM` 的版本，则需要 reslove 到用户安装的版本。
