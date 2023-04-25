# Changelog

## 3.2.0

### Minor Changes

- f62560f9: feat: refactor runtime about router

### Patch Changes

- 8f97e538: chore: bump build-scripts version to unify esbuild version
- 1c3d3fec: feat: support add routes definition
- 9de09ee8: feat: support version check between @ice/app and @ice/runtime
- da7c733c: fix: wrap data loader in function expression to avoid rewrite global scope
- 5dd3c86e: refactor: use swc plugin for remove code
- 467dc56b: fix: only create esbuild context when dev
- 1c3d3fec: fix: routeSpecifier is not unique
- 7b04ca7e: fix: remove all exports of components when render mode is csr
- 13770d53: fix: compatible with runtime absolute path on win32 platform
- Updated dependencies [f62560f9]
- Updated dependencies [1c3d3fec]
- Updated dependencies [9de09ee8]
- Updated dependencies [1c3d3fec]
- Updated dependencies [1c3d3fec]
- Updated dependencies [5dd3c86e]
- Updated dependencies [5dd3c86e]
  - @ice/runtime@1.2.0
  - @ice/route-manifest@1.2.0
  - @ice/webpack-config@1.0.13
  - @ice/bundles@0.1.9

## 3.1.6

### Patch Changes

- Updated dependencies [deda06de]
  - @ice/bundles@0.1.8
  - @ice/webpack-config@1.0.12

## 3.1.5

### Patch Changes

- 4e1d9065: refactor: reuse route paths
- baacf8d0: chore: env compatible with default export
- 764ef0b6: fix: get route assets by route manifest
- 085498aa: feat: support plugin API of excuteServerEntry
- Updated dependencies [ee4141d5]
  - @ice/webpack-config@1.0.11
  - @ice/runtime@1.1.5
  - @ice/route-manifest@1.1.1
  - @ice/bundles@0.1.7

## 3.1.4

### Patch Changes

- 4a73cb2a: fix: redirect request for data loader
- 1ef827b1: fix: external node builtin modules
- 4671cbe7: fix: resource should not run document render
- Updated dependencies [4a73cb2a]
  - @ice/webpack-config@1.0.10

## 3.1.3

### Patch Changes

- acfd0a00: chore: optional ts type of onDemand
- 18ea5b2d: fix: enable hmr to avoid reload
- 754e28b4: fix: break build if occur data loader error
- 754e28b4: fix: compatibility with module false
- fa618ea2: fix: file name should compat with win32
- 0fb80639: fix: improve performance by use async function
- bb748872: fix: compatible with dynamic routes when disable lazy import
- bb748872: feat: export logger for plugin
- 6c8d2e46: fix: set platform node for compile project config
- 54868109: fix: add leading slash for basename
- e096c671: fix: declarationType of dataLoaderImport should be NORMAL
- Updated dependencies
  - @ice/webpack-config@1.0.9
  - @ice/bundles@0.1.6
  - @ice/runtime@1.1.4
  - @ice/route-manifest@1.1.0

## 3.1.2

### Patch Changes

- 56fb406e: fix: support types definition without specify esm folder
- 7d729697: feat: export code analyzer for reuse in other plugin
- de520d66: fix: support unknown cli options registered by plugins
- 071a627d: feat: support code spliting strategy
- 37c22e31: chore: update templates for unused imports
- Updated dependencies [071a627d]
  - @ice/runtime@1.1.3
  - @ice/webpack-config@1.0.8
  - @ice/bundles@0.1.5

## 3.1.1

### Patch Changes

- [fix] pass external and define info for preBundle
- [fix] value priority of host, port and https
- [feat] redirect runtime imports for data loader
- [fix] the lanUrlForConfig should set when set host
- [fix] the imported dataloaderFetcher name is error
- [fix] the value of `isServer` is false when compile data-loader
- [feat] new plugin API `getRouteManifest` and `getFlattenRoutes`
- [fix] dev manifest should work when manifest has not tabBar
- [fix] prebundle esm module error
- [feat] add generator.addTargetExport API
- Updated dependencies
  - @ice/runtime@1.1.2
  - @ice/webpack-config@1.0.7

## v3.1.0

- [feat] export suspense api
- [feat] refactor ability of keep target code
- [feat] support render js bundle as entry
- [fix] support cli options of target, platform not is deprecated
- [fix] build data loader with correct browser list
- [fix] process exit when build with errors on dev
- [fix] optimize log info
- [fix] should not replace global env for ssr

## v3.0.6

- [feat] support `import.meta.target`, `import.meta.renderer` and `import.meta.env`
- [feat] support config `routes.injectInitialEntry` for memory router
- [fix] cli option `--platform` change to `--target`
- [fix] remove code when dead code is `ObjectProperties`
- [fix] rebuild server entry when document changed
- [fix] set ssr default value to `false`
- [fix] server compiler options when bundle server entry
- [fix] support define expression of basename

## v3.0.5

- [fix] bump @swc/helpers version (0.4.12-> 0.4.14) for module cannot resolve of `@swc/helpers/src/_object_destructuring_empty.mjs`

## v3.0.4

- [feat] support incremental compile for server bundle
- [feat] refactor server bundle alias
- [feat] support log debug info with different namespaces
- [fix] support HMR when modules is used by dataLoader
- [fix] error occur when configure `dataLoader: false`
- [fix] don't compile data-loader to lower ES version

## v3.0.3

- [feat] support `generator.addEntryCode` for add code in entry file
- [fix] remove dataLoaderFetcher api for init of dataLoader
- [fix] incorrect dev url when enable hash router
- [fix] no log when parse mock files failed
- [feat] optimize log

## v3.0.2

- [fix] rule of page chunk name
- [fix] load env before resolve user config
- [fix] change css module export to make it be compatible with cjs output
- [fix] change main fields order for ssr
- [feat] add fetcher config in dataLoader
- [feat]: force to use port which user set in commandArgs

## v3.0.1

- [fix] file resolve when use css module in server compiling
- [fix] lock version of `@ice/bundles`, `@ice/webpack-config` and `@ice/route-manifest`
- [feat] support external config for server
- [feat] redirect imports for data loader

## v3.0.0

- [feat] provider basic service for web framework `ice`
