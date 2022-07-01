# 参与贡献

## 环境准备

1. 保证 Node.js 版本是 Node.js 14 以上。推荐安装 Node.js 16+ 版本，会大大提升本地调试速度
2. ICE 仓库是 `monorepo`，并使用 `pnpm workspace`。因此需要安装 [pnpm](https://pnpm.io/) 包管理工具
3. 在项目根目录下执行 `pnpm setup` 后会安装依赖和编译代码

> 如果在安装 puppeteer 的时候过慢，可以参考此 [issue](https://github.com/puppeteer/puppeteer/issues/6833#issuecomment-863488626) 进行配置 chromium 缓存。

## 目录说明

```markdown
ice-next
├── examples            # 存档各种示例代码
├── packages            # 存放 npm 包
|  ├── bundles          # 依赖预编译，锁定框架三方依赖版本，框架中的依赖需要从此包导入模块
|  ├── ice              # 工程代码，包括创建 service、构建任务、Webpack 和 esbuild 的打包编译逻辑等
|  ├── plugin-auth      # Auth 插件
|  ├── route-manifest   # 根据约定式路由生成路由配置
|  ├── runtime          # 运行时代码，包括 Client/Server 入口、Document、路由组件等
|  ├── types            # 公共 TS 依赖
|  └── webpack-config   # 存放 Webpack 默认的配置项
├── scripts             # 执行脚本
├── tests               # 测试用例
|  ├── integration
|  └── utils
└── website             # ICE 官方文档
```

补充说明：

1. `packages` 目录下以 `plugin-xxx` 命名的都是插件包，插件的开发规范可以参考[文档]()
2. `packages/types` 是用于存放公共的 TS 类型声明，以在其他 `package` 中进行复用

## 调试

### 启动 watch 命令

此命令用于监听 `packages` 目录下代码变更，并增量编译代码。

```bash
pnpm watch
```

### 跑 example

`examples` 目录下存放了各种用于测试的 demo，并且自动 Link 到 `packages` 目录下的代码。只需执行以下命令即可开始调试：

```bash
# 进入某个 example
$ cd examples/basic-project
# 调试 example
$ pnpm start
```

`packages` 目录下的 `npm` 包在进行代码编译时会生成 `SourceMap`，结合 IDE 可以很方便进行断点调试。以 VS  Code 为例：

1. 选择 `JavaScript Debug Terminal` 进入 Debug 模式：
![image](https://user-images.githubusercontent.com/44047106/172011203-8b3b4016-8f7b-4743-bbef-30672ab04b03.png)

2. 进入某个 `example` 目录并执行 `pnpm start` 开始调试

3. 在某一行设置一个断点，当代码执行到此行时，将会停止执行并可查看各个变量的值
![image](https://user-images.githubusercontent.com/44047106/172013483-028d0fa8-8634-46fe-bbb6-1b28b39b8ce1.png)

## 测试

ICE 使用 [vitest](https://vitest.dev/) 进行单元测试和集成测试。执行以下命令可快速运行项目中的测试用例：

```bash
# 执行一次测试并生成代码覆盖率
$ pnpm test
# 启用 Test Watch 模式
$ pnpm test:watch
# 只跑部分测试用例
$ pnpm test basic-project.test.ts
```

## 文档

ICE 的文档使用了 [docusaurus](https://docusaurus.io/) 进行搭建。执行以下命令即可开始文档的开发：

```bash
# 进入到 website 目录
$ cd websites
# 安装依赖
$ yarn install
# 本地预览
$ yarn start 
```

## 发布

```bash
# 发布 alpha 版本
$ pnpm publish:alpha
# 发布 beta 版本
$ pnpm publish:beta
```
