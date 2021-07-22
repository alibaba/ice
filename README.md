English | [简体中文](./README_zh-CN.md)

# icejs

<p align="center">
  <a href="https://www.npmjs.com/package/ice.js"><img src="https://badgen.net/npm/dm/ice.js" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/ice.js"><img src="https://badgen.net/npm/v/ice.js" alt="Version"></a>
  <a href="/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="GitHub license" /></a>
  <a href="https://github.com/alibaba/ice/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" /></a>
  <a href="https://gitter.im/alibaba/ice"><img src="https://badges.gitter.im/alibaba/ice.svg" alt="Gitter" /></a>
</p>

A universal framework based on React.js, [Docs](https://ice.work/).

## Features

- 🐒 **Engineering**：Out of the box support for ES6+、TypeScript、Less、Sass、 CSS Modules，etc
- 🦊 **Routing**：Powerful Routing System, supports configured routing and conventions routing
- 🐯 **State management**：Built-in icestore, lightweight state management solution based on React Hooks
- 🐦 **Config**：Modes and Environment Variables configuration in the config file
- 🐶 **Logger**：Built-in logger solution, it's a flexible abstraction over using `console.log` as well
- 🦁 **Application configuration**：Provide powerful and extensible application configuration
- 🐴 **Hooks**：Provide Hooks APIs such as useModel and useHistory, etc
- 🐌 **Plugin system**：The plugin system provides rich features and allow the community to build reusable solutions
- 🐘 **TypeScript**：Support TypeScript
- 🐂 **Modern**：Support SPA、SSR、MPA and Micro-frontend

## Quick start

### Setup by VS Code

We recommend creating a new icejs app using [AppWorks](https://marketplace.visualstudio.com/items?itemName=iceworks-team.iceworks):

![demo](https://img.alicdn.com/imgextra/i3/O1CN01ZwcNtw1oJ1PhRkykl_!!6000000005203-2-tps-2406-1536.png_790x10000.jpg)

> See [Quick start by AppWorks](https://appworks.site/pack/quick-start) for more details.

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

## Contributors

<table>
<tr>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/chenbin92>
            <img src=https://avatars.githubusercontent.com/u/3995814?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=chenbin92/>
            <br />
            <sub style="font-size:14px"><b>chenbin92</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/SoloJiang>
            <img src=https://avatars.githubusercontent.com/u/14757289?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=狒狒神/>
            <br />
            <sub style="font-size:14px"><b>狒狒神</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/ClarkXia>
            <img src=https://avatars.githubusercontent.com/u/4219965?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=ClarkXia/>
            <br />
            <sub style="font-size:14px"><b>ClarkXia</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/luhc228>
            <img src=https://avatars.githubusercontent.com/u/44047106?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Hengchang Lu/>
            <br />
            <sub style="font-size:14px"><b>Hengchang Lu</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/imsobear>
            <img src=https://avatars.githubusercontent.com/u/2505411?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=大果/>
            <br />
            <sub style="font-size:14px"><b>大果</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/ChrisCindy>
            <img src=https://avatars.githubusercontent.com/u/10289782?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=NK/>
            <br />
            <sub style="font-size:14px"><b>NK</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/fyangstudio>
            <img src=https://avatars.githubusercontent.com/u/9896768?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=yangfan/>
            <br />
            <sub style="font-size:14px"><b>yangfan</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/maoxiaoke>
            <img src=https://avatars.githubusercontent.com/u/13417006?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=那吒/>
            <br />
            <sub style="font-size:14px"><b>那吒</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/LanceZhu>
            <img src=https://avatars.githubusercontent.com/u/26158863?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=f00bar/>
            <br />
            <sub style="font-size:14px"><b>f00bar</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/alvinhui>
            <img src=https://avatars.githubusercontent.com/u/4392234?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=许文涛/>
            <br />
            <sub style="font-size:14px"><b>许文涛</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/FuzzyFade>
            <img src=https://avatars.githubusercontent.com/u/25416941?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Rhuzerv/>
            <br />
            <sub style="font-size:14px"><b>Rhuzerv</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/sspku-yqLiu>
            <img src=https://avatars.githubusercontent.com/u/56879942?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=sspku-yqLiu/>
            <br />
            <sub style="font-size:14px"><b>sspku-yqLiu</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/purple-force>
            <img src=https://avatars.githubusercontent.com/u/16146970?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=chenliandong/>
            <br />
            <sub style="font-size:14px"><b>chenliandong</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/sprying>
            <img src=https://avatars.githubusercontent.com/u/4319405?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=sprying/>
            <br />
            <sub style="font-size:14px"><b>sprying</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/0xflotus>
            <img src=https://avatars.githubusercontent.com/u/26602940?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=0xflotus/>
            <br />
            <sub style="font-size:14px"><b>0xflotus</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/Ash-sc>
            <img src=https://avatars.githubusercontent.com/u/7429877?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=AshShen/>
            <br />
            <sub style="font-size:14px"><b>AshShen</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/xyeric>
            <img src=https://avatars.githubusercontent.com/u/5102113?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Eric Zhang/>
            <br />
            <sub style="font-size:14px"><b>Eric Zhang</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/farrrr>
            <img src=https://avatars.githubusercontent.com/u/1716558?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Far Tseng/>
            <br />
            <sub style="font-size:14px"><b>Far Tseng</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/fengzilong>
            <img src=https://avatars.githubusercontent.com/u/9125255?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=MO/>
            <br />
            <sub style="font-size:14px"><b>MO</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/qiaoyuwen>
            <img src=https://avatars.githubusercontent.com/u/8097860?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=QYW/>
            <br />
            <sub style="font-size:14px"><b>QYW</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/xartd>
            <img src=https://avatars.githubusercontent.com/u/29952695?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Art.XD/>
            <br />
            <sub style="font-size:14px"><b>Art.XD</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/Yurisa>
            <img src=https://avatars.githubusercontent.com/u/27357953?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=Yurisa/>
            <br />
            <sub style="font-size:14px"><b>Yurisa</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/ldsink>
            <img src=https://avatars.githubusercontent.com/u/1937610?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=ZHOU Cheng/>
            <br />
            <sub style="font-size:14px"><b>ZHOU Cheng</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/youluna>
            <img src=https://avatars.githubusercontent.com/u/10049465?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=游鹿/>
            <br />
            <sub style="font-size:14px"><b>游鹿</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/liuyan0535>
            <img src=https://avatars.githubusercontent.com/u/8371839?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=nancy/>
            <br />
            <sub style="font-size:14px"><b>nancy</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/nieyao>
            <img src=https://avatars.githubusercontent.com/u/37135010?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=nieyao/>
            <br />
            <sub style="font-size:14px"><b>nieyao</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/TrumanDu>
            <img src=https://avatars.githubusercontent.com/u/16727775?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=truman.p.du/>
            <br />
            <sub style="font-size:14px"><b>truman.p.du</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/dadalong>
            <img src=https://avatars.githubusercontent.com/u/13247745?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=dadalong/>
            <br />
            <sub style="font-size:14px"><b>dadalong</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/myGitZone>
            <img src=https://avatars.githubusercontent.com/u/19903630?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=yanchanglu/>
            <br />
            <sub style="font-size:14px"><b>yanchanglu</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/datou0412>
            <img src=https://avatars.githubusercontent.com/u/5847142?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=二凢/>
            <br />
            <sub style="font-size:14px"><b>二凢</b></sub>
        </a>
    </td>
</tr>
<tr>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/zhmushan>
            <img src=https://avatars.githubusercontent.com/u/24505451?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=木杉/>
            <br />
            <sub style="font-size:14px"><b>木杉</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/wjq990112>
            <img src=https://avatars.githubusercontent.com/u/45777252?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=炽翎/>
            <br />
            <sub style="font-size:14px"><b>炽翎</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/jiangqizheng>
            <img src=https://avatars.githubusercontent.com/u/21155771?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=蒋启钲/>
            <br />
            <sub style="font-size:14px"><b>蒋启钲</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/zhaofinger>
            <img src=https://avatars.githubusercontent.com/u/31442077?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=赵的拇指/>
            <br />
            <sub style="font-size:14px"><b>赵的拇指</b></sub>
        </a>
    </td>
    <td align="center" style="word-wrap: break-word; width: 90.0; height: 90.0">
        <a href=https://github.com/Mr-ZhaoRui>
            <img src=https://avatars.githubusercontent.com/u/30251448?v=4 width="60;"  style="border-radius:50%;align-items:center;justify-content:center;overflow:hidden;padding-top:10px" alt=赵锐/>
            <br />
            <sub style="font-size:14px"><b>赵锐</b></sub>
        </a>
    </td>
</tr>
</table>

## Ecosystem

| Project    | Version                                | Docs                  | Description                                       |
| ---------- | -------------------------------------- | --------------------- | ------------------------------------------------- |
| [icejs]    | [![icejs-status]][icejs-package]       | [docs][icejs-docs]    | A universal framework based on react.js           |
| [icestark] | [![icestark-status]][icestark-package] | [docs][icestark-docs] | Micro Frontends solution for large application    |
| [icestore] | [![icestore-status]][icestore-package] | [docs][icestore-docs] | Simple and friendly state for React               |
| [formily]  | [![formily-status]][formily-package]   | [docs][formily-docs]  | Performant, flexible and extensible form solution |
| [ahooks]   | [![ahooks-status]][ahooks-package]     | [docs][ahooks-docs]   | React Hooks Library                               |

[icejs]: https://github.com/alibaba/ice
[icestark]: https://github.com/ice-lab/icestark
[icestore]: https://github.com/ice-lab/icestore
[icejs-status]: https://img.shields.io/npm/v/ice.js.svg
[icestark-status]: https://img.shields.io/npm/v/@ice/stark.svg
[icestore-status]: https://img.shields.io/npm/v/@ice/store.svg
[icejs-package]: https://npmjs.com/package/ice.js
[icestark-package]: https://npmjs.com/package/@ice/stark
[icestore-package]: https://npmjs.com/package/@ice/store
[icejs-docs]: https://ice.work/docs/guide/intro
[icestark-docs]: https://ice.work/docs/icestark/guide/about
[icestore-docs]: https://github.com/ice-lab/icestore#icestore
[formily]: https://github.com/alibaba/formily
[formily-status]: https://img.shields.io/npm/v/@formily/react.svg
[formily-package]: https://npmjs.com/package/@formily/react
[formily-docs]: https://formilyjs.org/
[ahooks]: https://github.com/alibaba/hooks
[ahooks-status]: https://img.shields.io/npm/v/ahooks.svg
[ahooks-package]: https://npmjs.com/package/ahooks
[ahooks-docs]: https://ahooks.js.org

## Community

| DingTalk community                                                                                                                      | GitHub issues | Gitter   |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------- |
| <a href="https://ice.alicdn.com/assets/images/qrcode.png"><img src="https://ice.alicdn.com/assets/images/qrcode.png" width="150" /></a> | [issues]      | [gitter] |

[issues]: https://github.com/alibaba/ice/issues
[gitter]: https://gitter.im/alibaba/ice

## License

[MIT](/LICENSE)
