# Iceworks App

## 开发调试

0. 启动渲染进程的前端服务:

    ```bash
    $ cd tools/iceworks-app/renderer
    $ npm install
    $ npm run start
    ```
0. 启动主进程服务:

    ```
    $ cd tools/iceworks-app
    $ npm install
    $ npm run start
    ```

## 打包 && 发布

目前支持 `darwin` 和 `win32 x64`，是在开发机器上进行的。

### 前置准备

- 代码数字签名：
    - 获取开发者证书（不同平台有不同的证书）；
    - 配置环境变量（参考：[《electron-builder: Code Signing》](https://www.electron.build/code-signing)）。
- 设置 DEF 环境变量。

### 本地验证

- 参考开发调试章节，启动调试服务，观察是否启动成功，控制台有无报错；
- 执行 `npm run pack` 打出测试包，进行测试。

### 打包

- 更新 /package.json 的版本号；
- 执行构建，生成安装包：`npm run dist`，该将会把安装包生成到 `/dist` 目录。

### 编写更新日志

- 编写 /changelog 文件夹下的 ${版本号}.json

### 执行发布

- 将安装包上传到 oss：`npm run upload-app`（上传完后老版本将能检测到该更新）；
- 确认所有平台的安装包都上传到 oss 后，在任意一平台下进行发布：
  
  `npm run upload-logs`：将 update.json 和 changelog.log 更新到 oss。

> **注意** Mac 打包需要有对应的的开发者证书（否则发布后的软件无法正常更新）证书由管理员管理。
> **注意** 上传过程中需要输入 OSS 的 Access Key Secret。
