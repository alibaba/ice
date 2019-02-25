---
title: 组件升级 1.x 指南
order: 4
---

近期飞冰的基础组件 `@icedesign/base` 做了一次大版本的升级，伴随着这次升级，官方提供的业务组件、区块、模板都已经做了相应升级，如果业务项目需要升级请参考本篇文档。为了保证使用 0.x 版本组件的项目还能正常迭代，飞冰站点支持 0.x/1.x 版本的切换，通过页面右上角的按钮进行切换即可。

## 升级原因

飞冰的基础组件由 Fusion 提供，在飞冰开源之处 Fusion 还未开源且基础组件处于 0.x 的阶段，因此与 Fusion 团队协商基于 0.x 组件包装成 `@icedesign/base` 提供给社区使用，而现如今 Fusion 的基础组件已面向社区开源，并且对应的是 1.x 版本，因此整个飞冰体系会整体迁移到 1.x 版本：

- 组件版本变化：0.x -> 1.x，其中包含组件的 API 变更等
- 组件包名变化：`@icedesign/base`(0.x) -> `@alifd/next`(1.x)

基础组件升级 1.x 之后，一方面飞冰与 Fusion 的物料源会完全打通，另一方面 1.x 会带来大量的新特性，于此同时 0.x 版本的组件目前只做 bugfix 不再做功能的迭代。

## 升级选择

我们深知所有 break 版本的升级对于项目都是有成本的，因此这里针对项目的不同情况提供几种不同的选择：

### 新项目直接基于 1.x

适用于全新的项目，飞冰的官方物料（组件/区块/模板）已发布基于 1.x 的版本，按照原有链路直接使用即可

### 老项目继续使用 0.x

如果暂时没有升级 1.x 的必要，可以选择继续使用 0.x，不过要注意新增业务组件时需要根据[业务组件版本映射表](https://github.com/alibaba/ice/wiki/biz-components-version)选择正确的组件版本，比如 `@icedesign/title` 对应的 0.x 版本是 0.1.x，则安装依赖时需要携带上对应版本号：

```bash
$ npm i --save @icedesign/title@0.1.x
```

### 老项目全量升级 1.x

适用于代码量相对可控并且有升级需求的项目，下文会有详细的升级文档

### 老项目 1.x&0.x 共存

如果是 0.x 的老项目，必须要使用某些 1.x 的组件 API，但是当下并没有精力全量升级，那么可以考虑这个方案。注意该方案存在一些不确定问题，一般情况不推荐该方案，存在问题：

- 由 react-transition-group 引起的 `AnimtateChild` 错误：与 npm 版本有关，目前无法稳定复现
- 配置的主题难以保持 0.x&1.x 组件样式一致，可能会有所差异

1.x 和 0.x 混用最大的问题是组件样式可能会产生冲突，因此我们在工程上支持将 1.x 即 `@alifd/next` 组件的 className 改掉，避免样式冲突问题：

首先在项目的入口代码处通过 `ConfigProvider` 将所有组件 jsx 里的 className 改掉，prefix 请统一使用 `nextfd-`：

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

## 升级 1.x 指南

### 基础组件 0.x -> 1.x 升级

- 将 package.json 里以及代码里依赖的 `@icedesign/base` 替换成 `@alifd/next`，版本 `^1.13.0`
- 按照[基础组件 API 变更](https://github.com/alibaba/ice/wiki/base-components-upgrade)逐步进行升级

### 主题包升级

主题包用于定制组件的样式，如果之前 package.json 里配置了 theme 字段，请将 `@icedesign/skin` 替换成 `@icedesign/theme`

### 业务组件升级指南

如果是官方提供的业务组件，请按照 [业务组件版本映射表](https://github.com/alibaba/ice/wiki/biz-components-version) 对组件进行版本更换即可，除了 Layout 组件外其他业务组件均无 API 变更，只需要更改 package.json 里的版本号。如有未升级或者未在列表中的组件，请联系飞冰团队进行升级。

如果是业务自身开发的业务组件，请参照 [业务组件升级依赖的基础组件到 1.x](https://github.com/alibaba/ice/wiki/upgrade-biz-components-1.x) 对业务组件进行升级发版，然后修改 package.json 中的依赖版本号。

## 常见问题

### 为什么 Select 的下拉箭头出现了偏移

多半是因为基础组件版本混用引起的：

- 如果是刻意混用，那么参考上述文档进行解决
- 如果是 1.x(`@alifd/next`) 的项目不小心混入了 0.x(`@icedeisgn/base`) 的组件，第一保证项目没有直接依赖 `@icedeisgn/base`，第二保证依赖的业务组件没有依赖 `@icedeisgn/base`
- 如果是 0.x(`@icedeisgn/base`) 的项目不小心混入了 1.x(`@alifd/next`) 的组件，第一保证项目没有直接依赖 `@alifd/next`，第二保证依赖的业务组件没有依赖 `@alifd/next`