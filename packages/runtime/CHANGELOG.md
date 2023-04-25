# @ice/runtime

## 1.2.0

### Minor Changes

- f62560f9: feat: refactor runtime about router

### Patch Changes

- 9de09ee8: feat: support version check between @ice/app and @ice/runtime
- 1c3d3fec: feat: support handler response

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
