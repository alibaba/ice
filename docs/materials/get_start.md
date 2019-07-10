---
title: 快速开发物料
order: 1
---

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

根据提示，输入相关信息，选择物料模版，ice-devtools 默认内置了 React/Vue/Angular 三种物料模版，如果需要自定义物料模版，可参考[《自定义物料模版》](/docs/materials/template/custom.md)，在这里，我们选择 React 模版。

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

根据提示执行以下命令即可开始开发：

```bash
$ cd blocks/ProfileCard
$ npm install
$ npm start
```

新增组件和项目同理，其开发过程不再赘述，当我们完成所有物料开发之后，我们需要**先将各个组件、区块、项目发布到 npm 之后**，再生成物料数据，最后将这份数据托管即可使用。

- [物料数据生成](/docs/materials/guide/generate.md)
- [物料数据托管](/docs/materials/guide/sync.md)
- [使用物料](/docs/materials/guide/usage.md)