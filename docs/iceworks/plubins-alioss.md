---
title: 插件-阿里云 OSS
category: Iceworks
order: 1
---

阿里云 OSS 插件可以一键将构建结果上传到您的 OSS bucket 中。

首先看下基础界面:

![](https://img.alicdn.com/tfs/TB1bg8qx1SSBuNjy0FlXXbBpVXa-982-712.png)

主要有以下字段组成：

1. 阿里云用户 AccessKey
2. Bucket 选择框
3. 存储目录

阿里云用户 AccessKey 可以在您的账户下创建 AccessKey

![](https://img.alicdn.com/tfs/TB1MXFmxVOWBuNjy0FiXXXFxVXa-1780-1052.png)

## 使用步骤：

### 1. 填写 AccessKey ID / AccessKey

将 AccessKey ID 和 AccessKey Secret 粘贴到插件面板相应输入框。

### 2. 获取 Bucket 列表

点击 【Bucket 选择框】右边的刷新按钮，获取 Bucket 列表。

刷新完成了可以下拉选择 Bucket ：

![](https://img.alicdn.com/tfs/TB1bVhdxYSYBuNjSspiXXXNzpXa-1908-1368.png)

### 3. 填写存储目录

例如填写 `static` 则表示将构建资源结果上传到对应 bucket 根目录下的 static 文件夹。

### 4. 提交上传

上传成功后将会看到以下提示：

![](https://img.alicdn.com/tfs/TB1BBVixYGYBuNjy0FoXXciBFXa-1964-1424.png)

会罗列出所有上传完成的对象以及 URL。

## 小结

通过**阿里云 OSS** 面板可快速将资源提交到 CDN 上，之后在应用中引用即可，提高发布效率。同时插件会将用户的输入加密并保存到本地，避免重复输入，您也可以随时点击右上角的【清空数据】删除缓存的数据。

> 其他平台的插件会陆续接入到 Iceworks 中，如果您有需求可以反馈给我们，将会优先开发对应的上传插件。
