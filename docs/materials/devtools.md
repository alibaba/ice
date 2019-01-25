---
title: 使用 ice-devtools
order: 2
category: 物料
---

## 物料简介

在飞冰中，组件、区块、布局、页面、模板统称为物料，由飞冰团队维护，基于这些物料结合 Iceworks 可以快速搭建中后台应用。

在实际项目中，官方提供的物料源和设计风格可能不满足某些业务场景， 也可能你想基于已有的业务进行沉淀，形成一套自己团队风格的物料源，基于此我们提供了一套完整的开发规范和开发者工具 ice-devtools 来支持自定义物料源的能力，工具在设计层面是去中心化的方案，可以支持自定义接入 react 、vue 、angular 等不同框架物料，只需满足一定的约定和规范即可。

## 名词解释

- 物料：指组件、区块、布局、页面、模板的统称
- 物料源：物料接入 Iceworks 的 URL 地址 ，本质上是一份 JSON 数据，如飞冰官方物料源 [https://ice.alicdn.com/assets/react-materials.json](https://ice.alicdn.com/assets/react-materials.json)

## 开发者工具

#### 环境准备

- 操作系统：支持 macOS，Windows
- 运行环境：建议选择  [LTS 版本](http://nodejs.org/)，最低要求 8.x。

#### 安装工具

```bash
// 安装
$ npm install ice-devtools -g

// 检查是否安装成功
$ ice-devtools -V
=> 2.0.0
```

## 快速开始

### 初始化项目

开始自定义物料之前，需要先使用 ice-devtools 初始化一个约定的物料项目，可以把它理解为在日常开始做项目之前，需要先约定好项目目录结构和开发规范，这里开发物料也是同样的原则。

```bash
// 新建物料项目
$ mkdir my-materilas & cd my-materilas

// 初始化物料项目
$ ice-devtools init

// 项目名称
? materials name：

// 选择初始的物料模板
? materials template： (Use arrow keys)
❯ @icedesign/ice-react-materials-template (React 标准模板)

// 版本
? materials version：

// 描述
? materials description：
```

> 注释：初始化的物料库内置了一个区块和模板，默认是已经发到 npm 上的，生成项目后可直接生成数据，这样有利于快速将物料添加到 Iceworks，完成一个基础的流程。

### 生成物料源

完成初始化后，进入到项目根目录执行以下命令，可生成物料源数据：

```bash
$ cd my-materials

// 生成的物料源数据在 build 目录下
$ npm run generate
```

对于生成好的物料源数据，我们可以选择将这个文件  托管到 [fusion](https://fusion.design/) 或 [unpkg](https://unpkg.com/#/) 上，来生成一个可访问的 URL。分别对应如下命令：

发布到 fusion

```bash
$ npm run sync
```

发布到 unpkg

```bash
$ npm run sync-unpkg
```

将对应的地址，复制粘贴到 Iceworks 设置面板的新增物料源位置，保存之后即可看到 Iceworks 的模板和区块界面出现了我们刚刚添加的自定义物料。

![Iceworks](https://cdn.nlark.com/lark/0/2018/png/71071/1543576468368-d5e730c2-af08-462e-9743-935da0f9131a.png)

自此，自定义物料到对接 Iceworks 的示例流程就基本完成，接下来我们来分析初始的目录结构。

## 目录结构

接着上面的步骤，我们发现初始化的目录结构主要包含 blocks、scaffolds 这两个子目录， 这里针对每个目录做详细的说明：

```json
my-materials/
    │
    ├── blocks                      // 区块
    │      └── Greeting
    │
    ├── scaffolds                   // 脚手架模板
    │      └── lite
    │
    ├── .editorconfig
    ├── .eslintignore
    ├── .eslintrc
    ├── .gitignore
    ├── .prettierignore
    ├── .prettierrc
    ├── LICENSE
    ├── README.md
    └── package.json
```

#### blocks

通过对大量的中后台系统进行对比发现，在很多场景下 UI 的展示在很大程度上能进行一定的复用，我们对这类的需求抽象为区块，本质上可以理解为一段代码片段，可以通过工具 Iceworks 进行快速组合，直接下载到项目进行二次开发， 减少重复的 UI 编码工作，提高复用率，默认包含一个 Greeting 示例区块。

#### scaffolds

该目录用来存放脚手架模板代码，初始化项目里默认包含示例 ice-design-lite 脚手架，一个模板脚手架本质上是一个完整的项目，你可以基于该模板进行二次开发，也可以通过工具自定义生成。

#### 其他文件

除了以上目录，其他根目录下的文件主要为配置型的文件，如 Eslint 等。

生成项目目录结构后，我们可以先初始化 git 操作，进行一次 commit：

```bash
$ cd my-materials
$ git init
$ git add .
$ git commit -m "feat: init materials"
$ git push
```

## 后记

这里我们只简单介绍了如何使用开发者工具快速初始化一个私有的物料项目，然后生成数据接入 Iceworks 的流程，以及对初始化目录的分析，接下来我们看看如何添加物料：

- [区块开发](https://alibaba.github.io/ice/docs/materials/add-block)
- [模板开发](https://alibaba.github.io/ice/docs/materials/add-templates)
