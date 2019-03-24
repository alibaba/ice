---
title: Git 仓库开发实践
order: 3

---

使用 Iceworks 创建项目后，会自动生成项目的脚手架文件，下面就对这些文件的仓库管理进行说明。

## 目录结构

以 `ICE Design Pro` 模板为例:

```
ice-design-pro
├── dist        // 打包资源
├── mock        // 模拟数据
├── public      // 静态资源
├── src
│   ├── components   // 公共组件
│   ├── layouts      // 通用布局
│   ├── pages        // 页面
│   ├── index.js     // 应用入口
│   ├── menuConfig   // 导航配置
│   ├── routerConfig // 路由配置
│   └── router.jsx   // 路由入口
├── tests            // 测试
├── .gitignore       // git 忽略目录配置
├── .editorconfig    // 代码风格配置
├── .eslintignore    // eslint 忽略目录配置
├── .eslintrc        // eslint 配置
├── package.json     // package.json
└── README.md        // 项目说明
```

## 使用命令行操作

这里介绍使用命令行操作 git 仓库的基本命令，如果您使用 GUI 工具 (如 SourceTree) 进行管理，请遵循该工具的帮助文档。

### 初始化 Git 仓库

在初始化的项目根目录下执行以下命令，并将初始化的文件推送到 git 仓库：

```bash
$ git init
$ git add .
$ git commit # 输入提交信息并保存
```

### 2. 提交项目到远程 Git 仓库

您需要使用 github 或者 gitlab 创建一个远程仓库，由于 Git 是一种分布式仓库管理工具，如果您打算只在本地使用这些代码, 那么可以忽略这一步。

```bash
$ git remote add origin git://your-repo-url
$ git push origin master -u
```

## 分支管理

Git 仓库创建好后，此时只有一个 master 主干，不允许向 master 提交代码，后续开发都应该创建分支在分支上开发。

### 创建新分支

创建一个名为 feature/0.1.0 的分支。并将分支提交到 gitlab 仓库上。

```bash
$ git checkout -b feature/0.1.0                    # 创建分支
$ git push origin feature/0.1.0                    # 提交分支
```

这样就创建好一个名为 daily/0.1.0 的分支了。 分支名是可以任意定义的，比如你可以创建自己的功能命名的分支, 如 `git checkout -b feature/add-login` 表示一个登录功能的分支。

### 提交变更代码

在编写代码完成后，或者某个功能完成时，可以将变更的代码提交到远端分支，准备部署发布。
