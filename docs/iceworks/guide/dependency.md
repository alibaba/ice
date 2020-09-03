---
title: 依赖包管理
order: 6
---

在前端项目工程中使用 npm 来管理 Node.js 的包依赖，需要在项目根目录下创建 package.json 文件，其中与包依赖相关的常用字段有：

* **dependencies：**指定项目运行时所依赖的模块；
* **devDependencies：**指定项目开发时所需要的模块；
* **peerDependencies：**指定当前模块所在的宿主环境所需要的模块及其版本；

npm 默认所有的 Node.js 包都使用 [Semantic Versioning](https://docs.npmjs.com/about-semantic-versioning) 控制包依赖版本, 比如：

```json
// package.json
{
  "devDependencies": {
    "ice.js": "^1.0.0"
  }
}
```

更多配置可参考 [package.json 文档](https://docs.npmjs.com/creating-a-package-json-file)。

在项目根目录下执行 `npm install` 命令，可将 package.json 文件中描述的包依赖安装至项目根目录下的 node_modules 文件夹中。

PS：安装 Node.js 时会自动安装 npm ，可至 [https://nodejs.org/en/](https://nodejs.org/en/) 下载安装。

使用 Iceworks 可对当前前端工程项目进行依赖包管理：

![img01](https://img.alicdn.com/tfs/TB1VXJ1hlFR4u4jSZFPXXanzFXa-2880-1662.png)

点击左侧栏 Iceworks 图标，在 `NODE DEPENDENCIES` 栏中，可展示当前项目的依赖包信息（包含包名和当前安装的版本）。将鼠标移入 `NODE DEPENDENCIES` 区域内时，会出现 3 个操作按钮，功能如上图所示。

## 查看依赖信息、升级依赖包或重装应用依赖

![使用示例](https://user-images.githubusercontent.com/56879942/87393973-9cf77d00-c5e1-11ea-8baa-96c8c41229cf.gif)

1. 在左下角依赖库中查看应用安装的所有依赖；
2. 点击依赖项目旁边的 `⬆️` 按钮，即可更新到最新依赖；
3. 点击依赖列表标题框上的 `重装依赖` 按钮，即可重装应用的所有依赖包。

## 一键安装或重装指定依赖

![使用示例](https://user-images.githubusercontent.com/56879942/87393970-9bc65000-c5e1-11ea-9724-3bd47c4b21ed.gif)

1. 点击依赖列表标题框上面的 `+` 按钮；
2. 在出现的命令面板上选择安装为 Dependencies (生产环境的依赖)或 devDependencies (开发环境的依赖)；
3. 输入需要安装的 npm 包及版本信息，例如 `typescript@latest` ；
4. npm 包将会自动安装，如果这个包已经添加到了依赖中，那么将会重新安装。

## 使用 npm 包

通过 Iceworks 安装包依赖后，便可以在代码中引用它了。引入需要的 npm 包时，会出现智能提示，快速完成代码输入。

![img03](https://img.alicdn.com/tfs/TB1LZqvjz39YK4jSZPcXXXrUFXa-2880-1662.png)
