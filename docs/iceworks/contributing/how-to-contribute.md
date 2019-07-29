---
title: 如何参与
order: 1
---

iceworks 是阿里巴巴飞冰团队开源的项目之一，目前正处于非常活跃的开发状态；这篇文档会指导你如何为 iceworks 贡献一份自己的力量，请务必在提交 issue 或者 pull request 之前花一些时间阅读这份指南。

## 透明开发

关于 iceworks 的所有工作都直接在 GitHub 上进行。不管是核心团队的成员还是外部贡献者的 pull request 都需要经过相同的 review 流程。

## 分支管理

仓库主要维护 master 和 dev 两个分支，master 分支只是最新稳定版本的快照，所有开发都会基于 dev 分支进行开发，如果你要提一个增加新功能的 pull request，请基于 dev 分支的代码改动。

## Bugs

我们使用 [GitHub Issues](https://github.com/alibaba/ice/issues) 来做 bug 追踪。 如果你想要你发现的 bug 被快速解决，最好的办法就是通过我们提供的 [issue](https://github.com/alibaba/ice/issues/new) 模板来提交你的 issue。

在新建 issue 前，可以先搜索一下以往的旧 issue，你遇到的问题可能已经有人提了，也可能已经在最新版本中被修正。

## Pull Request

飞冰团队会关注所有提交的 pull request，我们会对代码进行 review，如果 review 通过我们会合并你的代码，也有可能要求你做一些修改，或者告诉你我们为什么不能接受这样的修改，并最终关闭它。

在提交一个 pull request 之前， 请确认你是按照下面的步骤来做的：

1. Fork the repository。
2. 基于 [正确的分支](#分支管理) 创建你的分支进行修改。
3. 请尽量使用英文进行 commit，并且尽量清楚的进行描述，详细请参考 [GIT_COMMIT_SPECIFIC](https://github.com/alibaba/ice/blob/master/.github/GIT_COMMIT_SPECIFIC.md)
4. 如果你提交的代码修改了 APIs 或者功能改动，请更新对应的文档。
5. 确保你的代码通过了 lints 检查。

## Contributor License Agreement (CLA)

为了接受你的 pull request，我们需要你去提交 CLA。你只需要去做一次，所以如果你已经为另一个阿里巴巴开源项目做过贡献，你不需要再提交这个流程。如果你是第一次提交 pull request，只要让我们知道你已经完成了CLA，我们可以再次确认（cross-check）你的GitHub 用户名。

[点此完成你的 CLA](https://cla-assistant.io/alibaba/ice)

## 开发流程

如果你是第一次参与开源项目的贡献，还不清楚怎么在 GitHub 上提交 pull request，可以阅读下面这篇文章：

[怎么在GitHub上为开源项目作贡献](https://zhuanlan.zhihu.com/p/23457016)

当你 clone 代码完成后，你可以按照以下流程开始 iceworks 的开发工作：

### 启动 UI 服务

在本地启动 iceworks 的 UI 服务，运行以下命令会自动在浏览器打开 http://localhost:4444 进行访问：

```bash
$ cd iceworks-client
$ npm install
$ npm run start
```

### 启动 Node 服务

在另一个终端运行以下命令，可以启动 Node 服务，主要为 iceworks UI 提供接口服务：

``` bash
$ cd iceworks-server
$ npm install
$ npm run dev
```


## 其他

如果你还不太清楚该如何贡献代码，你可以继续阅读以下文档，或者是通过加入飞冰社区群联系我们。

* 源码概述
* 实现说明
* 架构设计
* 发布说明
