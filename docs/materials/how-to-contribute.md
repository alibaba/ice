---
title: 如何贡献
order: 7
category: 物料
---

目前飞冰提供了基于 React 技术栈的物料，React 物料由飞冰团队维护，每周会定期更新。但在飞冰的用户群里，我们收到很多反馈，希望能提供对 Vue 的支持，为此，我们提供了开发者工具 ice-devtools，以及基础的 Vue 物料。当然，这对于物料体系来说，所做的远远不够，如果你热爱开源，欢迎与我们一起共同建设。

## 环境准备

```
// 安装开发者工具 ice-devtools
$ npm i ice-devtools -g

// clone 官方仓库
$ git clone git@github.com:alibaba/ice.git
```

## 开发区块

以开发 React 物料为例添加一个区块，首先进入 ice/react-materials 项目目录，通过 `ice-devtools add` 命令选择需要添加的物料类型，根据提示输入对应的信息，添加完成后会在 `ice/react-materials/blocks` 目录下新增对应的模板文件。

```
$ cd ice/react-materials
$ ice-devtools add
  ? 选择添加类型 (Use arrow keys)
  ❯ 区块
    模板
```

目录结构如下：

```
.
└── ExampleBlock
    ├── README.md               // 说明文档
    ├── package.json            // pkg.json
    └── src                     // source 源码目录
        └── index.js            // 模块入口
```

## 提交代码

### 提交 Pull Request

如果你准备贡献代码，那么你可以创建分支修改代码提交 PR，飞冰开发团队会 review 代码合并到主干。

```bash
# 先创建开发分支开发，分支名应该有含义，避免使用 update、tmp 之类的
$ git checkout -b branch-name

# 开发完成后可以运行 lint 检查语法
$ npm run lint

# 提交代码，message 见下面的规范
$ git add . # git add -u 删除文件
$ git commit -m "fix: add xxx block"
$ git push origin branch-name
```

提交后就可以在 [ice](https://github.com/alibaba/ice/pulls) 创建 Pull Request 了。

### 代码风格

你的代码风格必须通过 eslint，你可以运行 `$ npm run lint` 本地测试。

### Commit 提交规范

根据 [angular 规范](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit-message-format)提交 commit，这样 history 看起来更加清晰，还可以自动生成 changelog。

```xml
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

（1）type

提交 commit 的类型，包括以下几种

- feat: 新功能
- fix: 修复问题
- docs: 修改文档
- style: 修改代码格式，不影响代码逻辑
- refactor: 重构代码，理论上不影响现有功能
- perf: 提升性能
- test: 增加修改测试用例
- chore: 修改工具相关（包括但不限于文档、代码生成等）
- deps: 升级依赖

（2）scope

修改文件的范围

（3）subject

用一句话清楚的描述这次提交做了什么

（4）body

补充 subject，适当增加原因、目的等相关因素，也可不写。

（5）footer

- **当有非兼容修改(Breaking Change)时必须在这里描述清楚**
- 关联相关 issue，如 `Closes #1, Closes #2, #3`

* 查看具体[文档](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit)
* [CONTRIBUTING.md](https://github.com/alibaba/ice/blob/master/.github/CONTRIBUTING.md)

## 发布

当你提交的 Pull Request 被合并到主干后，我们会进行发布并将你贡献的物料同步在[飞冰官网](#/)。
