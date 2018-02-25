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
├── abc.json
├── package.json
├── node_modules/
└── src
    ├── components
    │   └── Header
    │       └── index.jsx
    └── pages
        └── home
            ├── App.jsx
            ├── index.html
            └── index.jsx
```

这就是一个资源独立仓库基本的结构。

## 创建 git 仓库

当初始化好一个资源独立仓库的项目后，应立即在 [gitlab](http://gitlab.alibaba-inc.com/) 上创建对应的 git 项目托管我们的代码。

### 1. 创建 git 仓库

将 ice-demo 仓库创建到对应业务的 Group 下，如业务没有自己的 Group, 可在 Gitlab 上新建一个。

我们推荐的仓库命名规范为：`业务名 + -assets`，比如达人业务命名为：`daren-assets`。

### 2. 提交项目到 gitlab 仓库

在初始化的项目根目录下执行以下命令，并将初始化的文件推送到 git 仓库：

```bash
git init
git remote add origin git@gitlab.alibaba-inc.com:ice-assets/ice-demo.git
git add .
git commit
git push -u origin master
```

## 分支管理

git 仓库创建好后，此时只有一个 master 主干，不允许向 master 提交代码，后续开发都应该创建分支在分支上开发。

### 1. 创建新分支

创建一个名为 daily/0.1.0 的分支。并将分支提交到 gitlab 仓库上。

```bash
$ git checkout -b daily/0.1.0                    # 创建分支
$ git push origin daily/0.1.0                    # 提交分支
```

这样就创建好一个名为 daily/0.1.0 的分支了。 分支名是可以任意定义的，比如你可以创建自己的功能命名的分支, 如 `git checkout -b feature/login` 表示一个登录功能的分支。

分支名格式为：daily/x.y.z （xyz 表示数字），后续可直接发布到 CDN，推荐使用此格式创建分支。

### 2. 提交变更代码

在编写代码完成后，或者某个功能完成时，可以将变更的代码提交到远端分支，准备部署发布。

> 提交代码可以使用 git 命令行，也可以使用 IDE 的提交工具，这里不再赘述。

## 部署资源到 CDN

当项目需求的功能都开发完成后，需要将资源发布到 CDN，前端只有日常环境与线上环境。

给项目的日常环境、预发环境（通过 host 绑定实现）使用。当测试完成后，需要正式发布上线时，则需要将资源部署到 CDN 线上环境。

> 注：如果是新业务接入需要申请 Group 的 CDN 发布权限，具体请在 ICE 万能群咨询。

### 1. 确定要发布的分支名

将资源发布到 CDN， 对当前发布分支名是有要求的，必须符合 `daily/x.y.z` 的格式。 xyz 为数字。

根据前端最佳实践，第一次发布使用分支名 `daily/0.1.0` 后续逐位递增，如： `daily/0.1.1` 以此类推。

### 2. 部署到 CDN 日常环境

执行 `def publish` 后，会出现提示询问选择发布环境。默认选择日常环境。

也可以使用缩写命令 `def publish -d` 跳过选择界面，默认发布到日常环境。

如下所示：

```bash
$ def publish
info [publish] 当前仓库默认执行 assets（JS、CSS）发布  [def p assets]
? 请选择需要发布的环境？ (Use arrow keys)
❯ 发布到日常（daily）环境  [def p assets -d, --daily]
  发布到线上（prod）环境   [def p assets -o, --prod]
```

回车确定，发布的日志会在控制台打出，发布发布完成后，会罗列出所有发布的文件。

日常环境的资源域名是：

`g-assets.daily.taobao.net`

### 3. 部署到 CDN 线上环境

执行 `def publish` 后，会出现提示询问选择发布环境。默认选择日常环境。需要使用方向键选择线上环境。

也可以使用缩写命令 `def publish -o` 跳过选择界面，默认发布到线上环境。

如下所示：

```bash
$ def publish
info [publish] 当前仓库默认执行 assets（JS、CSS）发布  [def p assets]
? 请选择需要发布的环境？ (Use arrow keys)
  发布到日常（daily）环境  [def p assets -d, --daily]
❯ 发布到线上（prod）环境   [def p assets -o, --prod]
```

回车确定，发布的日志会在控制台打出，发布发布完成后，会罗列出所有发布的文件。

线上环境的资源域名是：

`g.alicdn.com`

## 总结

### 分支名的作用

符合 `daily/x.y.z` 的分支名，在线上部署完成后，会自动合并代码到 master。发布后的资源使用分支名所定义的版本。

发布成功后资源路径的格式为 `{域名}+{gitlab 组名}+{仓库名}+{分支号 x.y.x}+{资源文件路径}`

例如：仓库 ice-assets/ice-demo 分支： daily/0.1.0

- 日常环境发布后得到的 cdn 资源路径是：

`//g-assets.daily.taobao.net/ice-assets/ice-demo/0.1.0/pages/home/index.js`

- 线上环境发布后得到的 cdn 资源路径是：

`//g.alicdn.com/ice-assets/ice-demo/0.1.0/pages/home/index.js`

### 项目预发环境

CDN 不存在预发环境，当在项目预发环境测试时访问 CDN 的线上资源，但是在项目预发测试的时候，资源还没有部署到 CDN 线上环境。可以使用绑定 hosts 的方式来访问。

```
10.101.73.189 g.alicdn.com
```
