# Changelog

## 1.1.0

- [feat] support runtime value
- [feat] getSearchParams for miniapp

## 1.0.2

- [fix] set history when call createHistory in runtime plugins

## 1.0.1

- [fix] set history value after initHistory

## 1.0.0

- [feat] refactor exports APIs
- [feat] add exports field
- [feat] add `setHistory` API
- [fix] extract the logic of creating history from `createBaseApp`.

## 0.2.6

- [feat] support onPageNotFound app lifecycle

## 0.2.5

- [feat] add kuaishou and baidu env judge

## 0.2.4

- [feat] add runtime api of wrapperRouterRender
- [fix] remove `deepmerge`, and fix deep clone let custom config `__proto__` lost
- [fix] ts types of runtime module

## 0.2.3

- [fix] ts types of export apis

## 0.2.2

- [feat] compatible with cjs and esm when excute runtime module
