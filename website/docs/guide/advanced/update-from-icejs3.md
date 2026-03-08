---
title: 从 ice.js 3.x (React 18) 升级到 React 19
order: 0903
---

# 从 ice.js 3.x (React 18) 升级到 React 19

## 前言

ice.js 3.x 现已支持 React 19。本指南帮助你将现有的 ice.js 3.x 项目从 React 18 升级到 React 19，享受 React 19 带来的新特性：

- **Actions** — 简化表单和异步操作
- **`use()` API** — 在渲染时读取 Promise 和 Context
- **`ref` 作为 prop** — 不再需要 `forwardRef`
- **`<Context>` 作为 Provider** — 不再需要 `<Context.Provider>`
- **文档 metadata 支持** — 原生 `<title>`、`<meta>`、`<link>`
- **更好的错误处理** — 改进的错误边界和水合错误报告

## 升级指南

### 1. 更新依赖

```diff
{
  "dependencies": {
-    "react": "^18.2.0",
-    "react-dom": "^18.2.0"
+    "react": "^19.0.0",
+    "react-dom": "^19.0.0"
  },
  "devDependencies": {
-    "@types/react": "^18.0.0",
-    "@types/react-dom": "^18.0.0"
+    "@types/react": "^19.0.0",
+    "@types/react-dom": "^19.0.0"
  }
}
```

然后重新安装依赖：

```bash
$ npm install
# 或
$ pnpm install
```

> ice.js 3.x 的 `@ice/app` 和 `@ice/runtime` 已兼容 React 18 和 React 19，无需升级框架版本。

### 2. 移除已废弃 API

#### `forwardRef` 不再必要

React 19 中，`ref` 可以直接作为普通 prop 传递，不再需要 `forwardRef`：

```diff
- import { forwardRef } from 'react';

- const MyInput = forwardRef((props, ref) => {
-   return <input {...props} ref={ref} />;
- });
+ const MyInput = ({ ref, ...props }) => {
+   return <input {...props} ref={ref} />;
+ };
```

> `forwardRef` 在 React 19 中仍然可用但已标记为 deprecated，建议逐步迁移。

#### `Context.Provider` 简化

React 19 中可以直接使用 `<Context>` 替代 `<Context.Provider>`：

```diff
const ThemeContext = createContext('light');

function App() {
  return (
-    <ThemeContext.Provider value="dark">
+    <ThemeContext value="dark">
      <Page />
-    </ThemeContext.Provider>
+    </ThemeContext>
  );
}
```

> `<Context.Provider>` 在 React 19 中仍然可用，但建议逐步迁移到新写法。

### 3. 类型变更 (TypeScript)

`@types/react` v19 包含了一些破坏性类型变更，需要注意：

#### `ref` 回调需返回清理函数或 `undefined`

```diff
- <div ref={(node) => { /* 设置 ref */ }} />
+ <div ref={(node) => { /* 设置 ref */ return undefined; }} />
```

#### `useRef` 需要参数

```diff
- const ref = useRef<HTMLDivElement>();
+ const ref = useRef<HTMLDivElement>(null);
```

#### `ReactElement` 类型变更

如果你在代码中使用了 `ReactElement` 类型且依赖其泛型参数，需要检查是否兼容。

### 4. 已移除的 API

以下 API 在 React 19 中已被移除：

| 移除的 API | 替代方案 |
| --- | --- |
| `ReactDOM.render()` | `createRoot().render()` |
| `ReactDOM.hydrate()` | `hydrateRoot()` |
| `ReactDOM.unmountComponentAtNode()` | `root.unmount()` |
| `ReactDOM.findDOMNode()` | 使用 `ref` |
| `React.createFactory()` | 使用 JSX |
| `react-test-renderer/shallow` | `@testing-library/react` |

> ice.js 3.x 内部已使用 `createRoot` API，如果你的业务代码中没有直接使用上述已移除的 API，则无需额外处理。

### 5. Rax 兼容层移除

自本版本起，ice.js 不再提供 Rax 兼容层（`rax-compat` 和 `@ice/plugin-rax-compat`）。如果你的项目依赖 Rax 兼容模式：

- 需要将 Rax 组件迁移为标准 React 组件
- 移除 `@ice/plugin-rax-compat` 插件配置
- 移除 `rax-compat` 相关的 alias 配置

### 6. 注意事项

- **react-router-dom**：ice.js 内置的路由版本暂未升级，保持与原来一致，路由使用方式不变
- **小程序（miniapp）**：小程序相关包（`react-reconciler`）暂未升级，小程序场景暂时保持 React 18
- **react-refresh**：已内置兼容 React 19 的版本（0.14.0），无需额外处理
- **渐进式升级**：框架的 `peerDependencies` 同时支持 `^18.0.0 || ^19.0.0`，你可以按自己的节奏升级

## 常见问题

### Q: 升级后 TypeScript 报错怎么办？

确保 `@types/react` 和 `@types/react-dom` 也升级到了 `^19.0.0`。React 19 的类型定义有一些破坏性变更，具体可参考 [React 19 类型变更说明](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#typescript-changes)。

### Q: 第三方库不兼容 React 19？

大部分主流库（如 antd 5.x、@alifd/next）已兼容 React 19。如果遇到兼容问题，可以：

1. 检查该库是否有新版本支持 React 19
2. 在 GitHub Issues 中搜索相关兼容性讨论
3. 临时使用 `overrides`（npm）或 `resolutions`（yarn）锁定 React 版本

### Q: 可以同时支持 React 18 和 19 吗？

ice.js 3.x 的框架层面支持双版本兼容。你的项目只能使用一个 React 版本，但发布的 npm 包可以在 `peerDependencies` 中声明 `"react": "^18.0.0 || ^19.0.0"` 来同时支持两个版本。
