English | [简体中文](./README_zh-CN.md)

<p align="center">
  <a href="https://www.npmjs.com/package/ice.js"><img src="https://badgen.net/npm/dm/ice.js" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/ice.js"><img src="https://badgen.net/npm/v/ice.js" alt="Version"></a>
  <a href="/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="GitHub license" /></a>
  <a href="https://github.com/alibaba/ice/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" /></a>
  <a href="https://gitter.im/alibaba/ice"><img src="https://badges.gitter.im/alibaba/ice.svg" alt="Gitter" /></a>
</p>

> A universal framework based on React.js

## Features

- 🐒 **Engineering**：Out of the box support for ES6+、TypeScript、Less、Sass、 CSS Modules，etc
- 🦊 **Routing**：Powerful Routing System, supports configured routing and conventions routing
- 🐯 **State management**：Built-in icestore, lightweight state management solution based on React Hooks
- 🐦 **Config**：Modes and Environment Variables configuration in the config file
- 🐶 **Logger**：Built-in logger solution, it's a flexible abstraction over using `console.log` as well
- 🐱 **Helpers**：Built-in helpers, provide some useful utility functions
- 🦁 **Application configuration**：Provide powerful and extensible application configuration
- 🐴 **Hooks**：Provide Hooks APIs such as useModel and useHistory, etc
- 🐌 **Plugin system**：The plugin system provides rich features and allow the community to build reusable solutions
- 🐘 **TypeScript**：Support TypeScript
- 🐂 **Modern**：Support SPA、SSR、MPA and Micro-frontend

## Quick start

### Setup by Iceworks

We recommend creating a new icejs app using [Iceworks](https://marketplace.visualstudio.com/items?itemName=iceworks-team.iceworks):

![demo](https://img.alicdn.com/tfs/TB1aRI.RHr1gK0jSZFDXXb9yVXa-1024-768.png_790x10000.jpg)

> See [Quick start by Iceworks](https://ice.work/docs/iceworks/quick-start) for more details.

### Setup by CLI

We recommend creating a new icejs app using create-ice, which sets up everything automatically for you. To create a project, run:

```bash
$ npm init ice <project-name>
```

`npm init <initializer>` is available in npm 6+

Start local server to launch project:

```bash
$ cd <project-name>
$ npm install
$ npm run start # running on http://localhost:3333.
```

It's as simple as that!

### Manual Setup

icejs is really easy to get started with. Install `ice.js`, `react` and `react-dom` in your project:

```bash
$ mkdir <project-name> && cd <project-name>
$ npm install ice.js react react-dom
```

Open `package.json` and add the following scripts:

```json
{
  "name": "project-name",
  "scripts": {
    "start": "icejs start",
    "build": "icejs build"
  },
  "dependencies": {
    "ice.js": "^1.0.0",
    "react": "^16.12.0",
    "react-dom": "^16.12.0"
  }
}
```

Create the `pages` directory, then create the first page in `pages/index.jsx`:

```jsx
import React from 'react'

const HomePage = () => {
  return <div>Welcome to icejs!</div>
}

export default HomePage
```

Configure an application information in the `src/app.js` file, but it is optional:

```js
import { runApp } from 'ice'

const appConfig = {
  router: {
    type: 'browser',
  },

  // more...
}

runApp(appConfig)
```

Finally, To start developing your application run `npm run start`. The application is now running on [http://localhost:3333](http://localhost:3333).

## Examples

- [hello-world](https://codesandbox.io/s/github/ice-lab/icejs/tree/master/examples/hello-world)
- [basic-spa](https://codesandbox.io/s/github/ice-lab/icejs/tree/master/examples/basic-spa)
- [basic-ssr](https://codesandbox.io/s/github/ice-lab/icejs/tree/master/examples/basic-ssr)
- [basic-mpa](https://codesandbox.io/s/github/ice-lab/icejs/tree/master/examples/basic-mpa)
- [basic-store](https://codesandbox.io/s/github/ice-lab/icejs/tree/master/examples/basic-store)
- [basic-request](https://codesandbox.io/s/github/ice-lab/icejs/tree/master/examples/basic-request)
- [icestark-child](https://codesandbox.io/s/github/ice-lab/icejs/tree/master/examples/icestark-child)
- [icestark-layout](https://codesandbox.io/s/github/ice-lab/icejs/tree/master/examples/icestark-layout)
- [with-fusion-design](https://codesandbox.io/s/github/ice-lab/icejs/tree/master/examples/with-fusion-design)

## Contributing

Please see our [CONTRIBUTING.md](/.github/CONTRIBUTING.md)

## Ecosystem

|    Project         |    Version                                 |     Docs    |   Description       |
|----------------|-----------------------------------------|--------------|-----------|
| [icejs] | [![icejs-status]][icejs-package] | [docs][icejs-docs] |A universal framework based on react.js|
| [icestark] | [![icestark-status]][icestark-package] | [docs][icestark-docs] |Micro Frontends solution for large application|
| [icestore] | [![icestore-status]][icestore-package] | [docs][icestore-docs] |Simple and friendly state for React|
| [iceworks]| [![iceworks-status]][iceworks-package] | [docs][iceworks-docs] |Visual Intelligent Development Assistant|
| [formily]| [![formily-status]][formily-package] | [docs][formily-docs] |Performant, flexible and extensible form solusion|
| [ahooks]| [![ahooks-status]][ahooks-package] | [docs][ahooks-docs] |React Hooks Library|

[icejs]: https://github.com/alibaba/ice
[icestark]: https://github.com/ice-lab/icestark
[icestore]: https://github.com/ice-lab/icestore
[iceworks]: https://github.com/ice-lab/iceworks

[icejs-status]: https://img.shields.io/npm/v/ice.js.svg
[icestark-status]: https://img.shields.io/npm/v/@ice/stark.svg
[icestore-status]: https://img.shields.io/npm/v/@ice/store.svg
[iceworks-status]: https://vsmarketplacebadge.apphb.com/version/iceworks-team.iceworks.svg

[icejs-package]: https://npmjs.com/package/ice.js
[icestark-package]: https://npmjs.com/package/@ice/stark
[icestore-package]: https://npmjs.com/package/@ice/store
[iceworks-package]: https://marketplace.visualstudio.com/items?itemName=iceworks-team.iceworks

[icejs-docs]: https://ice.work/docs/guide/intro
[icestark-docs]: https://ice.work/docs/icestark/guide/about
[icestore-docs]: https://github.com/ice-lab/icestore#icestore
[iceworks-docs]: https://ice.work/docs/iceworks/about

[formily]: https://github.com/alibaba/formily
[formily-status]: https://img.shields.io/npm/v/@formily/react.svg
[formily-package]: https://npmjs.com/package/@formily/react
[formily-docs]: https://formilyjs.org/

[ahooks]: https://github.com/alibaba/hooks
[ahooks-status]: https://img.shields.io/npm/v/ahooks.svg
[ahooks-package]: https://npmjs.com/package/ahooks
[ahooks-docs]: https://ahooks.js.org

## Community

| DingTalk community                               | GitHub issues |  Gitter |
|-------------------------------------|--------------|---------|
| <a href="https://ice.alicdn.com/assets/images/qrcode.png"><img src="https://ice.alicdn.com/assets/images/qrcode.png" width="150" /></a> | [issues]     | [gitter]|

[issues]: https://github.com/alibaba/ice/issues
[gitter]: https://gitter.im/alibaba/ice

## License

[MIT](/LICENSE)
