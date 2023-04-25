# Changelog

## 1.0.13

### Patch Changes

- 5dd3c86e: refactor: use swc plugin for remove code
- Updated dependencies [5dd3c86e]
  - @ice/bundles@0.1.9

## 1.0.12

### Patch Changes

- Updated dependencies [deda06de]
  - @ice/bundles@0.1.8

## 1.0.11

### Patch Changes

- 4e1d9065: refactor: reuse route paths
- ee4141d5: fix: compile config of coreJs
- 97f8a801: feat: disable `compress` config in dev server for streaming render
- Updated dependencies [ee4141d5]
  - @ice/bundles@0.1.7

## 1.0.10

### Patch Changes

- 4a73cb2a: fix: redirect named import

## 1.0.9

### Patch Changes

- 18ea5b2d: fix: enable hmr to avoid reload
- 021ceb91: fix: remove resolve of jsnext:main
- 0096f5c0: fix: make sure ssr / ssg env variable is always false in csr
- Updated dependencies [18ea5b2d]
  - @ice/bundles@0.1.6

## 1.0.8

### Patch Changes

- 56fb406e: fix: support types definition without specify esm folder
- 071a627d: feat: support code spliting strategy
- Updated dependencies [1e992472]
  - @ice/bundles@0.1.5

## 1.0.7

### Patch Changes

- [fix] dev manifest should work when manifest has not tabBar
- [fix] support transform options for API `getCompilerPlugins`
- [fix] optimize webpack config (enable unsafeCache)
- [fix] exclude rule of compilation and load compile target

## 1.0.6

- [fix] dynamic import works in app.tsx
- [fix] isAppEntry shouldn't include app-worker.ts
- [fix] add `EnvReplacementPlugin` for keep platform code

## 1.0.5

- [fix] bump version of `@ice/bundles`(0.1.2 -> 0.1.3)
- [feat] define runtime value of `import.meta.*`

## 1.0.4

- [fix] format id for win32 compatible
- [fix] md4 -> md5 while md4 algorithm is not available anymore in NodeJS 17+
- [chore] do not show webpack config on debug mode
- [refactor] rename param `env` to `enableEnv`

## 1.0.3

- [fix] did not catch error when transform code error

## 1.0.2

- [fix] rule of page chunk name
- [fix] format core-js path

## 1.0.1

- [fix] Lock version of `@ice/bundles`.
- [feat] Support redirect imports.
- [refactor] Move @swc/core, core-js and all swc plugins into `@ice/bundles`, to lock the version of them.

## 1.0.0

- [feat] Basic webpack configuration.
