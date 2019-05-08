---
title: 关于物料
order: 1
---



飞冰（ICE）在社区的参与下目前主要建立起如下物料体系：

|  物料名称  |  维护者  |  框架 |  工程体系  |  基础组件 | 代码仓库 |
|-----------|---------|------|-----------|----------|---------|
|React 物料 | 官方     | React |ice-scripts| Fusion | [github](https://github.com/ice-lab/react-materials) |
|Vue 物料   | 社区+官方 | Vue   | Vue CLI  | Element | [github](https://github.com/ice-lab/vue-materials) |

如果有兴趣共建社区物料体系，比如小程序、Angular 等，欢迎联系飞冰（ICE）团队，我们会给予社区参与者最大的帮助。

前面提到的物料大多是官方物料，但是在实际的开发中，很多业务都需要自己的物料体系，比如定制的模板、附带业务属性的组件等，因此我们基于 ice-devtools 这个工具提供了自定义物料的开发链路。大体流程如下：

- 使用 ice-devtools 在本地开发物料
- 使用 ice-devtools 生成物料数据，然后同步数据生成一个 url，同步方式二选一：
  - 同步到 Fusion 站点（仅支持 React 物料）
  - 通过 npm 包形式同步到 unpkg（支持任何物料）
- 在 iceworks 里通过自定义物料功能添加上述的 url，然后开发者就可以在开发项目时使用这些物料了

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