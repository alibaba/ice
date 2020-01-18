---
title: 快速开始
order: 3
---

## 安装 iceworks

![安装](https://img.alicdn.com/tfs/TB11esus1H2gK0jSZJnXXaT1FXa-960-600.gif)

> 以 macOS 为例。

1. 下载[安装包](https://iceworks.oss-cn-hangzhou.aliyuncs.com/mac/iceworks-setup.dmg)；
2. 双击下载的 .dmg 文件；
3. 拖动 iceworks 的图标到 `Applications` 文件夹；
4. 点击**应用程序**文件夹，双击 `iceworks` 启动。

> 更详细内容请参考[《安装 iceworks》](/docs/iceworks/setup)。

## 创建项目

![创建项目](https://img.alicdn.com/tfs/TB1oOcps9f2gK0jSZFPXXXsopXa-2000-1600.gif)

1. 点击 **+** 号按钮；
2. 选择模板；
3. 填写项目信息；
4. 点击**进入工作台**按钮。

## 启动调试

![启动调试](https://img.alicdn.com/tfs/TB18dsss1L2gK0jSZFmXXc7iXXa-960-600.gif)

1. 在**我的项目**中点击项目卡片中的**编辑**按钮进入工作台；
2. 点击工具栏上的**启动**按钮，首次启动将自动安装依赖，启动成功将在浏览器打开调试页面；
3. 打开资源管理器内 `src/page/**/*.jsx` 文件，光标定位到需要插入物料的位置；
3. 点击右侧活动栏的**展开**按钮打开**物料市场**，**点击物料**插入到光标位置。

## 初始化仓库

![初始化仓库](https://img.alicdn.com/tfs/TB1gR7Ss4n1gK0jSZKPXXXvUXXa-960-600.gif)

1. 点击左侧活动栏上的**源代码管理**按钮，在左侧边栏将打开源代码管理面板；
2. 点击**初始化仓库**，选择当前项目名初始化一个 Git 仓库；
3. 暂存所有更改，输入提交信息并提交；
4. 拷贝远程仓库 URL；
5. 通过 `⇧⌘P` 唤起命令面板，输入 **Git: 添加远程库**；
6. 输入远程仓库名称和仓库 URL；
7. 点击源代码管理面板右上角的 `...` 查看更多操作，点击**发布分支**将分支发布到远程仓库。

## 发布

> 仅适用于阿里内部，需要手动在 DEF 研发平台[创建应用](https://work.def.alibaba-inc.com/apply/new)，关联上一步初始化的仓库。

![发布](https://img.alicdn.com/tfs/TB1X9SKtoH1gK0jSZSyXXXtlpXa-960-600.gif)

1. 在工具栏上的左侧点击**请登录**；
2. 在源代码管理面板将本地代码改动提交到远程仓库；
3. 在工具栏上的右侧点击**发布**。
