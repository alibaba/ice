---
title: 物料数据托管
order: 4
---

生成好的  `materials.json` ，放在本地没有任何作用。如果需要在 iceworks 中使用这份物料，或者将物料放到物料站点推广，必须将物料数据进行发布托管。目前，我们支持两种托管方式，开发者可根据业务需要选择：

| 特性               |   fusion.design   |   unpkg  |
|-------------------|--------------|----------|
|  官方推荐          |   是           |    一般  |
|  门户网站          |   能             |    不能  |
|  在 iceworks 中使用|   能             |    能   |
|  需要登录注册帐号    |   需要          |    不需要 |
|  线上管理物料       |  能             |    不能   |
|  支持的物料体系     | 仅支持 React 物料 |   不限制  |

## 托管在 fusion.design

首先，在 [fusion.design](https://fusion.design/) 注册账号，注册完成后，进入个人中心，点击新增站点，根据页面提示输入站点信息。

创建完成后，可在个人中心看到自己的站点：

![](https://img.alicdn.com/tfs/TB1xxKMcEWF3KVjSZPhXXXclXXa-2638-758.png)

在个人中心选择 token，token 是托管物料时用户鉴权的重要步骤，经过 token 校验成功，才能往你的站点存储物料。请小心保管，谨防泄漏。

![](https://img.alicdn.com/tfs/TB1AYmMcwKG3KVjSZFLXXaMvXXa-2710-906.png)

复制 token，在终端执行 `idev sync`，第一次执行 sync 时根据提示填写 token 信息，然后选择需要发布物料的站点即可开始同步物料数据。当物料同步完成后，会获得物料源地址：

![](https://img.alicdn.com/tfs/TB1TAGzbkxz61VjSZFrXXXeLFXa-1562-506.png)

## 托管到 unpkg

[unpkg](https://unpkg.com/) 是 npm 的 CDN 托管服务，可通过 URL 获取 npm package 的内容。托管到 unpkg 本质上就是将 `material.json` 发布到 npm，这样，就能通过 unpkg 服务得到物料源的 URL 地址。

然后进入物料仓库根目录，更新物料仓库 `package.json` 版本号，执行 `npm publish` 将物料数据发布到 npm，发布完成后，可根据以下规则拼接物料源地址：

```javascript
`https://unpkg.com/${packageName}@latest/build/materials.json`
```
