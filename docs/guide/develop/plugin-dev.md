---
title: 插件开发指南
order: 1
---

icejs 基于工程构建工具 build-scripts 封装，因此在插件能力上也完整继承了 build-scripts。除了通过插件定制工程能力以外，icejs 还为插件扩展了运行时定制的能力，这让插件拥有更多的想象空间。

插件机制是 icejs 的核心之一，当前 icejs 的基础能力都是通过插件来实现。插件机制不但可以保证框架核心足够精简和稳定，还可以通过插件对运行时和编译时的能力进行封装复用，最终打造一个完整的生态。

## 快速开始

使用 [CLI](/docs/guide/start#使用%20CLI) 初始化项目。选择插件模板：

```shell
$ npm init ice <your-plugin-name>
```

## 插件目录

通常情况下，插件通过 npm 包的形式分发，插件初始化目录如下：

```md
.
├── src
│   ├── index.[t,j]s    # 插件工程入口
│   └── runtime.[t,j]s  # 插件编译时入口
├── tests               # 测试文件目录
├── package.json        # npm 包配置
├── tsconfig.json       # typescript 配置文件
└── README.md           # 说明文档
```

这里以 ts 为例，实际上也可以通过 js 编写插件。 ts 最终应编译为 js 以发布 npm 包。插件核心有两个文件：

1. `index.ts`：通常用于做一些工程相关的事情，比如更改 webpack 配置、构建结束后执行一些其他任务等。需保证该文件作为 npm 包入口。
2. `runtime.ts`：实现一些运行时能力，比如 config/request 插件。注意: 旧版本的`module.ts`暂时兼容，但在未来不受支持。需保证该文件与 `index.ts` 位于同一目录下。

下面也会按照这两个纬度来分别介绍。

## 工程能力定制

工程能力以 `index.ts` 为入口，在执行 start/build 时 icejs 会加载并执行每个插件的 `index.js`。

关于 `index.ts` 应该如何书写请参考下一个章节的文档 [通过插件定制工程能力](/docs/guide/develop/plugin-build.md)。

## 运行时能力定制

运行时能力以 `runtime.ts` 为入口，通过浏览器打开页面时会执行 `src/app.ts` 中的 `createApp()` 方法，这个方法会加载并执行所有插件的 `runtime.ts`。

关于 `runtime.ts` 应该如何书写请参考下一个章节的文档 [通过插件定制运行时能力](/docs/guide/develop/plugin-runtime.md)。

## 单元测试

使用 [Jest](https://github.com/facebook/jest) 进行单元测试。

示例: https://github.com/alibaba/ice/tree/master/packages/plugin-request/__tests__

### 插件开发示例

以 [`plugin-logger`](https://github.com/alibaba/ice/tree/master/packages/plugin-logger) 为例。该插件采用 typescript 编写，对工程能力及运行时能力均进行了修改。为框架提供了日志功能。

目录结构：

```json
.
├── README.md
├── logger
│   └── index.ts     // logger 功能实现
├── package.json
├── src
│   ├── _logger.ts    // 运行时
│   ├── index.ts      // 工程能力实现
│   ├── runtime.ts    // 运行时能力实现
│   └── types
│       └── index.ts  // 类型声明文件
└── tsconfig.json
```

1. 类型声明及挂载到 appConfig

   类型声明：

   ```typescript
   // src/types/index
   export interface ILogger {
     level: string;
   };
   ```

   挂载至 appConfig

   ```typescript
   // src/index.ts
   import * as path from 'path';
   import * as fse from 'fs-extra';
   import { IPlugin } from '@alib/build-scripts';
   
   const plugin: IPlugin = async ({ getValue, applyMethod }): Promise<void> => {
     const exportName = 'logger';
     const distPath = path.join(getValue('ICE_TEMP'), exportName);
     await fse.copy(path.join(__dirname, './types'), path.join(distPath, 'types')); // 复制类型声明文件
   
     // 挂载至 appConfig。 appConfig 对应类型为 IAppConfig
     // source 为复制后的目录, specifier 为类型标识符，exportName 为 appConfig 类型名
     // 得到以下结果
     // import { ILogger } from './logger/types'
     // export interface IAppConfig {
     //   logger?: ILogger;
     // }
     applyMethod('addIceAppConfigTypes', { source: `./${exportName}/types`, specifier: '{ ILogger }', exportName: `${exportName}?: ILogger` });
   };
   ```

2. 工程化能力实现

   logger 功能实现
   
   ```typescript
   // src/logger/index.ts
   import * as logger from 'loglevel';
   
   export default logger;
   ```
   
   导出至 ice
   
   ```typescript
   // src/index.ts
   import * as path from 'path';
   import * as fse from 'fs-extra';
   import { IPlugin } from '@alib/build-scripts';
   
   const plugin: IPlugin = async ({ getValue, applyMethod, onGetWebpackConfig }): Promise<void> => {
     const exportName = 'logger';
     const distPath = path.join(getValue('ICE_TEMP'), exportName);
     await fse.copy(path.join(__dirname, `../${exportName}`), distPath);
     // 导出 logger 功能
     // 用户可通过 import { logger } from 'ice'; 使用
     applyMethod('addIceExport', { source: `./${exportName}`, exportName });
   
     onGetWebpackConfig((config) => {
       // 为 logger 添加 webpack alias，供运行时能力调用
       config.resolve.alias.set('$ice/logger', distPath);
     });
   };
   ```

3. 运行时能力实现

   ```typescript
   import logger from '$ice/logger'; // $ice/logger 通过工程化能力设置 alias
   
   const module = ({ appConfig }) => {
     // 设置运行时 logger 等级
     if (appConfig.logger && appConfig.logger.level) {
       logger.setLevel(appConfig.logger.level);
     }
   };
   
   export default module;
   ```

## 示例插件

官方插件代码：https://github.com/alibaba/ice/tree/master/packages
