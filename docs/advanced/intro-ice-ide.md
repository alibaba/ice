---
title: ICE IDE 介绍
category: 入门指引
order: 12
---

我们强烈推荐使用 VSCode 来开发前端及其他语言的代码，其针对代码高亮、代码识别、加载性能均有非常深入的优化。此外它还拥有丰富的插件，如 IDEA keymaps 插件可以将 IDEA 的快捷键习惯直接映射过来，你可以用 IDEA 的快捷键习惯编写代码等。

## 安装方法

详情请参见：[开发环境配置](/docs/basis/env-config) 文档，这里不再赘述。

## 特色功能

### 各种 IDE 代码分析、跳转等功能

摁下 `cmd` 将鼠标放在上面，即可看到代码预览，点击即可跳转到对应代码位置，亦可用快捷键 `control + -` 或者 `shift + control + -` 来在几个点击过的位置跳转。

![](https://img.alicdn.com/tfs/TB1GJoVdwoQMeJjy1XaXXcSsFXa-1864-1100.gif)

### 代码自动格式化

现在，你可以随便写代码，我们会按照前端社区最佳实践和强大的 prettier 工具为你的代码进行格式化，它基于字符长度会自动决定是否换行，以及对你代码本身进行一些优化。

这一切，都在你摁下保存的时候，自动完成！

![](https://img.alicdn.com/tfs/TB1R0cVdwoQMeJjy1XaXXcSsFXa-2014-1104.gif)

### ICE 组件 props 补全、说明功能

无需查看文档，直接看到 props 和相关说明。

![](https://img.alicdn.com/tfs/TB1rstddUgQMeJjy0FjXXaExFXa-2070-640.gif)

### ICE 常用代码片段

我们为你提供了大量优质的代码片段，你只需要简单敲几个代码，即可创建代码片段，加速你的编码。

![](https://img.alicdn.com/tfs/TB1ZWfUXqagSKJjy0FbXXa.mVXa-1244-700.gif)

目前支持的 snippets 列表：

| 触发短语 | 内容                                                                                                                                                               |
| -------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|   `rcc→` | 创建一个 React Component                                                                                                                                           |
|   `con→` | 创建一个 constructor 方法                                                                                                                                          |
|   `cwm→` | 创建 componentWillMount 方法，该方法只会执行一次，在第一次 render 之前触发                                                                                         |
|   `cdm→` | 创建 componentDidMount 方法，该方法只会执行一次，在第一次 render 之后触发，此时 DOM 已经生成                                                                       |
|   `cwr→` | 创建 componentWillReceiveProps 方法，该方法会在每次上层组件 render 时触发，接收到最新的上层 props。通常用来更新 state 或者对比 props 变化                          |
|   `scu→` | 创建 shouldComponentUpdate 方法，该方法会在每次组件 render 时触发，可以接收到新的 props 和 state，通过 return false 阻止组件调用 render 方法。通常用来优化组件性能 |
|  `cwup→` | 创建 componentWillUpdate 方法，该方法会在每次组件 render 之前被触发                                                                                                |
|  `cdup→` | 创建 componentDidUpdate 方法，该方法会在每次组件 render 之后被触发                                                                                                 |
|  `cwun→` | 创建 componentWillUnmount 方法，该方法会在组件被销毁的时候触发，此时组件 DOM 被移除                                                                                |
|   `sst→` | 创建 setState 方法                                                                                                                                                 |
|   `clg→` | 创建一个 console.log 方法                                                                                                                                          |
|    `ed→` | 创建 Export default                                                                                                                                                |
|    `cm→` | 创建一个注释                                                                                                                                                       |
|  `cmmb→` | 创建一个结构化的注释                                                                                                                                               |
|   `met→` | 创建一个组件的方法 `xxx = () => {}`                                                                                                                                |
|   `fre→` | 创建一个 forEach 方法                                                                                                                                              |
|   `dob→` | 解出对象上的属性 `const {${1:propertyName}} = ${2:objectToDestruct};`                                                                                              |
|   `sti→` | 创建一个循环定时器 `setInterval(() => {\n\t${2}\n}, ${0:intervalInms});`                                                                                           |
|   `sto→` | 创建一个定时器 `setTimeout(() => {\n\t${2}\n}, ${1:delayInms});`                                                                                                   |
|  `prom→` | 创建一个 Promise                                                                                                                                                   |
