# Changelog

## 2.0.2

- [feat] support load `styl` style
- [fix] ts type of renderComponent

## 2.0.1

- [feat] set `WEBPACK_CACHE_ID` value
- [fix] modify types template for rax

## 2.0.0

- [feat] support `store.disableResetPageState`, deprecate `store.resetPageStore`
- [refactor] rename `getRoutes` API param from `tempDir` to `tempPath`
- [feat] add `setHistory` API
- [feat] refactor module of runApp
- [feat] refactor runtime folder structure
- [feat] api of render template

## 1.4.10

- [fix] globby pattern do not support path of win32

## 1.4.9

- [fix] ignore project type when get source file
- [feat] register method of getSourceFile

## 1.4.8

- [feat] add onPageNotFound and onUnhandledRejection types in ejs

## 1.4.7

- [refactor] only inject TabBar component when developer configured it
- [chore] typo `onErrorBoundaryHandler`

## 1.4.6

- [feat] support to specify targetDir when call api `addTemplateDir`
- [fix] copy file by api renderFile
- [chore] rax template file generate logic move to build-plugin-rax-app

## 1.4.5

- [fix] lose `errorBoundary` type define

## 1.4.4

- [feat] add baidu/kuaishou env judge

## 1.4.3

- [chore] ignore `unmount` function param never read error

## 1.4.2

- [feat] support resetPageStore param

## 1.4.1

- [chore] set default value to false of generateRuntime

## 1.4.0

- [feat] refactor import runtime modules
- [feat] support config sourceDir

## 1.3.3

- [fix] export useless `ErrorBoundary` in rax

## 1.3.2

- [chore] remove useless config of disableJSXTransform

## 1.3.1

- [feat] auto detect of jsx runtime
- [feat] support alias when apply method addImportDeclaration
