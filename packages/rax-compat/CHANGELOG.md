# Changelog

## 0.3.0

### Minor Changes

- 9926faae: feat: export es2021 output

## 0.2.12

### Patch Changes

- 60ed0e11: lowercase props compat

## 0.2.11

### Patch Changes

- 886c4de8: fix createElement runtime import

## 0.2.10

### Patch Changes

- 15e8200a: Refactor plugin and fix some issues:

  - The inlineStyleFilter doesnot work for server-side style process.
  - The inlineStyleFilter doesnot work for style file except vanilla css.
  - Supports sass-loader now.
  - Supports array type style in createElement.

## 0.2.9

### Patch Changes

- 85270268: default export support

## 0.2.8

### Patch Changes

- b8b1d5e4: fix: sourceMap url in prod files but not publish with sourceMap file
- Updated dependencies [b8b1d5e4]
  - @ice/appear@0.2.1

## 0.2.7

### Patch Changes

- b70bba1e: 1. update @swc/helpers version to latest. 2. relplace create react class with simple impl.

## 0.2.6

### Patch Changes

- 32dfaacc: fix: fix unmountComponentAtNode compat

## 0.2.5

### Patch Changes

- Updated dependencies [8af84529]
- Updated dependencies [f0d79065]
  - @ice/appear@0.2.0

## 0.2.4

### Patch Changes

- 4a8dcc02: fix: rax compat style

## 0.2.3

### Patch Changes

- 18dccde4: fix: not transform non-string value.

## 0.2.2

### Patch Changes

- 7a5cd06c: fix: supported shared.Host/Instance/Element

## 0.2.1

### Patch Changes

- 3ede3c5a: feat: add type module
- 41be75ff: fix: state not update error
  feat: support defaultProps in forwardRef
- 4b280b77: refactor: possible standard properties

## 0.2.0

### Minor Changes

- 2debc7f7: fix: appear event should not work on component

## 0.1.10

- chore: bump version for npm sync error.

## 0.1.9

### Patch Changes

- 8cfdfd96: Fix: useState parameter initialState can be function, which should be self executed when initilzing

## 0.1.8

### Patch Changes

- 03acb898: fix: Only the dom needs to be transformed, not the components

## 0.1.7

- [refactor] jsx-runtime using react backend implementation.

## 0.1.6

- [feat] provide jsx-runtime for JSX transform automatic.

## 0.1.2

- [fix] support event transform.
