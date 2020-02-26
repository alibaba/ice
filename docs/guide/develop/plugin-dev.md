---
title: 插件开发指南
order: 1
---

icejs 基于工程构建工具 build-scripts 封装，因此在插件能力上也完整继承了 build-scrtips。除了通过插件定制工程能力以外，icejs 还为插件扩展了运行时定制的能力，这让插件拥有更多的想象空间。

插件机制是 icejs 的核心之一，当前 icejs 的基础能力都是通过插件来实现。插件机制不但可以保证框架核心足够精简和稳定，还可以通过插件对运行时和编译时的能力进行封装复用，最终打造一个完整的生态。

## 插件目录

通常情况下，插件通过 npm 包的形式分发，插件初始化目录如下：

```md
.
├── src
│   ├── index.[t,j]s    # 插件工程入口
│   └── module.[t,j]s   # 插件编译时入口
├── lib/               # 编译目录
├── package.json
├── README.md
└── tsconfig.json
```

这里以 ts 为例，实际上也可以通过 js 编写插件。插件核心有两个文件：

1. `index.ts`：通常用于做一些工程相关的事情，比如更改 webpack 配置、构建结束后执行一些其他任务等
2. `module.ts`：实现一些运行时能力，比如 config/request 插件

下面也会按照这两个纬度来分别介绍。

## 工程能力定制

工程能力以 `index.ts` 为入口，在执行 start/build 时 icejs 会加载并执行每个插件的 `index.js`。

关于 `index.ts` 应该如何书写请参考下一个章节的文档 [通过插件定制工程能力](/docs/guide/develop/plugin-build.md)。

## 运行时能力定制

运行时能力以 `module.ts` 为入口，通过浏览器打开页面时会执行 `src/app.ts` 中的 `createApp()` 方法，这个方法会加载并执行所有插件的 `module.ts`。

关于 `module.ts` 应该如何书写请参考下一个章节的文档 [通过插件定制运行时能力](/docs/guide/develop/plugin-runtime.md)。

## 示例插件

官方插件代码：https://github.com/ice-lab/icejs/tree/master/packages
