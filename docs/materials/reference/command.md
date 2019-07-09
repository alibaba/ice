---
title: ice-devtools 命令
order: 1
---

## init

初始化物料项目

### 可用参数

- `--template`：指定物料模版，值为 npm 包名
- `--type`：指定物料类型，值为 `materila`|`component`|`block`|`scaffold`

eg：

```bash
$ idev init --type material --template @icedesign/ice-react-material-template
```

## add

添加物料

eg：

```bash
$ idev add
```

## generate

生成物料数据，保存在物料仓库的 `build/materials.json`

eg：

```bash
$ idev generate
```

## sync

同步物料数据到 [fusion.design](https://fusion.design/)

eg：

```bash
$ idev sync
```

## clear

清理 fusion.design 的 token

eg：

```bash
$ idev clear
```

## 环境变量参数

REGISTRY：指定 npm registry

```bash
$ REGISTRY=https://registry.my-npm.com/ idev init --template @myScope/material-template
```
