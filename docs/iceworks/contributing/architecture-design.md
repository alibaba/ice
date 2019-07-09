---
title: 架构设计
order: 3
---

本篇文档将对 iceworks 的源码架构进行概述。

如果你想参与 iceworks 的开发，希望这份指南可以帮助你更加轻松的进行修改，我们非常欢迎来自社区的贡献。

## 架构设计

下面是 iceworks 的架构图，包含 client，server 两部分：

![iceworks-architecture-design](https://img.alicdn.com/tfs/TB1s8kAdRKw3KVjSZFOXXarDVXa-2306-1564.png)

### 客户端

对于 iceworks 用户端，我们提供 Electron 桌面软件和本地化 Web 版本的两种使用链路，而本质上运行的是同一套代码，策略也基本是一样的，不同的只是两者的运行依赖环境，在实现上，我们将前端静态资源进行发布，将后端服务以 Npm 包的形式发布，最终在 Electron 和本地化 Web 版本中去进行调用，桌面软件依赖 Electron 载体，本地化 Web 版本依赖 iceworks CLI 命令行工具。

注释：iceworks 3.0 beta 版本暂未提供 Electron 版本。

### 服务端

对于 Node 服务端，主要用来操作文件系统，执行子进程相关的逻辑操作，比如新建页面时写入文件，启动调试服务时执行相关脚本的子进程操作。

在这之外，核心能力是我们对 iceworks 抽象了 Adapter 机制，你可以理解为适配器模式，它允许你根据 [接口定义](#接口定义) 自定义一个 Adapter 进行接入，在框架层面会自动加载 Adapter 进行自配，以此满足定制 iceworks 工作台的能力。更多 Adapter 相关文档：

* [iceworks adapter 设计讨论](https://github.com/alibaba/ice/pull/1935)
* [adapter 是什么](#adapter是什么)
* [adapter 开发指南](#adapter最佳实践)
* [adapter 接口协议](#adapter接口协议)
