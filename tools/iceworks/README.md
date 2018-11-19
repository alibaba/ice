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

# dev

开发调试

```
nvm use 8 // 安装 >= 8.10.0 && < 9 的版本
yarn install
yarn dev
yarn start
```

# pack

打包应用，根据当前操作系统打包对应平台的软件。目前支持 `darwin` `win32 x64`

```
yarn run build
yarn run dist
```

**注意**

Mac 打包需要有对应的的开发者证书（否则发布后的软件无法正常更新）证书由管理员管理。

# 推送软件更新，发布软件

```
yarn run upload
```

**注意**

上传过程中需要输入 OSS 的 Access Key Secret。

> 以上操作分别在对应系统执行

# 更新 https://alibaba.github.io/ice/iceworks 的下载地址

1. 执行 `yarn run updates`
2. 将生成的 `updates.json` 上传到 oss 根目录
