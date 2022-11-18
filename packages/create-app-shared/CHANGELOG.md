# Changelog

## 1.3.0

- [feat] support unhandledRejection event in miniapp
- [fix] miss parms in pageNotFound event in miniapp

## 1.2.6

- [fix] miniapp app lifecycle is invalid 

## 1.2.5

- [feat] be able to pass arguments to memory router

## 1.2.4

- [fix] support history for custom configuration

## 1.2.3

- [fix] revert AppProvider
- [fix] `__pageConfig` types for rax MPA

## 1.2.2

- [fix] miniapp withRouter

## 1.2.1

- [fix] miniapp exports field

## 1.2.0

- [chore] use `runtimeValue.enableRouter` check router status
- [feat] support pass pageConfig&getInitialProps when use renderComponent
- [fix] `renderComponent` -> `app.renderComponent`

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
