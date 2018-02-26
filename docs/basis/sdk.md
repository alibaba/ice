---
title:  SDK 命令详解
order: 2
category: 入门指引
---

开发环境搭建好后，我们来了解下 ICE SDK 有哪些命令。

## def init

表示初始化。在安装了 def 与 ICE 套件之后，执行

```bash
$ def init ice
```

将会在所执行路径下创建 ICE 项目的基础文件。这里需要事先创建好项目文件夹。

初始化包含如图以下三种模式：

- 传统页面
- 单页面应用（体验更好）
- 业务组件

接下来详细介绍此命令的选项。

### 1. 传统页面

会区分 前端资源是否放在单独仓库？

#### 否 > 非单独仓库

当已经存在一个 JAVA 的项目时，并打算将 ICE 资源与 JAVA 项目资源一同管理。可选择该模式。选中回车确定后。将在执行路径下创建名为 `assets` 的文件夹，用于存放 ICE 资源文件。

```bash
ice-project/
└── assets
    ├── abc.json
    ├── node_modules/
    ├── package.json
    └── src
        └── pages
            └── example
                ├── App.jsx
                ├── index.html
                └── index.jsx
```

#### 是 > 单独仓库

该模式将 ICE 资源单独的作为一个 git 仓库，存放在 [gitlab.alibaba-inc.com](http://gitlab.alibaba-inc.com) 同时具备将资源发布到 CDN 的能力，有别与 **资源同仓库**。

```bash
ice-project/
├── abc.json
├── node_modules/
├── package.json
└── src
    └── pages
        └── example
            ├── App.jsx
            ├── index.html
            └── index.jsx
```

### 3. 业务模块

此模式是开发一个组件，例如官网中的业务组件都是使用该模式初始化，开发的。如果当你将业务中的逻辑抽离成一个单独的模块，可以选择此模式将你的代码贡献出来，让更多的业务方使用到。

## def add

添加项目文件或模块，套件中提供了常用的文件模板，通过 add 命令能快速添加需要的内容；

add 命令提供了添加 page module 以及 ICE 组件 的功能。

### 1. def add page

添加项目页面，项目初始化时创建了 `example` 的示例页面。当我们需要添加自己的页面时，可使用此命令。

执行：

```bash
$ def add page
? page 名称 home
   create src/pages/home/index.jsx
   create src/pages/home/index.html
   create src/pages/home/App.jsx
```

按提示输入 "home" , 表示创建名为 "home" 的页面。

将会生成页面文件模板。

### 2. def add module

添加项目内的模块，一个功能模块需要反复使用的时候，建议作为一个 module 存在，或者在项目开发时抽象出各功能模块，以便后续重复使用，减少后期再次拆分的麻烦。

执行：

```bash
$ def add module
? module 名称 Header
? 请选择将 module 添加到以下路径 (Use arrow keys)
❯ 公共组件 (components)
  --- pages list ---
  pages/example
  pages/home
```

按提示需要输入 module 名称，输入 "Header"，默认选中 **公共组件 (components)** 回车确认后将会生成模块的文件模板。

```
   create src/components/Header/index.jsx
```

选择 pages list 下的页面，将会创建到指定的页面下。

### 3. def add \[moduleName\]

ICE 组件生态提供了丰富的业务组件，以及社区推荐组件。当需要使用此类组件的时候，可以通过 def add 来添加。

比如需要使用到 [AddItem 添加宝贝](http://ice.alibaba-inc.com/modules/ice-add-item/) 组件，可使用 

```bash
$ def add @ali/ice-add-item
```

命令添加到项目中。

这样即可在项目中通过 `import IceAddItem from '@ali/ice-add-item';` 引用。

## def dev

启动项目预览，可以实时编辑同步，浏览器自动刷新。

启动完成后，访问：[http://127.0.0.1:3333](http://127.0.0.1:3333) 即可。

### 命令行参数

#### --debug

开启调试功能, 浏览器上可打断点, 默认关闭。

示例：`def dev --debug` 由于代码是经过编译后的，无法直观的调试页面，开启后可调试源代码，浏览器里打断点。

#### --https

使用本地 https 服务器启动 dev-server, 配合 [smartLoader](/docs/addons/smart-loader) 在线上调试本地代码

#### --proxy <proxy\>

启动反向代理的 URL。

在本地调试时，往往需要调用其他服务的接口会存在跨域问题，可通过反向代理的方式解决。

例如：需要访问 www.taobao.com 的接口

`def dev --proxy=www.taobao.com`

这样在项目中发起请求 `/api/getUserInfo` 会将请求发送到 `http://www.taobao.com/api/getUserInfo`

#### --lazy

开启懒编译模式, 只构建访问的页面。

例如：`def dev --lazy` 此模式下不会编译任何页面，当你访问 [127.0.0.1:3333/src/pages/home/index.html](127.0.0.1:3333/src/pages/home/index.html) 会同步构建 home 页面，避免全量编译耗时太长。

#### --page <page\>

只限定启动某个 page。

示例：`def dev --page=pages/home` 这样只会编译预览 home 页面。避免全量编译耗时太长。

## def build

当开发工作完成后，需要将源代码编译。执行 build 后，将在 src 所在目录下生成 build 目录，用于存放编译后的代码。

### 命令行参数

#### --local (-l 为简写)

使用本地安装的 builder 执行构建

例如：`def build -l` 由于 build

默认使用云构建，云构建的机器为多核构建速度有保障，无特殊情况不要使用此模式。

## def publish

将文件发布到 CDN，仅支持资源独立仓库的模式（在初始化项目时选择的模式）。

执行：

```bash
$ def publish
? 请选择需要发布的环境？ (Use arrow keys)
❯ 发布到日常（daily）环境  [def p assets -d, --daily]
  发布到线上（prod）环境   [def p assets -o, --prod]
```

可以选择发布到对应的环境，分为日常与线上环境。
