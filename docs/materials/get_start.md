---
title: 快速开发物料
order: 1
---

## 安装工具

全局安装 iceworks：

```bash
$ npm install iceworks -g

# 检查是否安装成功
$ iceworks -V
=> 3.1.0
```

## 初始化物料项目

创建空目录然后初始化：

```bash
$ mkdir my-material && cd my-material
$ iceworks init
```

根据提示，在项目根目录安装依赖后，即可进入开发。初始化的目录结构如下所示，默认会生成一个区块和组件：

```
├── blocks
│      └── ExampleBlock
├── components
│      └── ExampleComponent
├── README.md
└── package.json
```

## 单个物料开发

以区块开发为例，假设我们需要开发一个 ProfileCard 区块用于展示用户信息，我们在项目根目录执行命令：

```bash
$ iceworks add
# 或者
$ iceworks add block
```

填写信息之后，会在 blocks/ 目录下生成 ProfileCard 目录及初始代码，根据提示执行以下命令即可开始开发：

```bash
$ cd blocks/ProfileCard
$ npm install
$ npm start
```

物料开发完成后，即可通过 npm 发布。

## 物料数据生成

**将每个物料发布到 npm 之后**，我们即可生成物料集合数据，在根目录下执行以下命令：

```bash
$ iceworks generate
```

会生成 `build/materials.json` 文件，这个文件描述了整个物料集合的元数据。

## 物料数据发布与使用

接着我们可以通过 `iceworks sync` 方式将物料数据同步到物料中心，你也可以通过私有的服务托管，同步完成后我们会得到一个 url 可以访问到这些物料数据。

接着在 iceworks IDE 中添加自定义物料填入 URL 即可在开发项目中使用这些物料。
