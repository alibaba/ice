# @ice/runtime

## 1.5.1

### Patch Changes

- 2e274966: feat: support hook of onBeforeHydrate
- Updated dependencies [2e274966]
  - @ice/jsx-runtime@0.3.1

## 1.5.0

### Minor Changes

- 710b2e48: feat: improve miniapp runtime

### Patch Changes

- Updated dependencies [710b2e48]
  - @ice/shared@1.1.0

## 1.4.13

### Patch Changes

- a4755e43: feat: support onShellReady options
- f50fe55d: revert: revert suspence event
- 31706030: fix: avoid infinite setOutlets loop when config keepAlivePaths

## 1.4.12

### Patch Changes

- c5b43d5e: feat: support getAssets for onShellReady
- 9c3d9c58: feat: support suspense event

## 1.4.11

### Patch Changes

- 7992d405: fix: throw error for better debugging

## 1.4.10

### Patch Changes

- 15c8200f: feat: support build additional server entry for fallback
- d073ee5a: fix: support cdn url in assets manifest

## 1.4.9

Fix: add export of useAsyncValue in single route mode

## 1.4.8

### Patch Changes

- 4c9456fc: feat: export useAsyncData for component Await
- Updated dependencies [bccc7db1]
  - @ice/jsx-runtime@0.3.0

## 1.4.7

### Patch Changes

- e78c7d22: fix: single route mismatch warning for development

## 1.4.6

- Fix: serverDataLoader is not work when dataLoader is not defined.

## 1.4.5

### Patch Changes

- d5c378b6: fix: reduce bundle size by remove runtime module
- 77155bab: feat: remove runtime code when loaders is not export

## 1.4.4

- chore: add ts type for `@ice/runtime/data-loader`

## 1.4.3

### Patch Changes

- ba811d72: feat: support props for KeepAliveOutlet
- a7c76b62: feat: support API dynamic to allow import component in different scenario
- 0d3cfd59: refactor: the compilation for data-loader
- d0a748f6: fix: compat with the route path did not match when single route mode

## 1.4.2

### Patch Changes

- 547601f3: feat: new api of `useActive` for keep alive
- fix: single router dose not work when route path is customized

## 1.4.1

- fix: compatible with basename is undefined.

## 1.4.0

### Minor Changes

- 8d57a24a: feat: enhance router mode without react-router

### Patch Changes

- b85feaae: fix: do not log warning message when use router api
- c1aab10a: fix: avoid unexpected slash in route path
- b3c53b87: fix: export losing ts type
- fd447841: feat: export new api of react-router

## 1.3.6

### Patch Changes

- 3727f80d: fix: request context in data loaders

## 1.3.5

- fix: compatible with API `matchRoutes` when basename is not provided.

## 1.3.4

### Patch Changes

- 23811c82: fix: `unstable_OffScreen` to `unstable_Activity`. For https://github.com/facebook/react/pull/27640

## 1.3.3

### Patch Changes

- b8a6f9b8: feat: support pre render ssr
- 5d854188: chore: remove switch of cache first chunk

## 1.3.2

### Patch Changes

- 899c4740: feat: support options when call document dataLoader

## 1.3.1

### Patch Changes

- f144dd63: fix: compatible with tag.parentNode is null when update routes config

## 1.3.0

### Minor Changes

- 50efd1ee: fix: modify import source

### Patch Changes

- df854102: fix: compatible with query parsing errors caused by ctx.req.url error in the fc environment
- 4d256e30: fix: update route config when dataLoader is not defined
- 50efd1ee: fix: export createElement from react

## 1.2.9

### Patch Changes

- b8b1d5e4: fix: sourceMap url in prod files but not publish with sourceMap file
- 68f19eae: fix: should not import runtime module and routes when csr
- Updated dependencies [b8b1d5e4]
  - @ice/jsx-runtime@0.2.2
  - @ice/shared@1.0.2

## 1.2.8

### Patch Changes

- 47ba84d3: fix: typo of specifier for app data loader
- 477d14cc: fix: mark polyfill signal as es module
- 69e68633: feat: support API useDocumentData
- 99c0dd26: hotfix: sourceMap generator perf
- d4904e92: fix: runtime should compatible with old browsers

## 1.2.7

### Patch Changes

- a96af97b: fix: render twice when navigate and bump react-router to 6.14.2
- d33f3e65: feat: report detail recoverable error
- 11dd752b: fix: side effect of update suspense data may cause mulit time call
- 67eae5c1: feat: support app config of runApp

## 1.2.6

### Patch Changes

- b691b9e9: feat: support remove router even if route count is greater than 1

## 1.2.5

### Patch Changes

- 29ad1b52: fix: add warning log for mutate suspense data directly

## 1.2.4

### Patch Changes

- f839c67d: fix: loadRouteModule error when only has one router
- 137d6b1c: fix: should downgrade to csr when server data loader error
  fix: fallback should be optional
- 474e1935: feat: support usePageAssets
  feat: export useAppContext
- c68c5da3: fix: replace history methods by router navigate for backwards compatibility
- 9eec33ad: feat: support weex sourcemap when start
- c4f625a2: fix: optimize single router

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
