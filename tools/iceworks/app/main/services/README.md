# iceworks 服务 API

## 存储相关

* storage
    * `projectStorage` 项目列表存储
        * `set(values:Array)` 设置值，一般用于初始化
        * `add(path:String)` 项目路径
        * `has(path:String)` 是否已存在
        * `remove(path:String)` 移除该项目
        * `delete()` 清空
        * `dataSource` 所有数据

## 额外软件操作

* `editors`
    * `open(path:String):Promise` : 在编辑中打开
* `shells`
    * `open(path:String):Promise` : 在终端中打开
* `folder`
    * `open(path:String)` : 在文件夹中打开
    * `selector(properties:Array):Promise` 打开一个目录选择器
        * `properties`: `['openDirectory', 'createDirectory']`

##  软件设置

* settings
    * `getAll()` 获取所有配置
    * `get(name:String)` 获取对应配置
    * `set(name:String, value:String)` 设置
    * `has(name:String)` 是否存在

## NPM 操作相关

* npm
    * `run(args):Promise` 需要调用方指定 --save 或者 --save-dev 等

## 脚手架相关（lite, pro）

* scaffolder
    * `removePreviewPage(options:Object):Promise` 移除临时预览文件
        * `options.destDir` 所在的项目目录
    * `createPage(options:Object):Promise` 创建页面
        * `options.pageName` 页面名称
        * `options.routePath` 路由路径
        * `options.routeText` 路由名
        * `options.destDir` 生成到的项目地址
        * `options.layout` layout 名
        * `options.blocks` 区块队列
        * `options.preview` 是否是预览页面
        * `interpreter: ({ type, message, data }, next) => {}` 询问回调，根据执行对应的操作
    * `createProject():Promise` 生成项目
        * `destDir`,
        * `scaffolding`,
        * `version`,
        * `projectName`,
        * `interpreter: ({ type, message, data }, next) => {}`
