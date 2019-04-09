---
title: 使用 ice-devtools 开发自定义物料
order: 1
---

## 物料开发流程

前面提到的物料大多是官方物料，但是在实际的开发中，很多业务都需要自己的物料体系，比如定制的模板、附带业务属性的组件等，因此我们基于 ice-devtools 这个工具提供了自定义物料的开发链路。大体流程如下：

- 使用 ice-devtools 在本地开发物料
- 使用 ice-devtools 生成物料数据，然后同步数据生成一个 url，同步方式二选一：
  - 同步到 Fusion 站点（仅支持 React 物料）
  - 通过 npm 包形式同步到 unpkg（支持任何物料）
- 在 Iceworks 里通过自定义物料功能添加上述的 url，然后开发者就可以在开发项目时使用这些物料了

## ice-devtools 介绍

ice-devtools 用于物料的开发和管理，其本身不耦合任何前端框架或工程体系，这意味着基于 ice-devtools 可以开发 React/Vue/... 各种前端体系的物料。ice-devtools 具有以下特性：

- 支持物料的初始化以及管理能力
- 支持不同前端框架或工程的物料开发
- 支持同步到 fusion.design 或 unpkg
- 支持业务自定义模板能力
- ……

## ice-devtools 使用

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

不同物料体系可能使用不同的框架或工具，实际开发方式也会有所差异，此处根据选择的前端方案参考不同文档即可：

- [基于 React+ice-scripts+Fusion 的物料开发文档](https://www.yuque.com/ice-team/wiki/ywg4hf)
- [基于 Vue+Vue CLI 的物料开发文档](https://www.yuque.com/ice-team/wiki/xqg0g6)

如有其他框架/工具的需求，欢迎反馈给飞冰（ICE）团队。

当然除了这些与框架/工具有关的差异性外，物料的开发还有很多的一致性：

```bash
# 进入单个物料的目录
$ cd blocks/ExampleBlock
# 安装依赖
$ npm install
# 启动调试服务
$ npm start

# 开发调试代码……

# 发布 npm 包
npm version [patch|minor|major|...]
npm publish
```

### 生成物料数据

在物料开发完成并**发布每个物料对应 npm** 之后，就可以生成物料源数据了：

```bash
# 生成的物料源数据在 build 目录下
$ npm run generate
$ ls build/
materials.json
```

这份物料数据时一份标准协议，可以在 Iceworks, fusion.design 以及其他各种端使用，具体协议规范请参考 [物料数据协议](https://www.yuque.com/ice-team/wiki/ay2251)。

目前这只是一份静态数据，想要在 Iceworks 里使用这份物料的话需要参考下文将其托管到某些服务上生成一个 url。

### 物料数据托管

物料数据的托管我们目前支持两种方式，业务可以根据自身的特性选择：

| 特性             |   fusion.design   |   unpkg       |
|-----------------|-------------------|---------------|
|  官方推荐        |   是              |    一般        |
|  门户网站     |   能                 |    不能        |
|在 Iceworks 中使用 |   能             |    能         |
|  需要登录注册帐号  |   需要            |    不需要       |
|  线上管理物料      |  能               |    不能        |
|  支持的物料体系     | 仅支持 React 物料 |   不限制       |

#### 托管在 fusion.design

首先在 [fusion.design](https://fusion.design) 上注册账号，然后根据[文档](https://fusion.design/help.html#dev-create-site)新建站点，接着在物料仓库下执行命令：

```bash
# 根据提示填写帐号 token -> 选择同步的站点
$ npm run sync
```

#### 托管在 unpkg

```bash
$ npm run sync-unpkg
```

本质上是将 `build` 目录发布为一个 npm 包，然后通过 unpkg 服务可以访问这个包里的 json 文件。

### 使用物料

`npm run sync` 命令运行完成以后，会返回如下内容:

> 物料同步完成
> 物料源地址: https://fusion.design/api/v1/sites/xxxx/materials
> 请在 Iceworks 设置面板中添加自定义物料源

此时只需要将物料源地址 `https://fusion.design/api/v1/sites/xxxx/materials` 添加到 Iceworks 自定义物料源里，就可以在初始化项目或者添加页面时使用这份物料了。

![](https://img.alicdn.com/tfs/TB1o4AyxXzqK1RjSZFCXXbbxVXa-1740-1200.png)


### 最定义模板

ice-devtools 内置了 React/Vue 两套官方物料模板，如果是 React/Vue 体系的用户可以直接基于这两套模板初始化，初始化完成后可以在 .template 里对文件结构、工程配置等做定制，后续执行 idev add 时会读取 `.template` 下对应的目录进行初始化。

.template 的设计本身可以满足大部分用户的定制需求，如果还有更特殊的使用场景比如：用 ice-devtools 开发单个组件，并且组件目录有较多定制逻辑。那么可以通过自己开发模板 npm 包的方式来支持，参考 [ice-react-material-template](https://github.com/alibaba/ice/tree/master/templates/ice-react-material-template) 和 [ice-vue-material-template](https://github.com/alibaba/ice/tree/master/templates/ice-vue-material-template) 的目录结构实现自己的模板并将其发布为 npm 包，然后在初始化时通过参数控制：

```bash
$ idev init --template @icedesign/ice-vue-material-template
```

附：关于物料开发，我们推荐通过一个项目/仓库开发当前业务的所有物料，因为这样更便于管理和持续维护。如果需要单独开发一个业务组件/区块，可以参考[文档](https://www.yuque.com/ice-team/wiki/mmgkb5)
