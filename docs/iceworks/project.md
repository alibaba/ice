---
title: 项目管理
category: iceworks
order: 4
---

## 布局列表和页面列表

布局列表和页面列表是两个单独的插件，用于审视项目中的布局和页面。

- 通过布局列表插件，你可以清晰地了解到当前项目中有哪些布局；
- 通过页面布局插件，你可以看到项目中的所有页面，也可新增或删除页面。

![布局列表和页面列表](https://img.alicdn.com/tfs/TB11xS1MW6qK1RjSZFmXXX0PFXa-869-576.gif)

## 依赖管理

项目中的依赖需要严格管理，iceworks 提供了依赖管理插件，你可以：

- 查看项目的依赖；
- 升级项目的依赖；
- 添加项目的依赖。

以下示例显示了项目初始化后未安装依赖时、重安装依赖后、添加依赖后的依赖管理面板信息变化情况：

![依赖管理](https://img.alicdn.com/tfs/TB1v2qTMZbpK1RjSZFyXXX_qFXa-868-571.gif)

![添加依赖](https://img.alicdn.com/tfs/TB1_tSIM3TqK1RjSZPhXXXfOFXa-868-571.gif)

## 构建结果

通常来说，项目的构建结果将会上传到远程服务端作为网站的静态资源进行使用 ，你可以通过构建结果插件来审视这些将要上传的文件。

以下示例演示了「构建结果」插件面板的相关功能：

1. 未构建时，构建结果面板无数据；
2. 进行构建，构建成功后面板显示有：JS/CSS/PNG/JPG/HTML 类型的文件；
3. 删除一个页面，构建结果中删除了 JPG 文件。

![插件-构建结果](https://img.alicdn.com/tfs/TB1S5TbM4naK1RjSZFBXXcW7VXa-868-571.gif)

## TODO

项目中的 TODO 注释需要被重视，iceworks 提供了 TODO 插件用于审视项目中的所有 TODO。

![TODO](https://img.alicdn.com/tfs/TB1kF57M3HqK1RjSZFkXXX.WFXa-1018-746.gif)

## Git

iceworks 提供了 Git 仓库管理的能力。

1. 关联仓库：

    ![关联仓库](https://img.alicdn.com/tfs/TB1LIaYM6TpK1RjSZKPXXa3UpXa-1424-696.gif)
2. 初始化仓库：

    ![初始化仓库](https://img.alicdn.com/tfs/TB1l6OTM9zqK1RjSZFHXXb3CpXa-1424-696.gif)
3. 提交变更：

    ![提交变更](https://img.alicdn.com/tfs/TB1obKQMYPpK1RjSZFFXXa5PpXa-869-576.gif)
4. 新建分支：

    ![新建分支](https://img.alicdn.com/tfs/TB1cqOOM9zqK1RjSZFLXXcn2XXa-869-576.gif)
5. 切换分支：

    ![切换分支](https://img.alicdn.com/tfs/TB14ty6M4jaK1RjSZFAXXbdLFXa-869-576.gif)

## 阿里云 OSS

阿里云 OSS 插件可以一键将构建结果上传到您的 OSS bucket 中。

首先看下基础界面:

![](https://img.alicdn.com/tfs/TB1bg8qx1SSBuNjy0FlXXbBpVXa-982-712.png)

主要有以下字段组成：

1. 阿里云用户 AccessKey
2. Bucket 选择框
3. 存储目录

阿里云用户 AccessKey 可以在您的账户下创建 AccessKey

![](https://img.alicdn.com/tfs/TB1MXFmxVOWBuNjy0FiXXXFxVXa-1780-1052.png)

### 使用步骤：

1. 填写 AccessKey ID / AccessKey

    将 AccessKey ID 和 AccessKey Secret 粘贴到插件面板相应输入框。
2. 获取 Bucket 列表

    点击 【Bucket 选择框】右边的刷新按钮，获取 Bucket 列表。

    刷新完成了可以下拉选择 Bucket ：

    ![](https://img.alicdn.com/tfs/TB1bVhdxYSYBuNjSspiXXXNzpXa-1908-1368.png)
3. 填写存储目录

    例如填写 `static` 则表示将构建资源结果上传到对应 bucket 根目录下的 static 文件夹。
4. 提交上传

    上传成功后将会看到以下提示：

    ![](https://img.alicdn.com/tfs/TB1BBVixYGYBuNjy0FoXXciBFXa-1964-1424.png)

    会罗列出所有上传完成的对象以及 URL。

### 小结

通过**阿里云 OSS** 面板可快速将资源提交到 CDN 上，之后在应用中引用即可，提高发布效率。同时插件会将用户的输入加密并保存到本地，避免重复输入，您也可以随时点击右上角的【清空数据】删除缓存的数据。

> 其他平台的插件会陆续接入到 iceworks 中，如果您有需求可以反馈给我们，将会优先开发对应的上传插件。

## 代理配置

参考 [代理配置](/docs/cli/advanced/proxy.md)