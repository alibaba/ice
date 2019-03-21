---
title: 设置
category: Iceworks
order: 15
---

通过设置面板开启、关闭或配置 Iceworks 相关功能。

## 插件管理

插件管理提供让用户开启或关闭插件面板的能力。

示例：关闭 TODO 插件。

![插件管理](https://img.alicdn.com/tfs/TB1hTqUM3DqK1RjSZSyXXaxEVXa-870-579.gif)

## 物料源管理

物料源管理可以让用户开启或关闭物料源的能力。

示例：关闭小程序物料。

![物料源管理](https://img.alicdn.com/tfs/TB1hKi6M7voK1RjSZFNXXcxMVXa-870-579.gif)

## 通用

### 终端

终端配置用于指定「打开终端」时调用的终端。目前提供了 Terminal/iTerm2 终端用于选择。

### 编辑器

编辑器配置用于指定「打开编辑器」时调用的编辑器。

Iceworks 默认内置了 VSCode、SublimeText、Atom、WebStorm 等编辑器。

Iceworks 没法覆盖所有用户的编辑器选择，或者安装是绿色版的编辑器，Iceworks 无法查找到的，也可通过自设置自定义编辑器启动脚本。

1. 首先系统环境中存在对应的编辑器启动脚本

    可以通过命令行唤起编辑器。

    - Sublime Text 设置方法：https://www.sublimetext.com/docs/3/osx_command_line.html
    - VSCode 设置方法： https://code.visualstudio.com/docs/editor/command-line

        mac `command+shift+p` win `ctrl+shift+p` 命令面板中输入 `command` 选中回车即可

        ![](https://img.alicdn.com/tfs/TB1FOXsb3HqK1RjSZFgXXa7JXXa-608-354.png)
     - 其他编辑器请自行搜索配置方法

    配置完成后，能在系统命令行内启动。以为 VSCode 为例：

    ```bash
    cd home/project
    code ./
    ```

    能打开编辑器后，则表示配置成功。

2. 修改 Iceworks 里的设置

    1. 进入 设置 -> 通用 -> 编辑器 选择【自定义编辑器启动脚本】
    2. 输入启动脚本 `code ${cwd}`

        ![](https://img.alicdn.com/tfs/TB13f8Xv_mWBKNjSZFBXXXxUFXa-627-271.png)

        `${cwd}` 表示项目路径，在启动时会替换掉。
        同理如果是 Sublime Text 则设置为  `subl ${cwd}`
        如果你的启动脚本带有参数例如： `myeditor --project ./`， 则脚本为 `myeditor --project ${cwd}`

### NPM 源

NPM 源的配置将决定 Iceworks 在安装依赖时的数据源。Iceworks 默认提供了 npm/cnpm/tnpm 等源，亦可通过自定义的方式指定源 URL。

![自定义 NPM 源](https://img.alicdn.com/tfs/TB1UJe4M5rpK1RjSZFhXXXSdXXa-1740-1200.jpg)

### 登录

对于阿里内部用户，Iceworks 提供了登录功能，登录后便可以使用一些与阿里内部环境有关的插件和能力。