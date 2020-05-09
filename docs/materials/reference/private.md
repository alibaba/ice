---
title: 私有化物料
order: 1
---

很多公司会搭建私有的 npm，因此如果需要建设私有化的物料，可以参考这篇文档。

## 依赖字段

针对私有化物料，在物料开发过程中核心会依赖两个字段：npm 源以及 unpkg 服务。

依赖 npm 源的场景：

- `iceworks generate`：需要访问 npm registry 查询每个物料对应的版本是否发布，同时生成对应 `source.registry` 字段
- `iceworks add`：下载模板或者区块需要访问 npm registry
- `iceworks init`：下载模板需要访问 npm registry

依赖 unpkg 服务的场景：

- `iceworks generate`：每个物料的 screenshot 和 homepage 默认通过 unpkg 托管，对应地址：
  - 截图：`https://unpkg.com/@icedesign/user-landing-block/screenshot.png`
  - 预览：`https://unpkg.com/@icedesign/user-landing-block@3.0.0/build/index.html`

因此我们推荐在部署私有 npm 的基础上，能部署对应的私有 unpkg 服务，否则会导致物料的截图和预览功能不可用。

## 配置字段

### 全局配置

```bash
$ iceworks config set registry https://registry.xxx.com
$ iceworks config set unpkgHost https://unpkg.xxx.com
# 确认是否生效
$ iceworks config list
```

如此配置之后，在当前电脑执行 iceworks 相关命令都会使用该配置。

### 项目级配置

开发物料集合的场景，也可以在项目级配置该字段，只需要配置根目录 package.json 的 materialConfig 字段即可：

```json
{
  "materialConfig": {
    "type": "react",
    "registry": "https://registry.xxx.com",
    "unpkgHost": "https://unpkg.xxx.com"
  }
}
```

如此配置之后，在当前物料源项目执行 iceworks 相关命令会使用该字段。

## 物料数据托管

对于私有的物料数据托管，前文提到的 fusion 物料中心是无法支持的，因此需要自己托管，最简单的方式就是将生成的 `build/materials.json` 发布到私有 npm，然后通过私有的 unpkg 服务拿到对应 url 即可。
