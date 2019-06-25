---
title: Adapter 开发指南
order: 2
---

在上一章节中，我们对 **Adapter 是什么** 做了阐述，本篇文档主要介绍如何开发一个 Adapter 接入 iceworks 工作台。

## 目录结构

Adapter 主要包含 `modules` 和 `locales` 两个核心目录；其中 modules 是对功能模块的实现，locales 用于多语言包的配置，如果不需要配置多语言，则可不需要。

```
adapter
├─ modules/         ---- 模块实现
│  ├─ menu/
│  ├─ router/ 
│  ├─ task/ 
│  └─ index.ts
|
├─ locales/         ---- 多语言配置
│  ├─ en-US.json
│  └─ zh-CN.json
|
├─ package.json
└─ README.md
```

## 面板开发

面板开发指的是对 iceworks 工作台展示的 UI 面板进行定制，主要包括以下三部分：

### 面板 UI 配置

面板 UI 配置指的是在 iceworks 中 「项目管理」和「工程管理」的面板展示形式可被修改，被定制成根据 Adapter 的实现进行展示的一种机制。其核心实现是面板 UI 部分会提供对应的属性，通过在 Adapter 中配置属性进行面板的配置化展示。

### 隐藏面板

隐藏面板指的是在 iceworks 中「项目管理」和「工程管理」的面板展示可被隐藏，可以根据实际工程的最佳实践只展示某些需要的面板。其核心实现是 Adapter 开发中只实现需要展示的面板接口即可，未实现的接口则不会进行展示。

### 新增面板（暂不支持）

新增面板指的是在 iceworks 中「项目管理」和「工程管理」的面板展示上新增加一个面板，或者当面板 UI 定制提供的属性不能满足定制需求时，需要进行面板的开发。

## 接口实现

如果你需要实现的 Adapter 功能与 ICE 团队提供的 Adapter 功能大致相似，但是你希望定制面板 UI 或者想隐藏一些面板时，你可以希望你继承 ice adapter 进行开发。

* 功能逻辑实现

```ts
// adapter/modules/menu.ts
// Menu 实现
import * as iceAdapter from 'ice-adapter';

class MenuAdapter extends iceAdapter.Menu {
  getAll() {
    // 自定义逻辑实现
  }
}
```

* 面板 UI 配置

```ts
// adapter/modules/index.ts
import Menu from './menu';

const config = {
  menu: {
    // 面板标题
    title: '菜单管理',

    // 面板描述
    description: '展示项目中的所有菜单，支持对菜单的增删改。',

    // 面板封面
    cover: 'https://img.alicdn.com/tfs/TB1mZ.Xc8GE3KVjSZFhXXckaFXa-300-300.png',

    // 面板是否展示
    isAvailable: true,

    // 通过 props 字段控制前端 UI 面板的展示
    props: {},

    // 面板接口实现
    module: Menu, 
  },
}
```

## 命名规范

Adapter 命名规范遵循 「简单」、「语义化」、「易理解」原则即可，其本质上是一个 Npm 包的形式存在。

## Adapter 使用

通过对项目指定对应的 adapter 即可接入 iceworks 工作台进行使用，配置如下：

```
// 用户项目的 package.json
{
  "iceworks": {
    "adapter": "<your-adapter-name>",   
  }
}
```

## iceworks 加载 Adapter 实现原理

这里对 iceworks 加载 Adapter 逻辑进行简单阐述。

### 加载时机

当用户在 iceworks 「切换项目」、「导入项目」、「新建项目』时，iceworks 会根据项目的 `package.json` 中指定的 Adapter 进行动态安装并进行加载。

### 加载逻辑

当 iceworks 检测到项目变化时会发送请求到后端，并检查当前 adapter 是否已经安装过：

* 如果已经安装过的 adapter 则会写入到 用户系统 .iceworks 的配文件中进行缓存，以此保证不必要的安装流程。

* 如果检查当前 adapter 没有安装，则需要动态执行安装 adapter 的操作，当安装完成时，并重新执行 loadAdapter 方法进行初始化。在安装过程中前端 UI 需要给出对应的提示，告知用户「由于当前项目依赖的 Adapter 发生改变，正在重新加载」 之类的提示。

![加载逻辑](https://img.alicdn.com/tfs/TB1Dn_NaMFY.1VjSZFqXXadbXXa-2246-1464.png)


### 其他

* 运行环境：Adapter 在 iceworks 运行环境中执行，因此会作为 iceworks 的依赖进行安装。
* 版本策略：iceworks 会检测当前项目版本的 Adapter 和缓存中的 Adapter 版本进行对比，如果有版本变化，则会给出安装提示。

[详见 Adapter 相关讨论](https://github.com/alibaba/ice/issues/2249)


