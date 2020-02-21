---
title: ICE 脚手架升级指南
order: 4
---

飞冰将前端开发的最佳实践集成在脚手架中，主要包含目录结构、路由配置、状态管理等相关内容，脚手架截止目前总共有三个版本，这三个版本之间有一些微小的 break change，如需升级请参考本文档。

## 版本差异

### 1.x

初始版本，存量项目较多，[示例项目](https://unpkg.com/browse/@icedesign/hr-management-admin-scaffold@2.0.0/)，主要包含以下特点：

- 推荐使用 Class Component
- 构建工具 ice-scripts 有 1.x&2.x 两个版本
- 路由配置放在 `src/routerConfig.js` 中，路由渲染与 Layout 耦合，不支持路由按 Layout 分组，不支持路由嵌套，相关代码：
  - 路由配置：[代码](https://unpkg.com/browse/@icedesign/hr-management-admin-scaffold@2.0.0/src/routerConfig.js)
  - 路由入口：[代码](https://unpkg.com/browse/@icedesign/hr-management-admin-scaffold@2.0.0/src/router.jsx)
  - 路由渲染：[代码](https://unpkg.com/browse/@icedesign/hr-management-admin-scaffold@2.0.0/src/layouts/BasicLayout/MainRoutes.jsx)

### 2.x

过渡版本，变更点较多，存量项目较少，[示例项目](https://unpkg.com/browse/@icedesign/hr-management-admin-scaffold@2.0.8/)，主要包含以下特点：

- [兼容]推荐使用 Function Component + React Hooks
- [兼容]通过 `@ice/spec` 收敛 lint 相关配置，统一项目的 lint 命令
- [兼容]统一将 `src/` alias 到 `@`，方便 `import` 写法
- [兼容]推荐通过基于 React Hooks 的状态管理方案 [icestore](https://github.com/ice-lab/icestore)
- [兼容]构建工具统一升级到 ice-scripts@2.x
- [不兼容]路由配置放在 `src/routerConfig.js` 中，支持通过 Layout 分组，路由嵌套等能力，路由相关代码：
  - 路由配置：[代码](https://unpkg.com/browse/@icedesign/hr-management-admin-scaffold@2.0.8/src/routerConfig.js)
  - 路由渲染：[代码](https://unpkg.com/browse/@icedesign/hr-management-admin-scaffold@2.0.8/src/router.jsx)

### 3.x

最新版本，在 2.x 基础上做了配置文件的收敛，[示例项目](https://unpkg.com/browse/@icedesign/hr-management-admin-scaffold@3.0.4/)，相对 2.x 改动点：

- [兼容]将 react-router-dom 升级到 5.x 解决 warning 问题
- [不兼容]将配置文件收敛到 `src/config/` 目录，`routerConfig.js -> config/routes.js`，`menuConfig.js -> config/menu.js`

## 升级指南

### 1.x 升级到 3.x

1. 按照 3.x 目录规范将数据源配置、路由配置、导航菜单配置移入 `src/config/` 目录下，并修正引用这些文件的路径
2. 按照路由设计文档中的[路由配置](/docs/guide-0.x/dev/router#路由配置)部分，升级 `src/config/routes.js` 中的路由配置
3. 按照路由设计文档中[路由生成](/docs/guide-0.x/dev/router#具体使用)部分，升级路由渲染逻辑文件 `src/router.jsx`
4. 将 `src/index.jsx` 中路由调用改成如下方式：

```javascript
// ...
import router from './router';
// ...

ReactDOM.render(router(), ICE_CONTAINER);
```

5. 将 Layout 中路由相关配置移除，比如 `<MainRoutes>`，然后替换成 `props.children`

```diff
<Layout>
  <Header />
  <Layout.Section>
    <Layout.Main>
-     <MainRoutes />
+     {props.children}
    </Layout.Main>
  </Layout.Section>
  <Footer />
</Layout>
```

### 2.x 升级 3.x

由于 2.x 与 3.x 的唯一区别在于 `config` 目录，因此只需要将 `routerConfig` 与 `menuConfig`, `dataSourceConfig` 移入 `config` 目录中，同时将引用地方的路径进行修正即可。
