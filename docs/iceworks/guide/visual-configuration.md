---
title: 可视化配置
order: 5
---

在前端项目工程中常常使用 xxx.json 作为配置文件，比如 app.json，build.json，tsconfig.json 等等。

使用 Iceworks 可对所有的 json 配置文件通过可视化表单设置的方式对配置文件进行编辑。

## 激活

### 在侧边栏激活面板

![使用说明](https://user-images.githubusercontent.com/56879942/89489442-18ada980-d7dd-11ea-8db3-1751e5db2eca.gif)

1. 在资源文件夹选择配置文件，点击鼠标右键
2. 在右键列表中选择 `Iceworks: 可视化设置 xxx.json`
3. 启动可视化配置面板

### 在文档编辑器中激活面板

![使用说明](https://user-images.githubusercontent.com/56879942/89489443-19464000-d7dd-11ea-9eeb-2958027525c4.gif)

1. 打开配置文件，点击鼠标右键
2. 在右键列表中选择 `Iceworks: 可视化设置 xxx.json`
3. 启动可视化配置面板

或者：

点击标签栏右侧的搜索图标，启动可视化配置面板。

## 配置提示与校验

为 [icejs](https://ice.work/)(& [rax-app](https://rax.js.org/)) 的配置类文件(build.json/app.json) 提供可视化表单设置或代码编辑提醒、校验等功能。

![使用说明](https://user-images.githubusercontent.com/56879942/87398228-2e69ed80-c5e8-11ea-8b2e-611924fa76bb.gif)

* **悬停提示：**当您将鼠标悬停在某个 Json 的字段上时，会出现悬浮小部件显示字段的描述。
* **自动补全：**当您在输入时，显示与您的配置相关的建议。
* **代码片段：**预设标准的代码片段，方便您进行快速配置。
* **类型校验：**当您的输入与配置项申明类型不同时，予以提示相关类型错误。
