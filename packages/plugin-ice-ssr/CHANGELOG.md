# Changelog

## 3.1.4

- [fix] not get the route component when the request url has locale prefix
- [fix] not await dynamic chunks load

## 3.1.3

- [fix] not call the getStaticPaths method from the dynamic import route component
- [fix] not call the getInitialProps method from the dynamic import route component

## 3.1.2

- [feat] support generate defaultLocale HTML in SSG

## 3.1.1

- [fix] compatible with the latest API of `webpack-dev-server`

## 3.1.0

- [feat] support SSR in mode Vite
- [feat] support i18n generation

## 3.0.6

- [fix] server-side render failed in production(always render `global.__ICE_SERVER_HTML_TEMPLATE__`)
- [chore] remove `build/server/loadable-stats.json`

## 3.0.5

- [fix] update dependencies version
- [feat] support no router mode ssr

## 3.0.4

- [fix] compatible with special charts in html content

## 3.0.3

- [fix] route path value may be undefined
- [fix] `path-to-regexp` dependency may not be correct for the dependencies promotion

## 3.0.2

- [fix] ssr can't work when using file-system routes

## 3.0.1

- [fix] redirectUrl is undefined
- [fix] `PageComponent.getInitialProps` is not be executed

## 3.0.0

- [feat] resolve runtime in server module
- [feat] update loader options for webpack 5

## 2.2.0

- [feat] support setting getInitialProps with router configuration

## 2.1.4

- [fix] remove default value of `publicPath` while @loadable/webpack-plugin will get it from webpack stats

## 2.1.3

- [fix] make `appConfig.app.rootId` works when ssr

## 2.1.2

- [fix] not generate server bundle in Windows
- [fix] router component of undefined error

## 2.1.1

- [chore] bump dependencies version

## 2.1.0

- [fix] ssr render params
