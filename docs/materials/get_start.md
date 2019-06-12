---
title: 快速开发物料
order: 1
---

飞冰（ICE）提供了多种物料供用户选择，但在实际开发中，很多业务都需要建立自有的物料体系，如定制模版、业务组件等。因此，飞冰通过 ice-devtools 为开发者提供了便携的自定义物料开发链路。

## 什么是 ice-devtools

ice-devtools 是 ICE 物料开发和管理的工具，其本身不耦合任何前端框架或工程体系，这意味着基于 ice-devtools 可以开发 React/Vue/Angular 等各种前端体系的物料。ice-devtools 具有以下特性：

- 支持物料的初始化以及管理能力
- 支持不同前端框架或工程的物料开发
- 支持将物料托管到 fusion.desion 或 unpkg
- 支持业务自定义模板能力

## 创建物料仓库

全局安装 ice-devtools：

```bash
$ npm install ice-devtools -g

# 检查是否安装成功
$ idev -V
=> 2.3.1
```

安装完成后，可通过 `idev` 或 `ice-devtools` 命令使用。

创建一个空目录

```bash
$ mkdir custom-material && cd custom-material
```

初始化物料

```bash
$ idev init
```

此时，需要输入 npm scope（如果需要）、 materials name 和 description。之后选择物料模版，ice-devtools 默认内置了 React/Vue/Angular 三种物料模版，如果需要自定义物料模版，可参考《自定义物料模版》，在这里，我们选择 React 模版。

之后，ice-devtools 会自动生成 React 物料，并生成示例组件、区块和项目，根据提示执行对应命令即可启动。

![](https://img.alicdn.com/tfs/TB15H9LcEKF3KVjSZFEXXXExFXa-751-483.png)

根据提示，在项目根目录安装依赖后，即可进入开发。ice-devtools 初始化的目录结构如下所示，components、blocks、scaffolds 目录下分别存放组件、区块和项目的源码。ice-devtools 初始化时会自动生成示例物料，如果不需要可将其删除。

```
├── README.md
├── blocks
│      └── ExampleBlock
├── components
│      └── ExampleComponent
├── package.json
└── scaffolds
    └── ExampleScaffold
```

## 物料开发与发布

以区块开发为例，假设我们需要开发一个 ProfileCard 区块用于展示用户信息，我们在项目根目录执行命令：

```bash
$ idev add
```

选择 block，根据提示完成 block name 等设置后，在 blocks/ 目录下，将会生成 ProfileCard 目录及初始代码。

新增组件和项目同理，其开发过程不再赘述，当我们完成所有物料开发之后，我们需要**先将各个组件、区块、项目发布到 npm 之后，再执行物料数据托管命令。**

在 ProfileCard 目录下执行 `npm publish` 即可将 ProfileCard 组件发布到 npm，在执行这里命令的时候，你会发现终端会自动执行构建并生成一张截图，然后再执行发布。这是因为当使用物料时， iceworks 强依赖 screenshot 以提供物料预览能力（详情可查看[使用物料]()）。

其他物料的发布流程与此一致（组件无需截图），当所有物料都发布到 npm 之后，我们即可生成物料数据并将这份物料数据托管到平台上，这样，即可在 iceworks 中使用这份物料集。

## 生成物料数据及托管

生成物料数据比较简单，在 `custom-material` 根目录执行 `idev generate` 即可，ice-devtools 会遍历当前物料仓库下所有物料并生成一个 `materials.json` 文件存放到 `build/` 目录下。

`materials.json` 即物料数据，这份物料数据中维护了当前物料仓库下所有物料的基本信息。完成物料数据之后，需要将这份数据存放到某个平台上，当我们想在 iceworks 中使用物料时，iceworks 将会根据 URL 获取物料数据。

ice-devtools 支持使用以下两个平台存放物料数据，他们都是免费的：

- fusion.design（只支持 React 体系的物料）
- unpkg（支持所有物料体系）

可根据自己的需要选择适合的平台，具体可参考[物料数据托管]()。

这里，我们选择托管到 unpkg，在 `custom-material` 根目录执行以下命令：

```bash
$ idev sync-unpkg
```

当同步完成后，终端会输出以下内容提示物料数据的 URL 地址：

```
物料源同步成功!

https://unpkg.com/custom-material@latest/build/materials.json

如果初次使用，请拷贝上面的物料地址，到 iceworks 中开始私有物料配置

如果已经接入 iceworks，刷新物料面板即可查看更新后的物料

物料配置文档: https://alibaba.github.io/ice/docs/materials/devtools
```

## 使用物料

物料同步成功后我们可获得物料地址 `https://unpkg.com/custom-material@latest/build/materials.json`。

打开 iceworks，进入设置面板，添加自定义物料源，

![](https://img.alicdn.com/tfs/TB1zY1LcvWG3KVjSZPcXXbkbXXa-1740-1200.png)

添加完成后，点开 模版、区块或者组件，就可以看到我们自己的物料了。

![](https://img.alicdn.com/tfs/TB1JnSUcrus3KVjSZKbXXXqkFXa-1740-1200.png)
