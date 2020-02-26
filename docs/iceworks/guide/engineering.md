---
title: 工程管理
order: 4
---

在 iceworks 中 **工程管理** 主要是指的是对项目使用的构建工具和对应的工程进行可视化的管理，包括对项目的工程配置，启动调试服务，构建项目等操作。通过可视化的管理配置，屏蔽复杂的工程体系，降低工程配置门槛，让开发者专注于项目开发，不必理会复杂的工程配置问题。

工程管理主要包括 **工程任务** 和 **工程配置** 两部分，其背后依赖的是飞冰提供的基于 Webpack 最佳实践的工程工具 [ice-scripts](https://ice.work/docs/cli/about) 。

同时，通过对工程的配置项进行抽象并可视化展示管理，可直接在 iceworks 工作台操作配置项，对应的配置改动会自动写入到项目的工程配置文件中。

## 工程任务

工程任务本质上对应的是 ice-scripts 提供的基础命令能力。主要包括 **启动调试服务**、**构建项目** 操作。

* ice-scripts dev：启动项目
* ice-scripts build：构建项目

### 启动调试服务

在工作台顶部可以看到第一个选项就是启动调试服务，当点击 **启动** 按钮，即可启动当前项目的调试服务，可以在日志流中看到输出的任务命令为 `ice-scripts dev`。

![dev](https://img.alicdn.com/tfs/TB117UYs4D1gK0jSZFyXXciOVXa-2880-1754.png)


同时在启动调试服务前，我们也可以点击 **设置** 先进行一些启动调试的参数配置，然后在启动调试服务。参数配置主要如下：

* 开启 https
* 服务端口号
* 服务主机名

![dev-setting](https://img.alicdn.com/tfs/TB1kFZVs1H2gK0jSZFEXXcqMpXa-2880-1754.png)

### 构建项目

当我们的项目开发完成或者需要部署时，当点击 **启动** 按钮, 即可启动构建当前项目的服务，可以在日志流中看到输出的任务命令为 `ice-scripts build`。

![build](https://img.alicdn.com/tfs/TB1XRESs4D1gK0jSZFsXXbldVXa-2880-1754.png)

同时在构建项目之前，我们也可以点击 **设置** 先进行一些构建的参数配置，然后在启动构建项目服务。参数配置主要如下：

* 开启构建分析
* 设置分析端口号

![build-setting](https://img.alicdn.com/tfs/TB1W7MTsVP7gK0jSZFjXXc5aXXa-2880-1754.png)

### 语法检查


执行语法检查，对应项目 `package.json` 中 scripts 配置下的 `npm run eslint` 命令。

![eslint](https://img.alicdn.com/tfs/TB1UfkYs4D1gK0jSZFKXXcJrVXa-2880-1754.png)

### 测试

执行测试用例，对应项目 `package.json` 中 scripts 配置下的 `npm run test` 命令。

![test](https://img.alicdn.com/tfs/TB1czAUs9f2gK0jSZFPXXXsopXa-2880-1754.png)
