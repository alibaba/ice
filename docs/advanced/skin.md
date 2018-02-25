---
title: 自定义主题功能
category: 进阶指南
order: 1
---

基于配置平台，ICE 提供了主题功能，通过主题功能可以实现对组件基础样式的个性化。因此如果有主题需求，请按照该文档的步骤执行。

当然你也可以直接使用现有的主题列表：

- 橙色精细尺寸（`@alife/dpl-ice-theme-orange`）：http://fusion-design.alibaba-inc.com/theme/detail/788
- 蓝色精细尺寸（`@alife/dpl-ice-theme-blue`）：http://fusion-design.alibaba-inc.com/theme/detail/789
- 蓝色中等尺寸（`@alife/dpl-ice-theme-blue-m`）：http://fusion-design.alibaba-inc.com/theme/detail/790
- 橙色中等尺寸（`@alife/dpl-ice-theme-orange-m`）：
http://fusion-design.alibaba-inc.com/theme/detail/805
- 所有主题列表：http://fusion-design.alibaba-inc.com/user/theme

## 1. 新建主题

- 点击新建主题的链接：http://fusion-design.alibaba-inc.com/theme/clone/18
- 填写表单：
  - 主题名：ice-seller-test, 命名规则为 ice-业务名
  - 主题描述：业务描述

  ![image](http://git.cn-hangzhou.oss.aliyun-inc.com/uploads/ice/notes/9bd7e2e756cd0914417a275f4dd2407a/image.png)

- 点击「克隆一个新主题」
- 初始化主题包：在新页面点击左侧的 publish -> 填写主题名（如 `@alife/dpl-ice-seller-test`） -> 点击下一步

  ![image](http://git.cn-hangzhou.oss.aliyun-inc.com/uploads/ice/notes/20c0c29ebfadcc649d476c2c6e1e3832/image.png)

如上，一个新的主题包就初始化完成了，接下来就是如何配置主题包了。

## 2. 配置主题

在上文的主题页面，点击左侧的不同导航链接即可配置对应的内容，通常情况下，我们**仅仅需要配置主题颜色**，这时候只需要点击 「Color」链接，然后对主题色进行适当的变更即可：

![image](http://git.cn-hangzhou.oss.aliyun-inc.com/uploads/ice/notes/3e12712591f512314f26c67b6337a9e0/image.png)

**注意：尽量避免针对单个组件配置样式，因为这样可能会引发一些不可预知的问题。**

## 3. 发布主题

主题配置完成后，还需要对主题进行发布，这样开发人员才能使用。点击左侧的「publish」按钮，然后点击绿色的发布按钮即可：

![image](http://git.cn-hangzhou.oss.aliyun-inc.com/uploads/ice/notes/880512c498639200946496192a2d7873/image.png)

当出现以下情况时，即说明发布成功，开发人员就可以使用啦：

![image](http://git.cn-hangzhou.oss.aliyun-inc.com/uploads/ice/notes/e55607f048b11d7b20471c695070f600/image.png)

## 4. 使用主题

视觉同学将如下信息通知给开发同学：

1. 第一步中配置的主题名(如 `@alife/dpl-ice-seller-test`)
2. 主题的 icon 地址，如：http://fusion-design.alibaba-inc.com/theme/config/391#!/style/icon

开发同学首先添加依赖：

```bash
def add @alife/dpl-ice-seller-test
```

然后在 abc.json 里配置主题包：

```
"options": {
  "themePackage": "@alife/dpl-ice-seller-test"
}
```

重新执行 `def dev` 即可看到主题生效。

## 5. 主题更改

如果开发期间需要变更主题的某些配置，请按照以下步骤：

- 设计师在配置平台上配置修改主题
- 设计师将主题包发布对应版本
- 通知开发者升级主题包
- 项目生效
