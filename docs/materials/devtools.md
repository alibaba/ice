---
title: 使用 ice-devtools
order: 1
---

## 物料简介

在飞冰（ICE）体系里，我们定义了一个「物料」的概念，基于物料我们可以快速创建一个前端项目，物料由不同粒度的几个部分组成：

- 模板：一个样板工程，一般会包含通用的布局、工程配置、页面模块等，可以用来初始化项目
- 区块：代码片段，对业务通用场景抽象，可以通过工具快速将区块对应的代码复制到项目里
- 业务组件：面向业务的组件体系，相较于区块来说功能比较复杂、抽象度较高、灵活性较低（只能通过属性控制），项目里通过第三方依赖使用

飞冰（ICE）团队维护了一套相对质量较高的物料帮助项目提效，但在实际场景里，很多业务、团队会有自己的模板、区块、业务组件，我们把这些统称为自定义物料，同时提供了 ice-devtools 这个工具协助业务开发自身的物料体系。当物料开发完成之后，接下来就是如何使用这份物料，对于这个流程我们有一套完善的流程：

- 在 [fusion.design](https://fusion.design/) 上创建业务站点（注意：内部业务请使用内部站点）
- 使用 ice-devtools 本地开发物料
- 使用 ice-devtools 生成物料数据（json）并同步到对应的 Fusion 站点，此时会生成一个物料数据的 url
  - Fusion 对应的业务站点相当于业务的一个门户网站，可以快速了解业务的物料体系
- 在 Iceworks 里通过自定义物料功能添加上述的 url
  - Iceworks 对应的自定义物料让开发者在开发项目过程中可以快速使用业务的相关物料

## ice-devtools 使用

ice-devtools 本身不耦合于任何框架和工程，这意味着基于 ice-devtools 可以开发 React/Vue/... 各种前端体系的物料。

### 安装工具

```bash
$ npm install ice-devtools -g

# 检查是否安装成功
$ idev -V
=> 2.2.0
```

### 初始化物料项目

```bash
# 新建物料项目
$ mkdir my-materilas & cd my-materilas

# 初始化物料项目
$ ice-devtools init
```

init 之后会生成如下的目录结构：

```
my-materials/
  ├── .template     // 自定义模板
  │   ├── block
  │   ├── component
  │   └── scaffold
  ├── build         // 存放生成的物料数据
  ├── blocks
  │   ├── ExampleBlock
  ├── components
  │   └── ExampleComponent
  └── scaffolds
      └── ExampleScaffold
```

### 开发物料

初始化完成后就可以按照目录结构开发对应的物料，每种物料的开发都有对应文档可以参考。

### 生成物料数据

在物料开发完成并发布对应 npm 之后，就可以生成物料源数据了：

```bash
# 生成的物料源数据在 build 目录下
$ npm run generate
$ ls build/
materials.json
```

目前这只是一份静态数据，想要在 Iceworks 里使用这份物料的话需要将其托管在某些服务上，参考「物料数据托管」章节。

### 物料数据托管

参考「物料数据托管」章节。

附：关于物料开发，我们推荐通过一个项目/仓库开发当前业务的所有物料，因为这样更便于管理和持续维护。如果需要单独开发一个业务组件/区块，可以参考[文档](https://github.com/alibaba/ice/wiki/develop-single-biz-component)
