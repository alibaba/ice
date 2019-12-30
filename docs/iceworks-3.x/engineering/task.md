---
title: 工程任务
order: 2
---

在工程管理简介中，我们了解到工程任务主要是可视化管理当前项目所使用的工程工具对应的任务。在飞冰工程中，主要包含以下两种：

* `ice-scripts dev`：启动调试服务
* `ice-scripts build`：构建项目


## 启动调试服务

在工程管理面板中，我们可以看到第一个选项就是启动调试服务，在界面我们可以点击 **启动** 按钮，即可启动项目的调试服务，可以在日志流中看到输出的任务命令为 `ice-scripts dev`。

![启动调试服务](https://img.alicdn.com/tfs/TB1GHTUeSSD3KVjSZFKXXb10VXa-2862-1578.png)

同时在启动调试服务前，我们也可以点击 **设置** 先进行一些启动调试的参数配置，然后在启动调试服务。参数配置主要如下：

* 服务端口号
* 服务主机名
* 开启 https
* 开启构建分析
* 开启热更新

![参数配置界面](https://img.alicdn.com/tfs/TB1Et6TeLWG3KVjSZFPXXXaiXXa-2876-1582.png)

## 构建项目

在工程管理面板中，当我们的项目开发完成或者需要部署时，可以在构建项目面板点击 **启动** 即可启动构建当前项目的服务，可以在日志流中看到输出的任务命令为 `ice-scripts build`。

![构建项目](https://img.alicdn.com/tfs/TB1kgYYeL1H3KVjSZFHXXbKppXa-2875-1578.png)

同时在构建项目之前，我们也可以点击 **设置** 先进行一些构建的参数配置，然后在启动构建项目服务。参数配置主要如下：

![参数配置界面](https://img.alicdn.com/tfs/TB1xaH9eRCw3KVjSZFuXXcAOpXa-2871-1584.png)


## 其他

上述工程任务界面是基于 ice-scripts 最佳工程实践的实现，如果你想定制其他最佳工程实践的可视化管理，可以参考 《Adapter 开发指南》章节进行接入。
