# Scaffolder
> 负责生成模板使用者项目脚手架

## createProject

- 描述
  - 初始化一个新的项目
- 入参 (kwargs)
  - destDir
    - 需要初始化的项目目录(绝对路径)
  - scaffolding
    - 脚手架 npm 名
  - version
    - 脚手架 npm 版本号 (SemVer)
  - interpreter
    - 见 interpreter
- 返回
  - void

## migrateBlock

- 描述
  - 初始化一个新的模块
- 入参 (kwargs)
  - name
    - 本地模块名(大驼峰)
  - npm
    - block npm name
  - version
    - block npm SemVer
  - destProjectPath
    - 目标项目绝对路径
  - 见 interpreter
- 返回
  - void

## createPage

- 描述
  - 初始化一个新的页面
- 入参 (kwargs)
  - pageName
    - 页面名称
  - route (String)
    - 路由路径
  - destDir (String)
    - 目标项目绝对路径
  - layout (String)
    - 使用的本地 layout 名
  - blocks[]
    - name
      - 本地模块名(大驼峰)
    - npm
      - block npm name
    - version
      - block npm SemVer
  - 见 interpreter
- 返回
  - void