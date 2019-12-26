---
title: 插件 API
order: 2
---

插件可以方便扩展和自定义工程能力，这一切都基于 `build-scripts` 提供的插件 API。

## 常用 API

常用的插件 API 包括：`context`、`onGetWebpackConfig`、`onHook` 和 `log`。

### context

`context` 参数包含运行时的各种环境信息：

- `command` 当前运行命令 `start|build|test`
- `commandArgs` script 命令执行时接受到的参数
- `rootDir` 项目根目录
- `userConfig` 用户在 build.json 中配置的内容
- `pkg` 项目 package.json 中的内容

```js
module.exports = ({ context }) => {
  const { userConfig, command } = context;
  console.log('userConfig', userConfig);
  console.log('command', command);
}
```

### onGetWebpackConfig

通过 `onGetWebpackConfig` 获取 webpack-chain 形式的配置，并对配置进行自定义修改：

```js
// 场景一：修改所有 webpack 配置
module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    config.entry('src/index');
  });
}

// 场景二：多 webpack 任务情况下，修改指定任务配置
module.exports = ({onGetWebpackConfig, registerTask}) => {
  registerTask('web', webpackConfigWeb);
  registerTask('weex', webpackConfigWeex);
  
  onGetWebpackConfig('web'，(config) => {
    config.entry('src/index');
  });
  
  onGetWebpackConfig('weex'，(config) => {
    config.entry('src/app');
  });
}
```

### onHook

通过 onHook 监听命令运行时事件，onHook 注册的函数执行完成后才会执行后续操作，可以用于在命令运行中途插入插件想做的操作

```js
module.exports = ({ onHook }) => {
 onHook('before.start.load', () => {
   // do something before dev
 });
 onHook('after.build.compile', (stats) => {
   // do something after build
 });
}
```

目前监听的命令执行生命周期如下：

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

`build-scripts` 统一的 log 工具，底层使用 `npmlog` ，便于生成统一格式的 log。

```js
module.exports = ({ log }) => {
  log.verbose('verbose');
  log.info('info');
  log.error('error');
  log.warn('warn');
}
```

## 进阶 API

除了基础 API 之外，在插件开发过程中可以需要注册一些独立的 webpack 任务或者扩展基础配置，这便需要使用一些进阶 API。

### registerTask

注册多 webpack 任务，`build-plugin-ice-app` 上已完整支持 React 链路开发，大部分情况下在默认 webpack 任务上拓展即可，无需额外注册。

```js
// 注册的 config 必须是以 webpack-chain 形式组织
module.exports = ({ registerTask }) => {
  registerTask('web', webpackConfigWeb);
  registerTask('component', webpackConfigComponent);
}
```

### registerUserConfig

通过 `registerUserConfig` 注册 build.json 中的顶层配置字段，注册是可以进行用户字段校验，支持传入单个配置对象或者包含多个配置对象的数组。

方法生效的生命周期，在 `registerTask` 和 `onGetWebpackConfig` 之间。

配置对象字段如下：

- **name** (string)

字段名称，唯一标识，多个插件无法注册相同的字段<br />保留字段：plugins

- **validation**(string|function)

字段校验，支持string快速校验，string|boolean|number，也可以自定义函数，根据return值判断校验结果

- **configWebpack**(function) 

字段效果，具体作用到 webpack 配置上，接收参数：

  - config：webpack-chain 形式的配置
  - value: build.json 中的字段值
  - context：与外部 context 相同，新增字段 taskName 表现当前正在修改的task

```js
module.exports = ({ registerUserConfig }) => {
  registerUserConfig({
    name: 'entry',
    // validation: 'string',
    validation: (value) => {
      return typeof value === 'string'
    },
    configWebpack: (config, value, context) => {
      config.mode(value)
    },
  });
}
```

### modifyUserConfig

通过 `modifyUserConfig` 可以修改通过 `registerUserConfig` 注册的基础配置，在插件中快速复用基础配置的处理逻辑。

```js
module.exports = ({ modifyUserConfig }) => {
  modifyUserConfig((originConfig) => {
    // 通过函数返回批量修改
    return { ...originConfig, define: { target: 'xxxx'}};
  });
}
```

API 执行的生命周期：所有插件对于修改配置函数将保存至 `modifyConfigRegistration` 中，在 `runUserConfig` 执行前完成对当前 userConfig 内容的修改。

### registerCliOption

注册各命令上支持的 cli 参数，比如 npm start --https 来开启 https

```js
module.exports = ({ registerCliOption }) => {
  registerCliOption({
    name: 'https', // 注册的 cli 参数名称，
    commands: ['start'],  // 支持的命令，如果为空默认任何命令都将执行注册方法
    configWebpack: (config, value, context) => {
      // 对应命令链路上的需要执行的相关操作
    }
  })
}
```

注册函数执行周期，在 userConfig 相关注册函数执行之后。

## 插件通信

在一些业务场景下，插件间需要进行通信：

1. 不同插件之间需要知道彼此的存在来确定是否执行相应的逻辑
2. 多个插件共有的配置信息可以抽出来，在某个插件中进行配置
3. 上层插件的执行，需要依赖基础插件提供的方法

基于上述的诉求，API 层面提供 `setValue` 和 `getValue` 来用于数据的存取，`registerMethod` 和 `applyMethod` 来解决方法的复用。

### setValue

`(key: string | number, value: any) => void`

用来在context中注册变量，以供插件之间的通信。

```js
// build-plugin-test
module.exports = ({setValue}) => {
  setValue('key', 123);
}
```

### getValue

`(key: string | number) => any`

用来获取context中注册的变量。

```js
module.exports = ({getValue}) => {
  const value = getValue('key'); // 123
}
```

### registerMethod

向工程核心注册相关方法，方便其他插件进行复用。

```js
module.exports = ({ registerMethod }) => {
  // 注册方法
  registerMethod('pipeAppRouterBefore', (content) => {
    // 执行相关注册逻辑，可以返回相应的值
    return true;
  });
}
```

### applyMethod

调用其他插件的注册方法

```js
module.exports = ({ applyMethod }) => {
  // 使用其他差价注册方法的方式，如果插件未注册，将返回一个 error 类型的错误
  // 类似 new Error(`apply unkown method ${name}`)
  const result = applyMethod('pipeAppRouterBefore', '<Provide>xxx');
}
```
