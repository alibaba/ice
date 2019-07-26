---
title: OSS 发布
order: 6
---

**OSS 发布** 面板提供了一键将构建结果上传到你的阿里云 OSS Bucket 中的能力。

基础界面:

![OSS面板](https://img.alicdn.com/tfs/TB1ahLebvb2gK0jSZK9XXaEgFXa-2118-630.png)

主要由以下字段组成：

1. 用户 AccessKey & Secret；
2. 存储空间（Bucket）；
3. 存储路径。

阿里云的用户 AccessKey 可以在你的账户下创建：

![](https://img.alicdn.com/tfs/TB1MXFmxVOWBuNjy0FiXXXFxVXa-1780-1052.png)

### 使用步骤：

0. 构建项目；
0. 填写 AccessKey ID / AccessKey：

    将 AccessKey ID 和 AccessKey Secret 粘贴到插件面板相应输入框。
0. 获取存储空间列表：

    点击存储空间选择框右侧的刷新按钮，获取 Bucket 列表。

    刷新完成后可下拉选择 Bucket ：

    ![](https://img.alicdn.com/tfs/TB18XbfbAP2gK0jSZPxXXacQpXa-2116-631.png)
0. 填写存储路径：

    例如填写 `static` 则表示将构建资源结果上传到对应 bucket 根目录下的 static 文件夹。
0. 提交上传：

    上传成功后将会看到以下提示：

    ![](https://img.alicdn.com/tfs/TB1_bzfbEz1gK0jSZLeXXb9kVXa-1916-508.png)

    会罗列出所有上传完成的对象以及 URL。
