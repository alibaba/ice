---
title: 命令行 CLI
order: 14
---

:::tip
指定命令行参数有两种方式：

1. 在 `package.json` 文件中指定参数：

```diff
{
  "scripts": {
-   "start": "ice start"
+   "start": "ice start --https"
  }
}
```

2. 在命令行中指定参数：

```bash
# npm v7 及以上需要多增加 `--` 字符
$ npm start -- --https
# npm v6
$ npm start --https
```
:::



## start

启动本地开发服务器，用于在本地开发调试项目。

```bash
ice start [options]
```

|         选项         |   类型   | 说明 |
| :------------------: | :------: | :--: |
| `--target <target> ` | `string` | 指定编译的 target |
|  `--mode <mode>  `   | `string` | 指定环境模式 mode |
| `--config <config>`  | `string` | 指定使用的配置文件路径 |
| `--rootDir <rootDir>` | `string` | 指定应用的根目录 |
| `-h, --host <host>`  | `string` | 指定开发服务器主机名 |
| `-p, --port <port>`  | `number` | 指定开发服务器端口 |
| `--https [https]`  | `boolean` | 开启 https |
|     `--no-open`      | `boolean` | 禁止默认打开浏览器预览行为 |
|     `--no-mock`      | `boolean` | 禁用 mock 服务 |
| `--analyzer` | `boolean` | 开启 bundle 体积构建分析 |
| `--force` | `boolean` | 强制删除构建缓存 |
| `-h, --help` | `-` | 显示可用的选项 |

## build

构建项目，输出生产环境下的资源。

```bash
$ ice build [options]
```

|         选项         |   类型   | 说明 |
| :------------------: | :------: | :--: |
| `--target <target> ` | `string` | 指定编译的 target |
|  `--mode <mode>  `   | `string` | 指定环境模式 mode |
| `--config <config>`  | `string` | 指定使用的配置文件路径 |
| `--rootDir <rootDir>` | `string` | 指定应用的根目录 |
| `--analyzer` | `boolean` | 开启 bundle 体积构建分析 |
| `-h, --help` | `-` | 显示可用的选项 |

## help

查看帮助。

```bash
$ ice help
```

## version

查看 ice.js 的版本。

```bash
$ ice --version

3.0.0
```
