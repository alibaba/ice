---
title: 物料数据生成
order: 3
---

完成物料集下所有物料的开发和发布之后，需要生成这个物料集合的物料数据，**请确保所有物料都已发布**，发布流程可看上一章[《单个物料开发》](/docs/materials/guide/dev.md)。

生成物料数据只需在物料仓库根目录下执行以下命令即可：

```bash
$ idev generate
```

ice-devtools 会遍历所有物料，批量查询每个物料的 npm 信息，并将这些信息结构化后存储到 `build/materials.json` 文件中，这一步需要消耗一定时间，请耐心等待。

![](https://img.alicdn.com/tfs/TB1TdCVcEGF3KVjSZFoXXbmpFXa-671-318.png)

以 ice 官方 React 物料为例（地址：[materials.json](https://ice.alicdn.com/assets/react-materials.json)），`materials.json` 包含以下字段：

- type：指定物料类型，来源自 `package.json` 中的 `materialConfig`，例如： react、vue、angular、bootstrap 等
- name：物料名称，来源自 `package.json` 中的 `name`
- components：包含所有组件信息的数组
- blocks：包含所有区块信息的数组
- scaffolds：包含所有项目模版信息的数组
- description：（可选）物料描述，来源自 `package.json` 中的 `description`
- logo：（可选）物料品牌 logo，来源自 `package.json` 中的 `materialConfig`
- homepage：（可选）物料主页，来源自 `package.json` 中的 `homepage`
- author：（可选）物料作者，来源自 `package.json` 中的 `author`

除可选的字段外，其他字段都是必不可少的。物料数据生成后，请检查是否包含必选的字段。

对于 components、blocks 和 scafflods 下的每一个元素，也有特定的物料数据协议需要遵守，否则无法在 iceworks 中正常使用，具体数据协议可参考 [《物料数据协议》](/docs/materials/reference/protocol.md)。
