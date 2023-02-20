# Changelog

## 3.1.1

### Patch Changes

- c893a64a: [fix] pass external and define info for preBundle
  - [fix] value priority of host, port and https
  - [feat] redirect runtime imports for data loader
  - [fix] the lanUrlForConfig should set when set host
  - [fix] the imported dataloaderFetcher name is error
  - [fix] the value of `isServer` is false when compile data-loader
  - [feat] new plugin API `getRouteManifest` and `getFlattenRoutes`
- c893a64a: chore: bump beta version
  fix: dev manifest should work when manifest has not tabBar
- 8eee4f0d: fix: prebundle esm module error
- 8eee4f0d: feat: add generator.addTargetExport API
- Updated dependencies [8eee4f0d]
- Updated dependencies [c893a64a]
- Updated dependencies [c893a64a]
  - @ice/runtime@1.1.2
  - @ice/webpack-config@1.0.7

## 3.1.1-beta.9

### Patch Changes

- 7e38619b: feat: add generator.addTargetExport API
- Updated dependencies [7e38619b]
  - @ice/runtime@1.1.2-beta.0

## 3.1.1-beta.8

### Patch Changes

- 14b11542: fix: prebundle esm module error

## 3.1.1-beta.7

### Patch Changes

- d5f1a25b: chore: bump beta version
- Updated dependencies [d5f1a25b]
  - @ice/webpack-config@1.0.7-beta.7

## 3.1.1-beta.0

### Patch Changes

- ad3436af: [fix] pass external and define info for preBundle
  - [fix] value priority of host, port and https
  - [feat] redirect runtime imports for data loader
  - [fix] the lanUrlForConfig should set when set host
  - [fix] the imported dataloaderFetcher name is error
  - [fix] the value of `isServer` is false when compile data-loader
  - [feat] new plugin API `getRouteManifest` and `getFlattenRoutes`
- Updated dependencies [ad3436af]
  - @ice/webpack-config@1.0.7-beta.0

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
