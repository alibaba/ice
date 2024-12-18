# Changelog

## 3.5.2

### Patch Changes

- f0c6380b: feat: add htmlGenerating `mode` option

## 3.5.1

### Patch Changes

- Updated dependencies [4130611d]
- Updated dependencies [2e274966]
  - @ice/rspack-config@1.2.1
  - @ice/runtime@1.5.1

## 3.5.0

### Minor Changes

- 710b2e48: feat: improve miniapp runtime

### Patch Changes

- Updated dependencies [710b2e48]
  - @ice/shared-config@1.3.0
  - @ice/webpack-config@1.2.0
  - @ice/rspack-config@1.2.0
  - @ice/route-manifest@1.3.0
  - @ice/runtime@1.5.0

## 3.4.12

### Patch Changes

- Updated dependencies [a4755e43]
- Updated dependencies [f50fe55d]
- Updated dependencies [b0eb09d5]
- Updated dependencies [31706030]
- Updated dependencies [0b4e0ccd]
  - @ice/runtime@1.4.13
  - @ice/webpack-config@1.1.16
  - @ice/shared-config@1.2.9
  - @ice/bundles@0.2.7
  - @ice/rspack-config@1.1.10

## 3.4.11

### Patch Changes

- a7a6183b: fix: modify meta.renderer in server runner
- Updated dependencies [eb7e71eb]
- Updated dependencies [47a5773a]
  - @ice/rspack-config@1.1.9

## 3.4.10

### Patch Changes

- 15c8200f: feat: support build additional server entry for fallback
- Updated dependencies [15c8200f]
- Updated dependencies [d073ee5a]
  - @ice/shared-config@1.2.8
  - @ice/runtime@1.4.10
  - @ice/rspack-config@1.1.8
  - @ice/webpack-config@1.1.15

## 3.4.9

### Patch Changes

- 4c9456fc: feat: export useAsyncData for component Await
- b808156b: feat: support open specified route and list all routes
- Updated dependencies [4c9456fc]
  - @ice/runtime@1.4.8

## 3.4.8

### Patch Changes

- 8dada9b6: feat: support generator api to inject code in server entry
- 5c40dc93: fix: do not remove request config of dataLoader compilation in speedup mode
- 11a87dc6: feat: support spilt page chunk in cjs format
- Updated dependencies [e4a32686]
- Updated dependencies [e78c7d22]
- Updated dependencies [e858a522]
- Updated dependencies [a805fa95]
  - @ice/shared-config@1.2.7
  - @ice/runtime@1.4.7
  - @ice/rspack-config@1.1.7
  - @ice/webpack-config@1.1.14

## 3.4.7

### Patch Changes

- d5c378b6: fix: reduce bundle size by remove runtime module
- 77155bab: feat: remove runtime code when loaders is not export
- Updated dependencies [d5c378b6]
- Updated dependencies [77155bab]
  - @ice/runtime@1.4.5

## 3.4.6

### Patch Changes

- 8275f13f: feat: upgrade icepack for new features
- 0d3cfd59: refactor: the compilation for data-loader
- ac36776f: feat: support add plugin by cli option
- Updated dependencies [ba811d72]
- Updated dependencies [a7c76b62]
- Updated dependencies [8275f13f]
- Updated dependencies [0d3cfd59]
- Updated dependencies [d0a748f6]
  - @ice/runtime@1.4.3
  - @ice/rspack-config@1.1.6
  - @ice/bundles@0.2.6
  - @ice/shared-config@1.2.6
  - @ice/webpack-config@1.1.13

## 3.4.5

### Patch Changes

- b279c880: fix: app config compile error of env exports
- Updated dependencies [c404b151]
- Updated dependencies [21257778]
  - @ice/shared-config@1.2.5
  - @ice/bundles@0.2.5
  - @ice/webpack-config@1.1.12
  - @ice/rspack-config@1.1.5

## 3.4.4

### Patch Changes

