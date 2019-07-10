---
title: 物料初始化
order: 1
---

通过 `idev init` 命令可以初始化一个物料项目：

```bash
# 创建物料文件夹
$ mkdir my-materilas & cd my-materilas

# 初始化物料项目
$ idev init
```

执行 init 命令后，默认创建完整的物料仓库，如需要创建独立物料，请参考[《开发独立业务组件》](/docs/materials/reference/dev.md)。

ice-devtools 默认集成了三种物料模版：

- [React 标准模版](https://github.com/alibaba/ice/tree/master/templates/ice-react-material-template)
- [Vue 标准模版](https://github.com/alibaba/ice/tree/master/templates/ice-vue-material-template)
- [Angular 标准模版](https://github.com/alibaba/ice/tree/master/templates/ice-angular-material-template)

该选项可通过 `--tempalte` 指定任意物料模版（包括官网或自定义的），如有自定义物料模版需求，可参考[《自定义物料模版》](/docs/materials/template/custom.md)。

之后，需要填写物料的基本信息，根据命令行提示填写即可。

初始化完成后，将会生成如下目录结构：

```
├── README.md
├── blocks                          // 区块
│      └── ExampleBlock             // 单个区块
├── components                      // 组件
│      └── ExampleComponent         // 单个组件
├── package.json
└── scaffolds                       // 项目
    └── ExampleScaffold             // 单个项目
```

对于物料类型选择为 block、component 或 scaffold 的物料，则直接生成源码，文件结构与 `ExampleBlock`、 `ExampleComponent`、`ExampleScaffold` 保持一致。**如非特殊情况，不建议直接生成以上三种物料。**

初始化完成后，在项目根目录 `package.json` 中，ice-devtools 已经初始化好了一些 npm scripts，此外，还有一个 `materialConfig` 字段，这个字段存储了一些当前物料的信息及配置：

```json
{
  // some property...
  "scripts": {
    "deploy": "npm run generate && npm run sync", // 生成物料数据并同步，默认同步到 fusion.design
    "generate": "ice-devtools generate", // 生成物料数据
    "sync": "ice-devtools sync", // 同步物料数据到 fusion.design
    "lint": "eslint --cache --ext .js --ext .jsx ./",
  },
  "materialConfig": {
    "type": "react", // 字符串，指定当前物料的前端框架类型 eg: 'react', 'vue', 'angular'，请勿随意更改
    "logo": "https://https://img.alicdn.com/tfs/TB1AI2vteOSBuNjy0FdXXbDnVXa-680-192.png", // 配置物料的品牌 logo
    "template": "@icedesign/ice-react-material-template" // 记录当前物料初始化时的物料模版，当添加物料时，将依赖这个值获取物料模版，请勿随意更改
  }
}
```
