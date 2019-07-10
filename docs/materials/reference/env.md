---
title: 环境变量
order: 5
---

你可以在你的物料仓库根目录中通过 `.env` 文件指定环境变量。一个环境文件只包含环境变量的 `键=值` 对：

```
UNPKG=https://my-unpkg.com
REGISTRY=https://registry.my-npm.org/
```

指定的环境变量将在下载物料模版和生成物料数据时有效，这对于有私有物料需求的开发者来说是非常有效的。目前支持以下两个环境变量：

- UNPKG: 指定 npm 的 unpkg 服务域名；
- REGISTRY: 指定下载物料模版和查询物料信息的 npm registry；

在初始化物料时，可在命令行指定 `REGISTRY` 参数，该参数将被写入 `.env` 文件，同时，将从指定的 npm registry 下载物料模版。

```bash
REGISTRY=http://https://registry.npm.taobao.org/ idev init
```

## 环境变量的优先级

在执行命令时也支持指定环境变量，当同时存在，通过命令指定的环境变量优先级更高。
