# Changelog

## 3.2.8

### Patch Changes

- 27a72536: fix: always external dependencies when get config
- cf8a78e3: feat: support code splitting strategy of page-vendors
- b691b9e9: feat: support remove router even if route count is greater than 1
- Updated dependencies [cf8a78e3]
- Updated dependencies [b691b9e9]
- Updated dependencies [92ec144f]
  - @ice/webpack-config@1.0.19
  - @ice/runtime@1.2.6

## 3.2.7

### Patch Changes

- 429a2a83: fix: relative id in pipe transform
- c7aad4eb: chore: add user config comments
- d8f4520f: fix: alias for type declaration
- 110b282b: feat: support user config htmlGenerating to control the generation of html
- Updated dependencies [29ad1b52]
  - @ice/runtime@1.2.5

## 3.2.6

### Patch Changes

- 94dac52e: chore: add return for default dataLoaderFetcher
- 474e1935: feat: support usePageAssets
  feat: export useAppContext
- c70c7737: fix: refactor error handling
- abdd49de: fix: modified task alias not be used
- b10d9cb8: fix: support source map for stack traces in node
- c4f625a2: fix: optimize single router
- Updated dependencies [f839c67d]
- Updated dependencies [137d6b1c]
- Updated dependencies [f95bbc2e]
- Updated dependencies [474e1935]
- Updated dependencies [c68c5da3]
- Updated dependencies [f95bbc2e]
- Updated dependencies [c70c7737]
- Updated dependencies [c70c7737]
- Updated dependencies [1171475d]
- Updated dependencies [9eec33ad]
- Updated dependencies [c4f625a2]
  - @ice/runtime@1.2.4
  - @ice/bundles@0.1.12
  - @ice/webpack-config@1.0.18

## 3.2.5

### Patch Changes

- af0a6d7a: fix: bump react-router version to fix https://github.com/remix-run/react-router/issues/10469
- ed4ed7ee: fix: auto polyfill for abortcontroller
- Updated dependencies [af0a6d7a]
- Updated dependencies [ed4ed7ee]
  - @ice/runtime@1.2.3
  - @ice/webpack-config@1.0.17
  - @ice/bundles@0.1.11

## 3.2.4

### Patch Changes

- Updated dependencies [b21ab5cd]
  - @ice/webpack-config@1.0.16

## 3.2.3

### Patch Changes

- 94e7dff2: fix: pass `getRoutesFile` for onDemand server runner.
- 51411c4e: feat: hooks for server render
- 71f32f9c: fix: add default polyfill for signal
- Updated dependencies [d1df9ffa]
- Updated dependencies [51411c4e]
- Updated dependencies [71f32f9c]
  - @ice/runtime@1.2.2

## 3.2.2

### Patch Changes

- f652be72: fix: import identifier is invalid in route config
- Updated dependencies [a4b85144]
  - @ice/webpack-config@1.0.15

## 3.2.1

### Patch Changes

- f24b045d: feat: supprot sourmap for distType
- 8b1b237: feat: support api of addEntryImportAhead
- Updated dependencies [f24b045d]
  - @ice/runtime@1.2.1

## 3.2.0

### Minor Changes

- f62560f9: feat: refactor runtime about router

### Patch Changes

- 8f97e538: chore: bump build-scripts version to unify esbuild version
- 1c3d3fec: feat: support add routes definition
- 9de09ee8: feat: support version check between @ice/app and @ice/runtime
- da7c733c: fix: wrap data loader in function expression to avoid rewrite global scope
- ddee1c3e: support miniapp native events
- 5dd3c86e: refactor: use swc plugin for remove code
- 467dc56b: fix: only create esbuild context when dev
- 1c3d3fec: fix: routeSpecifier is not unique
- 7b04ca7e: fix: remove all exports of components when render mode is csr
- 57219848: support miniapp native lifecycle events
- 13770d53: fix: compatible with runtime absolute path on win32 platform
- a878225f: fix: dataLoader is sent repeatedly in PHA
- Updated dependencies
  - @ice/runtime@1.2.0
  - @ice/bundles@0.1.10
  - @ice/route-manifest@1.2.0
  - @ice/webpack-config@1.0.14

## 3.1.7

### Patch Changes

- 28de278f: feat: support match target entry to bundle
- 0d549779: fix: read the same task target
- b226e356: fix: bump @swc/helpers to 0.5.1
- 6e9c822a: fix: server compiler define config
- Updated dependencies
  - @ice/webpack-config@1.0.13
  - @ice/bundles@0.1.9
  - @ice/runtime@1.1.7

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
