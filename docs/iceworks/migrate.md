---
title: 升级到 4.0 版本
order: 4
---

iceworks 4.0 默认提供了一键升级方案，当导入项目时会自动进行检查，主要分为以下三种方式：

## React 项目

* 第一步：当检测是 React 项目且未进行适配时会提示如下信息：

![iceworks](https://img.alicdn.com/tfs/TB1nNRNspP7gK0jSZFjXXc5aXXa-2000-1400.png)

* 第二步：点击“一键修复”即可完成项目的升级，这是会自动在 package.json 写入如下信息，表示该项目的研发模式：

```json
{
  "ideMode": {
    "name": "ice-react"
  }
}
```

* 第三步：当升级成功时只需要重启 iceworks 即可生效。

## Vue 项目

* 第一步：当检测是 Vue 项目且未进行适配时会提示如下信息：

![iceworks](https://img.alicdn.com/tfs/TB1nNRNspP7gK0jSZFjXXc5aXXa-2000-1400.png)

* 第二步：点击“一键修复”即可完成项目的升级，这是会自动在 package.json 写入如下信息，表示该项目的研发模式：

```json
{
  "ideMode": {
    "name": "ice-vue"
  }
}
```

* 第三步：当升级成功时只需要重启 iceworks 即可生效。


## 未识别项目

如果你的项目不是基于 ICE 脚手架或者未符合 ICE 模板规范的项目，则表示 iceworks 未支持改项目类型，提示如下：

![iceworks](https://img.alicdn.com/tfs/TB14KJOsET1gK0jSZFhXXaAtVXa-2000-1400.png)

## 其他问题

如果项目升级失败可通过 [钉钉群](https://ice.alicdn.com/assets/images/qrcode.png) 联系我们!

