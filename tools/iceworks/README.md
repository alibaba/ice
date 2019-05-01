# Iceworks

目录规范

```bash
|- app
  |- main/ # 所有主进程文件
|- renderer/ # 渲染进程 ICE 的单页面应用, ICE 单页面应用
|- build/ # 资源文件 icon 等，
|- binary/ # 二进制包
|- gulp etc. # 开发辅助工具等，publish 阶段构建完成后可以 remove 掉
```

## 环境准备

- [安装 Node](https://nodejs.org/en/download/)；
- [安装 Yarn](https://yarnpkg.com/zh-Hant/docs/install)；
- 安装项目依赖：`yarn install`；
- [安装 node-pty 依赖](https://www.npmjs.com/package/node-pty#dependencies)。

## 开发调试

```bash
yarn dev
yarn start
```

## 打包发布

根据当前操作系统打包对应平台的软件，目前支持 `darwin` `win32 x64`。

- 前置准备：
    - macOS：安装开发者证书
- 本地验证：
    - 参考开发调试章节，进行启动调试服务，观察是否启动成功，控制台有无报错；
    - 如遇 `node-pty failed to load` 则执行 `yarn rebuild-node-pty` 后重启调试。
- 更新版本号及日志：
    - 更改 /app 文件夹下 package.json 的版本号；
    - 编写 /changelog 文件夹下的 版本号.json 和 changelog.json 。
- 执行构建，生成安装包：
    - 同步物料：`yarn sync-db`；
    - 打包前端资源：`yarn build`；
    - 打包 electron 应用：`yarn dist`。
- 将安装包上传到 oss：`yarn upload`；
- 确认所有平台的安装包都上传到 oss 后，在任意一平台下进行发布：
  - `yarn updates`：将生成的 updates.js 和 updates.json ；
  - `yarn upload-log`：将版本信息和日志文件更新到 oss。

> **注意** Mac 打包需要有对应的的开发者证书（否则发布后的软件无法正常更新）证书由管理员管理。
> **注意** 上传过程中需要输入 OSS 的 Access Key Secret。