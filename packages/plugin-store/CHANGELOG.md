# Changelog

## 2.0.3

- [fix] nested routes not render in vite mode

## 2.0.2

- [fix] not restart after first use store
- [fix] not regenerate webpack cache after first use store
- [fix] `AppStore.Provider` ts type error

## 2.0.1

- [fix] display warning message but the page has no store

## 2.0.0

- [feat] migrate plugin api
- [feat] upgrade @ice/store to 2.x
- [refactor] not support create store automatically
- [refactor] remove appJSON loader
- [refactor] modify `getRoutes` API param from `tempDir` to `tempPath`
- [refactor] use webpack loader to replace route path

## 1.9.7

- [fix] can't find an existed store file in windows

## 1.9.6

- [feat] support reset page store after router switch  
- [feat] support watch store.ts change

## 1.9.5

- [chore] publish source code of runtime

## 1.9.4

- [feat] compatible with jsx runtime syntax
