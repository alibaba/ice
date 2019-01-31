---
title: 组件升级 1.x 指南
order: 4
---

近期飞冰的基础组件 `@icedesign/base` 做了一次大版本的升级，伴随着这次升级，官方提供的业务组件、区块、模板都已经做了相应升级，如果业务项目需要升级请参考本篇文档。为了保证使用 0.x 版本组件的项目还能正常迭代，飞冰站点支持 0.x/1.x 版本的切换，通过页面底部的 select 进行切换即可。

## 升级原因

飞冰的基础组件由 Fusion 提供，在飞冰开源之处 Fusion 还未开源且基础组件处于 0.x 的阶段，因此与 Fusion 团队协商基于 0.x 组件包装成 `@icedesign/base` 提供给社区使用，而现如今 Fusion 的基础组件已面向社区开源，并且对应的是 1.x 版本，因此整个飞冰体系会整体迁移到 1.x 版本：

- 组件版本变化：0.x -> 1.x，其中包含组件的 API 变更等
- 组件包名变化：`@icedesign/base`(0.x) -> `@alifd/next`(1.x)

基础组件升级 1.x 之后，一方面飞冰与 Fusion 的物料源会完全打通，另一方面 1.x 会带来大量的新特性，于此同时 0.x 版本的组件目前只做 bugfix 不再做功能的迭代。

## 升级选择

我们深知所有 break 版本的升级对于项目都是有成本的，因此这里针对项目的不同情况提供几种不同的选择：

### 新项目直接基于 1.x

适用于全新的项目，飞冰的官方物料（组件/区块/模板）已发布基于 1.x 的版本，按照原有链路直接使用即可

### 老项目全量升级 1.x

适用于代码量相对可控并且有升级需求的项目，下文会有详细的升级文档

### 老项目 1.x&0.x 共存

适用于 0.x 的老项目，暂时没有精力升级，但是又需要使用 1.x 的部分组件。**注意这个方案可能会有一些隐藏问题，如果遇到了，请反馈给 ICE 团队。**1.x 和 0.x 混用最大的问题是组件样式可能会产生冲突，因此我们在工程上支持将 1.x 即 `@alifd/next` 组件的 className 改掉，避免样式冲突问题：

首先在项目的入口代码处通过 `ConfigProvider` 将所有组件 jsx 里的 prefix 改掉，prefix 请统一使用 `nextfd-`：

```js
import { ConfigProvider } from '@alifd/next';

class App extends React.Component {
  render() {
    return (
      <ConfigProvider prefix="nextfd-"> // 指定 prefix
          // App code
      </ConfigProvider>
    );
  }
}
```

然后通过工程配置将样式里的代码改掉（需要跟上面的 prefix 保持一致）：

```json
// package.json
{
  "themeConfig": {
    "nextPrefix": "nextfd-"
  }
}
```

然后重新 dev/build 即可。

## 升级指南

### 基础组件 0.x -> 1.x 升级

- 将 package.json 里以及代码里依赖的 `@icedesign/base` 替换成 `@alifd/next`
- 按照[基础组件 API 变更](https://github.com/alibaba/ice/wiki/base-components-upgrade)逐步进行升级

### 主题包升级

主题包用于定制组件的样式，如果之前 package.json 里配置了 theme 字段，请将 `@icedesign/skin` 替换成 `@icedesign/theme`

### 业务组件升级指南

按照 [业务组件版本映射表](https://github.com/alibaba/ice/wiki/biz-components-version) 对组件进行版本更换即可，除了 Layout 组件外其他业务组件均无 API 变更，只需要更改 package.json 里的版本号。
