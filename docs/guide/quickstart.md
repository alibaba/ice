---
title: 快速开始
order: 3
---

icejs 支持通过命令行和 GUI 工具两种方式快速创建项目。

## 命令行 

**初始化项目**

可以选择使用 npm 或者 yarn 工具进行项目初始化，如下输入项目名即可：

```bash
$ npm init ice <projectName>
# or
$ yarn create ice <projectName>
```

**选择模板**

可以根据实际情况选择 TypeScript 和 JavaScript 模板，其中各包含一个轻量的 Lite 和功能完善的 Pro 模板：

```
? Please select a template (Use arrow keys)
❯ A lightweight TypeScript template.
  A lightweight JavaScript template.
  Pro TypeScript template，Integrated rich features such as charts, lists, forms, etc.
  Pro JavaScript template，Integrated rich features such as charts, lists, forms, etc
```

选择模板会自动创建项目，看到如下信息说明项目创建成功：

```bash
✔ download npm tarball successfully.
info clean package.json...
Initialize project successfully.
Starts the development server.

    cd <projectName>
    npm install
    npm start

✨  Done in 1339.46s
```

**启动项目**

按照上面的提示，进入新建的项目安装依赖即可：

```bash
$ cd <projectName>
# 安装依赖
$ npm install
# 启动项目
$ npm start
```

执行上述命令后，会自动打开浏览器窗口访问 [http://localhost:3333](http://localhost:3333，)，这时应该看到默认的页面。

## iceworks 工具

除了 iceworks CLI 命令行，也可以使用 iceworks 工具可视化的创建项目。

详见 [iceworks 快速开始](https://ice.work/docs/iceworks/quick-start)



