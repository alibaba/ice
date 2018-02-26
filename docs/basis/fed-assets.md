---
title: 资源独立仓库开发实践
order: 3
category: 入门指引
---

在初始化 ICE 项目的时候，有一个选择项为 「资源独立仓库」，与资源同仓库有什么区别呢，接下来向大家详细的介绍下。

## 文件存放位置不同

资源独立仓库表示该仓库仅含有 ICE 项目的资源，所以在根目录下由 `src` 文件夹存放源码文件。

如下所示：

```
ice-demo(项目根目录)
├── package.json
├── node_modules/
├── public/
│   └── index.html
└── src
    ├── components
    │   └── Header
    │       └── index.jsx
    └── pages
        └── Home
            ├── App.jsx
            └── index.jsx
```

这就是一个资源独立仓库基本的结构。

## 创建 Git 仓库

### 1. 创建 Git 仓库

### 2. 提交项目到 Git 仓库

在初始化的项目根目录下执行以下命令，并将初始化的文件推送到 git 仓库：

```bash
git init
git add .
git commit
```

## 分支管理

Git 仓库创建好后，此时只有一个 master 主干，不允许向 master 提交代码，后续开发都应该创建分支在分支上开发。

### 1. 创建新分支

创建一个名为 feature/0.1.0 的分支。并将分支提交到 gitlab 仓库上。

```bash
$ git checkout -b feature/0.1.0                    # 创建分支
$ git push origin feature/0.1.0                    # 提交分支
```

这样就创建好一个名为 daily/0.1.0 的分支了。 分支名是可以任意定义的，比如你可以创建自己的功能命名的分支, 如 `git checkout -b feature/login` 表示一个登录功能的分支。

分支名格式为：daily/x.y.z （xyz 表示数字），后续可直接发布到 CDN，推荐使用此格式创建分支。

### 2. 提交变更代码

在编写代码完成后，或者某个功能完成时，可以将变更的代码提交到远端分支，准备部署发布。

> 提交代码可以使用 git 命令行，也可以使用 IDE 的提交工具，这里不再赘述。
