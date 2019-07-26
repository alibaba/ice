---
title: 依赖管理
order: 4
---

**依赖管理** 面板是对项目所有的依赖进行可视化管理的功能模块。通过可视化的方式，查看当前项目的依赖信息，提供快速地重装依赖、升级依赖、添加依赖等功能。

## 查看依赖信息

面板中显示了项目中的 dependencies 和 devDependencies 信息。当依赖项未安装时，则不显示其版本信息：

![未安装依赖时](https://img.alicdn.com/tfs/TB1tX2XbuH2gK0jSZJnXXaT1FXa-2112-632.png)

当依赖项已安装到项目时，则显示其具体的版本信息：

![已安装依赖](https://img.alicdn.com/tfs/TB11JG.brr1gK0jSZR0XXbP8XXa-2114-628.png)

> 版本号右边出现“下载按钮”代表此依赖可升级到最新可兼容版本。

## 重装依赖

点击面板右上角的“下载按钮”即可启动重装依赖，iceworks 将重装所有的项目依赖，包括 dependencies 和 devDependencies 。在重装过程中将输出日志，不支持对项目进行调试、构建、新建页面等操作。

![重装依赖](https://img.alicdn.com/tfs/TB1AZO2aXT7gK0jSZFpXXaTkpXa-1425-745.gif)

## 升级依赖

当项目中的依赖项有最新兼容版本发布时，iceworks 将提示你该依赖项可升级。

最新兼容版本与项目的 package.json 中的依赖配置有关。例如，

- 项目中的 dependencies 中有 `"@alifd/next": "^1.15.0"`；
- 项目当前的 `@alifd/next` 版本是 1.15.1；
- `@alifd/next` 发布了 1.15.2，则 iceworks 将提升你该依赖可升级。

![升级依赖](https://img.alicdn.com/tfs/TB1zI53aXT7gK0jSZFpXXaTkpXa-1425-745.gif)

## 添加依赖

iceworks 提供了快捷的方式帮助添加 dependencies 依赖。点击面板右上角的 + 号按钮，开始添加依赖：

- 可以添加单个依赖，也可以添加多个依赖；
- 可以指定依赖的版本信息，如不指定将安装最新版本。

![添加依赖](https://img.alicdn.com/tfs/TB1qMW7aoD1gK0jSZFGXXbd3FXa-1425-745.gif)
