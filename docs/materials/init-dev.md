---
title: 物料初始化与开发
order: 2
---

### 初始化物料项目

通过 `idev init` 命令可以初始化一个物料项目：

```bash
# 新建物料项目
$ mkdir my-materilas & cd my-materilas

# 初始化物料项目
$ idev init
```

init 之后会生成如下的目录结构：

```
my-materials/
  ├── .template     // 自定义模板
  │   ├── block
  │   ├── component
  │   └── scaffold
  ├── build         // 存放生成的物料数据
  ├── blocks
  │   ├── ExampleBlock
  ├── components
  │   └── ExampleComponent
  └── scaffolds
      └── ExampleScaffold
```

初始化完成后，用户即可开始开发自己的物料，当需要添加新的物料时，只需要在物料源码根目录下执行 `idev add` 即可。此时，ice-devtools 将从 `.template/` 目录读取物料模版，生成物料源码。这意味着，当用户需要自定义物料模版时，只需要编辑 `.template/` 目录下的模版文件即可。

### 开发物料

不同物料体系可能使用不同的框架或工具，实际开发方式也会有所差异，此处根据选择的前端方案参考不同文档即可：

- [开发 React 物料](./react.md)
- [开发 Vue 物料](./vue.md)
- [开发 Angular 物料](./angular.md)

如有其他框架/工具的需求，欢迎反馈给飞冰（ICE）团队。

当然除了这些与框架/工具有关的差异性外，物料的开发还有很多的一致性：

```bash
# 进入单个物料的目录
$ cd blocks/ExampleBlock
# 安装依赖
$ npm install
# 启动调试服务
$ npm start

# 开发调试代码……

# 发布 npm 包
npm version [patch|minor|major|...]
npm publish
```

### 生成物料数据

在物料开发完成并**发布每个物料对应 npm** 之后，就可以生成物料源数据了：

```bash
# 生成的物料源数据在 build 目录下
$ npm run generate
$ ls build/
materials.json
```

这份物料数据时一份标准协议，可以在 iceworks, fusion.design 以及其他各种端使用，具体协议规范请参考 [物料数据协议](./schema.md)。

目前这只是一份静态数据，想要在 iceworks 里使用这份物料的话需要参考下文将其托管到某些服务上生成一个 url。
