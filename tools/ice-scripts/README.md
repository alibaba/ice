# ice scripts

Cli dev tool for ice.

# buildConfig 说明

在项目根目录下 `package.json` 下定义 `buildConfig` 对象，可快捷定义构建配置

| 配置名    | 类型         | 默认值 | 说明                                         |
| --------- | ------------ | ------ | -------------------------------------------- |
| entry     | Sring/Object | -      | 设置项目的文件入口                           |
| theme     | Sting        | -      | 项目主题包                                   |
| publicURL | Sting        | -      | 构建后的资源基础路径，设置 `./` 表示离线模式 |

## CLI 参数说明

| 配置名  | 说明                            | 示例                       |
| ------- | ------------------------------- | -------------------------- |
| --https | 使用 https 协议启动服务启动服务 | `ice dev --https`          |
| --port  | 设置服务端口                    | `ice dev --port=9090`      |
| --host  | 设置服务主机名                  | `ice dev --host=127.0.0.1` |
| --hash  | 开启构建 hash 文件格式          | `ice build --hash`         |
| --debug | 开启构建 debug 模式不压缩代码   | `ice build --debug`        |
