# @ice/runtime

## 1.2.3

### Patch Changes

- af0a6d7a: fix: bump react-router version to fix https://github.com/remix-run/react-router/issues/10469
- ed4ed7ee: fix: auto polyfill for abortcontroller

## 1.2.2

### Patch Changes

- d1df9ffa: fix: should return after reject error
- 51411c4e: feat: hooks for server render
- 71f32f9c: fix: add default polyfill for signal

## 1.2.1

### Patch Changes

- 989e2501: fix: compatible with hmr when data get undefined
- f24b045d: feat: supprot sourmap for distType
- ab139acc: fix: add v5Compat for use history to navigate
- 6e639dfe: fix: get data loader with code remove
- f24b045d: feat: supprot sourmap for distType

## 1.2.0

### Minor Changes

- f62560f9: feat: refactor runtime about router

### Patch Changes

- 9de09ee8: feat: support version check between @ice/app and @ice/runtime
- ddee1c3e: support miniapp native events
- 57219848: add empty usePageLifecycle method
- 1c3d3fec: feat: support handler response
- 5db5b662: fix: use import.meta.renderer for client judgement
- a878225f: fix: dataLoader is sent repeatedly in PHA

## 1.1.8

- fix: parsing url path without using `new URL`

## 1.1.7

### Patch Changes

- bb07fd91: fix: parsing url path properly
- Updated dependencies [25357326]
  - @ice/jsx-runtime@0.2.1

## 1.1.6

### Patch Changes

- cd7c6c72: fix: encode route path to escape xss

## 1.1.5

### Patch Changes

- f519338c: fix: parse template should return emply string when can't find
- ee4141d5: chore: update ts defination for latest react-router

## 1.1.4

### Patch Changes

- dbff4d0b: fix: reload data after navigate
- 2f4e64b2: fix: getData should not block a reject state request
- 54868109: fix: add leading slash for basename

## 1.1.3

### Patch Changes

- c6b70bce: fix: should not build html when distType has not html
- 56fb406e: fix: support types definition without specify esm folder
- 7d729697: fix: SSR Suspense
  - feat: support pass server data
  - feat: support change public path runtime
  - feat: support get request ctx in suspense
  - fix: suspense error handle
  - fix: duplicate data request in suspense csr
  - fix: support await render to response

## 1.1.2

### Patch Changes

- 8eee4f0d: feat: export types

## v1.1.1

- [chore] update usage of @ice/jsx-runtime

## v1.1.0

- [feat] suspense ssr
- [feat] support render js bundle as entry
- [fix] compatible with empty meta element

## v1.0.5

- [feat] support template parse for dataLoader
- [feat] enhance memory router

## v1.0.4

- [chore] show more log when failed to load route module
- [fix] rerender after hydrate for ssg page

## v1.0.3

- [feat] optimize log when load route module failed
- [revert] window context merge order
- [fix] should call dataLoader when hydrate for SSG
- [fix] pass dataLoader as list

## v1.0.2

- [fix] window context merge order
- [feat] support custom document components

## v1.0.1

- [fix] merge window context

## v1.0.0

- [feat] runtime core for `ice`