- 4bce5d79: fix: bump rspack version
- Updated dependencies [4bce5d79]
- Updated dependencies [547601f3]
  - @ice/bundles@0.2.4
  - @ice/rspack-config@1.1.4
  - @ice/runtime@1.4.2
  - @ice/shared-config@1.2.4
  - @ice/webpack-config@1.1.11

## 3.4.3

### Patch Changes

- 2a998626: fix: update rspack config for rspack version 0.5.1
- fd447841: feat: export new api of react-router
- Updated dependencies [8d57a24a]
- Updated dependencies [d88a50a2]
- Updated dependencies [b85feaae]
- Updated dependencies [c1aab10a]
- Updated dependencies [b3c53b87]
- Updated dependencies [d9e75a02]
- Updated dependencies [d362b8a8]
- Updated dependencies [2a998626]
- Updated dependencies [fd447841]
  - @ice/runtime@1.4.0
  - @ice/bundles@0.2.3
  - @ice/rspack-config@1.1.3
  - @ice/shared-config@1.2.3
  - @ice/webpack-config@1.1.10

## 3.4.2

### Patch Changes

- 45c61db8: feat: support optimize package import
- c06cb978: fix: on demand server cache
- 41be253a: fix: resolve path of regenerator-runtime/runtime.js
- Updated dependencies [167c8fec]
- Updated dependencies [45c61db8]
- Updated dependencies [f7dd9fc5]
- Updated dependencies [3727f80d]
- Updated dependencies [45c61db8]
  - @ice/shared-config@1.2.2
  - @ice/rspack-config@1.1.2
  - @ice/bundles@0.2.2
  - @ice/runtime@1.3.6
  - @ice/webpack-config@1.1.9

## 3.4.1

### Patch Changes

- ebc8ae08: fix: add assets plugin to deal with thrid-party dependencies import assets direactly
- 420fec85: fix: update binding version for packing error, resolve error when disable code splitting
- Updated dependencies [23811c82]
- Updated dependencies [420fec85]
  - @ice/runtime@1.3.4
  - @ice/rspack-config@1.1.1
  - @ice/bundles@0.2.1
  - @ice/shared-config@1.2.1
  - @ice/webpack-config@1.1.8

## 3.4.0

### Minor Changes

- a68ff48d: feat: support @ice/pack-binding

### Patch Changes

- 7d193fe9: fix: css module hash and HMR
- Updated dependencies [7d193fe9]
- Updated dependencies [7d193fe9]
- Updated dependencies [a68ff48d]
  - @ice/rspack-config@1.1.0
  - @ice/webpack-config@1.1.7
  - @ice/shared-config@1.2.0
  - @ice/bundles@0.2.0

## 3.3.9

### Patch Changes

- 72fc36c8: chore: remove `./types` export in `typesVersions` field to be compatible with `/// <reference types="@ice/app/types" />` in scaffolds
- ddff5558: chore: better error handling for build script
- Updated dependencies [b8a6f9b8]
- Updated dependencies [5d854188]
  - @ice/runtime@1.3.3

## 3.3.8

### Patch Changes

- Updated dependencies [58d8cb80]
  - @ice/shared-config@1.1.2
  - @ice/rspack-config@1.0.7
  - @ice/webpack-config@1.1.6

## 3.3.7

### Patch Changes

- 0953dece: fix: the judgment of unsupported syntax

## 3.3.6

### Patch Changes

- 4a7340af: fix: check let support by browserslist
- d4aaa580: fix: support custom transform plugins in speedup mode
- b28118d3: move require hijack to createService
- Updated dependencies [e678188e]
- Updated dependencies [52eb7a40]
- Updated dependencies [d4aaa580]
  - @ice/rspack-config@1.0.6
  - @ice/webpack-config@1.1.5
  - @ice/shared-config@1.1.1
  - @ice/bundles@0.1.17

## 3.3.5

### Patch Changes

- d72753e2: fix: do not prebundle node built-in module
- 3896cbea: feat: support default document

## 3.3.4

