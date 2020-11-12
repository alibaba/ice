## Changelog

### 3.0.7 (November 12, 2020)

- Feat: support manually close store.([#3750](https://github.com/alibaba/ice/pull/3750))
- Feat: support pages that are not in the `src/pages`.([#3750](https://github.com/alibaba/ice/pull/3750))
- Feat: use `polyfill` field instead of `injectBabel` that can add polyfill by usage.([#3777](https://github.com/alibaba/ice/pull/3777))
- Feat: add `eslint-reporting-webpack-plugin` for dev mode.([#3771](https://github.com/alibaba/ice/pull/3771))
- Feat: support use miniapp compile mode in its runtime mode project.([#3766](https://github.com/alibaba/ice/pull/3766))
- Feat: add rax-platform-loader.([raxjs/rax-scripts#480](https://github.com/raxjs/rax-scripts/pull/480))
- Fix: `miniapp-native` dir copy logic.([#3761](https://github.com/alibaba/ice/pull/3761))
- Fix: error when set `ssr: true`.([#3775](https://github.com/alibaba/ice/pull/3775))
- Chore: remove rax-compile-config.([raxjs/rax-scripts#480](https://github.com/raxjs/rax-scripts/pull/480))
- Chore: use `react-dev-utils/webpackHotDevClient` instead of `rax-compile-config/hmr`.([#3806](https://github.com/alibaba/ice/pull/3806))
- Chore: change polyfill load settings.([raxjs/rax-scripts#480](https://github.com/raxjs/rax-scripts/pull/475))
- Chore: update mini-css-extract-plugin version and set `esModule` to `false` as default.([raxjs/rax-scripts#475](https://github.com/raxjs/rax-scripts/pull/475))
- Chore: unify the packaging mechanism of icejs and rax-app.([#3753](https://github.com/alibaba/ice/pull/3753))
- Chore: change `compileDependencies` default value to `['']`.([#3802](https://github.com/alibaba/ice/pull/3802))
- Enhance: open browser logic, now you can use ` -- --mpa-entry=home` to specify mpa entry.([#3798](https://github.com/alibaba/ice/pull/3798))
- Docs: update router and change `compileDependencies` related docs.([raxjs/docs#42](https://github.com/raxjs/docs/pull/42)
)



### 3.0.6 (October 30, 2020)

- Feat: support browser history for web.([#3736](https://github.com/alibaba/ice/pull/3736))
- Fix: windows path error.([#3695](https://github.com/alibaba/ice/pull/3695))
- Fix: kraken/weex assets couldn't find.([#3736](https://github.com/alibaba/ice/pull/3736))
- Enhance: format debug info.([#3736](https://github.com/alibaba/ice/pull/3736))
- Feat: support miniapp compile config.([#3730](https://github.com/alibaba/ice/pull/3730))

