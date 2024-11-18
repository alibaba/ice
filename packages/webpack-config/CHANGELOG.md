# Changelog

## 1.2.0

### Minor Changes

- 710b2e48: feat: improve miniapp runtime

### Patch Changes

- Updated dependencies [710b2e48]
  - @ice/shared-config@1.3.0

## 1.1.16

### Patch Changes

- b0eb09d5: fix: mark browserslist config to cache key
- Updated dependencies [b0eb09d5]
- Updated dependencies [0b4e0ccd]
  - @ice/shared-config@1.2.9
  - @ice/bundles@0.2.7

## 1.1.15

### Patch Changes

- Updated dependencies [15c8200f]
  - @ice/shared-config@1.2.8

## 1.1.14

### Patch Changes

- a805fa95: fix: minify config of swc
- Updated dependencies [e4a32686]
  - @ice/shared-config@1.2.7

## 1.1.13

### Patch Changes

- Updated dependencies [8275f13f]
- Updated dependencies [0d3cfd59]
  - @ice/bundles@0.2.6
  - @ice/shared-config@1.2.6

## 1.1.12

### Patch Changes

- 21257778: fix: imporve dev sourcemap
- Updated dependencies [c404b151]
- Updated dependencies [21257778]
  - @ice/shared-config@1.2.5
  - @ice/bundles@0.2.5

## 1.1.11

### Patch Changes

- Updated dependencies [4bce5d79]
  - @ice/bundles@0.2.4
  - @ice/shared-config@1.2.4

## 1.1.10

### Patch Changes

- Updated dependencies [d88a50a2]
- Updated dependencies [d9e75a02]
- Updated dependencies [2a998626]
  - @ice/bundles@0.2.3
  - @ice/shared-config@1.2.3

## 1.1.9

### Patch Changes

- Updated dependencies [167c8fec]
- Updated dependencies [45c61db8]
- Updated dependencies [f7dd9fc5]
- Updated dependencies [45c61db8]
  - @ice/shared-config@1.2.2
  - @ice/bundles@0.2.2

## 1.1.8

### Patch Changes

- Updated dependencies [420fec85]
  - @ice/bundles@0.2.1
  - @ice/shared-config@1.2.1

## 1.1.7

### Patch Changes

- 7d193fe9: fix: optimize utils
- Updated dependencies [7d193fe9]
- Updated dependencies [a68ff48d]
  - @ice/shared-config@1.2.0
  - @ice/bundles@0.2.0

## 1.1.6

### Patch Changes

- Updated dependencies [58d8cb80]
  - @ice/shared-config@1.1.2

## 1.1.5

### Patch Changes

- 52eb7a40: fix: do not minify assets in public by default
- Updated dependencies [d4aaa580]
  - @ice/shared-config@1.1.1
  - @ice/bundles@0.1.17

## 1.1.4

### Patch Changes

- ca14f6d3: fix: compatible with configureWebpack in speedup mode
- Updated dependencies [ca14f6d3]
- Updated dependencies [50efd1ee]
  - @ice/shared-config@1.1.0

## 1.1.3

### Patch Changes

- 78f850fa: feat: support hash only class name for css modules
- Updated dependencies [78f850fa]
  - @ice/shared-config@1.0.4

## 1.1.2

### Patch Changes

- b8b1d5e4: fix: sourceMap url in prod files but not publish with sourceMap file
- Updated dependencies [b8b1d5e4]
- Updated dependencies [64442269]
  - @ice/shared-config@1.0.3
  - @ice/bundles@0.1.16

## 1.1.1

### Patch Changes

- Updated dependencies [2875b544]
- Updated dependencies [101eadea]
- Updated dependencies [1fa826b0]
  - @ice/bundles@0.1.15
  - @ice/shared-config@1.0.2

## 1.1.0

### Minor Changes

- f5d155b5: feat: support build by rust tools

### Patch Changes

- Updated dependencies [1dbcfa51]
  - @ice/bundles@0.1.14
  - @ice/shared-config@1.0.1

## 1.0.20

### Patch Changes

- Updated dependencies [2e22ce4e]
  - @ice/bundles@0.1.13

## 1.0.19

### Patch Changes

- cf8a78e3: feat: support code splitting strategy of page-vendors
- 92ec144f: fix: do not compile runtime library of tslib

## 1.0.18

### Patch Changes

- f95bbc2e: fix: optimize deprecation warning of webpack
- c70c7737: fix: refactor error handling
- 1171475d: fix: ignore hydration error in dev server overly
- Updated dependencies [f95bbc2e]
- Updated dependencies [c70c7737]
  - @ice/bundles@0.1.12

## 1.0.17

### Patch Changes

- ed4ed7ee: fix: auto polyfill for abortcontroller
- Updated dependencies [ed4ed7ee]
  - @ice/bundles@0.1.11

## 1.0.16

### Patch Changes

- b21ab5cd: fix: compile @remix-run/router when minify is swc

## 1.0.15

### Patch Changes

- a4b85144: fix: compatible with code has import.meta

## 1.0.14

### Patch Changes

- 5dd3c86e: refactor: use swc plugin for remove code
- Updated dependencies [57219848]
- Updated dependencies [5dd3c86e]
  - @ice/bundles@0.1.10

## 1.0.13

### Patch Changes

- 28de278f: feat: support match target entry to bundle
- 6e9c822a: chore: remove useless define variables
- b226e356: fix: use standard cjs module
- 0d549779: feat: add target field to config
- Updated dependencies [5d5fb334]
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
