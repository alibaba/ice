# @ice/plugin-rax-compat

An ice.js plugin for migrating `rax-app` projects.

## Usage

Add plugin in `ice.config.mts`:

```js
import { defineConfig } from 'ice';
import compatRax from '@ice/plugin-rax-compat';

export default defineConfig(() => ({
  plugins: [compatRax({ /* options */ })],
}));
```

## Options

### `inlineStyle`

- Default: `false`.
- Enable stylesheet loader to import CSS files.

### `cssModule`

- Default: `true`
- When `inlineStyle` enabled and `cssModule` disabled, process CSS Module files to inline included styles(not recommended).

### `legacy`

- Default: `false`
- Enable legacy way to import rax as namespace, like `v0.6`:

```typescript
import Rax from 'rax';

Rax.createContext();
```

## 说明

这个插件将会处理这些兼容逻辑：

- 类型定义，Rax 中的类型定义来自于 React 16.8 前，与 React 18 的类型定义存在一些差异。
  - 这个插件会新增一个对 Rax namespace 进行声明的 .d.ts 文件，内部使用 React 类型定义来进行声明。

- 别名，将组成 rax 核心逻辑的 rax- 包，如 rax-children 等，映射到 rax-compat 的内部实现。

  - 同时，在启用 legacy 模式时，会将 rax 映射到 rax-compat-legacy-exports.ts，此文件支持了 Rax.createContext 这样的使用方式（Rax v0.6.x）。

- JSX，插件内部将基于源码类型来调整 swc 的编译配置。

  - 在源码中使用了 `@jsx createElement` annotation 时，将设置 jsx runtime 为 classic。
  - 在源码导入了 rax 包时，将设置 importSource 为 rax-compat/runtime（与 React 18 保持一致）。

- 样式，在启用 inlineStyle 时，插件内部将额外处理行内样式逻辑。

  - 首先，JSXClassNameTransformer 会将源码中的 `<div className="header" />` 的写法转换为 `<div style={styleSheet.header} />`。
        - 注意，只有项目源码内的代码才会被转换。

        - 注意，`<div className={'xxx'} />` 这样的写法不会被转换。
            
        - 注意，`import './x.module.css'` 这样的写法不会被转换。

  - 接着，在 ClientSide，插件会覆盖原本的 Webpack Ruleset：

    - 对于命中了 inlineStyle 的资源文件，会使用 stylesheet-loader 进行处理为 styleSheet 对象（非 css 文件还会先交由预处理器编译）。其它文件会保持原本的处理逻辑，即处理到额外的 CSS 文件中。
    - 注意，目前在 --speedup 下此逻辑无法生效。
    - 注意，如果禁用了 cssModule ，那么 .module.css(less/...) 文件也会被交由 stylesheet-loader 处理。

- 在 ServerSide，对命中了 inlineStyle 的资源文件，会使用 esbuild 进行处理为 styleSheet 对象(文件的类型会被改变为 JS 文件)。

关于行内样式的额外说明：

- 只有项目源码中使用了 `className="xxx"` 的写法，才会被转换为 `style={styleSheet.xxx}` 的写法，因此 CSS Module 使用的 `className={styles.xxx}` 这种写法也不会被转换。另外，来自 node_modules 的代码不会被转换。
