---
title: 私有化物料
order: 3
---

很多公司会搭建私有的 npm，因此如果需要建设私有化的物料，可以参考这篇文档。

## 物料发布

单个物料请发布到私有 npm 即可。

## 物料数据生成

### NPM 源

生成物料数据时会从对应的 npm 源校验每个物料的 npm 版本是否已发布，因此 `idev generate` 时一定要保证 npm 源与物料发布的 npm 源保持一致。generate 时可通过环境变量设置 npm 源，参考 [环境变量](/docs/materials/reference/env)。

### UNPKG 服务

物料的预览地址和截图地址依赖了 unpkg 服务，比如：

- 截图：`https://unpkg.com/@icedesign/user-landing-block/screenshot.png`
- 预览：`https://unpkg.com/@icedesign/user-landing-block@3.0.0/build/index.html`

generate 时每个物料的元数据里会生成 homepage 和 screenshot 字段，这两个字段会根据环境变量里的 `UNPKG` 字段动态生成，可通过环境变量定义。

因此我们推荐在部署私有 npm 的基础上，能部署对应的私有 unpkg 服务，否则会导致截图和预览功能不可用。

## 物料数据托管

生成的物料数据即 `materials.json` 只包含所有物料的元数据，不会有任何代码，因此这份数据放在外部或者内部都可以，推荐直接在根目录将 `build/materials.json` 发布到公有 npm，然后通过 unpkg 服务访问该数据源即可。


