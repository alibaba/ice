<p align="center">
  <a href="https://ice.work">
    <img alt="飞冰（ICE）" src="https://img.alicdn.com/tfs/TB1gOdQRCrqK1RjSZK9XXXyypXa-192-192.png" width="96">
  </a>
</p>

<h1 align="center">飞冰（ICE）</h1>

<div align="center">

Simple and friendly front-end solution

<a href="/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="GitHub license" /></a>
<a href="https://travis-ci.org/alibaba/ice"><img src="https://travis-ci.org/alibaba/ice.svg?branch=master" alt="Build Status" /></a>
<a href="https://github.com/alibaba/ice/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" /></a>
<a href="https://gitter.im/alibaba/ice"><img src="https://badges.gitter.im/alibaba/ice.svg" alt="Gitter" /></a>

</div>

## Feature

- :fire:**Visual Development**：Simplify front-end engineering complexity through GUI operations, while visually managing different project projects via adapters, customizing proprietary front-end workbench.
- :100:**Rich materials**：Improve project development efficiency based on material assembly while providing a wide range of React/Vue materials
- :tophat:**Best Practices**：Project development best practices based on rich experience, including directory results, development debugging, routing configuration, state management, etc.
- :whale:**Custom material**：Building Private Material System by Rapid Development of Material Developer Tools

more information [ice.work](https://ice.work)。

## Quick start

To support different user groups，Provides two ways to use the web interface and CLI, as follows:

#### Web interface usage

```bash
# Install the CLI tool
$ npm install iceworks -g

# Run iceworks
$ iceworks  # Open the browser： http://127.0.0.1:8000
```

#### CLI

```bash
# Install the CLI tool
$ npm install iceworks -g

# New project
$ mkdir iceapp & cd iceapp

# Initialize the project with a template
$ iceworks init
```

## Ecosystem

|    Project         |    Version                                 |     Docs    |   Description       |
|----------------|-----------------------------------------|--------------|-----------|
| [iceworks]     | [![iceworks-cli-status]][iceworks-cli-package] | [docs][iceworks-docs] |One-stop source code development workbench|
| [ice-devtools] | [![ice-devtools-status]][ice-devtools-package] | [docs][ice-devtools-docs] |Devtools for init and develop materials|
| [ice-scripts] | [![ice-scripts-status]][ice-scripts-package] | [docs][ice-scripts-docs] |Configurable build tool for React project based on webpack|
| [icestore] | [![icestore-status]][icestore-package] | [docs][icestore-docs] |Lightweight state management solution based on React hooks|
| [icestark] | [![icestark-status]][icestark-package] | [docs][icestark-docs] |Large-scale mid-background multi-application coexistence solution|
| [react-materials] | / | [docs][react-materials-docs] |Officially maintained high quality react material|
| [vue-materials] | / | [docs][vue-materials-docs] |Community maintains high quality vue materials       |

[iceworks]: https://github.com/alibaba/ice
[ice-devtools]: https://github.com/ice-lab/ice-devtools
[ice-scripts]: https://github.com/ice-lab/ice-scripts
[icestore]: https://github.com/ice-lab/icestore
[icestark]: https://github.com/ice-lab/icestark
[react-materials]: https://github.com/ice-lab/react-materials
[vue-materials]: https://github.com/ice-lab/vue-materials

[iceworks-cli-status]: https://img.shields.io/npm/v/iceworks-cli.svg
[ice-devtools-status]: https://img.shields.io/npm/v/ice-devtools.svg
[ice-scripts-status]: https://img.shields.io/npm/v/ice-scripts.svg
[icestore-status]: https://img.shields.io/npm/v/@ice/store.svg
[icestark-status]: https://img.shields.io/npm/v/@ice/stark.svg

[iceworks-cli-package]: https://npmjs.com/package/iceworks-cli
[ice-devtools-package]: https://npmjs.com/package/ice-devtools
[ice-scripts-package]: https://npmjs.com/package/ice-scripts
[icestore-package]: https://npmjs.com/package/@ice/store
[icestark-package]: https://npmjs.com/package/@ice/stark

[vue-materials-docs]: https://ice.work/block?type=vue
[react-materials-docs]: https://ice.work/scaffold
[iceworks-docs]: https://ice.work/docs/iceworks/about
[ice-devtools-docs]: https://ice.work/docs/materials/about
[ice-scripts-docs]: https://ice.work/docs/cli/about
[icestark-docs]: https://github.com/ice-lab/icestark#icestark
[icestore-docs]: https://github.com/ice-lab/icestore#icestore

## Contributing

Contributing Guide [CONTRIBUTING.md](/.github/CONTRIBUTING.md)

## Community

| DingTalk community                               | GitHub issues |  Gitter |
|-------------------------------------|--------------|---------|
|<img src="https://ice.alicdn.com/assets/images/qrcode.png" width="200" /> | [issues]     | [gitter]|

[issues]: https://github.com/alibaba/ice/issues
[gitter]: https://gitter.im/alibaba/ice

## License

[MIT](/LICENSE)
