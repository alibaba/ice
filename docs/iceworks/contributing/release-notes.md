---
title: 发布说明
order: 5
---

本篇文档将对 iceworks CLI 发布流程以及具体实现进行概述。

## 语义化版本

iceworks 发布遵循 **[语义化版本（sematic versioning）](https://semver.org/)**。

> 版本格式：主版本号.次版本号.修订号，版本号递增规则如下：
>
> 主版本号：当你做了不兼容的 API 修改.
>
> 次版本号：当你做了向下兼容的功能性新增.
>
> 修订号：当你做了向下兼容的问题修正.

每一次重大改变都在 [CHANGELOG.md](https://github.com/alibaba/ice/blob/iceworks%2Frelease-3.x/tools/iceworks-cli/CHANGELOG.md) 中记录。

## 发布流程

在 [源码概述](#codebase-overview) 章节中，我们对 iceworks 整体架构做了阐述，了解到 iceworks 主要包含客户端代码，服务端代码，以及为用户端提供的 CLI 工具三部分，下面我们对这三部分的发布分别进行介绍：

#### 发布客户端代码

客户端代码指的是 iceworks UI 代码，源码目录是 [iceworks-client](https://github.com/alibaba/ice/tree/iceworks/release-3.x/packages/iceworks-client)，发布客户端代码本质上就是构建出对应的前端静态资源，然后将其部署到相关的托管服务平台。

在 iceworks 中，我们使用 Npm 服务进行静态资源的托管，发布流程如下：

* 更新版本
```
# 更新前端静态资源的版本
# iceworks-client/package.json
{
  "name": "iceworks-client",
  "version": "1.0.0", # 改成当前需要发布的版本号
}
```

* 更新说明

在 iceworks-client 目录下 CHANGELOG.md 中新增本次发布的说明。

* 构建静态资源

```bash
$ cd iceworks-client
$ npm run build # 构建静态资源
```

* 发布 Npm 包
```bash
$ cd iceworks-client
$ npm publish
```

发布完成后，我们在 Npm 服务上看到我们发布的对应的静态资源.

#### 发布服务端代码

服务端代码指的是为 iceworks UI 提供 APIs 接口服务的代码，源码目录是 [iceworks-server](https://github.com/alibaba/ice/tree/iceworks/release-3.x/packages/iceworks-server)，发布服务端代码与发布客户端代码类似，发布流程如下：

* 更新版本
```
# 更新服务端代码版本
# iceworks-server/package.json
{
  "name": "iceworks-server",
  "version": "1.0.0", # 改成当前需要发布的版本号
}
```

* 更新说明

在 iceworks-server 目录下 CHANGELOG.md 中新增本次发布的说明。

* 构建静态资源

```bash
$ cd iceworks-server
$ npm run build # 编译代码
```

* 发布 Npm 包
```bash
$ cd iceworks-server
$ npm publish
```

#### 发布 CLI 工具

iceworks CLI 命令行工具，主要承担 iceworks 用户端的职责，提供基础命令用于快速启动 iceworks 应用。源码目录是 [iceworks-cli](https://github.com/alibaba/ice/tree/iceworks/release-3.x/packages/iceworks-cli)，发布流程如下：

* 更新版本
```
# 更新服务端代码版本
# iceworks-cli/package.json
{
  "name": "iceworks-cli",
  "version": "1.0.0", # 改成当前需要发布的版本号
}
```

* 更新说明

在 iceworks-cli 目录下 CHANGELOG.md 中新增本次发布的说明。

* 发布 Npm 包

```bash
$ cd iceworks-cli
$ npm publish
```

#### 打标签

在发布完上述三个包后，也就意味着 iceworks 软件的一次完成发布，我们需要对软件版本(比如 v1.0)打上标签。

* 列显已有的标签

列出现有标签的命令非常简单，直接运行 git tag 即可：

```bash
$ git tag
v1.0.0
v1.0.1
```

* 新建标签

首先，切换到需要打标签的分支上：

```bash
$ git branch
* dev
  master
$ git checkout master
Switched to branch 'master'
```

然后，敲命令 `git tag -a <tagName> -m <tagMessage>` 就可以打一个新标签：

```
$ git tag -a v1.0.2 -m 'Release version 1.0.2'
```

push 标签到远程仓库

```
$ git push origin v1.0.2
```

最后，你也可以在 GitHub 的 Releases 选项找到对应的 Tag 进行编辑修改

![tag](https://img.alicdn.com/tfs/TB1BYS6eoGF3KVjSZFoXXbmpFXa-1064-612.png)


## 具体实现

iceworks CLI 的实现核心思路是将 iceworks-server 作为 Npm 包的形式进行依赖，同时 iceworks-server 本质是一个 Node 项目的形式，并加装 iceworks-client 的静态资源进行渲染，如此一来就可以通过 iceworks CLI 命令行的形式启动 iceworks 工作台界面。

![iceworks-cli](https://img.alicdn.com/tfs/TB1efLaekWE3KVjSZSyXXXocXXa-2201-1368.png)
