# Changelog

## 2.2.3

- [fix] skip public folder for minimization

## 2.2.2

- [fix] config of conditionNames

## 2.2.1

- [chore] bump version of `esbuild`(0.14.14)
- [feat] define variables of `CDN_PATH`
- [fix] support userConfig `cssChunkNames`
- [fix] bump version of `@builder/pack`(^0.6.0)
- [fix] remove `webpackHotDevClient`
- [fix] `vitePlugins` only take effect when `vite` is true
- [fix] additional analyze for auth

## 2.2.0

- [feat] optimize runtime when build
- [chore] bump version of `es-module-lexer`
- [fix] adapt swc rule name

## 2.1.4

- [fix] lazy import is invalid with swc(`@builder/user-config^2.0.3`)

## 2.1.3

- [fix] enhance alias for node_modules dependencies(`@builder/user-config^2.0.1`)

## 2.1.2

- [feat] feat: support `props.pageConfig` for each page component
- [feat] pre bundle `webpack-dev-server`
- [fix] bump version of `@builder/pack`(^0.5.0)
- [fix] bump version of `@builder/user-config`, `query-loader-webpack-plugin`, `@builder/webpack-config`

## 2.1.1

- [fix] avoid error when disableRuntime

## 2.1.0

- [feat] add runtime abilities: addProvider/WrapperErrorBoundary/WrapperCSR/WrapperSSR/WrapperSearchParams (move from plugin-router)
- [feat] add runtime router options check and log warning
- [fix] update dependencies version

## 2.0.4

- [fix] error occurred when config externals and remoteRuntime
- [fix] build error when active `remoteRuntime`

## 2.0.3

- [feat] support apply static loader with query like `?worker|?url|?raw|?worker&inline`
- [fix] typo of `vitePlugins`
- [fix] bump `esbuild` version to `^0.13.12`

## 2.0.2

- [fix] bump version of `webpack-plugin-import`

## 2.0.1

- [fix] bump version of `@builder/pack`

## 2.0.0

- [feat] deprecate configs
- [feat] built-in module federation speed up
- [feat] support fast refresh
- [feat] upgrade dependencies for webpack 5

## 1.8.5

- [feat] add config.name to default task

## 1.8.4

- [refactor] rework with development server path output

## 1.8.3

- [fix] compatible with webpack 5 stats message

## 1.8.2

- [chore] bump dependencies version

## 1.8.1

- [feat] support jsx runtime