### Patch Changes

- ca14f6d3: fix: compatible with configureWebpack in speedup mode
- 244bb17f: add typesVersions for export fields support
- 6f18c3db: fix: deal with json file when use on-demand compile
- 1de19371: feat: add type definition of runApp
- 7924f2d1: fix: return render root
- 93e868d3: fix: hasDocument should check jsx
- aa29b37b: fix: get flatten routes which nested level more than 3
- Updated dependencies [ca14f6d3]
- Updated dependencies [df854102]
- Updated dependencies [50efd1ee]
- Updated dependencies [4d256e30]
- Updated dependencies [50efd1ee]
  - @ice/webpack-config@1.1.4
  - @ice/rspack-config@1.0.5
  - @ice/shared-config@1.1.0
  - @ice/runtime@1.3.0

## 3.3.3

### Patch Changes

- c3a9c20a: chore: modify output
- 82702258: feat: compat no document
- 78f850fa: feat: support hash only class name for css modules
- Updated dependencies [78f850fa]
  - @ice/webpack-config@1.1.3
  - @ice/shared-config@1.0.4
  - @ice/rspack-config@1.0.4

## 3.3.2

### Patch Changes

- b8b1d5e4: fix: sourceMap url in prod files but not publish with sourceMap file
- 06829a4e: fix: params urls for hook before.start.run
- 7194c75c: fix: throw error when server compile failed
- 68f19eae: fix: should not import runtime module and routes when csr
- cec448c3: fix: browsers compatibility of dataLoader
- 64442269: fix: redirect import of definePageConfig
- Updated dependencies [b8b1d5e4]
- Updated dependencies [68f19eae]
- Updated dependencies [64442269]
- Updated dependencies [b7488105]
  - @ice/route-manifest@1.2.2
  - @ice/webpack-config@1.1.2
  - @ice/rspack-config@1.0.3
  - @ice/shared-config@1.0.3
  - @ice/bundles@0.1.16
  - @ice/runtime@1.2.9

## 3.3.1

### Patch Changes

- 69e68633: feat: support API useDocumentData
- 41bc1440: fix: ignore static resource when render server entry
- 1fa826b0: chore: bump rspack version for more hook and plugin support
- Updated dependencies [47ba84d3]
- Updated dependencies [477d14cc]
- Updated dependencies [2875b544]
- Updated dependencies [69e68633]
- Updated dependencies [e3e1f27c]
- Updated dependencies [99c0dd26]
- Updated dependencies [101eadea]
- Updated dependencies [d4904e92]
- Updated dependencies [1fa826b0]
  - @ice/runtime@1.2.8
  - @ice/bundles@0.1.15
  - @ice/rspack-config@1.0.2
  - @ice/shared-config@1.0.2
  - @ice/webpack-config@1.1.1

## 3.3.0

### Minor Changes

- f5d155b5: feat: support build by rust tools

### Patch Changes

- Updated dependencies [f5d155b5]
- Updated dependencies [1dbcfa51]
  - @ice/webpack-config@1.1.0
  - @ice/bundles@0.1.14
  - @ice/rspack-config@1.0.1
  - @ice/shared-config@1.0.1

## 3.2.10

### Patch Changes

- 5fbf49a8: fix: compatible with Win32 when enable onDemand request
- 3d721315: feat: support define route with absolute path
- 669a801f: fix: add exports of service for node api
- Updated dependencies [3d721315]
- Updated dependencies [2e22ce4e]
  - @ice/route-manifest@1.2.1
  - @ice/bundles@0.1.13
  - @ice/webpack-config@1.0.20

## 3.2.9

### Patch Changes

- a96af97b: fix: render twice when navigate and bump react-router to 6.14.2
- 67eae5c1: feat: support app config of runApp
- Updated dependencies [a96af97b]
- Updated dependencies [d33f3e65]
- Updated dependencies [11dd752b]
- Updated dependencies [67eae5c1]
  - @ice/runtime@1.2.7

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
