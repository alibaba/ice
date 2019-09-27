<p align="center">
  <a href="https://ice.work">
    <img alt="ICE" src="https://img.alicdn.com/tfs/TB1gOdQRCrqK1RjSZK9XXXyypXa-192-192.png" width="96">
  </a>
</p>

<h1 align="center">ICE</h1>

<div align="center">

Simple and friendly front-end R&D system

<a href="/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="GitHub license" /></a>
<a href="https://travis-ci.org/alibaba/ice"><img src="https://travis-ci.org/alibaba/ice.svg?branch=master" alt="Build Status" /></a>
<a href="https://github.com/alibaba/ice/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" /></a>
<a href="https://gitter.im/alibaba/ice"><img src="https://badges.gitter.im/alibaba/ice.svg" alt="Gitter" /></a>

<div align="center">
  <img src="https://img.alicdn.com/tfs/TB12869ai_1gK0jSZFqXXcpaXXa-2898-1988.png" width="1000" />
</div>
</div>

English | [简体中文](./README.md)

## Features

- :fire:**Visual Development**：Simplify front-end engineering complexity through GUI operations, while visually managing different project projects via adapters, customizing proprietary front-end workbench.
- :100:**Rich materials**：Improve project development efficiency based on material assembly while providing a wide range of React/Vue materials
- :tophat:**Best Practices**：Project development best practices based on rich experience, including directory results, development debugging, routing configuration, state management, etc.
- :whale:**Custom material**：Building Private Material System by Rapid Development of Material Developer Tools

more information [ice.work](https://ice.work).

## Quick start

We provide two ways to use iceworks for different user groups:

#### GUI usage [recommend]

```bash
# Install the CLI tool
$ npm install iceworks -g

# Run iceworks
$ iceworks  # Open the browser： http://127.0.0.1:8000
```

#### CLI usage

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
| [iceworks]     | [![iceworks-cli-status]][iceworks-cli-package] | [docs][iceworks-docs] |One-stop visual source code development workbench based on materials|
| [ice-scripts] | [![ice-scripts-status]][ice-scripts-package] | [docs][ice-scripts-docs] |Highly configurable development and build tools based on webpack|
| [icestore] | [![icestore-status]][icestore-package] | [docs][icestore-docs] |Lightweight state management solution based on React Hooks|
| [icestark] | [![icestark-status]][icestark-package] | [docs][icestark-docs] |Micro Frontends solution for large application|
| [react-materials] | / | [docs][react-materials-docs] |High quality and abundant React materials provided by the authorities|
| [vue-materials] | / | [docs][vue-materials-docs] |High quality Vue materials maintained by the community|

[iceworks]: https://github.com/alibaba/ice
[ice-scripts]: https://github.com/ice-lab/ice-scripts
[icestore]: https://github.com/ice-lab/icestore
[icestark]: https://github.com/ice-lab/icestark
[react-materials]: https://github.com/ice-lab/react-materials
[vue-materials]: https://github.com/ice-lab/vue-materials

[iceworks-cli-status]: https://img.shields.io/npm/v/iceworks.svg
[ice-scripts-status]: https://img.shields.io/npm/v/ice-scripts.svg
[icestore-status]: https://img.shields.io/npm/v/@ice/store.svg
[icestark-status]: https://img.shields.io/npm/v/@ice/stark.svg

[iceworks-cli-package]: https://npmjs.com/package/iceworks
[ice-scripts-package]: https://npmjs.com/package/ice-scripts
[icestore-package]: https://npmjs.com/package/@ice/store
[icestark-package]: https://npmjs.com/package/@ice/stark

[vue-materials-docs]: https://ice.work/block?type=vue
[react-materials-docs]: https://ice.work/scaffold
[iceworks-docs]: https://ice.work/docs/iceworks/about
[ice-scripts-docs]: https://ice.work/docs/cli/about
[icestark-docs]: https://ice.work/docs/icestark/guide/about
[icestore-docs]: https://github.com/ice-lab/icestore#icestore

## Contributing

Contributing Guide [CONTRIBUTING.md](/.github/CONTRIBUTING.md)

## Community

| DingTalk community                               | GitHub issues |  Gitter |
|-------------------------------------|--------------|---------|
|<img src="https://ice.alicdn.com/assets/images/qrcode.png" width="150" /> | [issues]     | [gitter]|

[issues]: https://github.com/alibaba/ice/issues
[gitter]: https://gitter.im/alibaba/ice

## License

[MIT](/LICENSE)
