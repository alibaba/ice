# ice scripts

Cli dev tool for ice.

# buildConfig 说明

在项目根目录下 `package.json` 下定义 `buildConfig` 对象，可快捷定义构建配置

| 配置名    | 类型         | 默认值 | 说明                                         |
| --------- | ------------ | ------ | -------------------------------------------- |
| entry     | Sring/Object | -      | 设置项目的文件入口                           |
| theme     | Sting        | -      | 项目主题包                                   |
| publicURL | Sting        | -      | 构建后的资源基础路径，设置 `./` 表示离线模式 |

## Cli 参数说明

### dev

```
Options:
  -p, --port <port>      服务端口号
  -h, --host <host>      服务主机名
  --https                开启 https
  --analyzer             开启构建分析
  --analyzer-port        设置分析端口号
  --disabled-reload      关闭 hot reload
  --project-type <type>  项目类型, node|web (default: "web")
  --inject-babel <type>  注入 babel 运行环境, Enum: polyfill|runtime (default: "polyfill")
```

### build

```
Options:
  -s, --skip-install     跳过安装依赖
  --debug                debug 模式下不压缩
  --hash                 构建后的资源带 hash 版本
  --project-type <type>  项目类型, node|web (default: "web")
  --inject-babel <type>  注入 babel 运行环境, Enum: polyfill|runtime (default: "polyfill")
```
