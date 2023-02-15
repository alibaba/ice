# Changelog

## 1.0.7

- [fix] support transform options for API `getCompilerPlugins`
- [fix] optimize webpack config (enable unsafeCache)

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
