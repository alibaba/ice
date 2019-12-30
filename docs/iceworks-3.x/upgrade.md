---
title: 版本更新
order: 4
---

iceworks 命令行工具提供了基础的命令用于快速启动工作台，其主要实现由两部分组成：
- iceworks-core：主要承担 iceworks UI 和 APIs 两部分的职责，包含了 iceworks 工作台的所有功能和核心逻辑的实现。
- iceworks-cli：主要承担命令行工具的职责，会将 iceworks-core 作为依赖进行安装

因此，如果需要更新 iceworks 时需要分两步进行更新，大多数时候我们只需要更新 iceworks-core 部分即可。


## 更新 iceworks-core

当有新版本时，在命令行执行 `iceworks` 可看到如下输出：

![iceworks-core](https://img.alicdn.com/tfs/TB14iEPdeH2gK0jSZFEXXcqMpXa-1120-270.png)

此时，如果需要更新到新的版本只需要输入 `y` 即可更新，[详细更新日志](https://github.com/alibaba/ice/blob/master/CHANGELOG.md)。

## 更新 iceworks-cli

当有新版本时，在命令行执行 `iceworks` 可看到如下输出：

![iceworks-core](https://img.alicdn.com/tfs/TB1EPcLdXT7gK0jSZFpXXaTkpXa-1120-380.png)

此时，我们只需要执行以下命令即可更新，[详细更新日志](https://github.com/alibaba/ice/blob/master/tools/iceworks-cli/CHANGELOG.md)。

```bash
$ npm install iceworks@latest -g
```
