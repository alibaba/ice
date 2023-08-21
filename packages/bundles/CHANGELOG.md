# Changelog

## 0.1.14

### Patch Changes

- 1dbcfa51: fix: bump @swc/core, webpack, swc plugins, core-js version

## 0.1.13

### Patch Changes

- 2e22ce4e: fix: hmr failed when export pageConfg or dataLoader in page routes

## 0.1.12

### Patch Changes

- f95bbc2e: chore: bump webpack version(5.86.0)
- c70c7737: fix: bump webpack(5.84.1) and webpack-dev-server(4.15.0)

## 0.1.11

### Patch Changes

- ed4ed7ee: fix: auto polyfill for abortcontroller

## 0.1.10

### Patch Changes

- 57219848: update webpack version
- 5dd3c86e: fix: update version of @ice/swc-plugin-keep-export(0.1.4-2)

## 0.1.9

### Patch Changes

- 5d5fb334: fix: bump @ice/swc-plugin-node-transform #6199

## 0.1.8

### Patch Changes

- deda06de: fix: revert @swc/core version because of https://github.com/swc-project/swc/issues/7174

## 0.1.7

### Patch Changes

- ee4141d5: chore: update dependencies @swc/core(1.3.19 -> 1.3.41), cacache(16.0.7 -> 17.0.4), webpack(5.75.0 -> 5.76.2), core-js(3.26 -> 3.29)

## 0.1.6

### Patch Changes

- 18ea5b2d: fix: enable hmr to avoid reload

## 0.1.5

### Patch Changes

- 1e992472: feat: add swc plugin of node transform

## 0.1.4

- [fix] remove dependency of `@ice/swc-plugin-keep-platform`

## 0.1.3

- [fix] Bump version of `@ice/swc-plugin-keep-export`(0.1.3 -> 0.1.4), https://github.com/ice-lab/swc-plugins/pull/8

## 0.1.2

- [fix] add esbuild and esbuild-register

## 0.1.1

- [fix] Bump version of `@swc/core`(1.3.3 -> 1.3.19), https://github.com/swc-project/swc/issues/6371
- [fix] Bump version of `caniuse-lite`(^1.0.30001332 -> ^1.0.30001431), postcss requires version upper than 1.0.30001400
- [fix] Bump version of `webpack`(5.74.0 -> 5.75.0), minor version update
- [add] Add `@ice/swc-plugin-remove-export`(0.1.2)
- [add] Add `@ice/swc-plugin-keep-export`(0.1.3)
- [add] Add `@ice/swc-plugin-keep-platform`(0.1.2)
- [add] Add `core-js`(3.26.0)
