---
title: 如何锁定项目的依赖组件版本
category: 进阶指南
order: 5
---

ICE 项目中，依赖的版本号是在版本兼容的基础上自动升级的，详细规则可查看文档 [组件版本号规则说明](/docs/guide/version)

**自动升级带来的好处是：** 当某个依赖的模块发现存在 bug，模块开发者及时修复问题并发布了新版本，只要项目重新构建或者发布。则会安装符合版本号声明下最新的版本。

但是这同样带来了新的隐患，既然代码发生了变更，不管兼容与否理应再次校验其正确性（即使开发者发布模块已经经过了测试）回归站点功能。为此 ICE 开发工具依托前端社区的方案提供了锁定项目依赖版本的功能。下面就来介绍如何在项目中使用锁版本的功能。

### 使用步骤

#### 1. 修改项目下的 `abc.json` 文件

在 `abc.json` 中增加 `lockVersion` 字段，保持其他参数不变。如：

```js
{
  "name": "xxxx",
  "type": "ice",
  "builder": "@ali/builder-ice",
  "options": {
    "lockVersion": true
  }
}
```

#### 2. 重新 dev 生成依赖版本文件 yarn.lock

执行命令：`def dev -f` 强制更新项目依赖：

![image](http://git.cn-hangzhou.oss.aliyun-inc.com/uploads/ice/notes/f323e35fa44c6a4c173dddbb66614662/image.png)

#### 3. 提交依赖版本文件 yarn.lock

此时，项目中会生成版本依赖文件 yanr.lock， 该文件与 abc.json 同级，由于是新生成的文件，需要将该文件提交到项目（git 仓库）中。

### 常见问题

1. 锁版本之后有什么注意事项？

  项目所有依赖版本锁死，不会自动升级，如组件 bug 修复或新增功能，需要手动升级组件才能生效。

2. 如何升级某个依赖？

  执行命令：`def add <模块名>@x.y.z`, x.y.z 即对应版本号。

3. 安装过程中出现异常情况如何处理？

  如果是从原来是项目切换到锁版本方案，请先删除项目目录下的  `node_modules` 文件夹，否则会造成生成版本依赖信息失败。

  ![image](http://git.cn-hangzhou.oss.aliyun-inc.com/uploads/ice/notes/f2a059c979464dd1ba70bd736cbe036e/image.png)

该方案详细讨论，请参考 [gitlab issue](http://gitlab.alibaba-inc.com/ice/notes/issues/497)。