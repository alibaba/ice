---
title: 快速开始
order: 1
---

## 初始化项目

### 使用 GUI

[下载地址](https://marketplace.visualstudio.com/items?itemName=iceworks-team.iceworks)

基于 Iceworks 选择初始化模板进行下载：

![](https://img.alicdn.com/tfs/TB1asBweMgP7K4jSZFqXXamhVXa-2374-1754.png)

### 使用 CLI

基于 `npm init ice` 命令选择初始化模板进行下载：

```bash
$ npm init ice <projectName>

# 或者使用 yarn
$ yarn create ice <projectName>
```

**选择模板**

可以根据实际情况选择小程序 TypeScript 或者 JavaScript 模板：

```bash
? Please select a template (Use arrow keys)
❯ Lightweight JavaScript template with Mini Program
  Lightweight TypeScript template with Mini Program
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

✨  Done
```

## 启动项目

进入新建的项目安装依赖：

```bash
# 进入项目
$ cd <projectName>
# 安装依赖
$ npm install
# 启动项目
$ npm start
```

![](https://img.alicdn.com/tfs/TB1zaUdQUY1gK0jSZFMXXaWcVXa-1379-425.png)

## 预览调试

打开小程序开发者工具，选中项目下的 `build` 目录，即可看到如下界面：

![miniapp](https://img.alicdn.com/tfs/TB1tk55diDsXe8jSZR0XXXK6FXa-2880-1754.png)

## 项目构建

项目开发完成后，可通过 `npm run build` 构建项目：

```bash
$ npm run build
```

