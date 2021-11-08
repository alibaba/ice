# Changelog

## 1.1.4

- [fix] handle unexpected merge with `devServer.allowedHosts`.
- [fix] set `corejs: '3.7'` to meet the ECMAScript 2021 polyfills.

## 1.1.3

- [fix] error occurred when config sourceMap

## 1.1.2

- [fix] remove unused package of `webpack-plugin-import`

## 1.1.1

- [fix] OOM when use filesystem cache

## 1.1.0

- [feat] get webpack cache version by `WEBPACK_CACHE_ID`
- [fix] use eslint-webpack-plugin instead of eslint-reporting-webpack-plugin
- [fix] bump version of `@builder/pack`
- [feat] refactor config of eslint
- [feat] support active minify in dev


## 1.0.2

- [fix] add dependency of eslint-reporting-webpack-plugin

## 1.0.1

- [chore] use @builder/swc instead of @swc/core

## 1.0.0

- [feat] pre build dependencies and refactor config for webpack 5

## 0.3.13

- [fix] SourceMapDevtoolPlugin will block the builder when chunk name includes `:`

## 0.3.12

- [fix] order of core-js modules

## 0.3.11

- [fix] only pass modules to css module rule

## 0.3.10

- [feat] support global style rule custom `postcssOptions`

## 0.3.9

- [fix] polyfill loader include rules in windows

## 0.3.8

- [feat] support global rules of rax-app

## 0.3.7

- [feat] add `devServer.host` to https cert 
- [chore] `tabItem.path` => `tabItem.pageName`/ `tabItem.name` => `tabItem.text`
- [fix] compatible with no loader specified when using `postcssrc: true` in ssr app

## 0.3.6

- [feat] use trusted-cert to generate ca
- [feat] add `experiments` to userConfig
- [fix] SPA `route.targets` field
- [fix] regexp for inject core-js
- [fix] require order of polyfill

## 0.3.5

- [feat] add `props.pageConfig` in Rax App SPA page component

## 0.3.4

- [fix] remove deprecated api of esbuild-loader

## 0.3.3

- [feat] support resolve absolute cli options module path

## 0.3.2

- [fix] custom config of terserOptions

## 0.3.1

- [fix] lessLoaderOptions

## 0.3.0

- [feat] support mock.exclude
- [feat] modify default value of modularImportRuntime
- [feat] compatible with less-loader options

## 0.2.3

- [feat] built-in esbuild for minify
- [feat] support custom sourceMap in build
- [fix] do not compile core-js in miniapp

## 0.2.2

- [fix] use @nuxtjs/friendly-errors-webpack-plugin instead of friendly-errors-webpack-plugin
- [fix] overwrite options when config babelPresets match built-in presets
- [feat] support alias when transform runtime import
- [feat] support get sass implementation by project dependencies
