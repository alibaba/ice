---
title: WebStorm 推荐配置
category: 入门指引
order: 12
hide: true
---

如果您使用 WebStorm 来进行项目的开发，我们还推荐配置如下插件，进一步提升你开发前端的流畅度。

### 配置功能点

* [代码自动格式化工具 Prettier](todo)

### 代码自动格式化工具 Prettier

Prettier 是针对 React 语法推出的代码格式化工具，基于 AST 精准分析，代码格式化速度快更加准确。

#### 第一步：安装 Prettier 工具

打开命令行，直接执行 `sudo tnpm install prettier -g` 即可。

#### 第二步：打开 IDEA External Tools 配置界面

打开 IDEA 找到 Settings 面板，搜索 external 即可找到 `External Tools` 工具。

![](https://img.alicdn.com/tfs/TB1KaqTSpXXXXabXpXXXXXXXXXX-1022-676.png)

#### 第三步：添加相关命令调用配置

点击 External Tools 右侧 `+` 即可打开配置界面：

* Program 设置为 `prettier`
* Parameters 设置为 `--write --single-quote --trailing-comma es5 $FilePathRelativeToProjectRoot$`
* Working directory 设置为 `$ProjectFileDir$`

![](https://img.alicdn.com/tfs/TB1Oai4SpXXXXXTXXXXXXXXXXXX-987-493.png)

配置完成之后，摁下快捷键 Cmd-Shift-A（OS X）或者 Ctrl+Shift+A（Windows、Linux）唤起命令执行窗口，然后输入 `prettier` 回车即可进行格式化。

![](https://img.alicdn.com/tfs/TB18_5GSpXXXXbxXFXXXXXXXXXX-1226-540.png)

#### 第四步：配置自动格式化

通常可以配置文件变动自动格式化功能，这里就需要配置 `File Watcher` 了。

首先先需要安装 File Watchers 插件：

![](https://img.alicdn.com/tfs/TB1ciKgSpXXXXbAapXXXXXXXXXX-1451-679.png)

之后，我们来配置文件变动监听之后的执行命令。打开 Settings 面板，搜索 file watchers 即可打开 `File Watchers`，点击右边 `+` 新建配置：

* File type 通过下拉找到 `React JSX` 文件。
* Scope 可以选为 `All Places`。
* Program 设置为 `prettier`
* Arguments 设置为 `--write --single-quote --trailing-comma es5 $FilePath$`
* Output paths to refresh 设置为 `$ProjectFileDir$`

![](https://img.alicdn.com/tfs/TB1O_5QSpXXXXaZXpXXXXXXXXXX-1022-676.png)

之后，当你编写 React JSX 代码时，就会自动进行格式化纠正，效果如下：

![](https://img.alicdn.com/tfs/TB1oiOZSpXXXXbDXXXXXXXXXXXX-600-376.gif)
