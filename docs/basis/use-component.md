---
title: 如何使用 ICE 组件
category: 入门指引
order: 6
---

ICE 的组件统一使用 NPM 进行管理，所有的组件包都可以通过 npm 命令来安装。

## 检索组件

ICE 所有组件文档说明都部署在[物料 - 组件](#/component)上，同时你也可以在全局搜索框输入你想要的的组件名称进行查找。

## 安装与更新

ICE 基础组件在初始化项目时，已默认安装。这里主要讲解业务组件的安装与更新方法。

### 安装业务组件

在对应的业务组件文档上都有具体的安装和升级方法：

#### 安装命令：

```bash
npm install <packageName> --save
```

#### 更新命令：

```bash
npm install <packageName>@latest --save
```

当需要更新项目内的组件的时，使用此命令 `@latest` 表示当装当前最新版本。也就达到升级组件的目的。

关于组件版本说明详见[组件版本号规则](#/docs/others/version-rules)。

## 使用组件

使用 `import <ComponentName> from '<packageName>';` 语句载入脚本，并定义为 `ComponentName` 。

> 对应组件文档下都有 DEMO 示例，可点击 查看源码 / 实时编辑 查看效果。

如：

```jsx
import ReactDOM from 'react-dom';
import IceTitle from '@icedesign/title';

// .... 省略其他代码

// 渲染
ReactDOM.render(<IceTitle />, mountNode)
```
