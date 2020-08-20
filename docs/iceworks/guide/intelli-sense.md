---
title: 编码辅助
order: 7
---

通过 Iceworks 进行源码链路开发时，会提供代码补全、信息提示、文档搜索、等一系列优化提升您的开发体验。

## 代码补全

Iceworks 会根据当前的项目、当前的文件以及光标所在的位置，为我们提供一个建议列表。这个列表包含了在当前光标位置下我们可能会输入的代码。当我们不断地输入字符，Iceworks 就会根据当前输入的字符，在这个列表进行过滤。

比如输入样式字段和值时，Iceworks 会建议相关内容：

![使用示例](https://user-images.githubusercontent.com/56879942/87412958-3895e700-c5fc-11ea-88e2-3e3e78a07f9e.gif)

当我们找到了合适的选项后，按下 Tab 键或者回车键就可以将其补全。如果希望暂时不看到自动补全窗口，可以按下 Escape 键将其隐藏。

当前触发 Iceworks 代码补全的情况有：

### 变量赋值

使用 CSS Module 时，根据样式声明进行样式字段的自动补全：

![使用示例](https://user-images.githubusercontent.com/56879942/87412953-36cc2380-c5fc-11ea-9315-f153b1415dc8.gif)

### className 属性

在编辑组件的 `className` 时，根据文件 `import` 的样式文件内的类选择器进行自动补全提醒。

![使用示例](https://user-images.githubusercontent.com/56879942/87412926-2caa2500-c5fc-11ea-9acc-78974ddb1932.gif)

### SASS 变量开发

在 SASS 文件内输入变量时，根据引用文件进行代码自动补全：

![使用示例](https://user-images.githubusercontent.com/56879942/87523081-026a6d00-c6b9-11ea-8e8a-5d62688c020d.gif)  

## 信息提示

当您的鼠标移动到某些文本上之后，稍待片刻就能看到一个悬停提示窗口。这个窗口里会显示跟鼠标下文本相关的信息。比如在示例代码中，当鼠标移动到样式属性上后，悬停提示窗口里展示了当前的样式信息。

![使用示例](https://img.alicdn.com/tfs/TB16WClt.Y1gK0jSZFCXXcwqXXa-1468-906.gif)

当前触发 Iceworks 信息提示的情况有：

### SASS 变量预览值

鼠标停留在变量上，出现悬浮部件显示该变量对应的值：

![使用示例](https://user-images.githubusercontent.com/56879942/87412974-3e8bc800-c5fc-11ea-9a6c-ea62eecbfbff.gif)

### 工程配置文件

当您将鼠标悬停在某个 Json 的字段上时，会出现悬浮小部件显示字段的描述。

![使用说明](https://user-images.githubusercontent.com/56879942/87398212-290ca300-c5e8-11ea-9596-c15c380c0d7c.gif)

## 文档搜索

当开发 [Ice](https://ice.work/) 和 [Rax](https://rax.js.org/) 项目时，可搜索对应文档，并自动识别当前使用到的组件进行文档推荐。

通过命名面板激活：

![使用说明](https://user-images.githubusercontent.com/56879942/90105060-d73a7280-dd77-11ea-8cb6-dbda547adcf2.gif)

或者在 JSX 中通过鼠标右键激活：

![使用说明](https://user-images.githubusercontent.com/56879942/90105045-d3a6eb80-dd77-11ea-9d4e-e0f4433e36c1.gif)

#### 使用

![使用说明](https://user-images.githubusercontent.com/56879942/90112425-8d0abe80-dd82-11ea-955c-38fdaea2e7eb.gif)

1. 搜索您需要查找文档的组件名
2. 点击组件名后，选择打开组件文档的方式
3. 浏览文档

或者：

![使用说明](https://user-images.githubusercontent.com/56879942/90112444-93009f80-dd82-11ea-8413-9578f7244a21.gif)

1. 将鼠标悬停在需要查找文档的组件标签上
2. 点击文档链接
3. 浏览文档

## 代码定位

当我们看到某个函数的调用，想要知道这个函数的接口定义是什么样的，它的实现细节是什么样的，需要的直接跳转到定义和实现的位置。比如当你在使用样式属性时，按下 Command（windows 为 Ctrl） 键点击对应的 `className` 值，跳转到该值的定义处

![使用示例](https://user-images.githubusercontent.com/56879942/87412950-35026000-c5fc-11ea-83ee-33de13681911.gif)

当前触发 Iceworks 支持定位的情况有：

### SASS 变量的定义跳转

通过 cmd + 点击（ Windows: ctrl + 点击 ）进行变量的定义代码跳转：

![使用示例](https://user-images.githubusercontent.com/56879942/87419478-2456e780-c606-11ea-9842-47a01b7e85c8.gif)
