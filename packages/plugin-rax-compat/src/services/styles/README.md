# CSS Import Tilde Transform

## 功能概述

这个功能添加了对 CSS 中 `~` 引入语法的支持，将 `@import "~@ali/xxx"` 自动转换为 `@import "@ali/xxx"`，以兼容 esbuild 的模块解析。

**注意：** webpack 本身已经支持 `~` 语法，所以客户端构建不需要额外处理。

## 实现方式

### 1. 服务端渲染（SSR/SSG）- ESBuild 插件

**文件：** `applyServerSideProcessor.ts`

- 在 `ESBuildInlineStylePlugin` 中添加了 `onResolve` 钩子
- 拦截以 `~` 开头的模块路径并解析为正确的 node_modules 路径
- 支持模块解析和外部依赖标记

### 2. 内联样式处理

**文件：** `transform-styles.ts`

- 在 `styleSheetLoader` 函数中直接处理转换
- 支持所有样式文件类型：CSS、LESS、SASS/SCSS

## 转换规则

| 输入格式 | 输出格式 |
|---------|---------|
| `@import "~@ali/package/style.css"` | `@import "@ali/package/style.css"` |
| `@import '~@company/design/tokens.css'` | `@import '@company/design/tokens.css'` |

## 使用场景

1. **第三方包引入**
   ```css
   @import "~@ali/fusion-design/style.css";
   @import "~antd/dist/antd.css";
   ```

2. **内部包引入**
   ```css
   @import "~@company/design-system/tokens.css";
   @import "~@internal/shared-styles/base.css";
   ```

## 注意事项

1. **仅影响 esbuild 构建**：webpack 本身支持 `~` 语法，所以只在服务端渲染（使用 esbuild）时需要转换
2. 只转换 `@import` 语句中的 `~` 语法
3. 保持引号类型不变（单引号或双引号）
4. 不影响其他类型的导入语句
5. 兼容现有的相对路径和绝对路径导入

## 测试

运行测试文件 `cssImportTransform.test.ts` 验证功能正常工作：

```bash
npm test -- src/services/styles/__tests__/cssImportTransform.test.ts
```