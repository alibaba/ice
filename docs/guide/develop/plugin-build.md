---
title: 通过插件定制工程能力
order: 2
---

插件工程能力通过 `src/index.ts` 定义，结构如下

```javascript
module.exports = ({ context, onGetWebpackConfig, log, onHook }, options) => {
  // 第一项参数为插件 API 提供的能力
  // options：插件自定义参数
};
```

该方法会接收两个参数，第一个参数是插件提供的 API 接口，推荐按照解构方式使用，第二个参数 `options` 是插件自定义的参数，由插件开发者决定提供哪些选项给用户配置。

## 插件 API

通过插件提供的 API，可以方便拓展和自定义能力。

### context

包含运行时的各种环境信息：

- `command` 当前运行命令，start/build/test
- `commandArgs` script 命令执行时接受到的参数
- `rootDir` 项目根目录
- `userConfig` 用户在 build.json 中配置的内容
- `pkg` 项目 package.json 中的内容

### onGetWebpackConfig

通过 `onGetWebpackConfig` 获取 webpack-chain 形式的配置，并对配置进行自定义修改：

```javascript
module.exports = ({onGetWebpackConfig, registerTask}) => {
  registerTask('default', webpackConfig);

  onGetWebpackConfig((config) => {
    config.entry('xxx');
  });
}
```

### onHook

通过 onHook 监听命令运行时事件，onHook 注册的函数执行完成后才会执行后续操作，可以用于在命令运行中途插入插件想做的操作：

```javascript
module.exports = ({ onHook }) => {
 onHook('before.build.load', () => {
   // do something before dev
 });
 onHook('after.build.compile', (stats) => {
   // do something after build
 });
}
```

目前支持的命令执行生命周期如下：

#### start 命令

| 生命周期 | 参数 | 调用时机 |
| --- | --- | --- |
| before.start.load | {<br />  args: array // 启动参数<br />} | 获取webpack配置之前 |
| before.start.run | - | webpack执行之前 |
| after.start.compile | {<br />  url: string // serverUrl，<br />  stats: WebpackAssets<br />} | 编译结束，每次重新编译都会执行 |
| before.start.devServer | {<br />  url: string // serverUrl，<br /> devServer:  WebpackDevServer<br />} | 中间件加载后，webpack dev server 启动前 |
| after.start.devServer | {<br />  url: string // serverUrl,<br />  devServer: WebpackDevServer,<br />  err: Error<br />} | webpack dev server 启动后 |

#### build 命令

| 生命周期 | 参数 | 调用时机 |
| --- | --- | --- |
| before.build.load | {<br />  args: array // 启动参数<br />} | 获取 webpack 配置之前 |
| before.build.run | - | webpack 构建执行之前 |
| after.build.compile | {<br />  err: Error,<br />  stats: WebpackAssets<br />} | 构建结束 |

#### test 命令

| 生命周期 | 参数 | 调用时机 |
| --- | --- | --- |
| before.test.load | {<br />  args: array // 启动参数<br />} | 获取 jest 配置之前 |
| before.test.run | - | jest 执行之前 |
| after.test | {<br />  result // jest执行结果<br />} | 测试命令执行结束 |

### log

统一的 log 工具，底层使用 `npmlog` ，便于生成统一格式的 log。

```js
log.info('start');
log.verbose('debug');
log.error('exit');
```

## 扩展 API

除了以上由 build-scripts 内置支持的 API，我们还通过 icejs 对插件 API 做了扩展，扩展的 API 需要通过以下方式调用：

```js
module.exports = ({ applyMethod }) => {
  // 第一个参数对应 API 名称，第二个参数对应 API 参数
  applyMethod('addIceExport', { source: `./config`, exportName });
}
```

目前扩展的 API 仅支持同步调用。

### addIceExport

向 `ice` 里注册模块，实现 `import { foo } from 'ice';` 的能力：

```js
// 实现 import { request } from 'ice'; request 由插件的 `./request/request` 文件实现
applyMethod('addIceExport', { source: './request/request', exportName: 'request' })
```

### removeIceExport

与 `addIceExport` 对应：

```js
this.applyMethod('removeIceExport', 'store');
```

### addPageExport

向 `ice/Home` 里注册模块，实现 `import { foo } from 'ice/Home'`，目前主要用于页面级状态管理的实现：

```js
this.applyMethod('addPageExport', 'Home', { source: './models', 'store' })
```

一般情况下需要循环向每个页面添加。

### removePageExport

与 `addPageExport` 对应

### getPages

获取 `src/pages` 下的一级页面列表：

```js
// ['Home', 'About']
const pages = this.applyMethod('getPages', this.rootDir);
```

### watchFileChange

监听 `src` 下的文件变化：

```js
applyMethod('watchFileChange', 'src/config.*', async (event: string) => {
  if (event === 'unlink' || event === 'add') {
    // do something
  }
});
```

### watchFileChange

监听 `src` 下的文件变化：

```js
applyMethod('watchFileChange', 'src/config.*', async (event: string) => {
  if (event === 'unlink' || event === 'add') {
    // do something
  }
});
```

## 插件参数

用户可以在 `build.json` 中指定插件参数：

```json
{
  "plugins": [
    ["build-plugin-foo", {
      "type": "bar"
    }]
  ]
}
```

那么在 build-plugin-foo 里就可以获取到这个参数：

```js
module.exports = ({ context, log }, options) => {
  const { type } = options;
  log.info(type); // => bar
}
```

## 插件通信

插件间需要进行通信的场景诉求：

1. 不同插件之间需要知道彼此的存在来确定是否执行相应的逻辑
2. 多个插件共有的配置信息可以抽出来，在某个插件中进行配置

使用 `setValue` 和 `getValue` 两个API来实现，分别用于数据的存取。

### setValue

类型：`(key: string | number, value: any) => void`，示例：

```javascript
// build-plugin-test
module.exports = ({ setValue }) => {
  setValue('key', 123);
}
```

### getValue

类型：`(key: string | number) => any`，示例：

```javascript
module.exports = ({getValue}) => {
  const value = getValue('key'); // 123
}
```

同时在 icejs 中也内置了几个变量：

```js
const projectType = getValue('PROJECT_TYPE'); // ts|js
const iceDirPath = getValue('ICE_TEMP');  // 对应 .ice 的路径
```
