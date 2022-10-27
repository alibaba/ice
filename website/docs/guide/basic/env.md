---
title: 环境变量
order: 15
---

ICE 内置通过环境变量实现给构建或运行时传递参数的功能。

- 使用 `.env` 文件来配置环境变量
- 配置 `ICE_` 开头的环境变量则会同时暴露到运行时环境中

## 如何配置环境变量

### 命令行环境变量

例如需要修改 ICE 本地开发服务的端口号，可以在命令行中使用环境变量：

```shell
$ cross-env PORT=9999 npm start
```

> 示例中使用了 cross-env 来兼容不容操作系统的环境变量配置方式。

### 使用 `.env` 文件

ICE 内置了加载 `.env` 文件的支持，在该文件中设置的环境变量会被自动加载到 `process.env` 上。

`.env` 文件的示例：

```shell
DEV_PORT=3000
FOO=bar
```

如果有部分环境变量的配置在本地有差异，你可以配置在 `.env.local` 文件中去覆盖 `.env` 中的配置。如在之前的 `.env` 的基础上, 你想本地开发覆盖之前 3000 端口, 而使用 9999 端口，示例如下：

```shell
# The .env.local should not be committed.
DEV_PORT=9999
```

此外你也可以在 `.env.${mode}` 和 `.env.${mode}.local` 文件中指定不同模式下的环境变量。`${mode}` 的取值是 `development` 或 `production`。

需要注意的是：

1. 这几个文件的优先级由低至高分别是

- `.env`
- `.env.local`
- `.env.${mode}`
- `.env.${mode}.local`

2. 一般不建议将 `.local` 结尾的文件加入版本管理 (如 Git) 中。

## 使用环境变量

在 ICE 中，环境变量的使用场景分构建时与运行时两种类型。

特别注意：环境变量在使用时的类型都是 `string`，特别是设置为 `true` 或 `false` 时需要注意判断为字符串类型：

```js
// ICE_DISABLE_FOO=false
if (process.env.ICE_DISABLE_FOO === 'false') {
  // ...
}
```

### 构建时

默认情况下，所有设置的环境变量都会被注入到构建环境，你可以在 `ice.config.mts` 文件或其它构建插件中通过 `process.env` 变量访问。

```js
const port = process.env.PORT;
// ...
```

### 运行时

默认情况下环境变量是不能在运行时访问的，如若需要在浏览器环境中访问，可以在设置环境变量时增加前缀：`ICE_`，如：

```shell
# File .env
ICE_APP_ID=123456
```

在运行时代码中访问：

```js
import React from 'react';

export default function AppID() {
  return <h1>AppId is {process.env.ICE_APP_ID}.</h1>
}
```

## 内置的环境变量

ICE 会内置一些环境变量方便使用，通常由 `ICE_CORE_` 开头，如下：

### ICE_CORE_MODE

用于 ICE 的运行模式，可能是 `development` 或 `production`。

### ICE_CORE_ROUTER

用于标识框架是否启用路由，可能是 `true` 或 `false`。

### ICE_CORE_ERROR_BOUNDARY

用于标识框架是否启用错误边界，可能是 `true` 或 `false`。

### ICE_CORE_INITIAL_DATA

用于标识框架是否启用初始数据，可能是 `true` 或 `false`。

### ICE_CORE_DEV_PORT

用于标识 ICE 的开发服务器端口号。
