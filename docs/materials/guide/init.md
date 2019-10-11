---
title: 物料初始化
order: 1
---

通过 `iceworks init` 命令可以初始化一个物料项目：

```bash
# 创建物料文件夹
$ mkdir my-materials & cd my-materials

# 初始化物料项目
$ iceworks init
```

执行 init 命令后，默认创建完整的物料项目，如需独立开发业务组件，请参考[《开发独立业务组件》](/docs/materials/reference/dev.md)。初始化完成后，在项目根目录 `package.json` 中，iceworks 会生成一个 `materialConfig` 字段，这个字段存储了一些当前物料的信息及配置：

```json
{
  "materialConfig": {
    "type": "react", // 字符串，指定当前物料的前端框架类型 eg: 'react', 'vue', 'angular'，请勿随意更改
    "template": "@icedesign/ice-react-material-template", // 记录当前物料初始化时的物料模版，当添加物料时，将依赖这个值获取物料模版，请勿随意更改
  }
}
```
