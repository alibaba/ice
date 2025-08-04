# Changelog

## 0.4.1

### Patch Changes

- 41cbaa9c: Support css build

## 0.4.0

### Minor Changes

- Updated dependencies [bbeeaf5d]
  - rax-compat@0.4.0

## 0.3.2

### Patch Changes

- Updated dependencies [9926faae]
  - rax-compat@0.3.0

## 0.3.1

### Patch Changes

- e4a32686: fix: support pass options for `compilationConfig`

## 0.3.0

### Minor Changes

- 15e8200a: Refactor plugin and fix some issues:

  - The inlineStyleFilter doesnot work for server-side style process.
  - The inlineStyleFilter doesnot work for style file except vanilla css.
  - Supports sass-loader now.
  - Supports array type style in createElement.

### Patch Changes

- Updated dependencies [f7dd9fc5]
- Updated dependencies [15e8200a]
- Updated dependencies [45c61db8]
  - @ice/bundles@0.2.2
  - rax-compat@0.2.10

## 0.2.10

### Patch Changes

- Updated dependencies [a68ff48d]
  - @ice/bundles@0.2.0

## 0.2.9

### Patch Changes

- 4816afb5: support legacy option for legacy rax compat
- 042b49b1: refactor: remove cloneDeep for performance

## 0.2.8

### Patch Changes

- 47a7a25d: fix: user compilation config lose

## 0.2.7

### Patch Changes

- b8b1d5e4: fix: sourceMap url in prod files but not publish with sourceMap file
- Updated dependencies [b8b1d5e4]
  - rax-compat@0.2.8
  - @ice/bundles@0.1.16

## 0.2.6

### Patch Changes

- 372699db: hotfix: less support inline style

## 0.2.5

### Patch Changes

- 984979a3: fix inlineStyle filter function check

## 0.2.4

### Patch Changes

- b58d38a1: inlineStyle filter support

## 0.2.3

### Patch Changes

- dd297f96: fix: compilation config not extend
- 7f718c5f: fix: fix Rax namespace typing compat with React v18
- bf8af99d: remove server options setter

## 0.2.2

### Patch Changes

- 45cb1c77: fix: auto add jsx comment

## 0.2.1

### Patch Changes

- 65680d44: fix: support css modules and global css
- Updated dependencies
  - @ice/bundles@0.1.10
  - rax-compat@0.2.1

## 0.2.0

### Minor Changes

- 2debc7f7: fix: appear event should not work on component
- Updated dependencies [ee4141d5]
  - rax-compat@0.2.0
  - @ice/bundles@0.1.7

## 0.1.5

### Patch Changes

- 0fb80639: fix: improve performance by use async function
- Updated dependencies
  - @ice/bundles@0.1.6
  - rax-compat@0.1.9

## 0.1.4

### Patch Changes

- 56fb406e: fix: support types definition without specify esm folder
- efba0cc4: fix: Using runtime: 'classic' mode when source has declare `@jsx createElement` comment
- Updated dependencies [03acb898]
- Updated dependencies [1e992472]
  - rax-compat@0.1.8
  - @ice/bundles@0.1.5

## 0.1.3

- [refactor] Using rax-compat/jsx-runtime to support rax components

## 0.1.2

- [fix] get css path by onLoad lifecycle.
