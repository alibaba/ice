---
title: 源代码管理(Git)
order: 5
---

VS Code 集成了源代码控制，并默认支持 Git。

> 如果您不了解 Git，可以通过 [git-scm](https://git-scm.com/doc) 网站的[在线文本教程](https://git-scm.com/book)或[初学者视频教程](https://git-scm.com/video/what-is-git)来进行学习。本文档默认你已了解 Git。

![Git](https://img.alicdn.com/tfs/TB1IZhjtG61gK0jSZFlXXXDKFXa-754-418.png)

> VS Code 将利用您机器安装的 Git，因此在使用下面这些功能之前，您需要先安装 Git。请确保至少安装 2.0.0 版本。

> VS Code 可以与任何 Git 存储库一起使用。如果你还没有一个私有托管的 Git 供应商，[阿里云代码托管](https://promotion.aliyun.com/ntms/act/code.html)服务是一个很好的免费的选择。

左侧活动栏的源代码管理图标上的数字表示当前仓库中有多少变更。单击图标将显示当前仓库变更的详情：**更改(CHANGES)**、**暂存更改(STAGED CHANGES)**和**合并更改(MERGE CHANGES)**。

单击文件将详细显示文件中的文本改动信息。对于未提交的更改，右侧的编辑器仍允许您编辑文件。

您还可以在 VS Code 的左下角看到仓库的一些信息：当前分支、编辑状态以及当前分支与远程的拉取和推送差异。通过点击分支名并从列表中选择远程引用，可以签出(chekout)任何分支。

## 提交(Commit)

暂存（git add）和取消暂存（git reset）可以通过文件右侧的操作按钮或拖拽来完成。

![提交](https://img.alicdn.com/tfs/TB1_tC_tQL0gK0jSZFtXXXQCXXa-662-488.png)

您可以在更改的上方键入提交消息，然后按 `⌘+Enter` 提交更改。如果有任何暂存更改，则仅提交这些更改，否则将提交所有更改。

例如上面的截图示例当中，只有对 `package.json` 的暂存更改才会包含在提交中。

点击 Git 面板右上的 `...` 按钮可获取更多的操作选项：

![Git 更多](https://img.alicdn.com/tfs/TB1H3HktQT2gK0jSZPcXXcKkpXa-612-220.png)

## 分支和标签(Branches and Tags)

您可以通过在命令面板（`⇧⌘P`）中 使用`Git: 创建分支` 和 `Git: 签出到` 命令直接创建和签出分支。

如果执行 `Git: 签出到` 命令，您将看到如下的下拉列表，其中包含当前存储库中的所有分支或标签。

![Git: 签出到](https://img.alicdn.com/tfs/TB1P5jAtFT7gK0jSZFpXXaTkpXa-1242-686.png)

`Git: 创建分支` 命令允许您快速地创建一个新分支。只要提供新分支的名称， VS Code 就会创建分支并切换到该分支下。

## 远程(Remotes)

假设您的仓库连接到某个远程，并且签出的分支具有指向该远程分支的[关联](https://git-scm.com/book/ch3-5.html)，那么 VS Code 将为您提供推送、拉取和同步该分支（后者将在推送命令之后执行拉取命令）的操作。你可以在 `...` 菜单中查看更多的操作。

VS Code 能够定期从远程获取更改。这让 VS Code 能够显示本地仓库与远程仓库之间的差异信息。此功能在默认禁用，您可以通过 `Git > Autofetch` 设置来启用它。

> 您应该设置一个[证书助手](https://help.github.com/en/github/using-git/caching-your-github-password-in-git)，以避免每次 VS Code 与您的 Git 远程通信时都会被要求提供证书。如果不这样做，可能需要考虑通过 `Git > Autofetch` 设置禁用自动获取，以减少获取差异信息。

## Git 状态栏操作

如果当前签出的分支关联了远程分支，状态栏中的分支信息旁边会有一个**同步更改**操作图标。同步更改将把远程更改下拉到本地仓库，然后将本地提交推送到远程分支。

![Git 状态栏-同步](https://img.alicdn.com/tfs/TB1OJHDtFP7gK0jSZFjXXc5aXXa-365-44.png)

如果没有配置关联支，但是 Git 仓库设置了远程，则可以使用**发布**操作。这将允许您将当前分支发布到远程。

![Git 状态栏-发布](https://img.alicdn.com/tfs/TB1_1HItQT2gK0jSZFkXXcIQFXa-356-44.png)

## 编辑器侧边栏提示

如果您打开一个已关联 Git 仓库文件进行更改，VS Code 将向编辑器的左边栏和右侧缩略图添加提醒：

- 红色三角形表示删除行的位置；
- 绿色条表示新添加的行；
- 蓝色条表示修改的行。

![编辑器 Git 更改提醒](https://img.alicdn.com/tfs/TB1276FtNz1gK0jSZSgXXavwpXa-1070-348.png)

## 查看差异

通过在 Git 面板上点击文件可以在 VS Code 编辑器中查看该文件的变更差异：

![Git 差异](https://img.alicdn.com/tfs/TB1_2nKtHY1gK0jSZTEXXXDQVXa-2132-928.png)

> 你可以通过 VS Code 对比任意文件的差异。方法是：在资源管理器中打开一个文件 A，然后再在你希望与 A 对比的文件 B 上点击右键，然后选择「与编辑器中的文件比较」。

## Git 输出面板

你可以在 Git 输出面板上看到 VS Code 正在或已经执行的 Git 命令。如果通过 Git 面板操作遇到任何问题或者你需要明确 VS Code 正在进行怎样的 Git 操作，你可以通过该面板进行查看。

![Git 输出面板](https://img.alicdn.com/tfs/TB1uvYGtKL2gK0jSZPhXXahvXXa-2212-526.png)

显示 Git 输出面板的方式：通过快捷键 `⇧⌘U` 唤起输出面板，在左上角的下来框中选择 Git。

## 初始化仓库

当你的项目没有使用 Git 源代码管理时，Git 面板将提示你进行**仓库初始化**。您可以通过点击该按钮或在命令面板(`⇧⌘P`)中输入 `Git: 初始化存储库`进行 Git 仓库初始化。

![初始化仓库](https://img.alicdn.com/tfs/TB1xfzJtKH2gK0jSZFEXXcqMpXa-514-352.png)
